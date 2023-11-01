import { BASE_URL } from "../../../../config";
export async function POST(request: Request) {
  try {
    if (!BASE_URL) {
      return new Response("Base URL not found", {
        status: 404,
        statusText: "Failed",
      });
    }
    const data = await request.json();
    const result = await fetch(`${BASE_URL}/api/contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.ok) {
      const response = await result.json();
      return new Response(JSON.stringify(response), {
        status: 201,
        statusText: "Created",
      });
    } else {
      return new Response("Failed to submit the form", {
        status: 500,
        statusText: "Failed",
      });
    }
  } catch (error: any) {
    return new Response(error.message, {
      status: 500,
      statusText: "Failed",
    });
  }
}