/*
Student note:
This interface defines simple actions for certificates.
It helps keep the code organized and clear.
*/
package com.ncinft.vericert.service;

import com.ncinft.vericert.model.Certificate;
import java.util.List;

public interface CertificateService {
    Certificate saveCertificate(Certificate certificate);
    Certificate findByMemoHash(String memoHash);
    Certificate findById(String id);
    List<Certificate> findAll();
    List<Certificate> searchByStudentName(String query);
} 