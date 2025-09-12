import { redirectIfAuthenticated } from '@utils';

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  await redirectIfAuthenticated(locale);

  return <div>{'text'}</div>;
}
