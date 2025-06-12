package com.ncinft.vericert.service;

import com.ncinft.vericert.model.NCITokenTransaction;
import com.ncinft.vericert.repository.NCITokenTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NCITokenTransactionService {

    @Autowired
    private NCITokenTransactionRepository repository;

    public NCITokenTransaction saveTransaction(NCITokenTransaction transaction) {
        return repository.save(transaction);
    }
} 