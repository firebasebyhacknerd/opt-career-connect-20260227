-- Database Schema for OPT Career Connect
-- Vercel Postgres Database

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  university VARCHAR(255),
  major VARCHAR(255),
  graduation_date DATE,
  visa_status VARCHAR(50) NOT NULL, -- OPT, CPT, F1, H1B, etc.
  visa_start_date DATE,
  visa_end_date DATE,
  profile_image TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  location VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resumes Table
CREATE TABLE IF NOT EXISTS resumes (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  content TEXT, -- Extracted text content
  skills TEXT[], -- Array of skills
  experience_years INTEGER,
  education_level VARCHAR(100),
  analysis_score INTEGER, -- Overall score 0-100
  ats_compatibility_score INTEGER, -- ATS compatibility 0-100
  keyword_score INTEGER, -- Keyword optimization 0-100
  format_score INTEGER, -- Format quality 0-100
  content_score INTEGER, -- Content quality 0-100
  ai_suggestions TEXT, -- JSON string of AI suggestions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Listings Table
CREATE TABLE IF NOT EXISTS job_listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  company_logo TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  responsibilities TEXT,
  location VARCHAR(255),
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency VARCHAR(3) DEFAULT 'USD',
  job_type VARCHAR(50), -- FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
  experience_level VARCHAR(50), -- ENTRY_LEVEL, MID_LEVEL, SENIOR, EXECUTIVE
  remote BOOLEAN DEFAULT FALSE,
  visa_sponsorship BOOLEAN DEFAULT FALSE,
  visa_types TEXT[], -- Array of supported visa types: OPT, CPT, H1B, etc.
  skills_required TEXT[], -- Array of required skills
  benefits TEXT[],
  application_deadline DATE,
  application_url TEXT,
  company_website TEXT,
  source VARCHAR(100), -- Indeed, LinkedIn, Company Website, etc.
  source_url TEXT,
  posted_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Matches Table
CREATE TABLE IF NOT EXISTS job_matches (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES job_listings(id) ON DELETE CASCADE,
  match_score INTEGER NOT NULL, -- 0-100 match percentage
  skills_match TEXT[], -- Matching skills
  experience_match BOOLEAN DEFAULT FALSE,
  location_match BOOLEAN DEFAULT FALSE,
  visa_match BOOLEAN DEFAULT FALSE,
  ai_reasoning TEXT, -- AI explanation for the match
  is_saved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES job_listings(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'APPLIED', -- APPLIED, INTERVIEW_SCHEDULED, INTERVIEWED, OFFERED, REJECTED, WITHDRAWN
  applied_date DATE DEFAULT CURRENT_DATE,
  interview_date DATE,
  offer_amount INTEGER,
  offer_currency VARCHAR(3) DEFAULT 'USD',
  notes TEXT,
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies Table (for employer profiles)
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  logo TEXT,
  website TEXT,
  description TEXT,
  industry VARCHAR(100),
  company_size VARCHAR(50), -- STARTUP, SMALL, MEDIUM, LARGE, ENTERPRISE
  founded_year INTEGER,
  headquarters VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  linkedin_url TEXT,
  twitter_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job Postings by Companies
CREATE TABLE IF NOT EXISTS company_job_postings (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES job_listings(id) ON DELETE CASCADE,
  recruiter_name VARCHAR(255),
  recruiter_email VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resume Views (for analytics)
CREATE TABLE IF NOT EXISTS resume_views (
  id SERIAL PRIMARY KEY,
  resume_id INTEGER REFERENCES resumes(id) ON DELETE CASCADE,
  viewer_type VARCHAR(50), -- STUDENT, EMPLOYER, ADMIN
  viewer_id INTEGER, -- Could reference students or companies
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search Queries (for analytics)
CREATE TABLE IF NOT EXISTS search_queries (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
  query TEXT NOT NULL,
  filters JSONB, -- Store filter parameters as JSON
  results_count INTEGER,
  searched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Success Stories
CREATE TABLE IF NOT EXISTS success_stories (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  story TEXT NOT NULL,
  job_title VARCHAR(255),
  company VARCHAR(255),
  image_url TEXT,
  linkedin_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  interests TEXT[], -- Array of interests: OPT, CPT, JOBS, CAREER_TIPS, etc.
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Runtime App Settings (Admin Config Console)
CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value_text TEXT,
  value_encrypted TEXT,
  value_type VARCHAR(20) NOT NULL CHECK (value_type IN ('string', 'boolean', 'number', 'json', 'secret')),
  is_secret BOOLEAN NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_by VARCHAR(255) NOT NULL DEFAULT 'admin_panel'
);

CREATE TABLE IF NOT EXISTS app_settings_audit (
  id BIGSERIAL PRIMARY KEY,
  setting_key TEXT NOT NULL,
  action VARCHAR(20) NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  old_value_redacted TEXT,
  new_value_redacted TEXT,
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  changed_by VARCHAR(255) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_visa_status ON students(visa_status);
CREATE INDEX IF NOT EXISTS idx_resumes_student_id ON resumes(student_id);
CREATE INDEX IF NOT EXISTS idx_job_listings_is_active ON job_listings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_listings_location ON job_listings(location);
CREATE INDEX IF NOT EXISTS idx_job_listings_company ON job_listings(company);
CREATE INDEX IF NOT EXISTS idx_job_matches_student_id ON job_matches(student_id);
CREATE INDEX IF NOT EXISTS idx_job_matches_job_id ON job_matches(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_student_id ON applications(student_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_search_queries_student_id ON search_queries(student_id);
CREATE INDEX IF NOT EXISTS idx_app_settings_updated_at ON app_settings(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_app_settings_audit_key_time ON app_settings_audit(setting_key, changed_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resumes_updated_at BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_job_listings_updated_at BEFORE UPDATE ON job_listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_success_stories_updated_at BEFORE UPDATE ON success_stories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional for development)
-- This would be removed in production and handled through the application

INSERT INTO companies (name, industry, company_size, headquarters, website) VALUES
('TechCorp Inc.', 'Technology', 'LARGE', 'San Francisco, CA', 'https://techcorp.com'),
('DataDriven LLC', 'Technology', 'MEDIUM', 'Austin, TX', 'https://datadriven.com'),
('FinanceFirst', 'Finance', 'LARGE', 'New York, NY', 'https://financefirst.com'),
('HealthTech Solutions', 'Healthcare', 'MEDIUM', 'Boston, MA', 'https://healthtech.com')
ON CONFLICT (name) DO NOTHING;

-- Sample job listings
INSERT INTO job_listings (
  title, company, description, location, salary_min, salary_max,
  job_type, experience_level, remote, visa_sponsorship, visa_types,
  skills_required, source, posted_date, is_active
) VALUES
(
  'Software Engineer - OPT Friendly',
  'TechCorp Inc.',
  'We are seeking talented software engineers to join our growing team. This position offers opportunities for OPT students and potential H1B sponsorship.',
  'San Francisco, CA',
  90000, 120000,
  'FULL_TIME', 'ENTRY_LEVEL', FALSE, TRUE, ARRAY['OPT', 'CPT', 'H1B'],
  ARRAY['JavaScript', 'React', 'Node.js', 'Python'],
  'Company Website', CURRENT_DATE, TRUE
),
(
  'Data Analyst - Remote',
  'DataDriven LLC',
  'Join our data team to analyze and visualize complex datasets. Perfect for international students with strong analytical skills.',
  'Remote',
  70000, 95000,
  'FULL_TIME', 'ENTRY_LEVEL', TRUE, TRUE, ARRAY['OPT', 'H1B'],
  ARRAY['SQL', 'Python', 'Tableau', 'Excel'],
  'LinkedIn', CURRENT_DATE - INTERVAL '2 days', TRUE
),
(
  'Financial Analyst',
  'FinanceFirst',
  'Exciting opportunity in financial analysis for detail-oriented students. OPT and CPT students encouraged to apply.',
  'New York, NY',
  75000, 100000,
  'FULL_TIME', 'ENTRY_LEVEL', FALSE, TRUE, ARRAY['OPT', 'CPT', 'H1B'],
  ARRAY['Excel', 'Financial Modeling', 'SQL', 'PowerPoint'],
  'Indeed', CURRENT_DATE - INTERVAL '1 day', TRUE
)
ON CONFLICT DO NOTHING;
