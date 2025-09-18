import { render, screen } from '@testing-library/react';
import RestPage from './page';

vi.mock('@components', () => ({
  RestClient: vi.fn(() => <div data-testid="rest-client" />),
  CodeGenerator: vi.fn(({ request }) => (
    <div data-testid="code-generator">{JSON.stringify(request)}</div>
  )),
}));

const parseQueryMock = vi.fn();
const decodeBase64Mock = vi.fn();

vi.mock('@utils/urlEncoding', () => ({
  decodeBase64: (val: string) => decodeBase64Mock(val),
  parseQuery: (query: string) => parseQueryMock(query),
}));

describe('RestPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with headings and body', async () => {
    decodeBase64Mock.mockImplementation((val) => `decoded-${val}`);
    parseQueryMock.mockReturnValue({ Authorization: 'Bearer token' });

    const params = Promise.resolve({
      method: 'get',
      requestpart: ['dXJsLWJhc2U2NA==', 'Ym9keS1iYXNlNjQ='],
    });
    const searchParams = Promise.resolve({
      Authorization: 'Bearer token',
    });

    render(await RestPage({ params, searchParams }));

    const codeGen = screen.getByTestId('code-generator');
    expect(codeGen).toHaveTextContent(
      JSON.stringify({
        method: 'GET',
        url: 'decoded-dXJsLWJhc2U2NA==',
        headers: { Authorization: 'Bearer token' },
        body: 'decoded-Ym9keS1iYXNlNjQ=',
      })
    );
  });

  it('renders without body and empty headings', async () => {
    decodeBase64Mock.mockImplementation((val) => `decoded-${val}`);
    parseQueryMock.mockReturnValue({});
    const params = Promise.resolve({
      method: 'post',
      requestpart: ['dXJsLWJhc2U2NA=='],
    });
    const searchParams = Promise.resolve({});

    render(await RestPage({ params, searchParams }));

    const codeGen = screen.getByTestId('code-generator');
    expect(codeGen).toHaveTextContent(
      JSON.stringify({
        method: 'POST',
        url: 'decoded-dXJsLWJhc2U2NA==',
        headers: {},
        body: '',
      })
    );
  });
});
