# OPT Career Connect - Manual Deployment Steps

## 🚀 Step-by-Step Manual Deployment

### Step 1: Push Code to GitHub (Manual)

Since the automated commands had issues, follow these manual steps:

1. **Create GitHub Repository:**
   - Go to https://github.com
   - Click "New repository"
   - Name: `opt-career-connect`
   - Description: "AI-powered job platform for OPT & CPT students"
   - Make it **Public** (for free Vercel deployment)
   - Click "Create repository"

2. **Push Code Manually:**
   ```bash
   # In PowerShell/Command Prompt:
   cd D:\opt-career-connect

   # Add remote (replace YOUR_USERNAME with your actual GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/opt-career-connect.git

   # Push to GitHub
   git push -u origin main
   ```

### Step 2: Set Up Vercel Account

1. **Create New Vercel Account:**
   - Go to https://vercel.com
   - Click "Sign Up" (use a different account than your other projects)
   - Sign up with GitHub (recommended)
   - Verify your email

2. **Connect GitHub:**
   - In Vercel dashboard, click "Add New..." → "Project"
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub account
   - Select the `opt-career-connect` repository

### Step 3: Configure Project Settings

1. **Project Configuration:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** Leave empty (./)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** Leave empty (.next)

2. **Environment Variables:**
   Click "Environment Variables" and add these:

   ```
   GROQ_API_KEY=your_groq_api_key_here
   GEMINI_API_KEY=your_google_gemini_api_key_here
   HF_TOKEN=your_hugging_face_token_here
   DATABASE_URL=your_vercel_postgres_url_here (will get this later)
   ```

### Step 4: Set Up Free Database

1. **Create Vercel Postgres:**
   - In Vercel dashboard, go to "Storage" tab
   - Click "Create Database" → "Postgres"
   - Choose "Hobby" plan (free)
   - Name it `opt-career-connect-db`
   - Click "Create"

2. **Get Database URL:**
   - Go to Storage → Postgres → Settings
   - Copy the `DATABASE_URL`
   - Add it to Environment Variables in your project

3. **Initialize Database Schema:**
   - Go to Storage → Postgres → Query
   - Copy the entire content from `database-schema.sql`
   - Paste it in the query editor
   - Click "Run" to create all tables

### Step 5: Get Free API Keys

#### Groq API (Free):
1. Go to https://groq.com
2. Sign up for free account
3. Go to API Keys section
4. Create new API key
5. Copy the key

#### Google Gemini API (Free):
1. Go to https://aistudio.google.com/
2. Sign up with Google account
3. Create API key in the API Keys section
4. Copy the key

#### Hugging Face API (Free):
1. Go to https://huggingface.co/settings/tokens
2. Sign up/login to Hugging Face
3. Create new token (read permissions)
4. Copy the token

### Step 6: Deploy

1. **Add Environment Variables:**
   - In Vercel project dashboard
   - Go to Settings → Environment Variables
   - Add all the API keys and database URL

2. **Deploy:**
   - Click "Deploy" in Vercel dashboard
   - Wait for build to complete (2-5 minutes)
   - Your site will be live at: `your-project-name.vercel.app`

### Step 7: Test Your Site

1. **Visit your deployed site**
2. **Test these features:**
   - Homepage loads correctly
   - Resume analysis works (upload a PDF)
   - Job search returns results
   - Mobile responsiveness

### Step 8: Custom Domain (Optional)

1. **Add Custom Domain:**
   - In Vercel dashboard → Settings → Domains
   - Add your domain (e.g., optcareerconnect.com)
   - Follow DNS configuration instructions
   - SSL certificate is automatic

## 🔧 Troubleshooting

### Build Fails:
- Check environment variables are correct
- Ensure all API keys are valid
- Verify database URL format

### Database Issues:
- Make sure schema SQL ran successfully
- Check DATABASE_URL has correct format
- Verify SSL connection settings

### API Issues:
- Confirm API keys are active
- Check rate limits on free tiers
- Verify API endpoints are accessible

## 📞 Need Help?

If you encounter any issues:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Test API keys individually
4. Check the DEPLOYMENT_GUIDE.md for details

## 🎯 Success Checklist

- [ ] GitHub repository created and code pushed
- [ ] Vercel account created and connected to GitHub
- [ ] Environment variables configured
- [ ] Vercel Postgres database created and schema applied
- [ ] Free API keys obtained and added
- [ ] Deployment successful
- [ ] Site loads and features work
- [ ] Mobile responsive
- [ ] SEO working (check meta tags)

**Your OPT Career Connect platform will be live and fully functional! 🚀**
