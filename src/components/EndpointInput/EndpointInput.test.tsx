import { render, screen, fireEvent } from '@testing-library/react';
import { EndpointInput } from '@components';

describe('EndpointInput', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it('renders input with placeholder', () => {
    render(<EndpointInput value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('https://api.example.com/users');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange on input change', () => {
    render(<EndpointInput value="" onChange={onChange} />);

    const input = screen.getByPlaceholderText('https://api.example.com/users');
    fireEvent.change(input, { target: { value: 'https://test.com' } });

    expect(onChange).toHaveBeenCalledWith('https://test.com');
  });

  it('displays current value', () => {
    render(
      <EndpointInput value="https://my-api.com/data" onChange={onChange} />
    );

    const input = screen.getByDisplayValue('https://my-api.com/data');
    expect(input).toBeInTheDocument();
  });
});
