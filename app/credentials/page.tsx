import { getServerSession } from 'next-auth/next';
import SignUpForm from '@/components/SignUpForm';
import { SignOutButton } from '@/components/Buttons';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import SignInForm from '@/components/SignInForm';

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
      </>
      }
    </div>
  );
}