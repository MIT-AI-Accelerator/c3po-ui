import Paper from '@mui/material/Paper';
import React from 'react';
import Plot, { PlotParams } from 'react-plotly.js';

export const BertopicVisualization: React.FunctionComponent<{ plotParams: PlotParams }> = ({ plotParams }) => {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                width: 850, height: 500
            }}
        >
            {plotParams && <Plot {
                ...{
                    ...plotParams,
                    layout: {
                        ...plotParams.layout,
                        width: 825,
                        height: 475
                    }
                }
            }
            />}
        </Paper>
    );
};