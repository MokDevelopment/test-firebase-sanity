"use server"

import { SendMailParams } from "./../service/mailService"
import { client } from "@/sanity/lib/client"
import { Patch, SanityDocument } from "next-sanity"
import argon2 from "argon2"
import {
  GET_USER_BY_EMAIL_QUERY,
  GET_USER_BY_PASSWORD_RECOVERY_TOKEN_QUERY,
} from "@/sanity/lib/queries"
//import { revalidatePath } from "next/cache"
import { sendMail } from "@/service/mailService"
import cryptoRandomString from "crypto-random-string"
import { Message, MessageType } from "@/types/Message"

export async function recoverPasswordFormSubmit(formData: FormData) {
  const email = formData.get("email")
  let err: MessageType | null = null

  const user = await client
    .fetch<SanityDocument>(GET_USER_BY_EMAIL_QUERY, {
      email: email,
    })
    .catch((error) => {
      console.error(error)
      err = Message({
        ok: false,
        message: "There was an issue connecting the server",
      })
    })

  //if error - break & return error message
  if (err) return err
  if (user) {
    //create token for user

    const TOKEN_LENGTH = 64
    const TOKEN_SECONDS_TO_LIVE = 60 * 60 * 1000 // MIN * SECS * MSECS
    const randToken = cryptoRandomString({
      length: TOKEN_LENGTH,
      type: "distinguishable",
    })

    await client
      .patch(user._id)
      .set({
        recoveryToken: randToken,
        recoveryTokenExpires: Date.now() + TOKEN_SECONDS_TO_LIVE,
      })
      .commit()
      .catch((error) => {
        console.error(error)
        err = Message({
          ok: false,
          message: "There was an issue connecting the server",
        })
      })
    if (err) return err

    //send recovery email to user
    await sendMail({
      subject: "test-sanity-auth",
      toEmail: user.email,
      htmlBody: `Hello from the node mailer:<br><a href="http://localhost:3000/credentials/recover-pass?token=${randToken}">Click here</a>`,
      body: `Hello from the node mailer.
      http://localhost:3000/credentials/recover-pass?token=${randToken}`,
    } as SendMailParams).catch((err) => {
      console.error(err)
    })
  }

  return Message({
    ok: true,
    message:
      "For further instructions please check the email we have sent to you.",
  })
}

export async function recoverPasswordTokenValidate(token: string) {
  let err: MessageType | null = null

  const user = await client
    .fetch<SanityDocument>(GET_USER_BY_PASSWORD_RECOVERY_TOKEN_QUERY, {
      recoveryToken: token,
    })
    .catch((error) => {
      console.error(error)
      err = Message({
        ok: false,
        message: "There was an issue connecting the server",
      })
    })
  //if error - break & return error message
  if (err) return err
  if (user) {
    //vaidate expire date
    if (Date.now() < user.recoveryTokenExpires) {
      return Message({
        ok: true,
        message:
          "For further instructions please check the email we have sent to you.",
        data: {
          email: user.email,
          id: user._id,
        },
      })
    }
  }
  return Message({
    ok: false,
    message: "The token key is expired.",
  })
}

export async function recoverPasswordWriteNewPassword({
  token,
  password,
}: {
  token: string
  password: string
}) {
  //check token again server only
  const passTokenValidateResponse: MessageType =
    await recoverPasswordTokenValidate(token)
  if (!passTokenValidateResponse?.ok) {
    return passTokenValidateResponse
  }

  //validate password on server again
  //...

  //write new password to the db
  const passwordPatch = await client
    .patch(passTokenValidateResponse.data?.id, {
      set: {
        password: await argon2.hash(password),
      },
    })
    .commit()
    .then(() => {
      return Message({
        ok: true,
        message: "User pass was set",
      })
    })
    .catch((error) => {
      return Message({
        ok: false,
        message: "There was an issue connecting the server",
      })
    })

  return passwordPatch
}
