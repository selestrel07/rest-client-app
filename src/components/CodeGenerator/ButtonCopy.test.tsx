import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ButtonCopy } from '@components';
import { userEvent } from '@testing-library/user-event';

const actionMock = vi.fn();

describe('ButtonCopy component tests', () => {
  it('Should render correctly', () => {
    render(<ButtonCopy action={actionMock} />);

    expect(screen.getByRole('button', { name: 'copy' })).toBeInTheDocument();
  });

  it('Should update text and call action on click and change text to original after 1.5s', async () => {
    render(<ButtonCopy action={actionMock} />);

    const button = screen.getByTestId('button-copy');
    await userEvent.click(button);

    expect(await screen.findByText('✔')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText('copy')).toBeInTheDocument(), {
      timeout: 2000,
    });
    expect(actionMock).toBeCalled();
  });
});
