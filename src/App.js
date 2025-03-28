import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import IndexPage from "./pages/IndexPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddPostPage from "./pages/AddPostPage";
import SinglePostPage from "./pages/SinglePostPage";
import UserPage from "./pages/UserPage";
import FavoritesPage from "./pages/FavoritesPage";
import MessagesPage from "./pages/MessagesPage";
import {socket} from "./socket"


function App() {

    return (
        <div className="flex flex-col items-center bg-gray-900">
        <BrowserRouter>
            <Toolbar socket={socket} />
                <div className="container min-h-screen bg-gray-900 mt-28 lg:w-2/3 p-6">
                    <Routes>
                        <Route path="/" element={<IndexPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage socket={socket}/>}/>
                        <Route path="/profile" element={<ProfilePage />}/>
                        <Route path="/add-post" element={<AddPostPage/>}/>
                        <Route path="/post/:id" element={<SinglePostPage/>}/>
                        <Route path="/favorites" element={<FavoritesPage/>}/>
                        <Route path="/user/:userId" element={<UserPage/>}/>
                        <Route path="/messages" element={<MessagesPage socket={socket} />}/>
                    </Routes>
                </div>


        </BrowserRouter>
        </div>
    )
        ;
}

export default App;
