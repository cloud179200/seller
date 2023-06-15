import MinimalLayout from "@/app/components/layout/MinimalLayout/MinimalLayoutClient";
import CustomProviders from "./providers";
import "@/app/assets/scss/style.scss"
import "@/global.css"

function RootLayout({ children }: { children?: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning={true}>
        <CustomProviders>
          <MinimalLayout>
            {children}
          </MinimalLayout>
        </CustomProviders>
      </body>
    </html>
  );
}

export default RootLayout