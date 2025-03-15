import connectDb from "../../../../../configs/db";
import Message from "../../../../../models/message";
import { getUserSession } from "@/app/_libs/getUserSession";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    await connectDb();

    const userSession = await getUserSession();
    if (!userSession || !userSession.userId) {
      return new Response("You must log in first!", { status: 401 });
    }
    const { userId } = userSession;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};
