import { signUpHandler } from 'next-auth-sanity';
import { client } from '@/sanity/lib/client';

const handler = signUpHandler(client);

export { handler as POST };