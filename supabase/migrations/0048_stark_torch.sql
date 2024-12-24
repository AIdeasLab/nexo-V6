/*
  # Add clients table and relationship to projects
  
  1. New Tables
    - `clients`
      - `id` (uuid, primary key) 
      - `name` (text, required)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Changes
    - Add `client_id` to projects table
    - Add foreign key constraint
    
  3. Security
    - Enable RLS
    - Add policies for public access
*/

-- Create clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add client_id to projects
ALTER TABLE projects 
ADD COLUMN client_id uuid REFERENCES clients(id) ON DELETE SET NULL;

-- Create indexes
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_projects_client_id ON projects(client_id);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow full access to clients"
  ON clients FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Update existing projects
UPDATE projects 
SET client_id = NULL 
WHERE category = 'events';

-- Grant permissions
GRANT ALL ON clients TO anon, authenticated;