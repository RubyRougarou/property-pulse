"use client";
import { useState, useEffect } from "react";
import { useUnreadMessages } from "@/app/_context/UnreadMessagesContext";

const UnreadMessagesCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useUnreadMessages();

  useEffect(() => {
    const getUnreadCount = async () => {
      if (!session) return;

      try {
        const res = await fetch(`/api/messages/unread-count`);
        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUnreadCount();
  }, [session]);

  return (
    <span
      className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full ${!unreadCount ? "hidden" : ""}`}
    >
      {unreadCount}
    </span>
  );
};

export default UnreadMessagesCount;
