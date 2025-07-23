package com.ncinft.vericert.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "certificates")
public class Certificate {
    @Id
    private String id;
    private String certificateId;
    private String studentName;
    private String degree;
    private String grade;
    private String qqiLevel;
    private LocalDate dateIssued;
    private String signedBy;
    private String institution;
    @JsonProperty("memoHash")
    private String memoHashHex;
    @JsonProperty("txHash")
    private String transactionId;

    // Constructors
    public Certificate() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCertificateId() {
        return certificateId;
    }

    public void setCertificateId(String certificateId) {
        this.certificateId = certificateId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getQqiLevel() {
        return qqiLevel;
    }

    public void setQqiLevel(String qqiLevel) {
        this.qqiLevel = qqiLevel;
    }

    public LocalDate getDateIssued() {
        return dateIssued;
    }

    public void setDateIssued(LocalDate dateIssued) {
        this.dateIssued = dateIssued;
    }

    public String getSignedBy() {
        return signedBy;
    }

    public void setSignedBy(String signedBy) {
        this.signedBy = signedBy;
    }

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    @JsonProperty("memoHash")
    public String getMemoHashHex() {
        return memoHashHex;
    }

    public void setMemoHashHex(String memoHashHex) {
        this.memoHashHex = memoHashHex;
    }

    @JsonProperty("txHash")
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
} 