package com.ncinft.vericert.controller;

import com.ncinft.vericert.model.Certificate;
import com.ncinft.vericert.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://ncinft-veri-cert.vercel.app"})
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API is working!");
    }

    @GetMapping("/test-db")
    public ResponseEntity<?> testDatabase() {
        try {
            // Try to save a test certificate
            Certificate testCert = new Certificate();
            testCert.setCertificateId("TEST-" + System.currentTimeMillis());
            testCert.setStudentName("Test Student");
            testCert.setDegree("Test Degree");
            testCert.setMemoHashHex("test-hash");
            
            Certificate saved = certificateService.saveCertificate(testCert);
            return ResponseEntity.ok("Database connection successful! Test certificate saved with ID: " + saved.getId());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Database error: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> storeCertificate(@RequestBody Certificate certificate) {
        try {
            System.out.println("Received certificate request:");
            System.out.println("Certificate ID: " + certificate.getCertificateId());
            System.out.println("Student Name: " + certificate.getStudentName());
            System.out.println("Degree: " + certificate.getDegree());
            System.out.println("Grade: " + certificate.getGrade());
            System.out.println("QQI Level: " + certificate.getQqiLevel());
            System.out.println("Date Issued: " + certificate.getDateIssued());
            System.out.println("Signed By: " + certificate.getSignedBy());
            System.out.println("Institution: " + certificate.getInstitution());
            System.out.println("Memo Hash: " + certificate.getMemoHashHex());
            
            Certificate savedCertificate = certificateService.saveCertificate(certificate);
            
            System.out.println("Certificate saved successfully with ID: " + savedCertificate.getId());
            return ResponseEntity.ok(savedCertificate);
        } catch (Exception e) {
            System.err.println("Error storing certificate:");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error storing certificate: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllCertificates() {
        try {
            List<Certificate> certificates = certificateService.findAll();
            System.out.println("Found " + certificates.size() + " certificates in database:");
            for (Certificate cert : certificates) {
                System.out.println("Certificate ID: " + cert.getCertificateId());
                System.out.println("Memo Hash: " + cert.getMemoHashHex());
            }
            return ResponseEntity.ok(certificates);
        } catch (Exception e) {
            System.err.println("Error fetching certificates: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error fetching certificates: " + e.getMessage());
        }
    }

    @GetMapping("/verify/{memoHash}")
    public ResponseEntity<?> verifyCertificate(@PathVariable String memoHash) {
        System.out.println("Received verification request for memo hash: " + memoHash);
        try {
            Certificate certificate = certificateService.findByMemoHash(memoHash);
            if (certificate != null) {
                System.out.println("Certificate found in database:");
                System.out.println("Certificate ID: " + certificate.getCertificateId());
                System.out.println("Student Name: " + certificate.getStudentName());
                return ResponseEntity.ok(certificate);
            } else {
                System.out.println("No certificate found for memo hash: " + memoHash);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Certificate not found for memo hash: " + memoHash);
            }
        } catch (Exception e) {
            System.err.println("Error verifying certificate:");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error verifying certificate: " + e.getMessage());
        }
    }
} 