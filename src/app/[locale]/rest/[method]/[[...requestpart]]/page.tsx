import { CodeGenerator } from '@components';

export default function RestClientPage() {
  return (
    <div className="flex justify-end w-full">
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
