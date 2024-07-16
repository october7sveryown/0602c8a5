import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Screen } from "./components/screen";
import ActivityDetails from "./components/ActivityDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";
import ArchivedCalls from "./components/ArchivedCalls";

function App() {
  return (
    <>
      <div className="min-h-screen max-w-full md:min-h-[768px] flex flex-col md:max-w-md mx-auto bg-white rounded-lg shadow-md md:my-4">
        <Toaster />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Screen />} />
            <Route path="/call-details/:id" element={<ActivityDetails />} />
            <Route path="/archived-calls" element={<ArchivedCalls />} />
          </Routes>

          <Footer />
        </Router>
      </div>
      
    </>
  );
}

export default App;
