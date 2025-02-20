import connectDb from "../../../../../configs/db";
import Property from "../../../../../models/property";
import { getUserSession } from "@/app/_libs/getUserSession";
import cloudinary from "../../../../../configs/cloudinary";

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

// PUT
export async function PUT(req, { params }) {
  try {
    const userSession = await getUserSession();
    if (!userSession || !userSession.userId)
      return new Response("Unauthorized!", { status: 401 });

    const { userId } = userSession;
    const { id } = await params;

    await connectDb();

    const formData = await req.formData();

    // Access all values from amenities and images:
    const amenities = formData.getAll("amenities");

    // Get property to update
    const existingProperty = await Property.findById(id);
    if (!existingProperty)
      return new Response("Property Not Found!", { status: 404 });

    // Verifying ownership
    if (existingProperty.owner.toString() !== userId)
      return new Response("Unauthorized !", { status: 401 });

    // Create propertyData object
    const propertyData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        zipcode: formData.get("location.zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("rates.nightly"),
        weekly: formData.get("rates.weekly"),
        monthly: formData.get("rates.monthly"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };

    // Update property in database
    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Failed to add a property!", { status: 500 });
  }
}
