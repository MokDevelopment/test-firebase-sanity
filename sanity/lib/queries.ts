import { groq } from "next-sanity"

export const GET_USER_BY_EMAIL_QUERY = groq`*[_type == "user" && email == $email][0]{
    _id, email, name, emailVerified
  }`
  export const GET_USER_BY_PASSWORD_RECOVERY_TOKEN_QUERY = groq`*[_type == "user" && recoveryToken == $recoveryToken][0]`


