import {
  Html,
  Head,
  Body,
  Container,
} from "@react-email/components";
import EmailHeader from "./EmailHeader";
import EmailFooter from "./EmailFooter";

interface EmailLayoutProps {
  children: React.ReactNode;
  preview: string;
}

export default function EmailLayout({ children, preview }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />
          {children}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f6fb",
  padding: "40px 0",
  fontFamily: "Inter, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "32px",
  borderRadius: "12px",
  maxWidth: "520px",
  margin: "0 auto",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
};