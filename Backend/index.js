const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const connectDb = require('./config/db')
const cookieParser = require('cookie-parser')
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const shopRouter = require("./routes/shop.routes")
const itemRouter = require("./routes/item.routes")
const orderRouter = require("./routes/order.routes")
const http = require('http');
const { Server } = require('socket.io');
const User = require("./models/user.Model.js") // ← added

connectDb()
const app = express()
const port = process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const server = http.createServer(app);
const io = new Server(server, {           // ← io is created here
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ["GET", "POST"]
    }
});

// ← io.on must come AFTER io is created above
io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    socket.on("identity", async ({ userId }) => {
        try {
            if (!userId) return;
            await User.findByIdAndUpdate(userId, {
                socketId: socket.id,
                isOnline: true
            });
            console.log("identity saved:", userId, socket.id);
        } catch (error) {
            console.log("identity error:", error);
        }
    });

    socket.on('updateLocation', async ({ latitude, longitude, userId }) => {
      try {
        const user = await User.findByIdAndUpdate(userId, {
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          isOnline: true,
          socketId: socket.id
        });

        if (user) {
          io.emit('updateDeliveryLocation',{
            deliveryBoyId:userId,
            latitude,
            longitude
          });
        }


      } catch (error) {
          console.log('updateDeliveryLocation error');
      }
    });



    socket.on("disconnect", async () => {
        try {
            await User.findOneAndUpdate(
                { socketId: socket.id },
                { socketId: null, isOnline: false }
            );
            console.log("socket disconnected:", socket.id);
        } catch (error) {
            console.log("disconnect error:", error);
        }
    });
});

app.set('io', io);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.get("/", function (req, res) {
    res.send("hello world")
})
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRouter)

server.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
