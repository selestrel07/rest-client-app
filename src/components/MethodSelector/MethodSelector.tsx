interface MethodSelectorProps {
  value: string;
  onChange: (method: string) => void;
}

export function MethodSelector({ value, onChange }: MethodSelectorProps) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  return (
    <div>
      <label className="block mb-1 font-medium">Method</label>
      <div className="flex gap-2">
        {methods.map((m) => (
          <button
            key={m}
            onClick={() => onChange(m)}
            className={`px-3 py-1 rounded border ${
              value === m
                ? 'bg-blue-500 text-white border-blue-500'
                : 'border-gray-300 hover:bg-gray-100'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
