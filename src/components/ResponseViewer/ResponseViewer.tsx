import { isValidJson } from '@utils/isValidJson';
import { prettifyJson } from '@utils/prettifyJson';
import { APIResponse } from '@types';

export function ResponseViewer({ data }: { data: APIResponse }) {
  return (
    <div className="w-full">
      <div className="text-sm text-gray-600">Status: {data.status}</div>
      <pre className="p-4 bg-violet-100 rounded overflow-auto w-full text-sm whitespace-pre-wrap scroll-thin max-h-[50vh]">
        {isValidJson(data.data) ? prettifyJson(data.data) : data.data}
      </pre>
    </div>
  );
}
