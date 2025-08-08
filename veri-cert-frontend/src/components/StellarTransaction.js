/*
Student note:
This component was my early test for sending a Stellar payment.
It’s kept around as a simple example for learning.
*/
import React, { useState, useEffect } from 'react';
import { Networks, TransactionBuilder, Operation, Asset, Keypair, Horizon, Memo } from '@stellar/stellar-sdk';

const StellarTransaction = ({ memoHash }) => {
    const [server, setServer] = useState(null);
    const [certificateAccount, setCertificateAccount] = useState('');
    const [nciAssetCode, setNciAssetCode] = useState('');
    const [nciIssuer, setNciIssuer] = useState('');

    useEffect(() => {
        // Initialize Stellar server
        setServer(new Horizon.Server('https://horizon.stellar.org'));

        // Fetch configuration from backend
        fetch('/api/stellar/config')
            .then(response => response.json())
            .then(data => {
                setCertificateAccount(data.certificateAccount);
                setNciAssetCode(data.nciAssetCode);
                setNciIssuer(data.nciIssuer);
            });
    }, []);

    const sendTransaction = async () => {
        try {
            // Create NCI asset
            const nciAsset = new Asset(nciAssetCode, nciIssuer);

            // Get the source account
            const sourceAccount = await server.loadAccount(process.env.REACT_APP_STELLAR_ISSUER_PUBLIC);

            // Create transaction
            const transaction = new TransactionBuilder(sourceAccount, {
                fee: TransactionBuilder.MIN_BASE_FEE,
                networkPassphrase: Networks.PUBLIC
            })
                .addOperation(Operation.payment({
                    destination: certificateAccount,
                    asset: nciAsset,
                    amount: "1"
                }))
                .addMemo(Memo.hash(Buffer.from(memoHash)))
                .setTimeout(0)
                .build();

            // Sign transaction
            const keypair = Keypair.fromSecret(process.env.REACT_APP_STELLAR_ISSUER_SECRET);
            transaction.sign(keypair);

            // Submit transaction
            const result = await server.submitTransaction(transaction);
            console.log('Transaction successful:', result.hash);
            return result.hash;
        } catch (error) {
            console.error('Transaction failed:', error);
            throw error;
        }
    };

    return (
        <div>
            <button onClick={sendTransaction}>Mint Certificate</button>
        </div>
    );
};

export default StellarTransaction; 