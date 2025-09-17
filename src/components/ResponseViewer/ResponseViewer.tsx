interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  status: number;
  data: unknown;
}

type APIResponse = ErrorResponse | SuccessResponse | unknown;

function isErrorResponse(data: unknown): data is ErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'error' in data &&
    typeof (data as { error?: unknown }).error === 'string'
  );
}

function isSuccessResponse(data: unknown): data is SuccessResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'status' in data &&
    typeof (data as { status?: unknown }).status === 'number'
  );
}

export function ResponseViewer({ data }: { data: APIResponse }) {
  if (isErrorResponse(data)) {
    return (
      <pre className="text-red-500 p-4 bg-red-50 rounded whitespace-pre-wrap">
        {data.error}
      </pre>
    );
  }

  if (isSuccessResponse(data)) {
    return (
      <div className="space-y-2">
        <div className="text-sm text-gray-600">Status: {data.status}</div>
        <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm whitespace-pre-wrap">
          {typeof data.data === 'object'
            ? JSON.stringify(data.data, null, 2)
            : String(data.data)}
        </pre>
      </div>
    );
  }

  return (
    <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm whitespace-pre-wrap">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
