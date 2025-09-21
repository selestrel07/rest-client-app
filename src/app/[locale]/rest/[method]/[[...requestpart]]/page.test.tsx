import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RestPageClient from './page';

const dispatchMock = vi.fn();
vi.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
}));

const useParamsMock = vi.fn();
const useSearchParamsMock = vi.fn();

vi.mock('next/navigation', () => ({
  useParams: () => useParamsMock(),
  useSearchParams: () => useSearchParamsMock(),
}));

vi.mock('@components', () => ({
  RestClient: vi.fn(() => <div data-testid="rest-client" />),
  CodeGenerator: vi.fn(({ request }) => (
    <div data-testid="code-generator">{JSON.stringify(request)}</div>
  )),
}));

const decodeBase64Mock = vi.fn();
const parseQueryMock = vi.fn();

vi.mock('@utils/urlEncoding', () => ({
  decodeBase64: (val: string) => decodeBase64Mock(val),
  parseQuery: (query: string) => parseQueryMock(query),
}));

describe('RestPageClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('dispatches decoded method, url, body and headers', () => {
    useParamsMock.mockReturnValue({
      method: 'post',
      requestpart: ['dXJsLWJhc2U2NA==', 'Ym9keS1iYXNlNjQ='],
    });

    useSearchParamsMock.mockReturnValue({
      toString: () => 'Authorization=Bearer+token',
    });

    decodeBase64Mock.mockImplementation((val) => `decoded-${val}`);
    parseQueryMock.mockReturnValue({ Authorization: 'Bearer token' });

    render(<RestPageClient />);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setMethod',
      payload: 'POST',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setEndpoint',
      payload: 'decoded-dXJsLWJhc2U2NA==',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setBody',
      payload: 'decoded-Ym9keS1iYXNlNjQ=',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setHeaders',
      payload: [{ key: 'Authorization', value: 'Bearer token' }],
    });

    const codeGen = screen.getByTestId('code-generator');
    expect(codeGen).toHaveTextContent(
      JSON.stringify({
        method: 'POST',
        url: 'decoded-dXJsLWJhc2U2NA==',
        headers: { Authorization: 'Bearer token' },
        body: 'decoded-Ym9keS1iYXNlNjQ=',
      })
    );
  });

  it('works with default GET and no request parts', () => {
    useParamsMock.mockReturnValue({});
    useSearchParamsMock.mockReturnValue({ toString: () => '' });

    decodeBase64Mock.mockReturnValue('');
    parseQueryMock.mockReturnValue({});

    render(<RestPageClient />);

    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setMethod',
      payload: 'GET',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setEndpoint',
      payload: '',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setBody',
      payload: '',
    });
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'restClient/setHeaders',
      payload: [],
    });

    const codeGen = screen.getByTestId('code-generator');
    expect(codeGen).toHaveTextContent(
      JSON.stringify({
        method: 'GET',
        url: '',
        headers: {},
        body: '',
      })
    );
  });
});
