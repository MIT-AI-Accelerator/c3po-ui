import { render, cleanup } from '@testing-library/react';
import { Title } from './Title';

afterEach(cleanup);

describe('Title', () => {
    it('renders Title component', () => {
        render(<Title />);
    });
});