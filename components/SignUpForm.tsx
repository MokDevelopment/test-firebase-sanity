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
   
    const result:any = await signUp({
      email,
      password,
      name})
      console.log(result)
    
      if (!result._id) {
        alert("could not create user")
      } else {
        //router.refresh()
      }
    // if(user){
    //   await signIn('sanity-login', {
    //     redirect: false,
    //     email,
    //     password
    //   });
  
    //   router.refresh();

    // }else{
      
    //   alert("there was a problem")
      
    // }
    
   

   
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