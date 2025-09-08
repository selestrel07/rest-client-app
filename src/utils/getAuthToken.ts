export async function getAuthToken(request: Request): Promise<string> {

  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(cookieHeader.split('; ').map((cookie) => {
    const [name, value] = cookie.split('=');
    return [name, value];
  }));

  return cookies['authToken'];
}