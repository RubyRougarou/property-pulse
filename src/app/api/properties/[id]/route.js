import connectDb from "../../../../../configs/db";
import Property from "../../../../../models/property";
import { getUserSession } from "@/app/_libs/getUserSession";

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

// DELETE
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const propertyId = id;

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId)
      return new Response("Unauthorized!", { status: 401 });

    const { userId } = userSession;

    await connectDb();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property Not Found!", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId)
      return new Response("Unauthorized!", { status: 401 });

    await property.deleteOne();

    return new Response("Property deleted.", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("the worst api route ever!", { status: 500 });
  }
}
