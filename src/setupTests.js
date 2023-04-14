// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";

//****** 
//enable mocking of fetch in all tests through jest-fetch-mock
fetchMock.enableMocks();

//****** 
//suppress min width and height warnings that come from the below rechart testing issue: https://github.com/recharts/recharts/issues/727#issuecomment-671113293
const MockResponsiveContainer = props => <div {...props} />

jest.mock('recharts', () => ({
    ...jest.requireActual('recharts'),
    ResponsiveContainer: MockResponsiveContainer,
}))

//****** 
// used for rechart testing issue, see here: https://github.com/maslianok/react-resize-detector/issues/145
const { ResizeObserver } = window;

beforeEach(() => {
    //@ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }));
});


afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
});