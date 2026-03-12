export interface SendVerifyEmailPayload {
  to: string;
  username: string;
  verificationUrl: string;
}

export interface SendWelcomeEmailPayload {
  to: string;
  username: string;
}

export interface SendResetPasswordEmailPayload {
  to: string;
  username: string;
  resetUrl: string;
}
