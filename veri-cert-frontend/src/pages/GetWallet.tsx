/*
Student note:
This guide shows how to install a wallet step by step.
I wrote it like a quick checklist for new users.
*/
import React from 'react';

const GetWallet: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center drop-shadow-sm">
          Get a Wallet
        </h1>
        <p className="text-xl text-blue-700 font-semibold text-center mb-12">
          Choose a Stellar wallet to get started with $NCI EduSave
        </p>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
          {/* Freighter Wallet Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:shadow-2xl transition-shadow duration-300 w-full md:w-1/2 group">
            <div className="bg-blue-100 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
              <img src="https://framerusercontent.com/images/VuLWkTUpy2vLTvyd40SiOO92QI.png" alt="Freighter Logo" className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-700 tracking-tight">Freighter Wallet</h2>
            <p className="text-gray-700 mb-4 text-center">Freighter is a browser extension wallet for Stellar. It's secure, easy to use, and recommended for most users.</p>
            <ol className="list-decimal list-inside text-left text-gray-600 space-y-2 mb-4">
              <li>Go to the <a href="https://freighter.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">official Freighter website</a>.</li>
              <li>Click <b>Download</b> and choose your browser (Chrome, Firefox, Edge, Brave).</li>
              <li>Install the extension and pin it to your browser toolbar.</li>
              <li>Open Freighter and click <b>Create a new wallet</b>.</li>
              <li>Follow the prompts to set a strong password and back up your recovery phrase securely.</li>
              <li>Once set up, you can view your Stellar address and use it to receive $NCI tokens.</li>
            </ol>
            <a href="https://freighter.app" target="_blank" rel="noopener noreferrer" className="mt-auto px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl text-lg flex items-center gap-2">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-8 8a1 1 0 01-.293.207l-4 2a1 1 0 01-1.316-1.316l2-4a1 1 0 01.207-.293l8-8zM5.414 16H4v-1.414l7.293-7.293 1.414 1.414L5.414 16z"></path></svg>
              Go to Freighter
            </a>
          </div>
          {/* Albedo Wallet Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-indigo-100 hover:shadow-2xl transition-shadow duration-300 w-full md:w-1/2 group">
            <div className="bg-indigo-100 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
              <img src="https://albedo.link/favicon.ico" alt="Albedo Logo" className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-indigo-700 tracking-tight">Albedo Wallet</h2>
            <p className="text-gray-700 mb-4 text-center">Albedo is a web-based wallet for Stellar. It allows you to sign in with your browser and manage your Stellar assets easily.</p>
            <ol className="list-decimal list-inside text-left text-gray-600 space-y-2 mb-4">
              <li>Go to the <a href="https://albedo.link" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline font-semibold">official Albedo website</a>.</li>
              <li>Click <b>Sign in with Albedo</b> to create or access your wallet.</li>
              <li>Follow the instructions to back up your credentials securely.</li>
              <li>Once signed in, you can view your Stellar address and manage your assets.</li>
            </ol>
            <a href="https://albedo.link" target="_blank" rel="noopener noreferrer" className="mt-auto px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl text-lg flex items-center gap-2">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-8 8a1 1 0 01-.293.207l-4 2a1 1 0 01-1.316-1.316l2-4a1 1 0 01.207-.293l8-8zM5.414 16H4v-1.414l7.293-7.293 1.414 1.414L5.414 16z"></path></svg>
              Go to Albedo
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <div className="flex items-center gap-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-xl px-6 py-4 animate-pulse shadow-lg">
          <svg className="w-8 h-8 text-yellow-500 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
          </svg>
          <span className="text-lg font-semibold text-yellow-800">
            In the world of cryptocurrency, <span className="underline">never share your secret recovery phrase or private key with anyone</span>.<br/>
            Just like your innermost thoughts, your wallet secrets are for you alone—protect them at all costs.
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetWallet; 