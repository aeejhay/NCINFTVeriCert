import React from 'react';
import aboutUsImg from '../assets/images/about-us-img.png';

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About VeriCert
          </h1>
          <p className="text-xl md:text-2xl text-blue-600 font-semibold">
            Immutable Credentials. Trusted for Life.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Illustration Section */}
          <div className="flex justify-center items-center">
            <img
              src={aboutUsImg}
              alt="About Us"
              className="object-contain rounded-lg max-h-[750px] w-full"
            />
          </div>
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              VeriCert is a blockchain-powered academic credential platform that empowers institutions like the National College of Ireland to issue tamper-proof digital certificates. Each diploma is minted as a lightweight NFT using the Stellar blockchain, with key metadata encoded in a secure 32-byte hash (Memo Hash).
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              This system ensures that every certificate is permanently recorded and globally verifiable — an innovation developed by student Adrian Jandongan as part of his capstone project for the Higher Diploma in Science in Computing. The platform is intentionally lightweight and secure, matching each blockchain transaction's hash with the institution's protected database.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By pairing the Stellar blockchain with NCI's internal records, VeriCert creates a twin-verification system that is decentralized, anti-tamper, and future-proof. It's time to move beyond paper — and into a transparent, trust-based future.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Immutable</h3>
            <p className="text-gray-600">Blockchain-powered verification ensures certificates cannot be tampered with.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Globally Verifiable</h3>
            <p className="text-gray-600">Instant verification of credentials from anywhere in the world.</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-600 mb-4 flex items-center justify-center">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightweight & Fast</h3>
            <p className="text-gray-600">Built on Stellar blockchain for efficient and cost-effective operations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 