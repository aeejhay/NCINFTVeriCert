// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConnectAccount from "./pages/ConnectAccount";
import Verify from "./pages/Verify";
import AdminPage from "./pages/AdminPage";
import MintedCertificates from "./pages/MintedCertificates";
import LoginPage from './pages/LoginPage';
import AboutUs from './pages/AboutUs';
import EduSavePage from './pages/EduSavePage';
import SendTokenPage from './pages/SendTokenPage';
import GetWallet from './pages/GetWallet';
import BuyNCIToken from './pages/BuyNCIToken';
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/connect" element={<ConnectAccount />} />
            <Route path="/minted" element={<MintedCertificates />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/edusave" element={<EduSavePage />} />
            <Route path="/send-token" element={<SendTokenPage />} />
            <Route path="/get-wallet" element={<GetWallet />} />
            <Route path="/buy-nci-token" element={<BuyNCIToken />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
