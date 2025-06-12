package com.ncinft.vericert.repository;

import com.ncinft.vericert.model.NCITokenTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NCITokenTransactionRepository extends MongoRepository<NCITokenTransaction, String> {
    // Add custom query methods if needed
} 