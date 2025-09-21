import { isValidJson } from '@utils/isValidJson';
import { prettifyJson } from '@utils/prettifyJson';
import { APIResponse } from '@types';

export function ResponseViewer({ data }: { data: APIResponse }) {
  if (data.error) {
    return (
      <div className="w-full">
        <div className="text-sm text-gray-600">Status: {data.status}</div>
        <pre className="p-4 bg-red-50 border border-red-200 rounded text-red-700 overflow-auto w-full text-sm whitespace-pre-wrap max-h-[50vh]">
          {data.error}
        </pre>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-sm text-gray-600">Status: {data.status}</div>
      <pre className="p-4 bg-violet-100 rounded overflow-auto w-full text-sm whitespace-pre-wrap scroll-thin max-h-[50vh]">
        {typeof data.data === 'string' && isValidJson(data.data)
          ? prettifyJson(data.data)
          : JSON.stringify(data.data, null, 2)}
      </pre>
    </div>
  );
}
