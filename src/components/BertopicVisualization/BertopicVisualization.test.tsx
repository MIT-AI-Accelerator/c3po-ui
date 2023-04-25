import React from 'react'
import { render, cleanup } from '@testing-library/react';
import { ChatTeamTopicVisualization } from './ChatTeamTopicVisualization';

afterEach(cleanup);

describe('BertopicVisualization', () => {
    it('renders ChatTeamTopicVisualization component', () => {
        render(<ChatTeamTopicVisualization />);
    });
});