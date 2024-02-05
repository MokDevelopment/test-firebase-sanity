'use client';
import { useState } from 'react';
import { signIn, signOut,   } from 'next-auth/react';
import { signUp} from 'next-auth-sanity/client';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    const user:any = await signUp({
      email,
      password,
      name})
      console.log(user)
    
      if (user._id) {
        alert("could not create user")
      } else {
        await signIn('sanity-login', {
          redirect: false,
          email,
          password
        });
        router.refresh();
      }
  
  };


  return (
    <div>
     
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      

    
    </div>
  );
}