package com.ncinft.vericert.controller;

import com.ncinft.vericert.model.NCITokenTransaction;
import com.ncinft.vericert.service.NCITokenTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ncitoken")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "https://ncinft-veri-cert.vercel.app"})
public class NCITokenTransactionController {

    @Autowired
    private NCITokenTransactionService service;

    @PostMapping
    public ResponseEntity<?> saveTransaction(@RequestBody NCITokenTransaction transaction) {
        try {
            System.out.println("Received transaction: " + transaction.getTxHash());
            NCITokenTransaction savedTransaction = service.saveTransaction(transaction);
            return ResponseEntity.ok(savedTransaction);
        } catch (Exception e) {
            System.err.println("Error saving transaction: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error saving transaction: " + e.getMessage());
        }
    }
} 