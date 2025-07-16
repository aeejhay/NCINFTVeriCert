# VeriCert Deployment Guide

This guide will help you deploy your VeriCert application to Render (backend) and Vercel (frontend).

## Prerequisites

- MongoDB Atlas account (already configured)
- Render account (free tier available)
- Vercel account (free tier available)
- Git repository with your code

## Part 1: Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to a Git repository (GitHub, GitLab, etc.)
2. Ensure your `Dockerfile` and `.dockerignore` are in the root directory
3. Verify your `application.properties` uses environment variables

### Step 2: Deploy to Render

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your Git repository
   - Select the repository containing your Spring Boot app

3. **Configure the Service**
   - **Name**: `vericert-backend` (or your preferred name)
   - **Environment**: `Docker`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (if your Spring Boot app is in the root)

4. **Set Environment Variables**
   Click "Advanced" and add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://vericert:qXFUu8IkBZgUJzRs@cluster0.s3pxywv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=8080
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Wait for the build to complete (usually 5-10 minutes)

6. **Get Your Backend URL**
   - Once deployed, you'll get a URL like: `https://your-app-name.onrender.com`
   - Save this URL for the frontend configuration

## Part 2: Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

1. **Create Environment Variables**
   Create a `.env.local` file in the `veri-cert-frontend` directory:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   VITE_STELLAR_NETWORK=mainnet
   VITE_NCI_ASSET_CODE=NCI
   VITE_NCI_ISSUER=GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT
   VITE_STELLAR_ISSUER_PUBLIC=your_issuer_public_key
   VITE_STELLAR_ISSUER_SECRET=your_issuer_secret_key
   VITE_CERTIFICATE_ACCOUNT=your_certificate_account_public_key
   ```

2. **Update CORS in Backend**
   After getting your Vercel URL, update the `CORS_ORIGINS` environment variable in Render to include your Vercel domain.

### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Your Project**
   - Click "New Project"
   - Import your Git repository
   - Set the **Framework Preset** to `Vite`
   - Set the **Root Directory** to `veri-cert-frontend`

3. **Configure Environment Variables**
   In the project settings, add the same environment variables as in `.env.local`:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   VITE_STELLAR_NETWORK=mainnet
   VITE_NCI_ASSET_CODE=NCI
   VITE_NCI_ISSUER=GBPPDO76NJC434FHVDEVSBTXI2YQULYB27EAUW3AKSBNSP66QITJYURT
   VITE_STELLAR_ISSUER_PUBLIC=your_issuer_public_key
   VITE_STELLAR_ISSUER_SECRET=your_issuer_secret_key
   VITE_CERTIFICATE_ACCOUNT=your_certificate_account_public_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your frontend
   - You'll get a URL like: `https://your-app-name.vercel.app`

## Part 3: Final Configuration

### Step 1: Update CORS Settings

1. **In Render Dashboard**
   - Go to your backend service
   - Click "Environment"
   - Update `CORS_ORIGINS` to include your Vercel URL:
   ```
   CORS_ORIGINS=https://your-frontend-domain.vercel.app
   ```
   - Redeploy the service

### Step 2: Test Your Deployment

1. **Test Backend API**
   - Visit: `https://your-backend-url.onrender.com/api/certificates`
   - Should return an empty array `[]` or your certificates

2. **Test Frontend**
   - Visit your Vercel URL
   - Test all functionality (login, minting, verification)

## Troubleshooting

### Common Issues

1. **Backend Build Failures**
   - Check Render logs for Maven build errors
   - Ensure all dependencies are in `pom.xml`
   - Verify Java version compatibility

2. **Frontend Build Failures**
   - Check Vercel logs for build errors
   - Ensure all environment variables are set
   - Verify TypeScript compilation

3. **CORS Errors**
   - Double-check CORS_ORIGINS in Render
   - Ensure the frontend URL is exactly correct
   - Redeploy backend after CORS changes

4. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check network access settings in MongoDB Atlas
   - Ensure IP whitelist includes Render's IPs

### Environment Variables Reference

**Backend (Render):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=8080
CORS_ORIGINS=https://your-frontend-domain.vercel.app
```

**Frontend (Vercel):**
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_STELLAR_NETWORK=mainnet
VITE_NCI_ASSET_CODE=NCI
VITE_NCI_ISSUER=your_issuer_public_key
VITE_STELLAR_ISSUER_PUBLIC=your_issuer_public_key
VITE_STELLAR_ISSUER_SECRET=your_issuer_secret_key
VITE_CERTIFICATE_ACCOUNT=your_certificate_account_public_key
```

## Security Notes

1. **Never commit secrets to Git**
   - Use environment variables for all sensitive data
   - Keep your Stellar secret keys secure

2. **MongoDB Atlas Security**
   - Use strong passwords
   - Enable network access controls
   - Consider using MongoDB Atlas App Services for additional security

3. **Environment Variables**
   - Use different values for development and production
   - Regularly rotate sensitive credentials

## Cost Optimization

### Render Free Tier
- 750 hours/month
- Automatic sleep after 15 minutes of inactivity
- Cold starts may take 30-60 seconds

### Vercel Free Tier
- Unlimited deployments
- 100GB bandwidth/month
- Automatic deployments on Git push

## Monitoring

1. **Render Dashboard**
   - Monitor CPU and memory usage
   - Check logs for errors
   - Set up alerts for downtime

2. **Vercel Analytics**
   - Monitor frontend performance
   - Track user interactions
   - Set up error tracking

Your application should now be fully deployed and accessible via the internet! 