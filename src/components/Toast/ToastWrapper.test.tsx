import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ReduxProvider } from '@store/Providers';
import { ToastWrapper } from '@components';
import { userEvent } from '@testing-library/user-event';

describe('ToastWrapper component tests', () => {
  it('Should render Toast if state not null', async () => {
    render(
      <ReduxProvider
        preloadedState={{
          toast: {
            message: 'Logged out',
            type: 'success',
          },
        }}
      >
        <ToastWrapper />
      </ReduxProvider>
    );

    expect(await screen.findByText('Logged out')).toBeInTheDocument();
  });

  it('Should close Toast automatically after 3 sec', async () => {
    render(
      <ReduxProvider
        preloadedState={{
          toast: {
            message: 'Logged out',
            type: 'success',
          },
        }}
      >
        <ToastWrapper />
      </ReduxProvider>
    );
    const toast = screen.getByText('Logged out');
    expect(toast).toBeInTheDocument();

    await waitFor(() => expect(toast).not.toBeInTheDocument(), {
      timeout: 4000,
    });
  });

  it('Should close Toast on click', async () => {
    render(
      <ReduxProvider
        preloadedState={{
          toast: {
            message: 'Logged out',
            type: 'success',
          },
        }}
      >
        <ToastWrapper />
      </ReduxProvider>
    );
    const toast = screen.getByText('Logged out');
    await userEvent.click(toast);
    expect(toast).not.toBeInTheDocument();
  });
});
