
# VeriCert 🚀  
**Immutable Academic Credentials as NFTs on Stellar Blockchain**  
*Capstone Project — National College of Ireland (NCI)*

---

## 📘 About the Project

**VeriCert** is a decentralized web application designed for the **National College of Ireland** to issue, verify, and manage academic credentials using the Stellar blockchain. Each diploma is minted as a Non-Fungible Token (NFT-style asset) using the `$NCI` token. The certificate data is linked via a unique `MEMO_HASH`, ensuring an immutable, verifiable, and tamper-proof public record.

Developed by **Adrian Jandongan**, VeriCert bridges blockchain technology and academic verification to combat fake degrees and promote institutional transparency.

---

## 🏗️ Project Architecture & Design

### 📁 Folder Structure

```
vericert/
├── 📦 Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/ncinft/vericert/
│   │   │   │   ├── 📋 config/
│   │   │   │   │   └── MongoConfig.java
│   │   │   │   ├── 🎮 controller/
│   │   │   │   │   ├── CertificateController.java
│   │   │   │   │   ├── NCITokenTransactionController.java
│   │   │   │   │   ├── NotificationController.java
│   │   │   │   │   └── TestController.java
│   │   │   │   ├── 📊 model/
│   │   │   │   │   ├── Certificate.java
│   │   │   │   │   └── NCITokenTransaction.java
│   │   │   │   ├── 🔄 repository/
│   │   │   │   │   ├── CertificateRepository.java
│   │   │   │   │   └── NCITokenTransactionRepository.java
│   │   │   │   ├── ⚙️ service/
│   │   │   │   │   ├── CertificateService.java
│   │   │   │   │   ├── CertificateServiceImpl.java
│   │   │   │   │   ├── CertificateMetadataBuilder.java
│   │   │   │   │   ├── EmailService.java
│   │   │   │   │   ├── NCITokenTransactionService.java
│   │   │   │   │   └── StellarService.java
│   │   │   │   └── NcinftVeriCertApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       ├── static/
│   │   │       └── templates/
│   │   └── test/
│   │       └── java/com/ncinft/vericert/
│   │           └── NcinftVeriCertApplicationTests.java
│   ├── target/
│   ├── pom.xml
│   └── mvnw
│
├── 🎨 Frontend (React + TypeScript)
│   ├── veri-cert-frontend/
│   │   ├── src/
│   │   │   ├── 📄 pages/
│   │   │   │   ├── AdminPage.tsx
│   │   │   │   ├── AboutUs.tsx
│   │   │   │   ├── BuyNCIToken.tsx
│   │   │   │   ├── ConnectAccount.tsx
│   │   │   │   ├── EduSavePage.tsx
│   │   │   │   ├── GetWallet.tsx
│   │   │   │   ├── Home.tsx
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── MintedCertificates.tsx
│   │   │   │   ├── NotifyStudent.tsx
│   │   │   │   ├── SendTokenPage.tsx
│   │   │   │   └── Verify.tsx
│   │   │   ├── 🧩 components/
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── NotificationModal.tsx
│   │   │   │   └── StellarTransaction.js
│   │   │   ├── ⚙️ config/
│   │   │   │   └── api.ts
│   │   │   ├── 🔧 services/
│   │   │   │   └── stellarService.ts
│   │   │   ├── 🎨 assets/
│   │   │   │   ├── images/
│   │   │   │   │   ├── about-us-img.png
│   │   │   │   │   ├── edusave.jpg
│   │   │   │   │   ├── favicon.png
│   │   │   │   │   └── logo/
│   │   │   │   │       ├── vericertlogo.png
│   │   │   │   │       └── vericertlogo-footer.png
│   │   │   │   └── react.svg
│   │   │   ├── 🎨 scss/
│   │   │   │   ├── _index.scss
│   │   │   │   ├── _mixin.scss
│   │   │   │   ├── _variables.scss
│   │   │   │   └── components/
│   │   │   │       ├── _index.scss
│   │   │   │       └── _responsive.scss
│   │   │   ├── App.tsx
│   │   │   ├── App.css
│   │   │   ├── index.css
│   │   │   ├── main.tsx
│   │   │   └── vite-env.d.ts
│   │   ├── public/
│   │   │   └── vite.svg
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── tsconfig.json
│   │   ├── tsconfig.app.json
│   │   ├── tsconfig.node.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.cjs
│   │   ├── eslint.config.js
│   │   ├── vercel.json
│   │   └── README.md
│   └── tmp/
│
├── 🐳 Docker & Deployment
│   ├── Dockerfile
│   ├── deploy-setup.sh
│   └── DEPLOYMENT_GUIDE.md
│
├── 📚 Documentation
│   └── README.md
│
└── 📦 Package Management
    ├── package.json
    └── package-lock.json
```

### 🏛️ Architecture Patterns

#### Backend Architecture (Spring Boot)
- **Layered Architecture**: Follows MVC pattern with clear separation of concerns
- **Repository Pattern**: Data access abstraction through MongoDB repositories
- **Service Layer**: Business logic encapsulation with service interfaces and implementations
- **RESTful Controllers**: HTTP endpoints for API communication
- **Configuration Management**: Environment-specific properties and MongoDB configuration

#### Frontend Architecture (React + TypeScript)
- **Component-Based Architecture**: Reusable UI components with TypeScript interfaces
- **Page-Based Routing**: React Router for navigation between different application views
- **Service Layer**: External API communication and Stellar blockchain integration
- **State Management**: React hooks for local state management
- **Styling**: Tailwind CSS with SCSS for custom styling and responsive design

#### Data Flow Architecture
```
User Interface (React) 
    ↓ HTTP Requests
REST API (Spring Boot Controllers)
    ↓ Service Calls
Business Logic (Spring Services)
    ↓ Repository Calls
Data Layer (MongoDB + Stellar Blockchain)
```

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
- ✅ Email notification system
- ✅ NCI Token transaction management
- ✅ EduSave feature for future academic savings

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

### Backend Stack
| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | Spring Boot | 3.2.3 |
| **Language** | Java | 17+ |
| **Database** | MongoDB | Atlas |
| **Blockchain** | Stellar SDK | 1.4.0 |
| **Build Tool** | Maven | Latest |
| **Email Service** | Spring Mail | 3.2.3 |

### Frontend Stack
| Component | Technology | Version |
|-----------|------------|---------|
| **Framework** | React | 19.1.0 |
| **Language** | TypeScript | 5.8.3 |
| **Build Tool** | Vite | 6.3.5 |
| **Styling** | Tailwind CSS | 3.3.5 |
| **Routing** | React Router DOM | 7.6.1 |
| **Blockchain** | Stellar SDK | 13.3.0 |
| **UI Components** | Bootstrap | 5.3.6 |
| **Notifications** | React Hot Toast | 2.5.2 |

### Development & Deployment
| Component | Technology |
|-----------|------------|
| **Containerization** | Docker |
| **Version Control** | Git |
| **Package Manager** | npm (Frontend) / Maven (Backend) |
| **Linting** | ESLint |
| **Testing** | JUnit (Backend) |

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
# Navigate to project root
cd vericert

# Run with Maven
./mvnw spring-boot:run

# Or build and run
./mvnw clean package
java -jar target/vericert.jar
```

### 💻 Frontend (React + Vite + TypeScript)

```bash
# Navigate to frontend directory
cd veri-cert-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

App runs at: [http://localhost:5173](http://localhost:5173)

### 🐳 Docker Deployment

```bash
# Build and run with Docker
docker build -t vericert .
docker run -p 8080:8080 vericert
```

---

## 🔑 Usage Flow

1. **Admin logs in** to the platform
2. **Enters student details** for the certificate
3. **JSON metadata is generated** using CertificateMetadataBuilder
4. **Issuer wallet sends token** to student's public address with MEMO_HASH
5. **User or verifier** can check credentials using transaction ID or memo
6. **Email notifications** are sent to relevant parties

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

| Endpoint | Method | Description | Controller |
|----------|--------|-------------|------------|
| `/api/certificate` | POST | Generate metadata for a new certificate | CertificateController |
| `/api/issue` | POST | Mint token with memo hash | CertificateController |
| `/api/certificates` | GET | List all issued credentials | CertificateController |
| `/api/verify/:txId` | GET | Validate memo hash against MongoDB | CertificateController |
| `/api/notifications` | POST | Send email notifications | NotificationController |
| `/api/token-transactions` | GET | Get NCI token transactions | NCITokenTransactionController |

---

## 🔧 Key Components

### Backend Services
- **CertificateService**: Manages certificate creation and verification
- **StellarService**: Handles blockchain transactions and wallet operations
- **EmailService**: Sends notifications and confirmations
- **NCITokenTransactionService**: Manages NCI token transactions

### Frontend Pages
- **AdminPage**: Admin dashboard for certificate management
- **Verify**: Public verification portal
- **EduSavePage**: Academic savings feature
- **ConnectAccount**: Wallet connection interface
- **MintedCertificates**: View all issued certificates

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
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
