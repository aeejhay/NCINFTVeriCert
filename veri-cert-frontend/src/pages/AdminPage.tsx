//Admin Page

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Networks, TransactionBuilder, Operation, Asset, Keypair, Horizon, Memo } from '@stellar/stellar-sdk';
import { API_ENDPOINTS } from '../config/api';

function AdminForm() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem('isAdminAuthenticated');
    if (!auth) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

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
    alert('Copied to clipboard!');
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
        .setTimeout(0)
        .build();

      // Sign transaction
      setMintStatus('Signing transaction...');
      const keypair = Keypair.fromSecret(import.meta.env.VITE_STELLAR_ISSUER_SECRET || '');
      transaction.sign(keypair);

      // Submit transaction
      setMintStatus('Submitting transaction...');
      const result = await server.submitTransaction(transaction);
      setMintStatus('Certificate minted successfully!');
      console.log('Transaction successful:', result.hash);
      return result.hash;
    } catch (error) {
      console.error('Transaction failed:', error);
      setMintStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      throw error;
    } finally {
      setIsMinting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Optionally scroll to first error
      const firstErrorField = Object.keys(validationErrors)[0];
      if (firstErrorField) {
        const el = document.getElementsByName(firstErrorField)[0];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    try {
      const certJson = { ...form };
      // Hash the JSON (SHA-256, hex)
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(certJson));
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      console.log('Certificate JSON:', certJson);
      console.log('Certificate Hash (hex):', hash);

      // Mint the certificate on Stellar
      const txHash = await mintCertificate(hash);

      // Send certificate data to backend
      try {
        console.log('Sending certificate data to backend...');
        const response = await fetch(API_ENDPOINTS.CERTIFICATES, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            certificateId: certJson.certificateId,
            studentName: certJson.studentName,
            degree: certJson.degree,
            grade: certJson.grade,
            qqiLevel: certJson.qqiLevel,
            dateIssued: new Date(certJson.dateIssued).toISOString().split('T')[0],
            signedBy: certJson.signedBy,
            institution: certJson.institution,
            memoHashHex: hash,
            transactionId: txHash
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Backend response:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          throw new Error(`Failed to store certificate in database: ${errorText}`);
        }

        const savedCertificate = await response.json();
        console.log('Certificate stored:', savedCertificate);
        setMintStatus('Certificate minted and stored successfully!');
        setSuccessDetails({
          txHash,
          certificate: savedCertificate
        });
      } catch (error) {
        console.error('Backend error details:', error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          setMintStatus('Error: Cannot connect to backend server. Please make sure the Spring Boot application is running on port 8080.');
        } else {
          setMintStatus('Error storing in database: ' + (error instanceof Error ? error.message : 'Unknown error'));
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMintStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-semibold text-gray-900 mb-8">Start Minting Certificate to Stellar</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow mt-8" noValidate>
        <h2 className="text-xl font-bold mb-4">Admin: Issue Certificate</h2>
        {Object.entries(form).map(([key, value]) => (
          <div className="mb-4" key={key}>
            <label className="block mb-1 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={key === 'dateIssued' ? 'date' : 'text'}
              name={key}
              className={`w-full border rounded px-3 py-2 text-white bg-gray-700 placeholder-gray-400 ${validationErrors[key] ? 'border-red-500' : ''}`}
              value={value}
              onChange={handleChange}
              required
            />
            {validationErrors[key] && (
              <div className="text-red-500 text-sm mt-1">{validationErrors[key]}</div>
            )}
          </div>
        ))}
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          disabled={
            isMinting ||
            Object.values(form).some(v => !v) ||
            Object.values(validationErrors).some(error => error)
          }
        >
          {isMinting ? 'Minting...' : 'Submit'}
        </button>
        {mintStatus && (
          <div className={`mt-4 p-2 rounded ${mintStatus.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
            {mintStatus}
          </div>
        )}
      </form>

      {successDetails && (
        <div className="mt-8 bg-white p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">Certificate Issued Successfully</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Transaction Details</h4>
            <div className="flex items-center gap-2">
              <code className="bg-gray-100 p-2 rounded flex-1 overflow-x-auto">
                {successDetails.txHash}
              </code>
              <button
                onClick={() => copyToClipboard(successDetails.txHash)}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Certificate Details</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-gray-600">Certificate ID</dt>
                  <dd>{successDetails.certificate.certificateId}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Student Name</dt>
                  <dd>{successDetails.certificate.studentName}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Degree</dt>
                  <dd>{successDetails.certificate.degree}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Grade</dt>
                  <dd>{successDetails.certificate.grade}</dd>
                </div>
              </dl>
            </div>
            <div>
              <h4 className="font-semibold mb-2">&nbsp;</h4>
              <dl className="space-y-2">
                <div>
                  <dt className="text-gray-600">QQI Level</dt>
                  <dd>{successDetails.certificate.qqiLevel}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Date Issued</dt>
                  <dd>{successDetails.certificate.dateIssued}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Signed By</dt>
                  <dd>{successDetails.certificate.signedBy}</dd>
                </div>
                <div>
                  <dt className="text-gray-600">Institution</dt>
                  <dd>{successDetails.certificate.institution}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <AdminForm />
    </div>
  );
};

export default AdminPage; 