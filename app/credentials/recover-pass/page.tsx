"use client"

import { recoverPasswordTokenValidate } from "@/actions/credentialActions"
import ReplacePasswordForm, {
  ReplacePasswordFormParams,
} from "@/components/ReplacePasswordForm"
import { MessageType } from "@/types/Message"
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

  const onReplacePasswordFormSubmit = async (params: ReplacePasswordFormParams) => {
    if (searchParams?.token) {
      const passTokenValidateResponse: MessageType =
        await recoverPasswordTokenValidate(searchParams?.token as string)
      if (passTokenValidateResponse?.ok) {
        setActionResponse({ email: passTokenValidateResponse.data?.email })
        alert("token valid")
      }else{
        setUiState("error")
      }
    }
  }

  const onLoad = async () => {
    
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
    return <h1>form</h1>
  }
}
