import { render } from "@react-email/render";
import { transporter } from "../config/transporter";
import VerifyEmail from "../templates/VerifyEmail";
import WelcomeEmail from "../templates/WelcomeEmail";
import ForgetPasswordEmail from "../templates/ForgetPasswordEmail";
import type {SendResetPasswordEmailPayload,SendVerifyEmailPayload,SendWelcomeEmailPayload} from "@repo/types/index"

export async function sendVerifyEmail({
  to,
  username,
  verificationUrl
}: SendVerifyEmailPayload) {
  const html = await render(VerifyEmail({ username, verificationUrl }));
  return transporter.sendMail({
    from: `"Mindscape" <${process.env.SMTP_USER}>`,
    to,
    subject: `Verify your Mindscape account`,
    html
  })
}

export async function sendWelcomeEmail({
  to,
  username
}: SendWelcomeEmailPayload) {
  const html = await render(WelcomeEmail({ username }));

  return transporter.sendMail({
    from: `"Mindscape" <${process.env.SMTP_USER}>`,
    to,
    subject: `Welcome to Mindscape 🎉`,
    html
  })
}


export async function sendResetPasswordEmail({
  resetUrl,
  to,
  username
}: SendResetPasswordEmailPayload) {
  const html = await render(ForgetPasswordEmail({ resetUrl, username }));

  return transporter.sendMail({
    from: `"Mindscape" <${process.env.SMTP_USER}>`,
    to,
    subject: `Reset your password`,
    html
  })
}


export async function resendVerificationMail({
  to,
  username,
  verificationUrl
}: SendVerifyEmailPayload) {
  const html = await render(VerifyEmail({ username, verificationUrl }));
  return transporter.sendMail({
    from: `"Mindscape" <${process.env.SMTP_USER}>`,
    to,
    subject: `New verification link for your Mindscape account`,
    html
  })
}