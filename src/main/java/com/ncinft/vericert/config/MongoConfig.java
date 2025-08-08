/*
Student note:
I wrote this config after reading docs and examples.
It connects the app to MongoDB in a simple way.
*/
package com.ncinft.vericert.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

@Configuration
@EnableMongoRepositories(basePackages = "com.ncinft.vericert.repository")
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    @Override
    protected String getDatabaseName() {
        return "vericert";
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        System.out.println("=== MongoDB Configuration ===");
        System.out.println("MongoDB URI: " + mongoUri);
        System.out.println("Database Name: " + getDatabaseName());
        System.out.println("============================");
        
        try {
            return MongoClients.create(mongoUri);
        } catch (Exception e) {
            System.err.println("Error creating MongoDB client: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
} 