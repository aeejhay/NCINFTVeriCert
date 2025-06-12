# VeriCert 🚀  
**Immutable Academic Credentials as NFTs on Stellar Blockchain**  
*Capstone Project — National College of Ireland (NCI)*

---

## 📘 About the Project

**VeriCert** is a decentralized web application that enables the **National College of Ireland (NCI)** to issue, verify, and manage academic credentials using the Stellar blockchain. Each diploma is minted as a Non-Fungible Token (NFT-style asset) using a custom token `$NCI`, with metadata linked via Stellar's `MEMO_HASH`. This provides secure, tamper-proof, and globally verifiable academic records.

---

## 💰 About the `$NCI` Token

The `$NCI` token is a custom asset created on the Stellar blockchain and used within VeriCert for educational credentialing.

- **Asset Code**: `NCI`
- **Issuer Address**: `GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT`
- **Stellar Explorer**: [View on StellarExpert](https://stellar.expert/explorer/public/asset/NCI-GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT)

> ⚠️ *Note:* `$NCI` is solely used for academic and demonstration purposes and holds no financial value.

---

## 🔥 Core Features

- ✅ Connect Freighter or Albedo wallet (Stellar)
- ✅ Mint NFT-style credentials with MEMO_HASH
- ✅ Admin dashboard for issuing credentials
- ✅ Public verification portal for authenticity
- ✅ Save MEMO hash to database for validation
- ✅ EduSave: Purchase `$NCI` tokens for future tuition usage

---

## 🧠 EduSave — Save Today, Educate Tomorrow

**EduSave** allows parents and guardians to purchase `$NCI` tokens via Freighter/Albedo wallet and save them for their child's future education at NCI. These tokens represent an innovative way to secure educational investment on the blockchain.

---

## 🛠 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React.js + TypeScript + Vite  |
| Backend     | Spring Boot (Java), MongoDB   |
| Blockchain  | Stellar SDK, Horizon API      |
| Wallet      | Freighter / Albedo            |
| Storage     | JSON (local, optionally IPFS) |

---

## 🚀 Quickstart Guide

### 📦 Requirements

- Java 17+
- Node.js 18+
- Git
- Freighter Wallet or Albedo (Browser Extension)

### 🔧 Backend (Spring Boot)

```bash
cd vericert-backend
./gradlew bootRun

### 💻 Frontend (React + Vite + TypeScript)
bash
cd vericert-frontend
npm install
npm run dev
App runs at: http://localhost:5173

### 🔑 Usage Flow
Admin logs in to input student details.

Diploma metadata (JSON) is generated.

Metadata is hashed and included in a Stellar transaction via MEMO_HASH.

Data is stored in the MongoDB (certificates collection).

Public users can verify the hash via the Stellar transaction ID and view metadata.

📎 Example Diploma Metadata
json
Copy
Edit
{
  "studentName": "John Doe",
  "degree": "Bachelor of Science in Computing",
  "dateIssued": "2025-06-20",
  "signedBy": "Registrar NCI",
  "qqiLevel": "Level 8",
  "grade": "Second Class Honours, Grade 1",
  "institution": "National College of Ireland"
}
🔌 API Endpoints (Spring Boot)
Endpoint	Method	Description
/hello	GET	Test backend is working
/api/certificate	POST	Store metadata and return hashed link
/api/issue	POST	Mint Stellar transaction with MEMO_HASH
/api/certificates	GET	List issued diplomas

📆 Project Status
 Frontend Wallet Integration

 Stellar SDK Integration (JS + Java)

 MongoDB + Spring Boot connection

 Admin Login System

 EduSave Feature Page

 QR Code Verification

 IPFS Integration (optional/future)

 User Role Management

👨‍💻 Author
Adrian Jandongan
Capstone Student, Higher Diploma in Science in Computing
National College of Ireland (NCI)

🛡 Disclaimer
This is a student project prototype.
The $NCI token is not a financial asset and has no tradable value.
