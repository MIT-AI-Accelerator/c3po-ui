/**
   * Chat team name for topic inference.
   * @param {string} team
   */
export async function obtainBertopicVisualization(
    team = "nitmre"
) {
    const apiResp = await fetch(`http://127.0.0.1:8000/v1/topics/insights/teamtrending/visualization/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            team
        }),
    });
    
    const respJson = await apiResp.json();
    console.log(respJson);
    return {
        status: apiResp.status,
        data: respJson,
    };
}