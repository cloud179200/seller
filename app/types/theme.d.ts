// eslint-disable-next-line no-unused-vars
import { TypographyOptions } from "@mui/material/styles/createTypography";

declare module '@mui/material/styles/createTypography' {
  // eslint-disable-next-line no-unused-vars
  interface Typography {    
    [key: string]: TypographyStyleOptions
  }
}

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Profile {
    email_verified?: boolean;
  }
}