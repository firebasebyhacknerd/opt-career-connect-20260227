# OPT Career Connect - UI/UX Design System

## 🎨 Design Philosophy

### Core Principles
1. **Simplicity First** - Clean, intuitive interface that reduces cognitive load
2. **Accessibility by Default** - WCAG 2.1 AA compliant design for all users
3. **Mobile-First Approach** - Responsive design that works seamlessly on all devices
4. **Performance Optimized** - Fast loading and smooth interactions
5. **Trust & Credibility** - Professional design that builds user confidence

### User-Centered Design Process
- **Research**: Understand international student needs and pain points
- **Empathy**: Design with compassion for the student journey
- **Testing**: Continuous user testing and iteration
- **Accessibility**: Ensure equal access for all users
- **Inclusivity**: Represent diverse international student community

---

## 🎯 User Experience Strategy

### User Personas

#### Primary Persona: "Maria Rodriguez"
```yaml
Name: Maria Rodriguez
Age: 24
Background: Computer Science graduate from India
Visa Status: F1 → OPT (6 months remaining)
Goals: 
  - Find a software engineering job
  - Get H1B sponsorship
  - Build professional network
Pain Points:
  - Resume gets rejected by ATS systems
  - Unclear which companies sponsor visas
  - Limited time remaining on OPT
  - Competition from local candidates
Needs:
  - Resume optimization
  - Visa-friendly job listings
  - Application tracking
  - Interview preparation
```

#### Secondary Persona: "Ahmed Hassan"
```yaml
Name: Ahmed Hassan
Age: 22
Background: Business student from Egypt
Visa Status: F1 → CPT
Goals:
  - Find internship opportunities
  - Gain US work experience
  - Network with professionals
Pain Points:
  - Limited internship experience
  - Unclear CPT requirements
  - Competition for internships
  - Building professional network
Needs:
  - Internship search
  - CPT guidance
  - Networking opportunities
  - Resume building
```

### User Journey Mapping

#### New User Journey
```
Awareness → Consideration → Registration → Onboarding → 
Resume Upload → AI Analysis → Job Discovery → Application → 
Interview → Success → Advocacy
```

#### Key Touchpoints
1. **Landing Page**: First impression and value proposition
2. **Sign Up**: Simple, frictionless registration
3. **Resume Upload**: Seamless file upload with AI analysis
4. **Job Search**: Intuitive search and filtering
5. **Application**: One-click apply process
6. **Dashboard**: Comprehensive activity overview

---

## 🎨 Visual Design System

### Layout System

#### Grid System
```css
:root {
  /* Grid Breakpoints */
  --breakpoint-xs: 0px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Grid Columns */
  --grid-cols: 12;
  --grid-gap: 1rem;
  
  /* Container Max Widths */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

#### Spacing System
```css
:root {
  /* Spacing Scale (8px base unit) */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Component Library

#### Button System
```jsx
// Button Component Variants
const ButtonVariants = {
  // Primary Buttons
  primary: {
    backgroundColor: "var(--gradient-primary)",
    color: "white",
    padding: "var(--space-3) var(--space-6)",
    borderRadius: "0.5rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    hover: {
      transform: "translateY(-2px)",
      boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)"
    }
  },
  
  // Secondary Buttons
  secondary: {
    backgroundColor: "transparent",
    color: "var(--primary-blue)",
    border: "2px solid var(--primary-blue)",
    padding: "var(--space-3) var(--space-6)",
    borderRadius: "0.5rem",
    fontWeight: "600",
    hover: {
      backgroundColor: "var(--primary-blue)",
      color: "white"
    }
  },
  
  // Ghost Buttons
  ghost: {
    backgroundColor: "transparent",
    color: "var(--primary-blue)",
    padding: "var(--space-3) var(--space-6)",
    borderRadius: "0.5rem",
    fontWeight: "600",
    hover: {
      backgroundColor: "rgba(37, 99, 235, 0.1)"
    }
  }
};
```

#### Card System
```jsx
// Card Component
const Card = ({ variant = "default", children, ...props }) => {
  const variants = {
    default: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "var(--space-6)",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      border: "1px solid var(--very-light-gray)",
      hover: {
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transform: "translateY(-2px)"
      }
    },
    
    elevated: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "var(--space-6)",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      border: "1px solid var(--very-light-gray)",
      hover: {
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
        transform: "translateY(-4px)"
      }
    },
    
    outlined: {
      backgroundColor: "transparent",
      borderRadius: "0.75rem",
      padding: "var(--space-6)",
      border: "2px solid var(--primary-blue)",
      hover: {
        backgroundColor: "rgba(37, 99, 235, 0.05)"
      }
    }
  };
  
  return (
    <div style={variants[variant]} {...props}>
      {children}
    </div>
  );
};
```

#### Form System
```jsx
// Input Component
const Input = ({ 
  label, 
  error, 
  helperText, 
  variant = "default", 
  ...props 
}) => {
  const variants = {
    default: {
      border: "1px solid var(--very-light-gray)",
      borderRadius: "0.5rem",
      padding: "var(--space-3) var(--space-4)",
      fontSize: "var(--text-base)",
      focus: {
        borderColor: "var(--primary-blue)",
        boxShadow: "0 0 0 3px rgba(37, 99, 235, 0.1)"
      }
    },
    
    error: {
      borderColor: "var(--secondary-orange)",
      focus: {
        borderColor: "var(--secondary-orange)",
        boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.1)"
      }
    }
  };
  
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
        </label>
      )}
      <input 
        style={variants[error ? "error" : "default"]}
        {...props}
      />
      {error && (
        <span className="form-error">
          {error}
        </span>
      )}
      {helperText && (
        <span className="form-helper">
          {helperText}
        </span>
      )}
    </div>
  );
};
```

---

## 📱 Page Designs

### Homepage Design

#### Hero Section
```jsx
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-overlay" />
        <div className="pattern-overlay" />
      </div>
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">
              Land Your Dream Job with AI
            </h1>
            <p className="hero-subheadline">
              The #1 free platform for OPT & CPT students. 
              AI-powered resume analysis, job matching, and career guidance.
            </p>
            <div className="hero-actions">
              <Button variant="primary" size="large">
                Start Free
              </Button>
              <Button variant="secondary" size="large">
                Watch Demo
              </Button>
            </div>
          </div>
          
          <div className="hero-visual">
            <CareerGrowthAnimation />
            <div className="floating-elements">
              <FloatingIcon type="resume" />
              <FloatingIcon type="ai" />
              <FloatingIcon type="career" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="trust-badges">
        <div className="container">
          <div className="badges-grid">
            <Badge icon="university" text="50+ University Partners" />
            <Badge icon="students" text="10,000+ Students Helped" />
            <Badge icon="companies" text="500+ Companies" />
            <Badge icon="success" text="95% Success Rate" />
          </div>
        </div>
      </div>
    </section>
  );
};
```

#### Features Section
```jsx
const FeaturesSection = () => {
  const features = [
    {
      icon: "ai-brain",
      title: "AI Resume Analysis",
      description: "Get instant AI-powered resume analysis with ATS optimization and keyword suggestions.",
      color: "var(--primary-purple)"
    },
    {
      icon: "search-match",
      title: "Smart Job Matching",
      description: "Our AI matches you with OPT-friendly jobs based on your skills and preferences.",
      color: "var(--primary-blue)"
    },
    {
      icon: "visa-tracking",
      title: "Visa Status Tracking",
      description: "Track your OPT/CPT deadlines and get reminders for important dates.",
      color: "var(--primary-teal)"
    },
    {
      icon: "application-manager",
      title: "Application Management",
      description: "Organize and track all your job applications in one place.",
      color: "var(--secondary-green)"
    }
  ];
  
  return (
    <section className="features">
      <div className="container">
        <div className="section-header">
          <h2>Everything You Need to Succeed</h2>
          <p>Powerful features designed specifically for international students</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
```

### Resume Analysis Page

#### Upload Section
```jsx
const ResumeUploadSection = () => {
  const [uploadState, setUploadState] = useState('idle');
  
  return (
    <section className="resume-upload">
      <div className="container">
        <div className="upload-container">
          <div className="upload-area">
            <div className="upload-icon">
              <CloudUploadIcon />
            </div>
            <h3>Upload Your Resume</h3>
            <p>Drag & drop your resume or click to browse</p>
            <p className="upload-formats">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
            <FileInput 
              accept=".pdf,.doc,.docx"
              maxSize={5242880}
              onUpload={handleFileUpload}
            />
          </div>
          
          <div className="upload-progress">
            {uploadState === 'uploading' && (
              <ProgressBar progress={uploadProgress} />
            )}
            {uploadState === 'analyzing' && (
              <AnalysisAnimation />
            )}
            {uploadState === 'complete' && (
              <SuccessMessage />
            )}
          </div>
        </div>
        
        <div className="analysis-steps">
          <StepIndicator 
            steps={[
              "Upload Resume",
              "AI Analysis", 
              "Get Suggestions",
              "Apply to Jobs"
            ]}
            currentStep={currentStep}
          />
        </div>
      </div>
    </section>
  );
};
```

#### Results Section
```jsx
const AnalysisResults = ({ results }) => {
  return (
    <section className="analysis-results">
      <div className="container">
        <div className="results-header">
          <h2>Your Resume Analysis</h2>
          <div className="overall-score">
            <CircularScore value={results.overallScore} />
            <span>Overall Score</span>
          </div>
        </div>
        
        <div className="results-grid">
          <Card className="score-breakdown">
            <h3>Score Breakdown</h3>
            <ScoreBar 
              label="ATS Compatibility" 
              value={results.atsScore}
              color="var(--primary-blue)"
            />
            <ScoreBar 
              label="Keyword Optimization" 
              value={results.keywordScore}
              color="var(--primary-purple)"
            />
            <ScoreBar 
              label="Format & Structure" 
              value={results.formatScore}
              color="var(--primary-teal)"
            />
            <ScoreBar 
              label="Content Quality" 
              value={results.contentScore}
              color="var(--secondary-green)"
            />
          </Card>
          
          <Card className="suggestions">
            <h3>AI Suggestions</h3>
            <SuggestionList suggestions={results.suggestions} />
          </Card>
          
          <Card className="keywords">
            <h3>Recommended Keywords</h3>
            <KeywordCloud keywords={results.keywords} />
          </Card>
        </div>
        
        <div className="action-buttons">
          <Button variant="primary" size="large">
            Apply Suggestions
          </Button>
          <Button variant="secondary" size="large">
            Download Report
          </Button>
        </div>
      </div>
    </section>
  );
};
```

### Job Search Page

#### Search Interface
```jsx
const JobSearchInterface = () => {
  return (
    <section className="job-search">
      <div className="container">
        <div className="search-header">
          <h1>Find Your Dream Job</h1>
          <p>Search thousands of OPT-friendly opportunities</p>
        </div>
        
        <div className="search-filters">
          <SearchBar 
            placeholder="Search jobs, companies, or keywords..."
            onSearch={handleSearch}
          />
          
          <FilterPanel>
            <FilterGroup title="Visa Status">
              <Checkbox label="OPT Friendly" />
              <Checkbox label="CPT Opportunities" />
              <Checkbox label="H1B Sponsorship" />
            </FilterGroup>
            
            <FilterGroup title="Job Type">
              <Checkbox label="Full-time" />
              <Checkbox label="Part-time" />
              <Checkbox label="Internship" />
              <Checkbox label="Remote" />
            </FilterGroup>
            
            <FilterGroup title="Location">
              <LocationSearch />
            </FilterGroup>
            
            <FilterGroup title="Experience Level">
              <Checkbox label="Entry Level" />
              <Checkbox label="Mid Level" />
              <Checkbox label="Senior Level" />
            </FilterGroup>
          </FilterPanel>
        </div>
        
        <div className="search-results">
          <ResultsHeader 
            totalResults={totalResults}
            sortBy={sortBy}
            viewMode={viewMode}
          />
          
          <JobGrid>
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </JobGrid>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};
```

#### Job Card Component
```jsx
const JobCard = ({ job }) => {
  return (
    <Card className="job-card">
      <div className="job-header">
        <CompanyLogo src={job.companyLogo} alt={job.company} />
        <div className="job-info">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">{job.company}</p>
          <div className="job-meta">
            <span className="location">{job.location}</span>
            <span className="posted-time">{job.postedTime}</span>
          </div>
        </div>
        <SaveButton jobId={job.id} saved={job.saved} />
      </div>
      
      <div className="job-description">
        <p>{job.description.substring(0, 150)}...</p>
      </div>
      
      <div className="job-tags">
        <Tag variant="visa">OPT Friendly</Tag>
        <Tag variant="remote">{job.remote ? 'Remote' : 'On-site'}</Tag>
        <Tag variant="level">{job.level}</Tag>
        <Tag variant="type">{job.type}</Tag>
      </div>
      
      <div className="job-footer">
        <div className="match-score">
          <CircularScore value={job.matchScore} size="small" />
          <span>AI Match</span>
        </div>
        
        <div className="job-actions">
          <Button variant="ghost" size="small">
            View Details
          </Button>
          <Button variant="primary" size="small">
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
```

### Dashboard Design

#### Dashboard Layout
```jsx
const Dashboard = () => {
  return (
    <div className="dashboard">
      <DashboardHeader>
        <WelcomeMessage user={user} />
        <VisaStatusCard visa={user.visaStatus} />
      </DashboardHeader>
      
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <NavigationMenu>
            <NavItem icon="dashboard" active>
              Dashboard
            </NavItem>
            <NavItem icon="search">Job Search</NavItem>
            <NavItem icon="resume">My Resume</NavItem>
            <NavItem icon="applications">Applications</NavItem>
            <NavItem icon="analytics">Analytics</NavItem>
            <NavItem icon="settings">Settings</NavItem>
          </NavigationMenu>
        </div>
        
        <div className="dashboard-main">
          <StatsGrid>
            <StatCard 
              label="Jobs Applied" 
              value={stats.applied} 
              change="+12%"
              icon="applications"
            />
            <StatCard 
              label="Interviews" 
              value={stats.interviews} 
              change="+8%"
              icon="interview"
            />
            <StatCard 
              label="Match Score" 
              value={stats.avgScore} 
              change="+5%"
              icon="score"
            />
            <StatCard 
              label="Profile Views" 
              value={stats.views} 
              change="+20%"
              icon="views"
            />
          </StatsGrid>
          
          <RecentActivity />
          <RecommendedJobs />
          <ApplicationTracker />
        </div>
      </div>
    </div>
  );
};
```

---

## 🎨 Interactive Elements

### Micro-interactions

#### Button Hover Effects
```css
.button-primary {
  background: var(--gradient-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.button-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.button-primary:hover::before {
  left: 100%;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.3);
}
```

#### Card Hover Effects
```css
.job-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.job-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.job-card:hover .job-title {
  color: var(--primary-blue);
}

.job-card:hover .match-score {
  transform: scale(1.1);
}
```

#### Loading Animations
```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### Form Interactions

#### Input Focus States
```css
.form-input {
  transition: all 0.2s ease;
  border: 2px solid var(--very-light-gray);
}

.form-input:focus {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  outline: none;
}

.form-input:valid {
  border-color: var(--secondary-green);
}

.form-input:invalid {
  border-color: var(--secondary-orange);
}
```

#### Checkbox Custom Styling
```css
.checkbox-custom {
  position: relative;
  padding-left: 1.5rem;
  cursor: pointer;
}

.checkbox-custom input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1.25rem;
  width: 1.25rem;
  background-color: white;
  border: 2px solid var(--very-light-gray);
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.checkbox-custom:hover input ~ .checkmark {
  border-color: var(--primary-blue);
}

.checkbox-custom input:checked ~ .checkmark {
  background-color: var(--primary-blue);
  border-color: var(--primary-blue);
}

.checkbox-custom .checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 0.3rem;
  top: 0.1rem;
  width: 0.3rem;
  height: 0.6rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-custom input:checked ~ .checkmark:after {
  display: block;
}
```

---

## 📱 Responsive Design

### Mobile-First Breakpoints

#### Mobile Layout (320px - 768px)
```css
/* Mobile Navigation */
.mobile-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4);
  background: white;
  border-bottom: 1px solid var(--very-light-gray);
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  height: 100vh;
  background: white;
  transition: left 0.3s ease;
  z-index: 1000;
}

.mobile-menu.open {
  left: 0;
}

/* Mobile Cards */
.job-card {
  margin-bottom: var(--space-4);
  padding: var(--space-4);
}

.job-card .job-footer {
  flex-direction: column;
  gap: var(--space-3);
}

/* Mobile Dashboard */
.dashboard-content {
  flex-direction: column;
}

.dashboard-sidebar {
  order: 2;
  width: 100%;
}

.dashboard-main {
  order: 1;
  width: 100%;
}
```

#### Tablet Layout (768px - 1024px)
```css
@media (min-width: 768px) {
  .mobile-nav {
    display: none;
  }
  
  .desktop-nav {
    display: flex;
  }
  
  .job-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
  
  .dashboard-content {
    flex-direction: row;
  }
  
  .dashboard-sidebar {
    width: 250px;
  }
  
  .dashboard-main {
    flex: 1;
    margin-left: var(--space-6);
  }
}
```

#### Desktop Layout (1024px+)
```css
@media (min-width: 1024px) {
  .job-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .dashboard-sidebar {
    width: 300px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Touch Interactions

#### Mobile Gestures
```css
/* Swipeable Cards */
.swipeable-card {
  touch-action: pan-x;
  transition: transform 0.3s ease;
}

.swipeable-card.swiped {
  transform: translateX(-100px);
}

/* Pull to Refresh */
.pull-to-refresh {
  position: relative;
  padding-top: var(--space-4);
}

.pull-to-refresh.pulling {
  padding-top: var(--space-12);
}

/* Mobile Tap Targets */
.mobile-button {
  min-height: 44px;
  min-width: 44px;
  padding: var(--space-3) var(--space-4);
}
```

---

## 🎯 Accessibility Features

### WCAG 2.1 AA Compliance

#### Semantic HTML
```jsx
// Proper heading structure
<main>
  <h1>Page Title</h1>
  <section>
    <h2>Section Title</h2>
    <h3>Subsection Title</h3>
  </section>
</main>

// Accessible forms
<form role="form" aria-labelledby="form-title">
  <h2 id="form-title">Resume Upload</h2>
  <label for="resume-file">Upload Resume</label>
  <input 
    id="resume-file"
    type="file"
    aria-describedby="file-help"
    aria-required="true"
  />
  <div id="file-help">PDF, DOC, or DOCX files up to 5MB</div>
</form>
```

#### ARIA Labels
```jsx
// Accessible buttons
<button 
  aria-label="Upload resume file"
  aria-describedby="upload-help"
>
  <UploadIcon />
  Upload Resume
</button>

// Accessible progress indicators
<div 
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin="0"
  aria-valuemax="100"
  aria-label="Resume analysis progress"
>
  {progress}% Complete
</div>

// Accessible notifications
<div 
  role="alert"
  aria-live="polite"
  aria-atomic="true"
>
  Resume uploaded successfully!
</div>
```

#### Keyboard Navigation
```css
/* Focus styles */
.focusable:focus {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-blue);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}

/* Tab order */
.tab-container {
  display: flex;
  flex-direction: column;
}

.tab-item {
  order: 1;
}

.tab-content {
  order: 2;
}
```

#### Screen Reader Support
```jsx
// Screen reader only text
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Descriptive labels
<button>
  <span className="sr-only">Apply to Software Engineer position at</span>
  Tech Company Inc
</button>

// Status announcements
const StatusAnnouncer = ({ message }) => {
  useEffect(() => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, [message]);
  
  return null;
};
```

---

## 🎨 Animation & Transitions

### Page Transitions
```css
/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeIn 0.6s ease-out;
}

/* Slide in animation */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.sidebar-enter {
  animation: slideIn 0.4s ease-out;
}
```

### Loading States
```jsx
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner" role="status" aria-label="Loading">
      <div className="spinner-circle"></div>
      <span className="sr-only">Loading content...</span>
    </div>
  );
};

const SkeletonLoader = ({ lines = 3 }) => {
  return (
    <div className="skeleton-container" aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="skeleton-line" />
      ))}
    </div>
  );
};
```

### Success/Error States
```jsx
const StatusMessage = ({ type, message }) => {
  const icons = {
    success: <CheckCircleIcon />,
    error: <XCircleIcon />,
    warning: <AlertTriangleIcon />,
    info: <InfoIcon />
  };
  
  return (
    <div className={`status-message status-${type}`} role="alert">
      <div className="status-icon">
        {icons[type]}
      </div>
      <div className="status-text">
        {message}
      </div>
    </div>
  );
};
```

---

## 📊 Performance Optimization

### Image Optimization
```jsx
const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <picture>
      <source 
        srcSet={`${src}?format=webp&w=800`} 
        type="image/webp"
      />
      <source 
        srcSet={`${src}?format=jpg&w=800`} 
        type="image/jpeg"
      />
      <img 
        src={`${src}?format=jpg&w=800`}
        alt={alt}
        loading="lazy"
        {...props}
      />
    </picture>
  );
};
```

### Code Splitting
```jsx
// Lazy loading components
const LazyJobCard = lazy(() => import('./JobCard'));
const LazyDashboard = lazy(() => import('./Dashboard'));

// Dynamic imports
const loadFeature = async (featureName) => {
  const module = await import(`./features/${featureName}`);
  return module.default;
};
```

### Caching Strategy
```jsx
// Service worker for offline support
const cacheName = 'opt-career-connect-v1';
const assetsToCache = [
  '/',
  '/static/js/main.js',
  '/static/css/main.css',
  '/static/images/logo.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => cache.addAll(assetsToCache))
  );
});
```

---

## 🧪 Testing & Quality Assurance

### Component Testing
```jsx
// Button component test
describe('Button', () => {
  it('renders with correct styles', () => {
    render(<Button variant="primary">Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-primary');
  });
  
  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
  
  it('is accessible', async () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeAccessible();
  });
});
```

### User Testing
```jsx
// User journey testing
describe('User Journey', () => {
  it('complete resume upload flow', async () => {
    render(<App />);
    
    // Navigate to resume upload
    fireEvent.click(screen.getByText('Upload Resume'));
    
    // Upload file
    const fileInput = screen.getByLabelText('Upload Resume');
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    
    // Wait for analysis
    await waitFor(() => 
      expect(screen.getByText('Analysis Complete')).toBeInTheDocument()
    );
    
    // View results
    expect(screen.getByText('Overall Score')).toBeInTheDocument();
  });
});
```

This comprehensive UI/UX design system ensures a professional, accessible, and delightful user experience for OPT Career Connect users across all devices and touchpoints.
