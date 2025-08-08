/*
Student note:
This page sends NCI tokens and saves the result.
I added clear errors to help when something goes wrong.
*/
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Networks, TransactionBuilder, Operation, Asset, Memo, Keypair, Horizon } from 'stellar-sdk';
import { API_ENDPOINTS } from '../config/api';

interface TokenTransaction {
  recipientAddress: string;
  memo: string;
  amount: string;
  txHash: string;
  timestamp: Date;
}

const SendTokenPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    recipientAddress: '',
    memo: '',
    amount: ''
  });

  const [successDetails, setSuccessDetails] = useState<{
    txHash: string;
    recipientAddress: string;
    amount: string;
    memo: string;
    timestamp: Date;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Initialize Stellar server
      const server = new Horizon.Server('https://horizon.stellar.org');
      const issuerSecret = import.meta.env.VITE_STELLAR_ISSUER_SECRET;

      if (!issuerSecret) {
        throw new Error('Issuer secret not found in environment variables');
      }

      console.log('Creating keypair from secret...');
      // Create Stellar keypair from issuer secret
      const issuerKeypair = Keypair.fromSecret(issuerSecret);
      const issuerPublicKey = issuerKeypair.publicKey();
      console.log('Issuer public key:', issuerPublicKey);

      // Create NCI asset using environment variables
      const nciAsset = new Asset(
        import.meta.env.VITE_NCI_ASSET_CODE || 'NCI',
        import.meta.env.VITE_NCI_ISSUER || 'GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT'
      );
      console.log('Created NCI asset with issuer:', import.meta.env.VITE_NCI_ISSUER);

      console.log('Loading issuer account...');
      // Get issuer account
      const issuerAccount = await server.loadAccount(issuerPublicKey);
      console.log('Issuer account loaded, sequence:', issuerAccount.sequence);

      // Check if recipient account exists
      console.log('Checking recipient account...');
      try {
        await server.loadAccount(formData.recipientAddress);
      } catch (error) {
        throw new Error('Recipient account does not exist on the Stellar network');
      }

      // Check if recipient has trustline for NCI asset
      console.log('Checking recipient trustline...');
      const recipientAccount = await server.loadAccount(formData.recipientAddress);
      console.log('Recipient balances:', recipientAccount.balances);
      
      const hasTrustline = recipientAccount.balances.some(
        (balance: any) => {
          console.log('Checking balance:', balance);
          const isNCI = balance.asset_code === import.meta.env.VITE_NCI_ASSET_CODE && 
                       balance.asset_issuer === import.meta.env.VITE_NCI_ISSUER;
          console.log('Is NCI balance:', isNCI, {
            asset_code: balance.asset_code,
            asset_issuer: balance.asset_issuer,
            expected_issuer: import.meta.env.VITE_NCI_ISSUER
          });
          return isNCI;
        }
      );

      console.log('Has trustline:', hasTrustline);
      console.log('NCI Issuer:', import.meta.env.VITE_NCI_ISSUER);

      if (!hasTrustline) {
        throw new Error('Recipient account has not established a trustline for NCI token. Please ensure the trustline is established with the correct issuer: ' + import.meta.env.VITE_NCI_ISSUER);
      }

      console.log('Building transaction...');
      // Create transaction
      const transaction = new TransactionBuilder(issuerAccount, {
        fee: '100',
        networkPassphrase: Networks.PUBLIC
      })
        .addOperation(
          Operation.payment({
            destination: formData.recipientAddress,
            asset: nciAsset,
            amount: formData.amount
          })
        )
        .addMemo(Memo.text(formData.memo))
        .setTimeout(30)
        .build();

      console.log('Signing transaction...');
      // Sign transaction
      transaction.sign(issuerKeypair);

      console.log('Submitting transaction...');
      // Submit transaction
      const result = await server.submitTransaction(transaction);
      const txHash = result.hash;
      console.log('Transaction successful, hash:', txHash);

      // Save transaction to MongoDB
      const transactionData: TokenTransaction = {
        recipientAddress: formData.recipientAddress,
        memo: formData.memo,
        amount: formData.amount,
        txHash,
        timestamp: new Date()
      };

      console.log('Saving transaction to MongoDB...');
      try {
        await axios.post(API_ENDPOINTS.NCI_TOKEN, transactionData);
        console.log('Transaction saved to MongoDB');

        // Set success details
        setSuccessDetails({
          txHash,
          recipientAddress: formData.recipientAddress,
          amount: formData.amount,
          memo: formData.memo,
          timestamp: new Date()
        });

        // Show success message
        toast.success(`Token sent successfully! Transaction Hash: ${txHash}`);

        // Reset form
        setFormData({
          recipientAddress: '',
          memo: '',
          amount: ''
        });
      } catch (error: any) {
        console.error('Error saving to MongoDB:', error);
        if (error.code === 'ERR_NETWORK') {
          toast.error('Could not connect to the backend server. Please make sure the Spring Boot application is running on port 8080.');
        } else if (error.response) {
          toast.error(`Error saving transaction: ${error.response.data.message || 'Unknown error'}`);
        } else {
          toast.error('Error saving transaction to database. The token was sent successfully on Stellar.');
        }
      }

    } catch (error: any) {
      console.error('Detailed error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast.error(`Error: ${error.response.data.message || 'Failed to send token'}`);
      } else if (error.message) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Failed to send token. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Send NCI Token</h2>
          <p className="text-gray-600">
            Send NCI tokens to a recipient's Stellar address.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Stellar Address
            </label>
            <input
              type="text"
              id="recipientAddress"
              name="recipientAddress"
              value={formData.recipientAddress}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              placeholder="G..."
            />
          </div>

          <div>
            <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-2">
              Memo Text
            </label>
            <input
              type="text"
              id="memo"
              name="memo"
              value={formData.memo}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              placeholder="Enter memo text"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Token Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
              min="0"
              step="0.0000001"
              className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
              placeholder="Enter amount"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {isLoading ? 'Sending...' : 'Send Token'}
            </button>
          </div>
        </form>

        {successDetails && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8 transform transition-all duration-500 ease-in-out">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">Token Sent Successfully</h3>
              <p className="text-gray-600 mt-2">Transaction completed at {successDetails.timestamp.toLocaleString()}</p>
            </div>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Hash</h4>
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                <code className="flex-1 font-mono text-sm text-gray-800 break-all">
                  {successDetails.txHash}
                </code>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(successDetails.txHash)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </button>
                  <a
                    href={`https://stellar.expert/explorer/public/tx/${successDetails.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    View on Explorer
                  </a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Recipient Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 break-all">{successDetails.recipientAddress}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Amount</dt>
                    <dd className="mt-1 text-sm text-gray-900">{successDetails.amount} NCI</dd>
                  </div>
                </dl>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Memo</dt>
                    <dd className="mt-1 text-sm text-gray-900">{successDetails.memo}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Timestamp</dt>
                    <dd className="mt-1 text-sm text-gray-900">{successDetails.timestamp.toLocaleString()}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendTokenPage; 