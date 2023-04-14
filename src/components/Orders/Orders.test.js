import { render, cleanup } from '@testing-library/react';
import { Orders } from './Orders';

afterEach(cleanup);

describe('Orders', () => {
    it('renders Orders component', () => {
        render(<Orders />);
    });
});