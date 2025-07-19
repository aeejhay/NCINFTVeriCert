package com.ncinft.vericert.service;

import com.ncinft.vericert.model.Certificate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendCertificateNotification(String toEmail, String studentName, String certificateId, String degree, LocalDate dateIssued) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Your Certificate is Ready - NCI VeriCert");
            
            String emailContent = String.format(
                "Dear %s,\n\n" +
                "Congratulations! Your certificate has been successfully issued and is now available for verification.\n\n" +
                "Certificate Details:\n" +
                "- Certificate ID: %s\n" +
                "- Degree: %s\n" +
                "- Date Issued: %s\n\n" +
                "You can verify your certificate at: https://ncinft-veri-cert.vercel.app\n\n" +
                "Best regards,\n" +
                "NCI VeriCert Team",
                studentName, certificateId, degree, dateIssued
            );
            
            message.setText(emailContent);
            mailSender.send(message);
            
            System.out.println("Email notification sent to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending email to " + toEmail + ": " + e.getMessage());
            throw new RuntimeException("Failed to send email notification", e);
        }
    }

    public void sendProfessionalCertificateNotification(String toEmail, Certificate certificate) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Certificate Successfully Minted on Stellar Blockchain - NCI VeriCert");
            
            String emailContent = String.format(
                "Dear %s,\n\n" +
                "Congratulations! Your certificate has been successfully minted on the Stellar blockchain and is now permanently secured and verifiable.\n\n" +
                "📋 CERTIFICATE DETAILS:\n" +
                "• Student Name: %s\n" +
                "• Certificate ID: %s\n" +
                "• Degree: %s\n" +
                "• Grade: %s\n" +
                "• QQI Level: %s\n" +
                "• Date Issued: %s\n" +
                "• Institution: %s\n" +
                "• Signed By: %s\n\n" +
                "🔗 BLOCKCHAIN VERIFICATION:\n" +
                "• Transaction ID: %s\n" +
                "• Memo Hash: %s\n\n" +
                "🔍 HOW TO VERIFY YOUR CERTIFICATE:\n" +
                "1. Visit: https://ncinft-veri-cert.vercel.app\n" +
                "2. Enter your Transaction ID: %s\n" +
                "3. Your certificate details will be displayed for verification\n\n" +
                "📱 FORWARDING YOUR CERTIFICATE:\n" +
                "You can share your Transaction ID with employers, institutions, or anyone who needs to verify your certificate. The certificate is only searchable by Transaction ID for GDPR compliance.\n\n" +
                "🌐 VERIFICATION PROCESS:\n" +
                "• Your certificate is permanently stored on the Stellar blockchain\n" +
                "• Verification is instant and tamper-proof\n" +
                "• No third-party verification required\n" +
                "• Accessible worldwide 24/7\n\n" +
                "For any questions or support, please contact our team.\n\n" +
                "Best regards,\n" +
                "NCI VeriCert Team\n" +
                "National College of Ireland\n" +
                "https://ncinft-veri-cert.vercel.app",
                certificate.getStudentName(),
                certificate.getStudentName(),
                certificate.getCertificateId(),
                certificate.getDegree(),
                certificate.getGrade(),
                certificate.getQqiLevel(),
                certificate.getDateIssued(),
                certificate.getInstitution(),
                certificate.getSignedBy(),
                certificate.getTransactionId(),
                certificate.getMemoHashHex(),
                certificate.getTransactionId()
            );
            
            message.setText(emailContent);
            mailSender.send(message);
            
            System.out.println("Professional certificate notification sent to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Error sending professional email to " + toEmail + ": " + e.getMessage());
            throw new RuntimeException("Failed to send professional email notification", e);
        }
    }
} 