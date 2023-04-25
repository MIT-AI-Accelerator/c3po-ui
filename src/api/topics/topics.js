/**
   * Chat team name for topic inference.
   * @param {string} team
   */
export async function obtainBertopicVisualization(
    team = "nitmre"
) {
    const apiResp = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/topics/insights/teamtrending/visualization/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            team
        }),
    });
    
    const respJson = await apiResp.json();
    return {
        status: apiResp.status,
        data: respJson,
    };
}