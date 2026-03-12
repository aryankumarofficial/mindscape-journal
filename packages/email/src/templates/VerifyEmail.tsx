import {
  Heading,
  Text,
  Button,
} from "@react-email/components";

import EmailLayout from "../components/EmailLayout";

interface VerifyEmailProps {
  username: string;
  verificationUrl: string;
}

export default function VerifyEmail({
  username,
  verificationUrl,
}: VerifyEmailProps) {
  return (
    <EmailLayout preview="Verify your Mindscape account">
      <Heading style={heading}>Verify your email</Heading>

      <Text style={text}>Hi {username},</Text>

      <Text style={text}>
        Thanks for joining <b>Mindscape</b>. Please confirm your email
        to activate your account.
      </Text>

      <Button href={verificationUrl} style={button}>
        Verify Email
      </Button>
    </EmailLayout>
  );
}

const heading = {
  fontSize: "24px",
  fontWeight: "600",
};

const text = {
  fontSize: "16px",
  lineHeight: "24px",
};

const button = {
  backgroundColor: "#111",
  color: "#fff",
  padding: "12px 22px",
  borderRadius: "8px",
  textDecoration: "none",
  marginTop: "20px",
};
