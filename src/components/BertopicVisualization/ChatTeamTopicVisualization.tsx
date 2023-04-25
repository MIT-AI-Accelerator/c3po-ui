import React, { useState, useEffect } from 'react';
import { PlotParams } from 'react-plotly.js';
import { obtainBertopicVisualization } from '../../api/topics/topics';
import { BertopicVisualization } from './BertopicVisualization';

export const ChatTeamTopicVisualization = ({ team = 'nitmre' }) => {
    const [plotParams, setPlotParams] = useState<PlotParams | null>(null);

    useEffect(() => {
        async function getVisualization() {
            const newResponseObj = await obtainBertopicVisualization(team);
            newResponseObj.status === 200 && setPlotParams(newResponseObj.data.plot_params);
            newResponseObj.status !== 200 && setPlotParams(null);
        }

        getVisualization();
    }, [team]);

    return (
        <>{plotParams ? <BertopicVisualization plotParams={plotParams} /> : <div />}</>
    );
};