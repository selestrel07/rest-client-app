'use client';

import { useState } from 'react';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
  isJson: boolean;
  onModeChange: (isJson: boolean) => void;
}

export function BodyEditor({
  value,
  onChange,
  isJson,
  onModeChange,
}: BodyEditorProps) {
  const [error, setError] = useState<string | null>(null);

  const handlePrettify = () => {
    if (!isJson) return;

    const trimmed = value.trim();
    if (!trimmed) {
      setError('Body is empty');
      return;
    }

    try {
      const parsed = JSON.parse(trimmed);
      onChange(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(`Invalid JSON format ${e}`);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Body</label>

      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => onModeChange(true)}
          className={`px-2 py-1 text-xs rounded ${
            isJson ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          JSON
        </button>
        <button
          type="button"
          onClick={() => onModeChange(false)}
          className={`px-2 py-1 text-xs rounded ${
            !isJson ? 'bg-violet-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Text
        </button>
        <button
          type="button"
          onClick={handlePrettify}
          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300"
        >
          Prettify
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter request body..."
        className="w-full px-3 py-2 border border-violet-700 rounded h-32 resize-none font-mono text-sm"
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
