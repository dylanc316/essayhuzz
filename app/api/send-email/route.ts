import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token, type = 'verification' } = body;
    
    // For testing, use Ethereal (a test email service)
    // In production, replace with your actual SMTP credentials
    const testAccount = await nodemailer.createTestAccount();
    
    // Store auth user for later comparison
    const authUser = process.env.SMTP_USER || testAccount.user;
    
    // Create transporter using Ethereal account or environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || testAccount.smtp.host,
      port: parseInt(process.env.SMTP_PORT || testAccount.smtp.port.toString()),
      secure: process.env.SMTP_SECURE === 'true' || testAccount.smtp.secure,
      auth: {
        user: authUser,
        pass: process.env.SMTP_PASSWORD || testAccount.pass,
      },
    });
    
    // Email content based on type
    let subject, html;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    if (type === 'verification') {
      subject = 'Verify your EssayHuzz account';
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Verify your email for EssayHuzz</h2>
          <p>Please click the link below to verify your email address:</p>
          <a href="${baseUrl}/verifyemail?token=${token}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
          <p>If you didn't request this verification, you can safely ignore this email.</p>
          <p>Thanks,<br>The EssayHuzz Team</p>
        </div>
      `;
    } else {
      subject = 'Password Reset for EssayHuzz';
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Reset your EssayHuzz password</h2>
          <p>Please click the link below to reset your password:</p>
          <a href="${baseUrl}/reset-password?token=${token}" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Password</a>
          <p>If you didn't request this reset, you can safely ignore this email.</p>
          <p>Thanks,<br>The EssayHuzz Team</p>
        </div>
      `;
    }
    
    // Send the email
    const info = await transporter.sendMail({
      from: `"EssayHuzz" <${process.env.SMTP_FROM || 'noreply@essayhuzz.com'}>`,
      to: email,
      subject,
      html,
    });
    
    console.log('Message sent: %s', info.messageId);
    
    // For Ethereal test emails, provide the preview URL
    let previewUrl = null;
    
    // Check if we're using the test account credentials
    const isUsingTestAccount = testAccount.user === authUser;
    
    if (isUsingTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL: %s', previewUrl);
    }
    
    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      previewUrl // Useful during development
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}