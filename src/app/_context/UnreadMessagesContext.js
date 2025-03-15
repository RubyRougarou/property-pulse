"use client";
import { useState, useContext, createContext } from "react";

// create context
const UnreadMessagesContext = createContext();

// create a provider
function UnreadMessagesProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <UnreadMessagesContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </UnreadMessagesContext.Provider>
  );
}

// create a custom hook to access context
function useUnreadMessages() {
  const context = useContext(UnreadMessagesContext);

  if (context === undefined)
    throw new Error(
      "useUnreadMessages must be used within unreadMessagesContext",
    );

  return context;
}

export { UnreadMessagesProvider, useUnreadMessages };
