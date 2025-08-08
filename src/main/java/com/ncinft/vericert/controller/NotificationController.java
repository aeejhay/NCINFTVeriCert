/*
Student note:
This controller searches students and sends simple email notices.
I wanted the flow to feel straightforward and friendly.
*/
package com.ncinft.vericert.controller;

import com.ncinft.vericert.model.Certificate;
import com.ncinft.vericert.service.CertificateService;
import com.ncinft.vericert.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://ncinft-veri-cert.vercel.app"})
public class NotificationController {

    @Autowired
    private CertificateService certificateService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/search-students")
    public ResponseEntity<?> searchStudents(@RequestParam String query) {
        try {
            List<Certificate> certificates = certificateService.searchByStudentName(query);
            return ResponseEntity.ok(certificates);
        } catch (Exception e) {
            System.err.println("Error searching students: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error searching students: " + e.getMessage());
        }
    }

    @PostMapping("/send-notification")
    public ResponseEntity<?> sendNotification(@RequestBody NotificationRequest request) {
        try {
            // Find the certificate
            Certificate certificate = certificateService.findById(request.getCertificateId());
            if (certificate == null) {
                return ResponseEntity.badRequest().body("Certificate not found");
            }

            // Send professional email notification with all certificate details
            emailService.sendProfessionalCertificateNotification(
                request.getEmail(),
                certificate
            );

            return ResponseEntity.ok("Notification sent successfully to " + request.getEmail());
        } catch (Exception e) {
            System.err.println("Error sending notification: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error sending notification: " + e.getMessage());
        }
    }

    // Request DTO
    public static class NotificationRequest {
        private String certificateId;
        private String email;

        // Getters and Setters
        public String getCertificateId() { return certificateId; }
        public void setCertificateId(String certificateId) { this.certificateId = certificateId; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
} 