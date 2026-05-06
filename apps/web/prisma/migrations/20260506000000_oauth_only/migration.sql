-- Drop password column (credentials auth removed; OAuth-only from here on)
ALTER TABLE "User" DROP COLUMN IF EXISTS "password";

-- Drop VerificationToken table (no email-verification flows in OAuth-only mode)
DROP TABLE IF EXISTS "VerificationToken";
