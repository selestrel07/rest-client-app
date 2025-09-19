'use client';

import { useParams } from 'next/navigation';

export default function RequestPage() {
  const params = useParams();

  const method = params.method as string;
  const encodedUrl = params.url as string;

  let url: string;
  try {
    url = decodeURIComponent(atob(encodedUrl));
  } catch (e) {
    url = `[Invalid URL ${e}]`;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Request Details</h1>
      <div className="bg-gray-100 p-4 rounded">
        <p>
          <strong>Method:</strong> <code>{method}</code>
        </p>
        <p>
          <strong>URL:</strong> <code>{url}</code>
        </p>
      </div>
    </div>
  );
}
