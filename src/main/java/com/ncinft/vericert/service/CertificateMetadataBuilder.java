/*
Student note:
This helper saves certificate data and makes a hash.
I kept the logic small so it’s easy to follow.
*/
package com.ncinft.vericert.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ncinft.vericert.model.Certificate;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CertificateMetadataBuilder {
    private static final String CERTS_DIR = "src/main/resources/certs/";
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String saveCertificateAsJson(Certificate cert) throws IOException {
        File dir = new File(CERTS_DIR);
        if (!dir.exists()) dir.mkdirs();
        String filePath = CERTS_DIR + cert.getCertificateId() + ".json";
        objectMapper.writeValue(new File(filePath), cert);
        return filePath;
    }

    public static String computeSha256Hex(String filePath) throws IOException, NoSuchAlgorithmException {
        byte[] fileBytes = Files.readAllBytes(Paths.get(filePath));
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(fileBytes);
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
} 