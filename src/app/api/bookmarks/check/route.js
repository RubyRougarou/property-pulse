import connectDb from "../../../../../configs/db";
import User from "../../../../../models/user";
import { getUserSession } from "@/app/_libs/getUserSession";

export const dynamic = "force-dynamic";

// POST
export const POST = async (req) => {
  try {
    await connectDb();

    const { propertyId } = await req.json();

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId)
      return new Response("Unauthorized!", { status: 401 });

    const { userId } = userSession;

    // Find user in database
    const user = await User.findById(userId);

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response("Something went wrong!", {
      status: 500,
    });
  }
};
