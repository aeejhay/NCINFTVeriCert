//Admin Page

import React, { useState } from 'react';
import { Networks, TransactionBuilder, Operation, Asset, Keypair, Horizon, Memo } from '@stellar/stellar-sdk';
import { API_ENDPOINTS } from '../config/api';
import { toast } from 'react-hot-toast';

function AdminForm() {
  const [form, setForm] = useState({
    certificateId: '',
    studentName: '',
    degree: '',
    grade: '',
    qqiLevel: '',
    dateIssued: '',
    signedBy: '',
    institution: '',
  });

  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState('');
  const [successDetails, setSuccessDetails] = useState<{
    txHash: string;
    certificate: any;
  } | null>(null);

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field as user types
    setValidationErrors(errors => ({ ...errors, [e.target.name]: '' }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value || value.trim() === '') {
        errors[key] = 'This field is required.';
      } else if (key === 'dateIssued') {
        // Optionally, check for valid date
        if (isNaN(Date.parse(value))) {
          errors[key] = 'Please enter a valid date.';
        }
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const mintCertificate = async (memoHashHex: string) => {
    try {
      setIsMinting(true);
      setMintStatus('Initializing transaction...');

      // Initialize Stellar server
      const server = new Horizon.Server('https://horizon.stellar.org');
      setMintStatus('Creating NCI asset...');

      // Create NCI asset
      const nciAsset = new Asset(
        import.meta.env.VITE_NCI_ASSET_CODE || 'NCI',
        import.meta.env.VITE_NCI_ISSUER || 'GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT'
      );

      // Get the source account
      setMintStatus('Loading issuer account...');
      const sourceAccount = await server.loadAccount(import.meta.env.VITE_STELLAR_ISSUER_PUBLIC || '');

      // Create transaction
      setMintStatus('Building transaction...');
      const transaction = new TransactionBuilder(sourceAccount, {
        fee: "100",  // Standard fee in stroops (0.00001 XLM)
        networkPassphrase: Networks.PUBLIC
      })
        .addOperation(Operation.payment({
          destination: import.meta.env.VITE_CERTIFICATE_ACCOUNT || 'GB76DYPGHPARWGWA7DSLXJQ652RXCAQTSQGTSBUFHT2EGKF7VBKFVMAC',
          asset: nciAsset,
          amount: "1"
        }))
        .addMemo(Memo.hash(memoHashHex))
        .setTimeout(30)
        .build();

      // Sign the transaction
      setMintStatus('Signing transaction...');
      const issuerSecret = import.meta.env.VITE_STELLAR_ISSUER_SECRET;
      if (!issuerSecret) {
        throw new Error('Issuer secret not found in environment variables');
      }
      const issuerKeypair = Keypair.fromSecret(issuerSecret);
      transaction.sign(issuerKeypair);

      // Submit the transaction
      setMintStatus('Submitting transaction...');
      const result = await server.submitTransaction(transaction);
      const txHash = result.hash;
      setMintStatus('Transaction successful!');

      return txHash;
    } catch (error: any) {
      console.error('Minting error:', error);
      if (error.response) {
        throw new Error(`Stellar error: ${error.response.extras?.result_codes?.operations?.join(', ')}`);
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    try {
      setIsMinting(true);
      setMintStatus('Validating form...');

      // Create certificate data
      const certificateData = {
        certificateId: form.certificateId,
        studentName: form.studentName,
        degree: form.degree,
        grade: form.grade,
        qqiLevel: form.qqiLevel,
        dateIssued: form.dateIssued,
        signedBy: form.signedBy,
        institution: form.institution,
      };

      // Create hash for memo
      const certificateString = JSON.stringify(certificateData);
      const encoder = new TextEncoder();
      const data = encoder.encode(certificateString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const memoHashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      setMintStatus('Minting certificate on blockchain...');
      const txHash = await mintCertificate(memoHashHex);

      // Save to database
      setMintStatus('Saving to database...');
      const response = await fetch(API_ENDPOINTS.CERTIFICATES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...certificateData,
          transactionId: txHash,
          memoHashHex: memoHashHex
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to save certificate: ${response.statusText}`);
      }

      const savedCertificate = await response.json();

      setSuccessDetails({
        txHash: txHash,
        certificate: savedCertificate
      });

      // Reset form
      setForm({
        certificateId: '',
        studentName: '',
        degree: '',
        grade: '',
        qqiLevel: '',
        dateIssued: '',
        signedBy: '',
        institution: '',
      });

      toast.success('Certificate minted successfully!');
      setMintStatus('');

    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`Error: ${error.message}`);
      setMintStatus('');
    } finally {
      setIsMinting(false);
    }
  };

  if (isMinting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{mintStatus}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Mint Certificate</h2>
          <p className="text-gray-600">
            Create and mint a new academic certificate on the blockchain.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-2">
                Certificate ID *
              </label>
              <input
                type="text"
                id="certificateId"
                name="certificateId"
                value={form.certificateId}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.certificateId ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter certificate ID"
              />
              {validationErrors.certificateId && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.certificateId}</p>
              )}
            </div>

            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                Student Name *
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.studentName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter student name"
              />
              {validationErrors.studentName && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.studentName}</p>
              )}
            </div>

            <div>
              <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                Degree *
              </label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={form.degree}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.degree ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter degree"
              />
              {validationErrors.degree && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.degree}</p>
              )}
            </div>

            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                Grade *
              </label>
              <input
                type="text"
                id="grade"
                name="grade"
                value={form.grade}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.grade ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter grade"
              />
              {validationErrors.grade && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.grade}</p>
              )}
            </div>

            <div>
              <label htmlFor="qqiLevel" className="block text-sm font-medium text-gray-700 mb-2">
                QQI Level *
              </label>
              <input
                type="text"
                id="qqiLevel"
                name="qqiLevel"
                value={form.qqiLevel}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.qqiLevel ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter QQI level"
              />
              {validationErrors.qqiLevel && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.qqiLevel}</p>
              )}
            </div>

            <div>
              <label htmlFor="dateIssued" className="block text-sm font-medium text-gray-700 mb-2">
                Date Issued *
              </label>
              <input
                type="date"
                id="dateIssued"
                name="dateIssued"
                value={form.dateIssued}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.dateIssued ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {validationErrors.dateIssued && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.dateIssued}</p>
              )}
            </div>

            <div>
              <label htmlFor="signedBy" className="block text-sm font-medium text-gray-700 mb-2">
                Signed By *
              </label>
              <input
                type="text"
                id="signedBy"
                name="signedBy"
                value={form.signedBy}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.signedBy ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter signer name"
              />
              {validationErrors.signedBy && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.signedBy}</p>
              )}
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                Institution *
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={form.institution}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.institution ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter institution name"
              />
              {validationErrors.institution && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.institution}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isMinting}
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isMinting ? 'Minting...' : 'Mint Certificate'}
            </button>
          </div>
        </form>

        {successDetails && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Certificate Minted Successfully!</h3>
            <div className="space-y-4">
              <div>
                <span className="font-medium text-green-700">Transaction Hash:</span>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 bg-white p-2 rounded border text-sm break-all">
                    {successDetails.txHash}
                  </code>
                  <button
                    onClick={() => copyToClipboard(successDetails.txHash)}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-green-700">Student:</span> {successDetails.certificate.studentName}
                </div>
                <div>
                  <span className="font-medium text-green-700">Certificate ID:</span> {successDetails.certificate.certificateId}
                </div>
                <div>
                  <span className="font-medium text-green-700">Degree:</span> {successDetails.certificate.degree}
                </div>
                <div>
                  <span className="font-medium text-green-700">Date Issued:</span> {successDetails.certificate.dateIssued}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const AdminPage: React.FC = () => {
  return <AdminForm />;
};

export default AdminPage; 