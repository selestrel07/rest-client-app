'use client';

import { FC, useState } from 'react';
import { RequestType } from '@types';
import { useParams, useSearchParams } from 'next/navigation';
import { convertUrlToRequest } from '@utils/requestUrlConverter';

export const RestClient: FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [request] = useState<RequestType>(
    convertUrlToRequest(params, searchParams)
  );
  return (
    <pre>
      {`Current state:
        Method: ${request.method}
        URL: ${request.url ?? 'No URL provided'}
        Body: ${request.body ?? 'No body provided'}
        Headers: ${
          request.headers
            ? Object.entries(request.headers)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n  ')
            : 'No headers provided'
        }`}
    </pre>
  );
};
