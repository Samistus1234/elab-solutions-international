/**
 * Login Form Component for ELAB Solutions International
 * 
 * This component provides a secure login form with TypeScript validation,
 * error handling, and accessibility features.
 */

'use client';

import { SignIn } from '@clerk/nextjs';

export function LoginForm() {
  return <SignIn />;
}
