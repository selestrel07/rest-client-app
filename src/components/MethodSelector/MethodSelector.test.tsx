import { render, screen, fireEvent } from '@testing-library/react';
import { MethodSelector } from 'components';

describe('MethodSelector', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it('renders all HTTP methods', () => {
    render(<MethodSelector value="GET" onChange={onChange} />);

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('POST')).toBeInTheDocument();
    expect(screen.getByText('PUT')).toBeInTheDocument();
    expect(screen.getByText('DELETE')).toBeInTheDocument();
    expect(screen.getByText('PATCH')).toBeInTheDocument();
  });

  it('calls onChange when a method is clicked', () => {
    render(<MethodSelector value="GET" onChange={onChange} />);

    fireEvent.click(screen.getByText('POST'));
    expect(onChange).toHaveBeenCalledWith('POST');
  });

  it('highlights the selected method', () => {
    render(<MethodSelector value="POST" onChange={onChange} />);

    const postButton = screen.getByText('POST').closest('button');
    expect(postButton).toHaveClass('bg-blue-500');
  });
});
