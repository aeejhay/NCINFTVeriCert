package com.ncinft.vericert.service;

import com.ncinft.vericert.model.Certificate;
import com.ncinft.vericert.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Override
    @Transactional
    public Certificate saveCertificate(Certificate certificate) {
        try {
            System.out.println("Saving certificate in service layer:");
            System.out.println("Certificate ID: " + certificate.getCertificateId());
            System.out.println("Memo Hash: " + certificate.getMemoHashHex());
            
            Certificate saved = certificateRepository.save(certificate);
            System.out.println("Certificate saved with ID: " + saved.getId());
            return saved;
        } catch (Exception e) {
            System.err.println("Error in service layer:");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public Certificate findByMemoHash(String memoHash) {
        System.out.println("Searching for certificate with memo hash: " + memoHash);
        try {
            Certificate certificate = certificateRepository.findByMemoHashHex(memoHash);
            if (certificate != null) {
                System.out.println("Found certificate in database:");
                System.out.println("Certificate ID: " + certificate.getCertificateId());
                System.out.println("Memo Hash: " + certificate.getMemoHashHex());
            } else {
                System.out.println("No certificate found with memo hash: " + memoHash);
            }
            return certificate;
        } catch (Exception e) {
            System.err.println("Error in findByMemoHash:");
            System.err.println("Error message: " + e.getMessage());
            System.err.println("Error class: " + e.getClass().getName());
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public List<Certificate> findAll() {
        return certificateRepository.findAll();
    }

    @Override
    public Certificate findById(String id) {
        return certificateRepository.findById(id).orElse(null);
    }

    @Override
    public List<Certificate> searchByStudentName(String query) {
        return certificateRepository.findByStudentNameContainingIgnoreCase(query);
    }
} 