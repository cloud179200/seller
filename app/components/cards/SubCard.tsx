import React, { forwardRef} from "react";

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
interface IProps {
    children?: React.ReactNode;
    content?: boolean;
    contentClass?: string;
    darkTitle?: boolean;
    secondary: React.ReactNode;
    sx?: object;
    contentSX?: object;
    title: React.ReactNode;
  }
// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = forwardRef(({ children, content = true, contentClass, darkTitle, secondary, sx = {}, contentSX = {}, title, ...others }: IProps, ref: React.ForwardedRef<any>) => {
    const theme: any = useTheme();

    return (
        <Card
            ref={ref}
            sx={{
                border: '1px solid',
                borderColor: theme.palette.primary.light,
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                },
                ...sx
            }}
            {...others}
        >
            {/* card header and action */}
            {!darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} action={secondary} />}
            {darkTitle && title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h4">{title}</Typography>} action={secondary} />}

            {/* content & header divider */}
            {title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light
                    }}
                />
            )}

            {/* card content */}
            {content && (
                <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    );
});
SubCard.displayName = "SubCard";

export default SubCard;
