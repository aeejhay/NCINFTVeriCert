package com.ncinft.vericert.service;

import com.ncinft.vericert.model.Certificate;
import java.util.List;

public interface CertificateService {
    Certificate saveCertificate(Certificate certificate);
    Certificate findByMemoHash(String memoHash);
    List<Certificate> findAll();
} 