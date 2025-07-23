import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

interface MintedCertificate {
  certificateId: string;
  studentName: string;
  degree: string;
  grade: string;
  qqiLevel: string;
  dateIssued: string;
  signedBy: string;
  institution: string;
  memoHashHex: string;      // backend field
  transactionId: string;    // backend field
}

const MintedCertificates: React.FC = () => {
  const [certificates, setCertificates] = useState<MintedCertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMintedCertificates = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch certificates from MongoDB
        const response = await axios.get(API_ENDPOINTS.CERTIFICATES);
        console.log('Fetched certificates from MongoDB:', response.data);
        setCertificates(response.data);
      } catch (err) {
        console.error('Error fetching minted certificates:', err);
        setError('Failed to fetch minted certificates. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMintedCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Recently Minted Certificates</h1>

        {isLoading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Loading minted certificates...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded">
            {error}
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center text-gray-600">
            No minted certificates found.
          </div>
        ) : (
          <div className="grid gap-8">
            {certificates.map((cert) => (
              <div key={cert.certificateId} className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {cert.studentName}
                  </h3>
                  <p className="text-lg text-gray-600">
                    {cert.degree}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {cert.institution}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Certificate ID</dt>
                      <dd className="mt-1 text-gray-900">{cert.certificateId}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Grade</dt>
                      <dd className="mt-1 text-gray-900">{cert.grade}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">QQI Level</dt>
                      <dd className="mt-1 text-gray-900">{cert.qqiLevel}</dd>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Date Issued</dt>
                      <dd className="mt-1 text-gray-900">{cert.dateIssued}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Signed By</dt>
                      <dd className="mt-1 text-gray-900">{cert.signedBy}</dd>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Memo Hash</dt>
                    <code className="block text-sm font-mono bg-gray-100 p-3 rounded overflow-x-auto">
                      {cert.memoHashHex}
                    </code>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 mb-2">Transaction ID</dt>
                    <div className="flex items-center gap-2">
                      <code className="block text-sm font-mono bg-gray-100 p-3 rounded flex-1 overflow-x-auto">
                        {cert.transactionId}
                      </code>
                      <a
                        href={`https://stellar.expert/explorer/public/tx/${cert.transactionId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="View on Stellar Expert"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MintedCertificates; 