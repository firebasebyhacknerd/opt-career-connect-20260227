# OPT Career Connect 🎓

**AI-Powered Job Platform for International Students on OPT, CPT & F1 Visa**

## 🌟 About

OPT Career Connect is a comprehensive, free platform designed specifically for international students in the USA. We leverage artificial intelligence to help students find OPT-friendly jobs, optimize their resumes, and navigate their career journey from F1 visa to H1B sponsorship.

## 🎯 Mission

*Empowering international students to achieve their American dream through AI-powered career guidance and job opportunities.*

## ✨ Key Features

### 🤖 AI-Powered Resume Analysis
- **Instant resume scoring** against job descriptions
- **ATS optimization** suggestions
- **Keyword recommendations** for better matching
- **Format improvements** for professional appearance

### 🔍 Smart Job Search
- **OPT/CPT filtering** for visa-friendly positions
- **AI job matching** based on skills and preferences
- **Multi-source aggregation** from Indeed, LinkedIn, and more
- **Real-time notifications** for new opportunities

### 📊 Career Dashboard
- **Application tracking** and status updates
- **Visa deadline reminders** for OPT/CPT
- **Success metrics** and analytics
- **Personalized recommendations**

### 👥 Community & Support
- **Success stories** from fellow students
- **Career guidance** resources
- **Mentorship opportunities**
- **Networking events** and workshops

## 🚀 Technology Stack

- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Vercel Functions (Serverless)
- **Database**: Vercel Postgres
- **AI Services**: Groq API + Hugging Face
- **File Processing**: PDF.js
- **Deployment**: Vercel (Free Tier)

## 📈 SEO & Marketing Strategy

### Primary Keywords
- OPT jobs USA
- CPT internships
- F1 visa careers
- International student jobs
- AI resume analysis

### Content Strategy
- Educational blog posts
- Student success stories
- Career guidance videos
- Industry insights

### Growth Channels
- University partnerships
- Social media marketing
- Referral programs
- Content marketing

## 🎨 Brand Identity

### Colors
- **Primary Blue**: #2563eb (Trust, Professional)
- **Primary Purple**: #7c3aed (Innovation, AI)
- **Primary Teal**: #0891b2 (Growth, Success)
- **Secondary Orange**: #f97316 (Energy, Action)

### Typography
- **Primary Font**: Inter (Clean, Modern)
- **Display Font**: Poppins (Headlines)

### Brand Voice
- Empowering & Encouraging
- Professional yet Approachable
- Innovative & Forward-thinking
- Supportive & Community-focused

## 📱 Features Overview

### For Students
- **Free resume analysis** with AI suggestions
- **Personalized job matching** based on skills
- **Visa status tracking** and deadline reminders
- **Application management** system
- **Career resources** and guidance

### For Universities
- **Career services integration**
- **Student success tracking**
- **Employer partnership opportunities**
- **Analytics and reporting**

### For Employers
- **Access to qualified international talent**
- **Visa sponsorship guidance**
- **Diverse candidate pool**
- **Streamlined hiring process**

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ installed
- Git for version control
- Free API keys (Groq, Hugging Face)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/opt-career-connect.git
cd opt-career-connect
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Add your API keys to .env.local
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

```bash
# AI Services
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
HF_TOKEN=your_huggingface_token
GROQ_MODEL=mixtral-8x7b-32768
AI_PROVIDER=groq
AI_FALLBACK_ENABLED=true

# Database
POSTGRES_URL=your_vercel_postgres_url
DATABASE_URL=your_vercel_postgres_url
JOBS_SOURCE_MODE=auto
JOBS_FALLBACK_ENABLED=true
JOBS_ADVANCED_MATCHING_ENABLED=true

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
GOOGLE_SITE_VERIFICATION=your_verification_token

# Admin Console
ADMIN_PANEL_PASSWORD=strong_admin_password
ADMIN_SESSION_SECRET=random_64_char_secret
ADMIN_ENCRYPTION_KEY=random_64_char_secret

# Analytics
GOOGLE_ANALYTICS_ID=your_ga_id
```

## 📊 Project Structure

```
opt-career-connect/
├── pages/                  # Next.js pages
│   ├── index.js           # Homepage
│   ├── jobs/              # Job search
│   ├── resume/            # Resume analysis
│   ├── dashboard/         # User dashboard
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # UI components
│   ├── forms/             # Form components
│   └── layout/            # Layout components
├── lib/                   # Utility functions
│   ├── ai/                # AI integrations
│   ├── database/          # Database helpers
│   └── utils/             # General utilities
├── styles/                # CSS files
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🎯 Development Roadmap

### Phase 1: MVP (Weeks 1-4)
- [x] User authentication
- [x] Resume upload and analysis
- [x] Basic job search
- [x] Simple matching algorithm
- [x] Dashboard functionality

### Phase 2: Enhanced Features (Weeks 5-8)
- [ ] Advanced AI matching
- [ ] Visa status tracking
- [ ] Application management
- [ ] Company insights
- [ ] Mobile responsiveness

### Phase 3: Ecosystem (Weeks 9-12)
- [ ] Community features
- [ ] Mentorship program
- [ ] Webinar platform
- [ ] Mobile app
- [ ] Advanced analytics

## 📈 Performance Metrics

### Key KPIs
- **User Acquisition**: Sign-ups, sources, cost
- **Engagement**: Session duration, page views
- **Conversion**: Resume uploads, job applications
- **Retention**: Daily active users, churn rate
- **Success**: Job placements, interview rates

### Analytics Tools
- Google Analytics 4
- Vercel Analytics
- Hotjar (User behavior)
- Custom event tracking

## 🔒 Security & Privacy

### Data Protection
- **GDPR compliant** data handling
- **Encrypted data storage**
- **Secure API endpoints**
- **User data anonymization**

### Privacy Features
- **Resume privacy controls**
- **Data export options**
- **Account deletion**
- **Transparent data usage**

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute
1. **Report bugs** - Create an issue for any problems
2. **Suggest features** - Share your ideas for improvements
3. **Submit pull requests** - Fix bugs or add features
4. **Improve documentation** - Help us make docs better
5. **Share success stories** - Inspire other students

### Development Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation
- Use semantic commit messages
- Be respectful and inclusive

## 📞 Support & Contact

### Get Help
- **Email**: support@optcareerconnect.com
- **Discord**: [Join our community](https://discord.gg/optcareerconnect)
- **Twitter**: [@OPTCareerConnect](https://twitter.com/OPTCareerConnect)
- **LinkedIn**: [OPT Career Connect](https://linkedin.com/company/opt-career-connect)

### Resources
- [Documentation](https://docs.optcareerconnect.com)
- [Blog](https://blog.optcareerconnect.com)
- [Success Stories](https://optcareerconnect.com/success)
- [FAQ](https://optcareerconnect.com/faq)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vercel** for hosting and infrastructure
- **Groq** for AI API services
- **Hugging Face** for open-source models
- **International students** who inspire our work
- **University partners** who support our mission

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/opt-career-connect&type=Date)](https://star-history.com/#yourusername/opt-career-connect&Date)

---

**Made with ❤️ for international students pursuing their American dreams**

*Your Gateway to American Dreams* 🇺🇸
