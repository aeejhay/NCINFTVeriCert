
# VeriCert 🚀  
**Immutable Academic Credentials as NFTs on Stellar Blockchain**  
*Capstone Project — National College of Ireland (NCI)*

---

## 📘 About the Project

**VeriCert** is a decentralized web application designed for the **National College of Ireland** to issue, verify, and manage academic credentials using the Stellar blockchain. Each diploma is minted as a Non-Fungible Token (NFT-style asset) using the `$NCI` token. The certificate data is linked via a unique `MEMO_HASH`, ensuring an immutable, verifiable, and tamper-proof public record.

Developed by **Adrian Jandongan**, VeriCert bridges blockchain technology and academic verification to combat fake degrees and promote institutional transparency.

---

## 💰 About the `$NCI` Token

The `$NCI` token is a custom asset on the Stellar blockchain exclusively used within the VeriCert ecosystem.

- **Asset Code**: `NCI`
- **Issuer Address**: `GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT`
- **Stellar Explorer**: [View on StellarExpert](https://stellar.expert/explorer/public/asset/NCI-GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT)

> 🛡️ *Note:* The token is solely used for educational and verification purposes. It has no financial value.

---

## 🔥 Core Features

- ✅ Connect Freighter Wallet (Stellar)
- ✅ Admin dashboard to mint academic credentials
- ✅ Send token transactions with `MEMO_HASH`
- ✅ Store and verify JSON metadata using memo hash
- ✅ Public portal to verify credentials
- ✅ MongoDB backend for credential registry
- ✅ Secure Admin login

---

## 🌱 EduSave: Future-Proof Academic Savings

Introducing **EduSave** — a blockchain-based savings feature for future students.

Parents or guardians can:
- Connect their Freighter/Albedo wallet
- Purchase and hold `$NCI` tokens
- Save towards their child's future tuition at NCI
- Benefit from blockchain transparency and ownership
- Transfer tokens to the institution for enrollment or other academic-related expenses

> EduSave aims to build trust and long-term commitment between families and institutions through transparent, blockchain-based savings.

---

## 🛠 Tech Stack

| Layer       | Tech                          |
|-------------|-------------------------------|
| Frontend    | React.js + TypeScript + Tailwind CSS |
| Backend     | Spring Boot (Java)            |
| Blockchain  | Stellar SDK, Horizon API      |
| Wallet      | Freighter / Albedo            |
| Database    | MongoDB                       |
| Storage     | JSON format (linked via MEMO_HASH) |

---

## 🚀 Quickstart Guide

### 📦 Requirements

- Java 17+
- Node.js 18+
- MongoDB Atlas
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

1. **Admin logs in** to the platform
2. **Enters student details** for the certificate
3. **JSON metadata is generated**
4. **Issuer wallet sends token** to student’s public address with MEMO_HASH
5. **User or verifier** can check credentials using transaction ID or memo

---

## 🧾 Sample Diploma Metadata

```json
{
  "studentName": "Jane Doe",
  "degree": "BSc in Computing",
  "grade": "First Class Honours",
  "qqiLevel": 8,
  "dateIssued": "2025-06-13",
  "signedBy": "Dr. Smith",
  "institution": "National College of Ireland"
}
```

---

## 📎 Sample Memo Hash Link

```
https://vericert.nci.ie/certs/jane_doe_diploma.json
```

---

## 🧪 API Endpoints (Spring Boot)

| Endpoint               | Method | Description                                 |
|------------------------|--------|---------------------------------------------|
| `/api/certificate`     | POST   | Generate metadata for a new certificate     |
| `/api/issue`           | POST   | Mint token with memo hash                   |
| `/api/certificates`    | GET    | List all issued credentials                 |
| `/api/verify/:txId`    | GET    | Validate memo hash against MongoDB          |

---

## 🧑‍🎓 Author

**Adrian Jandongan**  
Capstone Project – Higher Diploma in Science in Computing  
National College of Ireland

---

## 📚 References (Combatting Fake Degrees)

- Education Verification (2024). *The global rise of fake degrees: six major scandals in 2024*. [online] Available at: https://www.education-verification.com/the-global-rise-of-fake-degrees-six-major-scandals-in-2024/
- The Guardian (2021). *UK degree: 85 fake university websites taken down in five years*. https://www.theguardian.com/education/2021/feb/18/uk-degree-85-fake-university-websites-taken-down-in-five-years

---

## 🛡 Disclaimer

This platform is built for educational demonstration only.  
The `$NCI` token has **no financial or speculative value**.

---

## 🌐 External Resources

- [Stellar SDK (JavaScript)](https://www.stellar.org/developers/reference/)
- [Freighter Wallet](https://www.freighter.app/)
- [Stellar Horizon API Docs](https://developers.stellar.org/api/)
