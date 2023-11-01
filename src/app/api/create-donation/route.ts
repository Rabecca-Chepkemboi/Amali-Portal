import { BASE_URL } from "../../../../config";

export async function POST(request: Request) {
  try {
    if (!BASE_URL) {
      return new Response("Base url not found", {
        status: 404,
        statusText: "Failed",
      });
    }
    const donations = await request.json().then(async (response) => {
      const result = await fetch(`${BASE_URL}/mpesadaraja/stkpush/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(response),
      });

      const donation = await result.json();

      return donation;
    });

    return new Response(JSON.stringify(donations), {
      status: 201,
      statusText: "Success",
    });
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
      statusText: "Failed",
    });
  }
}




