const config = {
  defaultPath: "/",
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
  BASE_URL: process.env.BASE_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}

export default config