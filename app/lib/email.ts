// app/lib/email.ts
import nodemailer from 'nodemailer';

// Configure email transporter
export const createTransporter = () => {
  // For testing environment, we'll use Ethereal by default
  const useTestAccount = !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD;
  
  if (useTestAccount) {
    console.log('SMTP configuration not found. Using Ethereal test account.');
    return createTestTransporter();
  }
  
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Create test transporter for development
const createTestTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  
  console.log('Ethereal test account created:', testAccount.user);
  return transporter;
};

// Send verification email
export const sendVerificationEmail = async (
  email: string, 
  token: string
): Promise<{ success: boolean; previewUrl?: string }> => {
  try {
    // Get transporter (creates a test account if needed)
    const transporter = typeof createTransporter === 'function' 
      ? createTransporter() 
      : await createTestTransporter();
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Email content
    const mailOptions = {
      from: `"EssayHuzz" <${process.env.SMTP_FROM || 'noreply@essayhuzz.com'}>`,
      to: email,
      subject: 'Verify your EssayHuzz account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify your email for EssayHuzz</h2>
          <p>Please click the link below to verify your email address:</p>
          <a href="${baseUrl}/verifyemail?token=${token}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
          <p>If you didn't request this verification, you can safely ignore this email.</p>
          <p>Thanks,<br>The EssayHuzz Team</p>
        </div>
      `,
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    
    // For development: provide preview URL for Ethereal
    let previewUrl;
    if (nodemailer.getTestMessageUrl) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL: %s', previewUrl);
    }
    
    return { success: true, previewUrl };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false };
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (
  email: string, 
  token: string
): Promise<{ success: boolean; previewUrl?: string }> => {
  try {
    // Get transporter (creates a test account if needed)
    const transporter = typeof createTransporter === 'function' 
      ? createTransporter() 
      : await createTestTransporter();
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Email content
    const mailOptions = {
      from: `"EssayHuzz" <${process.env.SMTP_FROM || 'noreply@essayhuzz.com'}>`,
      to: email,
      subject: 'Reset your EssayHuzz password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset your EssayHuzz password</h2>
          <p>Please click the link below to reset your password:</p>
          <a href="${baseUrl}/reset-password?token=${token}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Password</a>
          <p>If you didn't request this reset, you can safely ignore this email.</p>
          <p>Thanks,<br>The EssayHuzz Team</p>
        </div>
      `,
    };
    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    
    // For development: provide preview URL for Ethereal
    let previewUrl;
    if (nodemailer.getTestMessageUrl) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL: %s', previewUrl);
    }
    
    return { success: true, previewUrl };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false };
  }
};