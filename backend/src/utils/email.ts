import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a testing account for development
const createTestAccount = async () => {
  const testAccount = await nodemailer.createTestAccount();
  return {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  };
};

// Get transporter config
const getTransporterConfig = async () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
  }
  
  return await createTestAccount();
};

// Send verification email
export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
  try {
    const config = await getTransporterConfig();
    const transporter = nodemailer.createTransport(config);

    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verifyemail/${token}`;

    const info = await transporter.sendMail({
      from: `"EssayHuzz" <${process.env.EMAIL_FROM || 'noreply@essayhuzz.com'}>`,
      to: email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to EssayHuzz!</h2>
          <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Email</a>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <p>Best regards,<br>The EssayHuzz Team</p>
        </div>
      `,
    });

    // Log the preview URL when using ethereal email (development)
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
}; 