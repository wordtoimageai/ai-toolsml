-- Move pg_net extension from public to extensions schema
-- This requires drop + recreate since pg_net does not support SET SCHEMA

-- Create dedicated extensions schema if not exists
CREATE SCHEMA IF NOT EXISTS extensions;

-- Drop the existing pg_net extension from public schema
DROP EXTENSION IF EXISTS pg_net;

-- Recreate pg_net in the extensions schema
CREATE EXTENSION pg_net SCHEMA extensions;
