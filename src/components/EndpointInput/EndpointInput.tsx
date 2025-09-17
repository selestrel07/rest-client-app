interface EndpointInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function EndpointInput({ value, onChange }: EndpointInputProps) {
  const isValid = value === '' || isValidUrl(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Endpoint
      </label>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="https://api.example.com/users"
        className={`w-full px-3 py-2 border border-violet-700 rounded focus:outline-none focus:border-violet-700 ${
          value === ''
            ? 'border-gray-300'
            : isValid
              ? 'border-green-500 focus:ring-green-200'
              : 'border-red-500 focus:ring-red-200'
        }`}
      />
      {value && !isValid && (
        <p className="text-red-500 text-xs">
          Please enter a valid URL (e.g. https://example.com)
        </p>
      )}
    </div>
  );
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}
