import { render, cleanup } from '@testing-library/react';
import { Deposits } from './Deposits';

afterEach(cleanup);

describe('Deposits', () => {
    it('renders Deposits component', () => {
        render(<Deposits />);
    });
});