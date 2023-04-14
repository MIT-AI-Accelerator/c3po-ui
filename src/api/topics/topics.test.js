import { cleanup } from '@testing-library/react';
import { submitPrompt } from "./sentiments";

afterEach(cleanup);

describe('Sentiments API', () => {

    beforeEach(() => {
        fetch.resetMocks();
    });

    it('...calls the API when the prompt updates and returns the response when 200', async () => {

        fetch.mockResponseOnce(JSON.stringify(
            { answer: "Great Success" }
        ));

        const output = await submitPrompt("test");

        expect(fetch).toBeCalledTimes(1);
        expect(output.status).toEqual(200);
        expect(output.data.answer).toEqual("Great Success");
    });

    it('...calls the API returns an error message when 400', async () => {

        fetch.mockResponseOnce(JSON.stringify(
            { error: "Great Failure" }
        ),
            { status: 400 }
        );

        const output = await submitPrompt("test");

        expect(fetch).toBeCalledTimes(1);
        expect(output.status).toEqual(400);
        expect(output.data.error).toEqual("Great Failure");
    });
});