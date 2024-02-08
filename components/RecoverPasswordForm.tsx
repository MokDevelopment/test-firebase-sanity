"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { recoverPasswordFormSubmit } from "@/actions/credentialActions"
export default function RecoverPasswordForm() {
  const [email, setEmail] = useState("")
  //const router = useRouter()

  return (
    <div>
      <form
        action={async formData => {
          const result:any = await recoverPasswordFormSubmit(formData)
          if(result.ok){
            alert(result.message)
          }else{
            console.error(result.message)
          }
        }}
      >
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Recover Password</button>
      </form>
    </div>
  )
}
