import react, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Connect from './pages/Connect/Connect'
import Tinlog from './pages/tinlog/Tinlog'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EditProfile from './pages/tinlog/EditProfile/EditProfile'
import Message from './pages/Message/Message'

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" index element={<Home />} />
                    <Route path="/login-register" element={<Connect />} />
                    <Route path="/app" element={<Tinlog />} />
                    <Route path="/app/profile" element={<EditProfile />} />
                    <Route path="/app/conversation/:id" element={<Message />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="bottom-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
            />
        </div>
    )
}

export default App
