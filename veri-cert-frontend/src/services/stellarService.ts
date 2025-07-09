// Stellar Service all connections to the Ledger and Token Details
import { Networks, TransactionBuilder, Operation, Asset, Keypair, Horizon, Memo } from '@stellar/stellar-sdk';

// Initialize Stellar server (using mainnet)
const server = new Horizon.Server('https://horizon.stellar.org');

// Network configuration (mainnet)
const networkPassphrase = Networks.PUBLIC;

// Token configuration
const TOKEN_CONFIG = {
  code: 'NCI',
  issuer: 'GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT',
  maxSupply: '3781214400'
};

export interface CertificateData {
  studentName: string;
  certificateId: string;
  issueDate: string;
  issuer: string;
  metadata: {
    course: string;
    grade: string;
    [key: string]: any;
  };
}

interface Balance {
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
  balance: string;
}

class StellarService {
  // Get NCI token balance for an account
  async getNCIBalance(publicKey: string): Promise<string> {
    try {
      const account = await server.loadAccount(publicKey);
      const nciBalance = account.balances.find(
        (b: Balance) => 
          b.asset_code === TOKEN_CONFIG.code && 
          b.asset_issuer === TOKEN_CONFIG.issuer
      );
      return nciBalance ? nciBalance.balance : '0';
    } catch (error) {
      console.error('Error getting NCI balance:', error);
      return '0';
    }
  }

  // Issue a certificate as a Stellar asset
  async issueCertificate(
    issuerSecretKey: string,
    studentPublicKey: string,
    certificateData: CertificateData
  ): Promise<string> {
    try {
      const issuerKeypair = Keypair.fromSecret(issuerSecretKey);
      const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());

      // Create a unique asset code for the certificate
      const assetCode = `CERT-${certificateData.certificateId}`;
      const asset = new Asset(assetCode, issuerKeypair.publicKey());

      // Convert certificate data to base64 for memo
      const certificateDataBase64 = Buffer.from(JSON.stringify(certificateData)).toString('base64');
      
      // Create the transaction with memo
      const transaction = new TransactionBuilder(issuerAccount, {
        fee: '100',
        networkPassphrase,
      })
        .addOperation(
          Operation.payment({
            destination: studentPublicKey,
            asset: asset,
            amount: '1', // One certificate
          })
        )
        .addMemo(Memo.text(certificateDataBase64))
        .setTimeout(30)
        .build();

      // Sign and submit the transaction
      transaction.sign(issuerKeypair);
      const result = await server.submitTransaction(transaction);

      return result.hash;
    } catch (error) {
      console.error('Error issuing certificate:', error);
      throw error;
    }
  }

  // Verify a certificate by transaction hash
  async verifyCertificateByTransaction(transactionHash: string): Promise<{
    isValid: boolean;
    transactionHash?: string;
    certificateData?: CertificateData;
  }> {
    try {
      // Fetch transaction details
      const transaction = await server.transactions().transaction(transactionHash).call();
      
      // Check if transaction was successful
      if (transaction.successful !== true) {
        return { isValid: false };
      }

      // Extract certificate data from transaction memo
      let certificateData: CertificateData | undefined;
      try {
        if (transaction.memo && transaction.memo_type === 'text') {
          // Decode base64 memo data
          const decodedData = Buffer.from(transaction.memo, 'base64').toString();
          certificateData = JSON.parse(decodedData);
        }
      } catch (e) {
        console.error('Error parsing certificate data:', e);
      }

      return {
        isValid: true,
        transactionHash,
        certificateData
      };
    } catch (error) {
      console.error('Error verifying certificate:', error);
      return { isValid: false };
    }
  }

  // Verify a certificate by certificate ID and student public key
  async verifyCertificate(
    certificateId: string,
    issuerPublicKey: string,
    studentPublicKey: string
  ): Promise<boolean> {
    try {
      const assetCode = `CERT-${certificateId}`;
      const asset = new Asset(assetCode, issuerPublicKey);

      // Check if the student holds the certificate
      const account = await server.loadAccount(studentPublicKey);
      const balance = account.balances.find(
        (b: Balance) => b.asset_code === assetCode && b.asset_issuer === issuerPublicKey
      );

      return balance !== undefined && parseFloat(balance.balance) > 0;
    } catch (error) {
      console.error('Error verifying certificate:', error);
      return false;
    }
  }

  // Get account details including NCI balance
  async getAccountDetails(publicKey: string) {
    try {
      const account = await server.loadAccount(publicKey);
      const nciBalance = await this.getNCIBalance(publicKey);
      
      return {
        balances: account.balances,
        sequence: account.sequence,
        thresholds: account.thresholds,
        nciBalance,
      };
    } catch (error) {
      console.error('Error getting account details:', error);
      throw error;
    }
  }

  // Get token information
  getTokenInfo() {
    return {
      ...TOKEN_CONFIG,
      network: 'mainnet',
    };
  }
}

export const stellarService = new StellarService(); 