// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: 'Verify Certificates',
    description: 'Instantly verify the authenticity of academic certificates using blockchain technology.',
    icon: '🔍',
    link: '/verify'
  },
  {
    title: 'Issue Certificates',
    description: 'Securely issue and manage academic certificates with our blockchain-based platform.',
    icon: '📜',
    link: '/admin'
  },
  {
    title: 'Connect Wallet',
    description: 'Connect your wallet to manage and verify certificates on the blockchain.',
    icon: '👛',
    link: '/connect'
  }
];

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Secure Academic Certificates with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Blockchain
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              VeriCert provides a secure, transparent, and tamper-proof way to issue and verify academic certificates using blockchain technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/verify"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full 
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Verify Certificate
              </Link>
              <Link
                to="/connect"
                className="px-8 py-3 bg-white text-gray-900 rounded-full border border-gray-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Connect Wallet
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200
                         transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the future of academic certification verification.
          </p>
          <Link
            to="/connect"
            className="inline-block px-8 py-3 bg-white text-blue-600 rounded-full 
                     shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Connect Your Wallet
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
  