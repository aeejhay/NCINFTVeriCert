/*
Student note:
This is a simple test controller to check if email and API work.
It helped me verify features while learning.
*/
package com.ncinft.vericert.controller;

import com.ncinft.vericert.model.Certificate;
import com.ncinft.vericert.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;

@RestController
public class TestController {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailService emailService;

    @GetMapping("/test")
    public String test() {
        return "Basic REST endpoint is working!";
    }

    @GetMapping("/test-email")
    public String testEmail(@RequestParam String to) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Test Email from NCI VeriCert");
            message.setText("This is a test email to verify Gmail SMTP configuration is working correctly.");
            
            mailSender.send(message);
            return "Test email sent successfully to " + to;
        } catch (Exception e) {
            return "Error sending email: " + e.getMessage();
        }
    }

    @GetMapping("/test-certificate-email")
    public String testCertificateEmail(@RequestParam String to) {
        try {
            // Create a sample certificate for testing
            Certificate sampleCertificate = new Certificate();
            sampleCertificate.setStudentName("John Doe");
            sampleCertificate.setCertificateId("CERT-2024-001");
            sampleCertificate.setDegree("Bachelor of Science in Computer Science");
            sampleCertificate.setGrade("First Class Honours");
            sampleCertificate.setQqiLevel("Level 8");
            sampleCertificate.setDateIssued(LocalDate.now());
            sampleCertificate.setInstitution("National College of Ireland");
            sampleCertificate.setSignedBy("Dr. Sarah Johnson");
            sampleCertificate.setTransactionId("1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef");
            sampleCertificate.setMemoHashHex("a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456");
            
            emailService.sendProfessionalCertificateNotification(to, sampleCertificate);
            return "Professional certificate email sent successfully to " + to;
        } catch (Exception e) {
            return "Error sending certificate email: " + e.getMessage();
        }
    }
} 