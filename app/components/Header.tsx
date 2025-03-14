import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">EssayHuzz</Link>
        <nav className="space-x-4">
          <Link href="/browse" className="hover:underline">Browse</Link>
          <Link href="/write" className="hover:underline">Write</Link>
          <Link href="/login" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md hover:opacity-90">Sign In</Link>
        </nav>
      </div>
    </header>
  );
}