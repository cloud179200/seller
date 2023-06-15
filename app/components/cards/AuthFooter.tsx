// material-ui
import { Typography, Stack } from '@mui/material';
import Link from "next/link"
// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank">
            berrydashboard.io
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank">
            &copy; codedthemes.com
        </Typography>
    </Stack>
);

export default AuthFooter;
