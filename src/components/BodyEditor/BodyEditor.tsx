'use client';

import { useState } from 'react';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function BodyEditor({ value, onChange }: BodyEditorProps) {
  const [isJson, setIsJson] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePrettify = () => {
    const trimmed = value.trim();
    setError(null);

    if (!trimmed) {
      setError('Body is empty');
      return;
    }

    try {
      const parsed = JSON.parse(trimmed);
      onChange(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setError('Invalid JSON format');
      console.warn('Failed to parse JSON:', e);
    }
  };

  return (
    <div>
      <label className="block mb-1 font-medium">Body</label>

      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setIsJson(true)}
          className={`px-2 py-1 text-sm ${isJson ? 'bg-violet-500 text-violet-950' : 'bg-gray-200'}`}
        >
          JSON
        </button>
        <button
          type="button"
          onClick={() => setIsJson(false)}
          className={`px-2 py-1 text-sm ${!isJson ? 'bg-violet-500 text-violet-950' : 'bg-gray-200'}`}
        >
          Text
        </button>
        <button
          type="button"
          onClick={handlePrettify}
          className="px-2 py-1 text-sm bg-gray-200 hover:bg-gray-300"
        >
          Prettify
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter request body..."
        className="w-full px-3 py-2 border border-violet-700 rounded focus:outline-none focus:border-violet-700 h-32 resize-none font-mono text-sm"
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
