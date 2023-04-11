import { render, screen, within, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import * as sentimentsApi from "./api/sentiments";

afterEach(cleanup);

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
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

describe('Interactions with main text input', () => {

  beforeEach(() => {
    const submitPromptMock = jest.spyOn(sentimentsApi, "submitPrompt");

    submitPromptMock.mockImplementation(async (prompt) => {
      return prompt === 'good' ?
        { status: 200, data: { answer: "Great Success" } } :
        { status: 400 }
    });
  })

  afterEach(() => {
    const submitPromptMock = jest.spyOn(sentimentsApi, "submitPrompt");
    submitPromptMock.mockReset();
  });

  it('...calls the API when the prompt updates and returns the response when 200', async () => {

    // render app, save the react-testing-library utils
    const { queryByLabelText, getByLabelText, findByText } = render(
      <App />,
    );

    // ensure that the form input exists
    expect(queryByLabelText(/C3PO Prompt/i)).toBeTruthy();

    // "type" the word "good" and hit enter
    fireEvent.keyUp(getByLabelText(/C3PO Prompt/i), { key: 'Enter', code: 'Enter', charCode: 13, target: { value: "good" } });

    // ensure the correct api function was called with the correct word
    expect(sentimentsApi.submitPrompt).toHaveBeenCalledWith('good');

    // since the api is async (even if mocked), wait for the state to update using findBy (or could waitFor)
    expect(await findByText(/Great Success/i)).toBeTruthy();
  });

  it('...calls the API when the prompt updates and tells the user of error when not 200', async () => {

    // render app, save the react-testing-library utils
    const { queryByLabelText, getByLabelText, findByText } = render(
      <App />,
    );

    // ensure that the form input exists
    expect(queryByLabelText(/C3PO Prompt/i)).toBeTruthy();

    // "type" the word "bad" and hit enter
    fireEvent.keyUp(getByLabelText(/C3PO Prompt/i), { key: 'Enter', code: 'Enter', charCode: 13, target: { value: "bad" } });

    // ensure the correct api function was called with the correct word
    expect(sentimentsApi.submitPrompt).toHaveBeenCalledWith('bad');

    // since the api is async (even if mocked), wait for the state to update using findBy (or could waitFor)
    expect(await findByText(/Error, try again later./i)).toBeTruthy();
  });

  it('...not to call API if not Enter', async () => {

    // render app, save the react-testing-library utils
    const { queryByLabelText, getByLabelText, findByText } = render(
      <App />,
    );

    // ensure that the form input exists
    expect(queryByLabelText(/C3PO Prompt/i)).toBeTruthy();

    // "type" the key d
    fireEvent.keyUp(getByLabelText(/C3PO Prompt/i), { key: 'd', code: 'KeyD', charCode: 68, target: { value: "anything" } });

    // not called
    expect(sentimentsApi.submitPrompt).not.toBeCalled();

  });

});