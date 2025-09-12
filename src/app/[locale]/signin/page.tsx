import { redirectIfAuthenticated } from '@utils';
import { SignInForm } from '@components';

export default async function SignInPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  await redirectIfAuthenticated(locale);

  return <SignInForm />;
}
