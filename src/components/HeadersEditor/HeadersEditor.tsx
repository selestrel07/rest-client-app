'use client';

import { useState } from 'react';

interface HeadersEditorProps {
  headers: { key: string; value: string }[];
  onAdd: (key: string, value: string) => void;
}

export default function HeadersEditor({ headers, onAdd }: HeadersEditorProps) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (key.trim() && value.trim()) {
      onAdd(key, value);
      setKey('');
      setValue('');
    }
  };

  return (
    <div>
      <label className="block mb-1 font-medium">Headers</label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
        <ul className="mt-2 space-y-1">
          {headers.map((h, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 p-2 rounded"
            >
              <span>{h.key}</span>
              <span className="font-mono">{h.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
