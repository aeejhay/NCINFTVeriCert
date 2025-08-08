/*
Student note:
This service holds basic Stellar settings and a simple verifier.
I plan to improve it as I learn more about the network.
*/
package com.ncinft.vericert.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class StellarService {
    private static final String CERTIFICATE_ACCOUNT = "GB76DYPGHPARWGWA7DSLXJQ652RXCAQTSQGTSBUFHT2EGKF7VBKFVMAC";
    private static final String NCI_ASSET_CODE = "NCI";
    private static final String NCI_ISSUER = "GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT";

    public boolean verifyCertificate(String memoHash) {
        // TODO: Implement verification against MongoDB database
        return true;
    }

    public String getCertificateAccount() {
        return CERTIFICATE_ACCOUNT;
    }

    public String getNciAssetCode() {
        return NCI_ASSET_CODE;
    }

    public String getNciIssuer() {
        return NCI_ISSUER;
    }
} 