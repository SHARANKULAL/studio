
import type { Metadata } from 'next';
// Import with an alias to handle potential object wrapping
import { GeistSans as GeistSansModule } from 'geist/font/sans';
import { GeistMono as GeistMonoModule } from 'geist/font/mono';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster"

// Determine the correct loader function: either the module itself or its .default property
const geistSansLoader = typeof GeistSansModule === 'function' ? GeistSansModule : (GeistSansModule as any)?.default;
const geistMonoLoader = typeof GeistMonoModule === 'function' ? GeistMonoModule : (GeistMonoModule as any)?.default;

// Check if loaders are actually functions before calling, to prevent further errors
if (typeof geistSansLoader !== 'function') {
  console.error('Failed to load GeistSans font loader. GeistSansModule:', GeistSansModule);
  // Provide a non-functional fallback to avoid crashing the app, though styling will be affected
  // @ts-ignore
  global.geistSansLoaderError = true; // For potential debugging or conditional rendering
}
if (typeof geistMonoLoader !== 'function') {
  console.error('Failed to load GeistMono font loader. GeistMonoModule:', GeistMonoModule);
  // @ts-ignore
  global.geistMonoLoaderError = true;
}

const geistSans = typeof geistSansLoader === 'function'
  ? geistSansLoader({
      variable: '--font-geist-sans',
      subsets: ['latin'],
    })
  : { variable: '', className: '' }; // Fallback if loader is not a function

const geistMono = typeof geistMonoLoader === 'function'
  ? geistMonoLoader({
      variable: '--font-geist-mono',
      subsets: ['latin'],
    })
  : { variable: '', className: '' }; // Fallback if loader is not a function

export const metadata: Metadata = {
  title: 'LeavePilot',
  description: 'Employee Leave Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Combine class names, ensuring undefined or empty strings don't cause issues
  const bodyClassNames = [
    geistSans?.className,
    geistMono?.className,
    geistSans?.variable,
    geistMono?.variable,
    'antialiased',
  ].filter(Boolean).join(' ');

  return (
    <html lang="en">
      <body className={bodyClassNames}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
