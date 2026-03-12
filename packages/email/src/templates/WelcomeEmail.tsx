import {
  Heading,
  Text,
} from "@react-email/components";

import EmailLayout from "../components/EmailLayout";

interface WelcomeEmailProps {
  username: string;
}

export default function WelcomeEmail({ username }: WelcomeEmailProps) {
  return (
    <EmailLayout preview="Welcome to Mindscape">
      <Heading style={heading}>Welcome to Mindscape 🎉</Heading>

      <Text style={text}>Hi {username},</Text>

      <Text style={text}>
        We're excited to have you here. Start writing your journals
        and let our AI help you understand your emotions.
      </Text>

      <Text style={text}>
        Your journey toward mindful reflection starts now.
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
  lineHeight: "24px",
};
