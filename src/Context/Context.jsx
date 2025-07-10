import { createContext, useState } from "react";
import runChat from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");

  // All conversations (list of chats)
  const [allConversations, setAllConversations] = useState([]);

  // ID of currently active conversation
  const [currentConversationId, setCurrentConversationId] = useState(null);

  const onSent = async (prompt) => {
    const finalPrompt = prompt !== undefined ? prompt : input;

    let activeConversationId = currentConversationId;

    // If no conversation exists yet, create one
    if (!activeConversationId) {
      activeConversationId = Date.now().toString();
      setCurrentConversationId(activeConversationId);
      setAllConversations((prev) => [
        ...prev,
        { id: activeConversationId, entries: [] },
      ]);
    }

    // Append a loading entry first
    setAllConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              entries: [
                ...conv.entries,
                { prompt: finalPrompt, response: "", loading: true },
              ],
            }
          : conv
      )
    );

    setInput("");

    // Get response
    const responseRaw = await runChat(finalPrompt);

    let formattedResponse = responseRaw
      .split("**")
      .map((s, i) => (i % 2 === 1 ? `<b>${s}</b>` : s))
      .join("")
      .split("*")
      .join("</br>");

    // Update the entry to remove loader and set response
    setAllConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? {
              ...conv,
              entries: conv.entries.map((entry, index, arr) =>
                index === arr.length - 1
                  ? { ...entry, response: formattedResponse, loading: false }
                  : entry
              ),
            }
          : conv
      )
    );
  };

  const newChat = () => {
    const newId = Date.now().toString();
    setCurrentConversationId(newId);
    setAllConversations((prev) => [
      ...prev,
      { id: newId, entries: [] },
    ]);
    setInput("");
  };

  const loadConversation = (id) => {
    setCurrentConversationId(id);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    onSent,
    newChat,
    loadConversation,
    allConversations,
    currentConversationId,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
