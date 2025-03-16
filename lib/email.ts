import nodemailer from 'nodemailer';

export async function sendVerificationEmail(
  email: string, 
  token: string,
  name: string
): Promise<any> {
  try {
    // Create testing account for development if no SMTP credentials exist
    let testAccount;
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      testAccount = await nodemailer.createTestAccount();
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || (testAccount && testAccount.smtp.host),
      port: parseInt(process.env.SMTP_PORT || (testAccount && testAccount.smtp.port.toString()) || '587'),
      secure: process.env.SMTP_SECURE === 'true' || (testAccount && testAccount.smtp.secure) || false,
      auth: {
        user: process.env.SMTP_USER || (testAccount && testAccount.user),
        pass: process.env.SMTP_PASSWORD || (testAccount && testAccount.pass),
      },
    });
    
    // Email content
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationUrl = `${baseUrl}/verifyemail?token=${token}`;
    
    // Send email
    const info = await transporter.sendMail({
      from: `"EssayHuzz" <${process.env.SMTP_FROM || 'noreply@essayhuzz.com'}>`,
      to: email,
      subject: 'Verify your EssayHuzz account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify your email for EssayHuzz</h2>
          <p>Hello ${name},</p>
          <p>Please click the link below to verify your email address:</p>
          <a href="${verificationUrl}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
          <p>If you didn't request this verification, you can safely ignore this email.</p>
          <p>Thanks,<br>The EssayHuzz Team</p>
        </div>
      `,
    });
    
    // For development using Ethereal service
    if (testAccount && testAccount.user === transporter.options.auth.user) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}