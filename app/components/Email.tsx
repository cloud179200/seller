import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import config from '../config';

interface LinearLoginCodeEmailProps {
  verifyToken?: string;
  email?: string;
}

const baseUrl = config.BASE_URL

export const LinearLoginCodeEmail = ({
  verifyToken = '',
  email = '',
}: LinearLoginCodeEmailProps) => (
  <Html>
    <Head />
    <Preview>Your login code for Linear</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/public/images/logo.svg`}
          width="42"
          height="42"
          alt="Linear"
          style={logo}
        />
        <Heading style={heading}>Welcome {email}!</Heading>
        <Text style={paragraph}>
          Last step to access app
        </Text>
        <Section style={buttonContainer}>
          <Button pY={11} pX={23} style={button} href={baseUrl+"auth/verify?emailVerifyToken"+verifyToken}>
            Verify email
          </Button>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default LinearLoginCodeEmail;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '560px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};

const buttonContainer = {
  padding: '27px 0 27px',
};

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};