/**
   * Sends a prompt to the GPT-J model for a seq2seq prediction.
   * @param {string} text
   */
export async function submitPrompt(
    text = "Placeholder text here."
) {
    const apiResp = await fetch(`http://127.0.0.1:8000/v1/sentiments/insights/getchatstress`, {
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