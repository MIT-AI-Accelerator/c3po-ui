import { render, cleanup } from '@testing-library/react';
import { Chart } from './Chart';

afterEach(cleanup);

describe('Chart', () => {
    it('renders Chart component', () => {
        render(<Chart />);
    });
});