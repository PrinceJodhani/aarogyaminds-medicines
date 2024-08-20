// app/signin/page.tsx
'use client';

import { signIn } from 'next-auth/react';

const SignInPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sign In</h1>
      <button onClick={() => signIn('google')} style={{ margin: '10px' }}>
        Sign in with Google
      </button>
      <button onClick={() => signIn('facebook')} style={{ margin: '10px' }}>
        Sign in with Facebook
      </button>
    </div>
  );
};

export default SignInPage;
