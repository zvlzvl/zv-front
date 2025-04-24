import './App.css';
import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Toolbar from "./components/Toolbar";
import IndexPage from "./pages/IndexPage";
import CVPage from "./pages/CVPage";
import Footer from "./components/Footer";


function App() {

    return (
        <div className="flex flex-col items-center bg-primary">
            <BrowserRouter>
                <Toolbar />
                <div className="w-full  bg-primary">
                    <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/cv" element={<CVPage />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    )
        ;
}

export default App;
