import { BASE_URL } from "../../../../config";

export async function GET() {
    try {
        if (!BASE_URL) {
            return new Response('Base url not found', {
                status: 404,
                statusText: 'Failed'
            });
        }
        const response = await fetch(`${BASE_URL}/api/athletes/`);
        
        if (!response.ok) {
            const errorMessage = `Failed to fetch athletes. Status: ${response.status}, Status Text: ${response.statusText}`;
            return new Response(errorMessage, {
                status: response.status,
                statusText: 'Failed'
            });
        }
        const result = await response.json();

        return new Response(JSON.stringify(result), {
            status: 200,
            statusText: 'Success'
        });
    } catch (error: any) {
        return new Response(error.message, {
            status: 500,
            statusText: 'Failed'
        });
    }
}
