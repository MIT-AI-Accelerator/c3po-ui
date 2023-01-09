import { render, screen, within } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
    screen.debug();
  });

  it('Contains an input with a C3PO Prompt label', () => {
    render(<App />);
    const labelElement = within(document.getElementsByTagName("fieldset")[0]).getByText(/C3PO/);
    const inputElement = screen.getByRole("textbox");

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();

  });

  it('Matches the last snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

});