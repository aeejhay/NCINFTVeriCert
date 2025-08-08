/*
Student note:
This page explains $NCI token in plain english.
I focused on clear steps instead of complex details.
*/
// Buy NCI Token Page

import React from 'react';

const BuyNCIToken: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-8 text-center drop-shadow-sm flex items-center justify-center gap-3">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-green-200 shadow-lg">
            <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4b0.png" alt="$NCI Token" className="w-10 h-10" />
          </span>
          Buy $NCI Token
        </h1>
        <p className="text-xl text-green-800 font-semibold text-center mb-12">
          The official Stellar-based token for education and savings at the National College of Ireland
        </p>
        {/* What is NCI Token? */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2 text-center justify-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-green-100">
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f393.png" alt="Education" className="w-7 h-7" />
            </span>
            What is $NCI Token?
          </h2>
          <p className="text-gray-700 mb-2">$NCI Token is a digital asset issued on the Stellar blockchain, designed to power educational savings, tuition payments, and rewards at the National College of Ireland. It is secure, transparent, and globally accessible.</p>
        </div>
        {/* Use Cases & Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4 flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-200 mb-2">
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4b3.png" alt="Payments" className="w-8 h-8" />
            </span>
            <h3 className="font-bold text-green-700 mb-1">Education Payments</h3>
            <p className="text-gray-600 text-center">Pay tuition, fees, and educational expenses with $NCI Token.</p>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4 flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 mb-2">
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4b8.png" alt="Savings" className="w-8 h-8" />
            </span>
            <h3 className="font-bold text-blue-700 mb-1">Savings & Rewards</h3>
            <p className="text-gray-600 text-center">Save for the future and earn rewards for educational achievements.</p>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4 flex flex-col items-center">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-200 mb-2">
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f310.png" alt="Global" className="w-8 h-8" />
            </span>
            <h3 className="font-bold text-yellow-700 mb-1">Global & Instant</h3>
            <p className="text-gray-600 text-center">Send and receive $NCI Token instantly, anywhere in the world.</p>
          </div>
        </div>
        {/* How to Buy Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2 text-center justify-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-100">
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4b5.png" alt="Buy" className="w-7 h-7" />
            </span>
            How to Buy $NCI Token
          </h2>
          <div className="text-gray-700 space-y-4 mb-4">
            <p>
              <b>Currently, you can only buy $NCI Token directly from the admin at the National College of Ireland (NCI).</b>
            </p>
            <p>
              Before you can receive $NCI Token, make sure you have a Stellar wallet set up. We recommend using <span className="font-semibold">Freighter</span> or <span className="font-semibold">Albedo</span>.
            </p>
            <p>
              <a href="/get-wallet" className="text-blue-600 underline font-semibold">Click here to set up your wallet</a> if you haven't already.
            </p>
            <p>
              <span className="font-semibold">Total $NCI Tokens created:</span> 378,121,440
              <br/>
              These tokens are used by the institution to mint certificates and for EduSave educational savings.
            </p>
          </div>
        </div>
        {/* Token Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2 text-center justify-center">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-100">
              <img src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f4c8.png" alt="Token Details" className="w-7 h-7" />
            </span>
            $NCI Token Details
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li><span className="font-semibold">Asset Code:</span> NCI</li>
            <li><span className="font-semibold">Issuer:</span> GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT</li>
            <li><span className="font-semibold">Stellar Expert:</span> <a href="https://stellar.expert/explorer/public/asset/NCI-GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">View on Stellar Expert</a></li>
          </ul>
        </div>
        <div className="text-center text-gray-500 text-sm mt-8">
          Always double-check the asset code and issuer before buying tokens. Only trust official sources.
        </div>
      </div>
    </div>
  );
};

export default BuyNCIToken; 