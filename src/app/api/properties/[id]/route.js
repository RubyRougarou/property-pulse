import connectDb from "../../../../../configs/db";
import Property from "../../../../../models/property";

//GET (id)
export async function GET(req, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const property = await Property.findById(id);

    if (!property) return new Response("Property Not Found!", { status: 404 });

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("the worst api route ever!", { status: 500 });
  }
}
