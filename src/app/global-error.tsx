'use client';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#efeee8] p-8 text-black">
        <h2 className="font-sans text-6xl tracking-[-0.06em]">Something went wrong</h2>
        <p className="font-serif text-sm text-black/60">{error.message}</p>
        <button
          onClick={() => unstable_retry()}
          className="border border-black px-6 py-3 text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
