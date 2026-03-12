import {
  Heading,
  Text,
  Button,
} from "@react-email/components";

import EmailLayout from "../components/EmailLayout";

interface ForgetPasswordEmailProps {
  username: string;
  resetUrl: string;
}

export default function ForgetPasswordEmail({
  username,
  resetUrl,
}: ForgetPasswordEmailProps) {
  return (
    <EmailLayout preview="Reset your Mindscape password">
      <Heading style={heading}>Reset your password</Heading>

      <Text style={text}>Hi {username},</Text>

      <Text style={text}>
        We received a request to reset your password.
      </Text>

      <Button href={resetUrl} style={button}>
        Reset Password
      </Button>

      <Text style={note}>
        If you didn’t request this, you can ignore this email.
      </Text>
    </EmailLayout>
  );
}

const heading = {
  fontSize: "24px",
  fontWeight: "600",
};

const text = {
  fontSize: "16px",
};

const button = {
  backgroundColor: "#111",
  color: "#fff",
  padding: "12px 22px",
  borderRadius: "8px",
  marginTop: "20px",
  textDecoration: "none",
};

const note = {
  fontSize: "13px",
  color: "#666",
  marginTop: "18px",
};
