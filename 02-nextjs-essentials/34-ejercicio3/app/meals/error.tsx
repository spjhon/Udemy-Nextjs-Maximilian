'use client';

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
      <pre>{error.message}</pre>
    </main>
  );
}
