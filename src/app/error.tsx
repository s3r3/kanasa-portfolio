'use client';

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg p-8 text-fg">
      <h2 className="font-sans text-6xl tracking-[-0.06em]">Something went wrong</h2>
      <p className="font-serif text-sm text-fg/60">{error.message}</p>
      <button
        onClick={() => unstable_retry()}
        className="border border-black px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
