"use client"
import { useState } from "react"
import { signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    const user:any = await signIn("sanity-login", {
      redirect: false,
      email,
      password,
    })

    if (!user.ok) {
      alert("could not log user in")
    } else {
      router.refresh()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitSignIn}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}
