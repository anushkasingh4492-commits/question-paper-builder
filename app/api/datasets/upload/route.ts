export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Dataset received:", body);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Dataset uploaded successfully",
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (e) {
    console.error(e);

    return new Response(JSON.stringify({ success: false }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}