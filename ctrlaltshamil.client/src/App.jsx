import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Projects from "./pages/Projects";
import BlogPage from "./pages/BlogPage";
import BlogArticle from "./pages/BlogArticle";
import CaseStudy from "./pages/CaseStudy";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";

import "./App.css";
import "./masonry.css"; // ← add this


function App() {
    return (
        <>
            <ScrollToTop />   {/* ← add this */}
            {/* Skip-to-content link for keyboard & screen-reader users */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#00CFFF] focus:text-[#080810] focus:font-semibold focus:text-sm"
            >
                Skip to main content
            </a>

            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<CaseStudy />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/about" element={<About />} />
                {/* Add further routes here as pages are built */}
                {/* <Route path="/projects" element={<Projects />} /> */}
                {/* <Route path="/blog"     element={<Blog />} /> */}
                {/* <Route path="/contact"  element={<Contact />} /> */}
            </Routes>

            <Footer />
        </>
    );
}

export default App;