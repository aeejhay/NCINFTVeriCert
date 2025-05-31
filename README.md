  
# VeriCert 🚀  
**Immutable Academic Credentials as NFTs on Stellar Blockchain**  
*Capstone Project — National College of Ireland (NCI)*

---

## 📘 About the Project

**VeriCert** is a decentralized web application that allows National College of Ireland to issue, verify, and manage academic credentials using the Stellar blockchain. Each diploma is minted as a Non-Fungible Token (NFT-style asset) using a custom token `$NCI`, with metadata linked via the memo field. This ensures secure, tamper-proof, and globally verifiable digital certificates.

---

## 💰 About the `$NCI` Token

The `$NCI` token is a custom asset on the Stellar blockchain created exclusively for use within the VeriCert platform. It simulates NFT-style credential ownership and is used in payment transactions with diploma metadata attached via memo.

- **Asset Code**: `NCI`
- **Issuer Address**: `GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT`
- **Stellar Explorer**: [View on StellarExpert](https://stellar.expert/explorer/public/asset/NCI-GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT)

> 🛡️ **Note:** This token is created for educational and verification purposes only and holds no financial value.

---

## 🔥 Core Features

- ✅ Connect Freighter wallet (Stellar)
- ✅ Send payment using custom token `$NCI`
- ✅ Attach diploma metadata (JSON/PDF/JPG) via `Memo`
- ✅ View past transactions with clickable memo links
- ✅ Admin dashboard to mint diplomas
- ✅ Public verification portal

---

## 🛠 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React.js + TypeScript         |
| Backend     | Spring Boot (Java)            |
| Blockchain  | Stellar SDK, Horizon API      |
| Wallet      | Freighter (browser extension) |
| Storage     | JSON / PDF (local or IPFS)    |

---

## 🚀 Quickstart Guide

### 📦 Requirements

- Java 17+
- Node.js 18+
- Git
- Freighter Wallet (Browser Extension)

### 🔧 Backend (Spring Boot)

```bash
cd vericert-backend
./gradlew bootRun
```

### 💻 Frontend (React + Vite + TypeScript)

```bash
cd vericert-frontend
npm install
npm run dev
```

App runs at: [http://localhost:5173](http://localhost:5173)

---

## 🔑 Usage Flow

1. **Admin logs in** and inputs student data
2. **Generates diploma metadata** (JSON)
3. **Metadata is hosted** (e.g., `/certs/diploma001.json`)
4. **Freighter wallet connects**
5. **Transaction is sent** using `$NCI` and includes a `MEMO_TEXT` link to the metadata
6. **Verification page** displays details from memo-linked metadata

---

## 📎 Example Diploma Memo

```
https://yourdomain.com/certs/john_doe_diploma.json
```

---

## 🧪 API Endpoints (Spring Boot)

| Endpoint               | Method | Description                                 |
|------------------------|--------|---------------------------------------------|
| `/hello`               | GET    | Test the backend is working                 |
| `/api/certificate`     | POST   | Accept student info, return metadata link   |
| `/api/issue`           | POST   | Create Stellar payment with memo            |
| `/api/certificates`    | GET    | List issued diplomas (optional)             |

---

## 💡 Future Enhancements

- IPFS integration for metadata decentralization
- QR code verification system
- Email notifications for issued credentials
- Analytics for verification traffic
- Admin authentication + user roles

---

## 🧑‍🎓 Author

**Adrian Jandongan**  
Capstone Project – Higher Diploma in Science in Computing  
National College of Ireland

---

## 🛡 Disclaimer

This project is an academic prototype for demonstration purposes.  
The `$NCI` token is **not a financial asset** and carries **no monetary value**.

---

## 🌐 External Resources

- [Stellar SDK (JavaScript)](https://www.stellar.org/developers/reference/)
- [Freighter Wallet](https://www.freighter.app/)
- [Stellar Horizon API Docs](https://developers.stellar.org/api/)
- [Stellar Expert - Asset Explorer](https://stellar.expert/)
