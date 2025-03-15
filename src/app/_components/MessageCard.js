"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useUnreadMessages } from "@/app/_context/UnreadMessagesContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [loading, setLoading] = useState(false);
  const [iseDeleted, setIsDeleted] = useState(false);

  const { setUnreadCount } = useUnreadMessages();

  const handleRead = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) toast.success("Marked as Read");
        else toast.success("Marked as New");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success("Message deleted successfully.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (iseDeleted) return null;

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div
          className={
            "absolute top-2 right-2 bg-yellow-500 text-white rounded-md px-2 py-1"
          }
        >
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {" "}
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {" "}
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleRead}
        disabled={loading}
        className={`mt-4 mr-3 ${isRead ? "bg-gray-400" : "bg-blue-500 text-white"} py-1 px-3 rounded-md ${loading ? "cursor-not-allowed bg-zinc-300" : ""}`}
      >
        {isRead
          ? loading
            ? "loading..."
            : "Mark As New"
          : loading
            ? "loading..."
            : "Mark As Read"}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`mt-4 text-white py-1 px-3 rounded-md ${loading ? "bg-red-100 cursor-not-allowed" : "bg-red-500"}`}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default MessageCard;
