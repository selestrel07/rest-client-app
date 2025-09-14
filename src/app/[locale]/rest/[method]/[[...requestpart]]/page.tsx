import { CodeGenerator } from '@components';
import dynamic from 'next/dynamic';

const RestClientLazy = dynamic(
  () =>
    import('../../../../../components/RestClient/RestClient').then(
      (m) => m.RestClient
    ),
  { loading: () => <p>Loading...</p> }
);

export default function RestClientPage() {
  return (
    <div className="flex justify-end w-full">
      <RestClientLazy />
      <CodeGenerator
        request={{
          method: 'GET',
          url: 'http://localhost:3000/',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: '{"language": "curl","url": "http://localhost:3000/","headers": {"Accept": "application/json"}}',
        }}
      />
    </div>
  );
}
