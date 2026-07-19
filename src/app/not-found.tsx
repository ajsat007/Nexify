import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950 px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-heading font-bold text-surface-200 dark:text-surface-800 mb-4">404</div>
        <h1 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Page not found</h1>
        <p className="text-surface-700 dark:text-surface-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
