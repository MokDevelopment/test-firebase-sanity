import { getServerSession } from 'next-auth/next';
import SignUpForm from '@/components/SignUpForm';
import { SignOutButton } from '@/components/Buttons';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import SignInForm from '@/components/SignInForm';
import RecoverPasswordForm from '@/components/RecoverPasswordForm';

export default async function Credentials() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {session && (
        <div>
          <p>User: {session.user?.name}</p>
          <SignOutButton />
        </div>
      )}
      
      {!session && 
      <>
      <h1 style={{padding: 14, fontWeight:800, paddingTop: 30}}>Sign In</h1>
      <SignInForm />
      <h1 style={{padding: 14, fontWeight:800, paddingTop: 30}}>Sign Up</h1>
      <SignUpForm />
      <h1 style={{padding: 14, fontWeight:800, paddingTop: 30}}>Forgot Password</h1>
      <RecoverPasswordForm />
      </>
      }
    </div>
  );
}