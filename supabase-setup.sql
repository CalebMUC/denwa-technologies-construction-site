-- Create the quotes table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  project_type TEXT,
  project_location TEXT,
  budget TEXT,
  timeline TEXT,
  property_size TEXT,
  description TEXT NOT NULL,
  services_needed TEXT[],
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for public quote form)
CREATE POLICY "Anyone can insert quotes" ON quotes
  FOR INSERT
  WITH CHECK (true);

-- Create a policy that only allows authenticated users to read quotes (for admin)
CREATE POLICY "Authenticated users can read quotes" ON quotes
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Add indexes for better performance
CREATE INDEX idx_quotes_created_at ON quotes(created_at);
CREATE INDEX idx_quotes_project_type ON quotes(project_type);
CREATE INDEX idx_quotes_name ON quotes(name);

-- Add comments for documentation
COMMENT ON TABLE quotes IS 'Store client quote requests from the construction website';
COMMENT ON COLUMN quotes.name IS 'Client full name (required)';
COMMENT ON COLUMN quotes.phone IS 'Client phone number (required)';
COMMENT ON COLUMN quotes.project_type IS 'Type of construction project';
COMMENT ON COLUMN quotes.services_needed IS 'Array of requested services';