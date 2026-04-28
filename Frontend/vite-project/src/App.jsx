import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'

import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Home from './pages/Home.jsx'
import CreateEditShop from './pages/CreateEditShop.jsx'
import AddItem from './pages/AddItem.jsx'
import EditItem from './pages/EditItem.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckOut from './pages/CheckOut.jsx'
import OrderPlaced from './pages/OrderPlaced.jsx'
import MyOrders from './pages/MyOrders.jsx'
import TrackOrderPage from './pages/TrackOrderPage.jsx'
import Shop from './pages/Shop.jsx'

import GetCurrentUser from './hooks/GetCurrentUser.jsx'
import useGetCity from './hooks/GetCity.jsx'
import GetMyshop from './hooks/GetMyShop.jsx'
import GetShopByCity from './hooks/GetShopByCity.jsx'
import GetItemsByCity from './hooks/GetItemByCity.jsx'
import GetMyOrders from './hooks/GetMyOrders.jsx'
import useUpdateLocation from './hooks/UseUpdateLocation.jsx'

import { setSocket } from './redux/userSlice'

export const serverUrl = "https://fooddeliveryweb-1.onrender.com"

const App = () => {
  const dispatch = useDispatch()
  const { userData, socket } = useSelector((state) => state.user) // ✅ from Redux state

  GetCurrentUser()
  GetMyshop()
  useGetCity()
  GetShopByCity()
  GetItemsByCity()
  GetMyOrders()
  useUpdateLocation()

  useEffect(() => {
    const socketInstance = io(serverUrl, { withCredentials: true });
    dispatch(setSocket(socketInstance));

    socketInstance.on('connect', () => {
      console.log('socket connected', socketInstance.id);
      if (userData?._id) {
        socketInstance.emit('identity', { userId: userData._id });
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (userData?._id && socket?.connected) {
      socket.emit('identity', { userId: userData._id });
      console.log('identity emitted for', userData._id);
    }
  }, [userData?._id, socket]);

  return (
    <Routes>
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />} />
      <Route path="/create-edit-shop" element={userData ? <CreateEditShop /> : <Navigate to="/signin" />} />
      <Route path="/add-item" element={userData ? <AddItem /> : <Navigate to="/signin" />} />
      <Route path="/edit-item/:itemId" element={userData ? <EditItem /> : <Navigate to="/signin" />} />
      <Route path="/cart" element={userData ? <CartPage /> : <Navigate to="/signin" />} />
      <Route path="/checkout" element={userData ? <CheckOut /> : <Navigate to="/signin" />} />
      <Route path="/order-placed" element={userData ? <OrderPlaced /> : <Navigate to="/signin" />} />
      <Route path="/my-orders" element={userData ? <MyOrders /> : <Navigate to="/signin" />} />
      <Route path="/track-order/:orderId" element={userData ? <TrackOrderPage /> : <Navigate to="/signin" />} />
      <Route path="/shop/:shopId" element={userData ? <Shop /> : <Navigate to="/signin" />} />
    </Routes>
  )
}

export default App
