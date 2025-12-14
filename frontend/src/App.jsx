import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/loginPage";
import BlogDeatilsPage from "./pages/BlogDeatilsPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import ProtectedRoute from "./routes/ProtectedRoute";



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/blogs/:id" element={<BlogDeatilsPage />} />
            <Route path="/create" element={<ProtectedRoute><CreateBlogPage /></ProtectedRoute>} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
