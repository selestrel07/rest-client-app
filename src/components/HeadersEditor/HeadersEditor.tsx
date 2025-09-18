'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface HeadersEditorProps {
  headers: { key: string; value: string }[];
  onAdd: (key: string, value: string) => void;
}

export function HeadersEditor({ headers, onAdd }: HeadersEditorProps) {
  const t = useTranslations('RestClient');

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
            className="flex-1 px-3 py-2 border border-violet-700 rounded focus:outline-none focus:border-violet-700"
          />
          <input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-violet-700 rounded focus:outline-none focus:border-violet-700"
          />
          <button
            onClick={handleAdd}
            className="px-3 py-2 bg-violet-500 text-violet-950 rounded hover:bg-violet-600"
          >
            {t('button')}
          </button>
        </div>
        <ul className="mt-2 space-y-1">
          {headers.map((h, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-violet-100 p-2 rounded"
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
