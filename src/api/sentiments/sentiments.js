/**
   * Sends a prompt to the GPT-J model for a seq2seq prediction.
   * @param {string} text
   */
export async function submitPrompt(
    text = "Placeholder text here."
) {
    const apiResp = await fetch(`${process.env.REACT_APP_API_BASE_URL}/v1/sentiments/insights/getchatstress`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            text
        }),
    });

    const respJson = await apiResp.json();
    return {
        status: apiResp.status,
        data: respJson,
    };
}