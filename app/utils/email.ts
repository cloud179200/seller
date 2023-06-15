import nodemailer from "nodemailer"
import config from "@/app/config";

type EmailPayload = {
  to: string
  subject: string
  html: string
}

// Replace with your SMTP credentials
const smtpOptions = {
  host: config.SMTP_HOST || "smtp.mailtrap.io",
  port: parseInt(config.SMTP_PORT || "2525"),
  secure: false,
  auth: {
    user: config.SMTP_USER || "user",
    pass: config.SMTP_PASSWORD || "password",
  },
}

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  })

  return await transporter.sendMail({
    from: config.SMTP_FROM_EMAIL,
    ...data,
  })
}