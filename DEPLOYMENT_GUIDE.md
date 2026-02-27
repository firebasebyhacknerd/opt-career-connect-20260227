# OPT Career Connect - Deployment Guide

## 🚀 Vercel Deployment Instructions

### Prerequisites
1. **GitHub Account** - Create a repository for the project
2. **Vercel Account** - Sign up at vercel.com (free tier)
3. **API Keys** - Get free API keys for external services

### Step 1: Prepare the Codebase

#### 1.1 Install Dependencies
```bash
cd D:\opt-career-connect
npm install
```

#### 1.2 Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
# AI Services (Get free keys)
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
HF_TOKEN=your_hugging_face_token_here
GROQ_MODEL=mixtral-8x7b-32768
AI_PROVIDER=groq
AI_FALLBACK_ENABLED=true

# Database (Vercel will provide this)
DATABASE_URL=your_vercel_postgres_url_here
POSTGRES_URL=your_vercel_postgres_url_here

# NextAuth (Optional for user authentication)
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_random_secret_here
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
GOOGLE_SITE_VERIFICATION=your_google_verification_token

# Admin Config Console (required for /admin/config)
ADMIN_PANEL_PASSWORD=strong_admin_password
ADMIN_SESSION_SECRET=random_64_char_secret
ADMIN_ENCRYPTION_KEY=random_64_char_secret

# Optional: Analytics
GOOGLE_ANALYTICS_ID=your_ga_id_here
```

### Step 2: Set Up Vercel Postgres Database

#### 2.1 Create Database
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project (or create new)
3. Go to **Storage** tab → **Create Database** → **Postgres**
4. Choose **Hobby** plan (free)

#### 2.2 Get Connection String
1. In Vercel dashboard, go to **Storage** → **Postgres**
2. Copy the **DATABASE_URL** from the **Settings** tab
3. Add it to your environment variables

#### 2.3 Initialize Database Schema
1. In Vercel dashboard, go to **Storage** → **Postgres** → **Query**
2. Copy and paste the SQL from `database-schema.sql`
3. Run the query to create all tables

### Step 3: Get Free API Keys

#### 3.1 Groq API (Free Tier)
1. Go to [groq.com](https://groq.com)
2. Sign up for free account
3. Create API key
4. Copy to environment variables

#### 3.2 Google Gemini API (Free Tier)
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign up with Google account
3. Create API key
4. Copy to environment variables

#### 3.3 Hugging Face API (Free Tier)
1. Go to [Hugging Face](https://huggingface.co)
2. Sign up for free account
3. Create API token
4. Copy to environment variables

### Step 4: Deploy to Vercel

#### 4.1 Push to GitHub
```bash
# Initialize Git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: OPT Career Connect platform"

# Create GitHub repository and push
# (Follow GitHub's instructions to create and push to repo)
```

#### 4.2 Deploy on Vercel

**Option A: Automatic Deployment**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js
5. Configure environment variables:
   - Click **"Environment Variables"**
   - Add all variables from `.env.local`
6. Click **"Deploy"**

**Option B: CLI Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy project
vercel --prod

# Follow prompts to set environment variables
```

### Step 5: Configure Domain (Optional)

#### 5.1 Custom Domain
1. Go to Vercel project dashboard
2. Go to **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for SSL certificate (automatic)

#### 5.2 Free Vercel Domain
- Vercel provides `your-project-name.vercel.app` for free
- This is perfectly fine for initial deployment

### Step 6: Post-Deployment Setup

#### 6.1 Verify Database Connection
1. Go to your deployed site
2. Test the resume analysis feature
3. Check if job search works
4. Verify database queries

#### 6.2 Initialize Admin Config Console
1. Open `/admin/config` on your deployed app
2. Login using `ADMIN_PANEL_PASSWORD`
3. Verify settings load with source badges (`db`, `env`, `default`)
4. Run **Test Groq Connection**
5. Save one value and confirm it appears under **Recent Changes**

#### 6.3 Set Up Analytics (Optional)
```bash
# Add Google Analytics
# 1. Get GA4 tracking ID
# 2. Add to Vercel environment variables
# 3. Deploy again
```

#### 6.4 Configure SEO
- Meta tags are already implemented
- Sitemap will auto-generate
- Submit to Google Search Console
- Add robots.txt (already configured)

### Step 7: Testing & Monitoring

#### 7.1 Test Core Features
- [ ] Homepage loads correctly
- [ ] Resume analysis works
- [ ] Job search functions
- [ ] Mobile responsiveness
- [ ] Form submissions

#### 7.2 Performance Monitoring
- Check Vercel analytics
- Monitor function execution times
- Track error rates
- Monitor database queries

#### 7.3 Security Checks
- Environment variables are secure
- API keys are protected
- Admin console is password protected
- CORS is configured
- Rate limiting is in place

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Issues
```bash
# Check DATABASE_URL format
# Check POSTGRES_URL format
# Ensure SSL is enabled
# Verify table creation
```

#### Admin Console Issues
```bash
# Verify ADMIN_PANEL_PASSWORD is set
# Verify ADMIN_SESSION_SECRET is set
# Verify ADMIN_ENCRYPTION_KEY is set
# Ensure app_settings and app_settings_audit tables exist
```

#### API Key Issues
```bash
# Check API key validity
# Verify rate limits
# Check API endpoints
```

#### Build Failures
```bash
# Clear Vercel cache
# Check TypeScript errors
# Verify dependencies
```

### Support Resources
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Community**: https://vercel.community
- **GitHub Issues**: Create issues in your repo

## 📊 Deployment Checklist

- [ ] Project pushed to GitHub
- [ ] Vercel account created
- [ ] Environment variables configured
- [ ] Database created and schema applied
- [ ] API keys obtained and added
- [ ] Admin env vars configured (ADMIN_*)
- [ ] Initial deployment successful
- [ ] Domain configured (optional)
- [ ] Core features tested
- [ ] Performance verified
- [ ] SEO configured
- [ ] Analytics set up (optional)

## 🚀 Post-Launch Steps

1. **Monitor Performance**
   - Check Vercel analytics
   - Monitor user feedback
   - Track conversion rates

2. **Content Marketing**
   - Write blog posts
   - Create success stories
   - Build backlinks

3. **User Acquisition**
   - University partnerships
   - Social media marketing
   - Referral programs

4. **Feature Development**
   - Mobile app development
   - Advanced AI features
   - Premium features

## 💰 Cost Breakdown (Free Tier)

| Service | Cost | Usage Limits |
|---------|------|--------------|
| Vercel Hosting | $0 | 100GB bandwidth, 100K functions |
| Vercel Postgres | $0 | 512MB storage, 1K queries/day |
| Groq API | $0 | Generous free tier |
| Google Gemini | $0 | Free tier available |
| Hugging Face | $0 | Free tier available |
| **Total** | **$0** | **Fully functional** |

## 🎯 Success Metrics

### Launch Goals
- [ ] Site loads in <3 seconds
- [ ] Resume analysis works perfectly
- [ ] Job search returns results
- [ ] Mobile responsive design
- [ ] No critical errors

### Week 1 Goals
- [ ] 100+ unique visitors
- [ ] 10+ resume analyses
- [ ] 5+ job applications
- [ ] Positive user feedback

### Month 1 Goals
- [ ] 1,000+ unique visitors
- [ ] 100+ resume analyses
- [ ] 50+ job applications
- [ ] 10+ success stories

---

**Your OPT Career Connect platform is now ready for deployment! 🚀**

Follow these steps carefully, and you'll have a fully functional, AI-powered job platform for international students running on Vercel for free.

Need help with any step? Check the troubleshooting section or create an issue in your GitHub repository.
