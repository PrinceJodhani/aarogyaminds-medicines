// app/login/page.tsx

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginForm from '@/components/LoginForm';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
