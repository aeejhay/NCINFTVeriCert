package com.ncinft.vericert.repository;

import com.ncinft.vericert.model.Certificate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CertificateRepository extends MongoRepository<Certificate, String> {
    Certificate findByCertificateId(String certificateId);
    Certificate findByMemoHashHex(String memoHashHex);
} 