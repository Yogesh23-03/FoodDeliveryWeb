const express=require("express")
const isAuth=require("../middlewares/isAuth.js")
const { addItem, editItem, getItemById, deleteItem, getItemByCity, getItemsByShop, searchItems, rating } = require("../controllers/item.controllers.js")
const upload=require("../middlewares/multer.js")





const itemRouter=express.Router()

itemRouter.post("/additem",isAuth,upload.single("image"),addItem)
itemRouter.post("/edititem/:itemId",isAuth,upload.single("image"),editItem)
itemRouter.get("/getbyid/:itemId",isAuth,getItemById)
itemRouter.get("/delete/:itemId",isAuth,deleteItem)
itemRouter.get("/getbycity/:city",isAuth,getItemByCity)
itemRouter.get("/getbyshop/:shopId",isAuth,getItemsByShop)
itemRouter.get("/searchitems",isAuth,searchItems)
itemRouter.post("/rating",isAuth,rating)
module.exports=itemRouter;