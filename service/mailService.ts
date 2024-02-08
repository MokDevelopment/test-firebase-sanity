import { Message } from "@/types/Message"

const nodemailer = require("nodemailer")

export type SendMailParams = {
  subject: string
  toEmail: string
  body: string
  htmlBody?: string
}

export async function sendMail({subject, toEmail, body, htmlBody}: SendMailParams) {
  console.log({
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PW,
  })
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  })

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: toEmail,
    subject: subject,
    text: body,
    html: null || htmlBody
  }



  const result = await transporter.sendMail(
    mailOptions,
    async function (error:any, info:any) {
      if (error) {
        return Message({
          ok: false,
          message: 'Error: Message was not sent.',
          data: {
            error
          }
        })
      } else {
        return Message({
          ok: true,
          message: 'Message was sent.',
        })
      }
    }
  )

  return result
}
