import { Routes, Route, Router } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import './App.css'
import Home from './pages/Home'
import Navbar from "./components/Navbar";
import TextUploader from "./pages/TextUpload";

function App() {

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<Home />} />
        <Route path="/notes" element={<TextUploader />} />
      </Routes>
    </>
  )
}

export default App
