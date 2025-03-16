'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError('Invalid verification link. Please try again or request a new verification email.');
        setIsVerifying(false);
        return;
      }

      try {
        const success = await verifyEmail(token);
        setVerificationSuccess(success);
        if (!success) {
          setError('Verification link has expired or is invalid. Please request a new verification email.');
        }
      } catch (err) {
        console.error('Verification error:', err);
        setError('An error occurred during email verification. Please try again later.');
      } finally {
        setIsVerifying(false);
      }
    };

    verify();
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md card p-8 bg-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Email Verification</h1>
          <p className="text-gray-400">Verifying your email address</p>
        </div>

        {isVerifying ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p>Verifying your email address...</p>
          </div>
        ) : verificationSuccess ? (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900 mb-4">
              <svg
                className="h-6 w-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-lg font-medium mb-2">Email Verified Successfully!</h2>
            <p className="text-gray-400 mb-6">
              Your email has been verified. You can now access all features of EssayHuzz.
            </p>
            <div className="flex flex-col space-y-3">
              <Link
                href="/dashboard"
                className="btn-primary w-full py-2 text-center"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/analyze"
                className="btn-outline w-full py-2 text-center"
              >
                Start Using EssayHuzz
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900 mb-4">
              <svg
                className="h-6 w-6 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h2 className="text-lg font-medium mb-2">Verification Failed</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <div className="flex flex-col space-y-3">
              <Link
                href="/login"
                className="btn-primary w-full py-2 text-center"
              >
                Back to Login
              </Link>
              <button
                onClick={() => router.refresh()}
                className="btn-outline w-full py-2"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}