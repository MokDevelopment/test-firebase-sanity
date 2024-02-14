"use client"

import {
  recoverPasswordTokenValidate,
  recoverPasswordWriteNewPassword,
} from "@/actions/credentialActions"
import ReplacePasswordForm, {
  ReplacePasswordFormParams,
} from "@/components/ReplacePasswordForm"
import { MessageType } from "@/types/Message"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"

type ActionResponse = {
  email: string
}

export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const [uiState, setUiState] = useState("init")
  const [actionResponse, setActionResponse] = useState<ActionResponse>()
  //check if token exists
  useEffect(() => {
    onLoad()
  }, [])

  const onReplacePasswordFormSubmit = async (pass: string) => {
    //client validation from params
    // ...

    //call server for validation & write to db
    recoverPasswordWriteNewPassword({
      token: searchParams?.token as string,
      password: pass,
    }).then((resMessage) => {
      if (resMessage?.ok) {
        console.log(resMessage.message)
        setUiState("done")
      } else {
        console.error(resMessage.message)
        setUiState("error")
      }
    })
  }

  const onLoad = async () => {
    if (searchParams?.token) {
      const passTokenValidateResponse: MessageType =
        await recoverPasswordTokenValidate(searchParams?.token as string)
      if (passTokenValidateResponse?.ok) {
        console.log("Token Valid")
        setActionResponse({ email: passTokenValidateResponse.data?.email })
        setUiState("form")
      } else {
        console.error("Token Invalid")
        setUiState("error")
      }
    }
  }

  if (uiState == "init") {
    return <h1>init</h1>
  } else if (uiState == "form") {
    return (
      <>
        <h1>form {actionResponse?.email}</h1>
        <ReplacePasswordForm onSubmitFunction={onReplacePasswordFormSubmit} />
      </>
    )
  } else if (uiState == "error") {
    return <h1>The Token does not seem to be valid.</h1>
  } else if (uiState == "done") {
    return (
      <>
        <h1>New Password was set.</h1>You can login in now ... LINK TO LOGIN
        FORM HERE
      </>
    )
  }
}
