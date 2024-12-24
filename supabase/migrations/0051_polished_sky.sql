-- Add description column to clients table
ALTER TABLE clients
ADD COLUMN description text;

-- Create index for description search
CREATE INDEX idx_clients_description ON clients(description);