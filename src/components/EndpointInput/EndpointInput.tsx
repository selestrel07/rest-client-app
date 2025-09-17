interface EndpointInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function EndpointInput({ value, onChange }: EndpointInputProps) {
  return (
    <div>
      <label className="block mb-1 font-medium">Endpoint</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://api.example.com/users"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
