/*
  # Fix clients and projects relationship structure
  
  1. New Tables
    - clients
      - id (uuid, primary key)
      - name (text, not null)
      - email (text)
      - phone (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
      
  2. Changes
    - Add client_id to projects table
    - Add indexes for performance
    - Update RLS policies
    
  3. Security
    - Enable RLS
    - Add policies for public access
*/

-- First clean up any existing structure
DROP TABLE IF EXISTS clients CASCADE;

-- Recreate clients table
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ensure projects has client_id
ALTER TABLE projects 
DROP COLUMN IF EXISTS client_id;

ALTER TABLE projects 
ADD COLUMN client_id uuid REFERENCES clients(id) ON DELETE SET NULL;

-- Create indexes
CREATE INDEX idx_clients_name ON clients(name);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_projects_client_id ON projects(client_id);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow full access to clients"
  ON clients FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON clients TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Insert sample data
INSERT INTO clients (name, email, phone) VALUES 
('João Silva', 'joao@example.com', '(11) 98765-4321'),
('Maria Santos', 'maria@example.com', '(11) 91234-5678');