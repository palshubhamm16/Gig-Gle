import { jwtVerify, createRemoteJWKSet, JWTPayload } from 'jose';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables (if not already done globally)

export interface UserFromToken {
  email: string;
  name?: string;
  sub: string;
}

interface ClerkJWTPayload extends JWTPayload {
  public_metadata?: {
    email?: string;
    name?: string;
  };
}

const jwksUrl = process.env.CLERK_JWKS_URL;

if (!jwksUrl) {
  throw new Error('CLERK_JWKS_URL not defined in environment variables');
}

const jwks = createRemoteJWKSet(new URL(jwksUrl));

export const verifyClerkToken = async (token: string): Promise<UserFromToken> => {
  try {
    const { payload } = await jwtVerify(token, jwks) as { payload: ClerkJWTPayload };
    console.log("🔍 JWT Payload:", payload);

    const email = payload?.public_metadata?.email;
    const name = payload?.public_metadata?.name;
    const sub = payload?.sub;

    if (!email || !sub) {
      throw new Error('Missing required fields in token.');
    }

    return {
      email,
      name,
      sub,
    };
  } catch (err) {
    console.error('JWT verification failed:', err);
    throw new Error('Invalid token');
  }
};
