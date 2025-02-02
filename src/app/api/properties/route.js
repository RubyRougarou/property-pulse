import connectDb from "../../../../configs/db";

export async function GET(req) {
  try {
    await connectDb();
    return new Response(JSON.stringify({ message: "First API route!" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("the worst api route ever!", { status: 500 });
  }
}
