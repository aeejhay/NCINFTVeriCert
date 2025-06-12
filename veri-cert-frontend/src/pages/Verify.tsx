import React, { useState } from 'react';
import { Networks, Horizon, Memo, xdr } from '@stellar/stellar-sdk';

interface VerificationResult {
  isValid: boolean;
  transactionHash?: string;
  certificateData?: {
    certificateId: string;
    studentName: string;
    degree: string;
    grade: string;
    qqiLevel: string;
    dateIssued: string;
    signedBy: string;
    institution: string;
    memoHashHex: string;
  };
}

const Verify: React.FC = () => {
  const [transactionId, setTransactionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Initialize Stellar server
      const server = new Horizon.Server('https://horizon.stellar.org');

      // Fetch transaction details from Stellar
      const transaction = await server.transactions().transaction(transactionId).call();
      
      if (!transaction.successful) {
        setError('Transaction was not successful on the Stellar network');
        return;
      }

      // Extract memo hash from transaction
      let memoHash = '';
      if (transaction.memo_type === 'hash' && transaction.memo) {
        try {
          // Convert base64 memo to hex using browser-compatible approach
          const base64 = transaction.memo;
          const binaryString = atob(base64);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          memoHash = Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
          console.log('Converted memo hash:', memoHash);
        } catch (err) {
          console.error('Error converting memo hash:', err);
          setError('Error processing transaction memo hash');
          return;
        }
      } else {
        setError('Transaction does not contain a hash memo');
        return;
      }

      // Verify certificate in our database
      console.log('Verifying certificate with memo hash:', memoHash);
      const response = await fetch(`http://localhost:8080/api/certificates/verify/${memoHash}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Verification response error:', {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        
        if (response.status === 404) {
          setError('Certificate not found in database');
        } else {
          setError(`Error verifying certificate: ${errorText}`);
        }
        return;
      }

      const certificateData = await response.json();
      
      setResult({
        isValid: true,
        transactionHash: transactionId,
        certificateData
      });

    } catch (err) {
      console.error('Verification error:', err);
      setError('Failed to verify transaction. Please check the transaction ID and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Verify Certificate</h1>
        
        <form onSubmit={handleVerify} className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Transaction ID
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
                placeholder="Enter Stellar transaction ID"
                required
              />
              {transactionId && (
                <a
                  href={`https://stellar.expert/explorer/public/tx/${transactionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View in Explorer
                </a>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? 'Verifying...' : 'Verify Certificate'}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {result && result.isValid && result.certificateData && (
          <div className="mt-8 bg-white p-6 rounded shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Certificate Details</h2>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Valid Certificate
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Student Information</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-gray-600">Certificate ID</dt>
                    <dd>{result.certificateData.certificateId}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Student Name</dt>
                    <dd>{result.certificateData.studentName}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Degree</dt>
                    <dd>{result.certificateData.degree}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Grade</dt>
                    <dd>{result.certificateData.grade}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Certificate Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-gray-600">QQI Level</dt>
                    <dd>{result.certificateData.qqiLevel}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Date Issued</dt>
                    <dd>{result.certificateData.dateIssued}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Signed By</dt>
                    <dd>{result.certificateData.signedBy}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-600">Institution</dt>
                    <dd>{result.certificateData.institution}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <h3 className="font-semibold mb-2">Verification Details</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-gray-600">Transaction Hash</dt>
                  <dd className="font-mono text-sm break-all">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-center">{result.transactionHash}</span>
                      <a
                        href={`https://stellar.expert/explorer/public/tx/${result.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-600">Memo Hash</dt>
                  <dd className="font-mono text-sm break-all text-center">{result.certificateData.memoHashHex}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify; 