// Connect Account or Connect Wallet

import React, { useState } from 'react';
import { stellarService } from '../services/stellarService';

const ConnectAccount: React.FC = () => {
  const [publicKey, setPublicKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [accountDetails, setAccountDetails] = useState<any>(null);

  const validatePublicKey = (key: string): boolean => {
    // Basic Stellar public key validation (G...)
    return /^G[A-Z0-9]{55}$/.test(key);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!validatePublicKey(publicKey)) {
        throw new Error('Invalid Stellar public key format');
      }

      const details = await stellarService.getAccountDetails(publicKey);
      setAccountDetails(details);
      
      // Store only the public key in localStorage
      localStorage.setItem('stellarPublicKey', publicKey);
    } catch (err: any) {
      setError(err.message || 'Failed to connect account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="text-center mb-4">
            <h2 className="display-4">Connect Your Account</h2>
            <p className="lead text-muted">
              Enter your Stellar public key to view your account details
            </p>
          </div>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="publicKey" className="form-label">
                    Public Key
                  </label>
                  <input
                    id="publicKey"
                    name="publicKey"
                    type="text"
                    required
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                    className="form-control"
                    placeholder="G..."
                  />
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-100"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Connecting...
                    </>
                  ) : (
                    'Connect Account'
                  )}
                </button>
              </form>

              {accountDetails && (
                <div className="mt-4 pt-4 border-top">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="h4 mb-0">Account Details</h3>
                    <a 
                      href={`https://stellar.expert/explorer/public/account/${publicKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-box-arrow-up-right me-1"></i>
                      View on Stellar Expert
                    </a>
                  </div>
                  <div className="list-group">
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">NCI Balance</span>
                        <span className="fw-bold">{accountDetails.nciBalance} NCI</span>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Account Sequence</span>
                        <span className="fw-bold">{accountDetails.sequence}</span>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Other Balances</span>
                        <div className="text-end">
                          {accountDetails.balances.map((balance: any, index: number) => (
                            <div key={index} className="small">
                              {balance.asset_type === 'native' 
                                ? 'XLM' 
                                : `${balance.balance} ${balance.asset_code}`}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectAccount; 