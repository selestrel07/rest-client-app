import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CodeGenerator } from '@components';
import { RequestType } from '@types';
import { generateCode } from '@utils/generateCode';
import { userEvent } from '@testing-library/user-event';

const request: RequestType = {
  method: 'GET',
  headers: {
    'content-type': 'application/json',
    'content-type-json': 'application/json',
  },
  url: 'http://localhost:8000/',
  body: 'text',
};

const findElementWithCode = async (expectedCode: string) => {
  return await screen.findByText(
    (_, el) => el !== null && el.textContent === expectedCode
  );
};

describe('CodeGenerator component tests', () => {
  it('Should render correctly', async () => {
    render(<CodeGenerator request={request} />);

    expect(screen.getByText('curl')).toBeInTheDocument();
    await expect(
      findElementWithCode(generateCode('curl', request))
    ).resolves.toBeInTheDocument();
  });

  it('Should update code according to the selected language', async () => {
    render(<CodeGenerator request={request} />);
    const select = screen.getByRole('combobox');

    await userEvent.selectOptions(select, 'java');

    await expect(
      findElementWithCode(generateCode('java', request))
    ).resolves.toBeInTheDocument();
  });

  it('Should copy generated code to clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText: writeTextMock },
    });

    render(<CodeGenerator request={request} />);
    const copyButton = screen.getByTestId('button-copy');
    await userEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledWith(generateCode('curl', request));
  });
});
