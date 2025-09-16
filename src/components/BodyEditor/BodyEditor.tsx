'use client';

import { useState } from 'react';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function BodyEditor({ value, onChange }: BodyEditorProps) {
  const [isJson, setIsJson] = useState(true);

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(value);
      onChange(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <label className="block mb-1 font-medium">Body</label>
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => setIsJson(true)}
          className={`px-2 py-1 text-sm ${isJson ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          JSON
        </button>
        <button
          onClick={() => setIsJson(false)}
          className={`px-2 py-1 text-sm ${!isJson ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Text
        </button>
        <button
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
        className="w-full px-3 py-2 border rounded h-32 resize-none"
      />
    </div>
  );
}
