import { render, cleanup } from '@testing-library/react';
import { mainListItems, secondaryListItems } from './listItems';

afterEach(cleanup);

describe('listItems', () => {
    it('renders mainListItems component', () => {
        render(<>{mainListItems}</>);
    });

    it('renders secondaryListItems component', () => {
        render(<>{secondaryListItems}</>);
    });
});