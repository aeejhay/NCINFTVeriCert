import React from 'react';

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

          {/* Image/Illustration Section */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
              <div className="w-full h-[500px] h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg
                  className="w-32 h-32 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
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