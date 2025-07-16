#!/bin/bash

echo "🚀 VeriCert Deployment Setup"
echo "=============================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    echo "   git remote add origin <your-repo-url>"
    echo "   git push -u origin main"
    exit 1
fi

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "Dockerfile"
    ".dockerignore"
    "pom.xml"
    "src/main/resources/application.properties"
    "veri-cert-frontend/package.json"
    "veri-cert-frontend/src/config/api.ts"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

echo ""
echo "🔧 Environment Variables Setup"
echo "=============================="

echo "Backend Environment Variables (for Render):"
echo "MONGODB_URI=mongodb+srv://vericert:qXFUu8IkBZgUJzRs@cluster0.s3pxywv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
echo "PORT=8080"
echo "CORS_ORIGINS=https://your-frontend-domain.vercel.app"
echo ""

echo "Frontend Environment Variables (for Vercel):"
echo "VITE_API_BASE_URL=https://your-backend-url.onrender.com"
echo "VITE_STELLAR_NETWORK=mainnet"
echo "VITE_NCI_ASSET_CODE=NCI"
echo "VITE_NCI_ISSUER=GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT"
echo "VITE_STELLAR_ISSUER_PUBLIC=your_issuer_public_key"
echo "VITE_STELLAR_ISSUER_SECRET=your_issuer_secret_key"
echo "VITE_CERTIFICATE_ACCOUNT=your_certificate_account_public_key"
echo ""

echo "📝 Next Steps:"
echo "1. Push your code to GitHub/GitLab"
echo "2. Deploy backend to Render (see DEPLOYMENT_GUIDE.md)"
echo "3. Deploy frontend to Vercel (see DEPLOYMENT_GUIDE.md)"
echo "4. Update CORS settings after getting URLs"
echo ""

echo "🎯 Ready for deployment!" 