import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatbotWidget from "./components/ChatbotWidget";
import BookingModal from "./components/BookingModal";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home/index";
import Services from "./pages/Services/index";
import About from "./pages/About/index";
import Blog from "./pages/Blog/index";
import Contact from "./pages/Contact/index";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar onBooking={() => setBookingOpen(true)} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onBooking={() => setBookingOpen(true)} />} />
            <Route path="/services" element={<Services onBooking={() => setBookingOpen(true)} />} />
            <Route path="/about" element={<About onBooking={() => setBookingOpen(true)} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ChatbotWidget />
        <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      </div>
    </BrowserRouter>
  );
}