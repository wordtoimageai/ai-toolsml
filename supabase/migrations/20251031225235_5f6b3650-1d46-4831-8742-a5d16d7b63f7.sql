-- Fix tool_submissions_incomplete security issue
-- Add public SELECT policy for approved tool submissions

CREATE POLICY "Public can view approved submissions"
ON tool_submissions FOR SELECT
USING (status = 'approved');