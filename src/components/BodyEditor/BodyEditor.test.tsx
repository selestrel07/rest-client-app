import { render, screen, fireEvent } from '@testing-library/react';
import { BodyEditor } from '@components';

describe('BodyEditor', () => {
  const onChange = vi.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  it('renders textarea with placeholder', () => {
    render(<BodyEditor value="" onChange={onChange} />);

    const textarea = screen.getByPlaceholderText('Enter request body...');
    expect(textarea).toBeInTheDocument();
  });

  it('calls onChange on textarea input', () => {
    render(<BodyEditor value="" onChange={onChange} />);

    const textarea = screen.getByPlaceholderText('Enter request body...');
    fireEvent.change(textarea, { target: { value: '{ "name": "John" }' } });

    expect(onChange).toHaveBeenCalledWith('{ "name": "John" }');
  });

  it('has JSON and Text mode buttons', () => {
    render(<BodyEditor value="" onChange={onChange} />);

    expect(screen.getByText('JSON')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('formats valid JSON on Prettify click', () => {
    const mockOnChange = vi.fn();
    render(
      <BodyEditor value='{ "name":"John", "age":30 }' onChange={mockOnChange} />
    );

    fireEvent.click(screen.getByText('Prettify'));

    expect(mockOnChange).toHaveBeenCalledWith(
      '{\n  "name": "John",\n  "age": 30\n}'
    );
  });

  it('shows error for invalid JSON on Prettify', () => {
    render(<BodyEditor value='{"name":' onChange={() => {}} />);

    fireEvent.click(screen.getByText('Prettify'));

    expect(screen.getByText('Invalid JSON format')).toBeInTheDocument();
  });

  it('shows error when body is empty on Prettify', () => {
    render(<BodyEditor value="" onChange={() => {}} />);

    fireEvent.click(screen.getByText('Prettify'));

    expect(screen.getByText('Body is empty')).toBeInTheDocument();
  });
});
