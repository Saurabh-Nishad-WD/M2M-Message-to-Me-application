import { Routes, Route, Router } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import './App.css'
import Home from './pages/Home'
import Navbar from "./components/Navbar";
import TextUploader from "./pages/TextUpload";
import AboutPage from "./pages/About";
import SignUpPage from "./pages/SignUp";

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/notes" element={<TextUploader />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  )
}

export default App
