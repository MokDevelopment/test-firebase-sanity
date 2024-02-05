import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SignInButton, SignOutButton } from '@/components/Buttons';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div style={{display:'flex', alignContent:'center', paddingTop: '85px', flexDirection: 'column', textAlign: 'center'}}>
        <p>User: {session?.user?.name}</p>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div style={{display:'flex', alignContent:'center', paddingTop: '85px', flexDirection: 'column', textAlign: 'center'}}>
    <SignInButton /><br/>
      or <br/><br/>
      <Link href={'/credentials'}>Sign in (custom form)</Link>
    </div>
  );
}