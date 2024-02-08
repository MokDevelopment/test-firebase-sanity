"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export interface ReplacePasswordFormParams {
  onSubmitFunction: Function
}

export default function ReplacePasswordForm(params:ReplacePasswordFormParams) {
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  const onPasswordChange = (str: string, id: number) => {
    if (1 === id) {
      setPassword1(str)
    } else {
      setPassword2(str)
    }
  }

  return (
    <div>
      <form
        action={async () => {
          
          //validate form
          if(password1.length < 10 && password1 !== password2){
            console.error('Invalid form data')
            return false
          }

          params.onSubmitFunction(password1)
          

          // const result:any = await recoverPasswordFormSubmit(formData)
          // if(result.ok){
          //   alert(result.message)
          // }else{
          //   console.error(result.message)
          // }
        }}
      >
        <input
          type="password"
          name="password1"
          value={password1}
          placeholder="New Password"
          onChange={(e) => onPasswordChange(e.target.value, 1)}
          required
        />
        <br />

        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="Re-enter new Password"
          onChange={(e) => onPasswordChange(e.target.value, 2)}
          required
        />
        <br />
        {password1 !== password2 && (
          <p style={{ color: "red" }}>Passwords do not match!</p>
        )}
        {password1.length < 10 && (
          <p style={{ color: "red" }}>
            Password must be at least 10 characters long
          </p>
        )}
        <br />
        {password1 === password2 &&
          password1 !== "" &&
          password1.length >= 10 && (
            <button
              type="submit"
              style={{ border: "solid 1px black", padding: "2px 5px" }}
            >
              Recover Password
            </button>
          )}
      </form>
    </div>
  )
}
