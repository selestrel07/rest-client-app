import dynamic from 'next/dynamic';

const RestClientLazy = dynamic(
  () =>
    import('../../../../../components/RestClient/RestClient').then(
      (m) => m.RestClient
    ),
  { loading: () => <p>Loading...</p> }
);

export default function RestClientPage() {
  return <RestClientLazy />;
}
