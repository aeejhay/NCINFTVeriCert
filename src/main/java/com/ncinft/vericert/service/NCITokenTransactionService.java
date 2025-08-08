/*
Student note:
This service stores token transactions.
It is small on purpose so it’s easy to test and maintain.
*/
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