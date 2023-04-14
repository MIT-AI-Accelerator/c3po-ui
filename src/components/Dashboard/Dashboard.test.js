import { render, cleanup } from '@testing-library/react';
import { Dashboard } from './Dashboard';

afterEach(cleanup);

describe('Dashboard', () => {
    it('renders Dashboard component', () => {
        render(<Dashboard />);
    });
});