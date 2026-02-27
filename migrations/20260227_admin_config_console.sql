-- Admin Config Console schema migration

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

CREATE INDEX IF NOT EXISTS idx_app_settings_updated_at ON app_settings(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_app_settings_audit_key_time ON app_settings_audit(setting_key, changed_at DESC);
