-- Newsletter: replace WITH CHECK (true) with a validating predicate
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;

CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND is_active = true
  AND unsubscribed_at IS NULL
  AND unsubscribe_reason IS NULL
);

-- Contact messages: replace WITH CHECK (true) with a validating predicate
DROP POLICY IF EXISTS "Anyone can send a contact message" ON public.contact_messages;

CREATE POLICY "Anyone can send a contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND inquiry_type IN ('general','tool-submission','partnership','bug-report','other')
  AND char_length(subject) BETWEEN 1 AND 300
  AND char_length(message) BETWEEN 10 AND 5000
  AND created_at >= now() - interval '5 minutes'
);