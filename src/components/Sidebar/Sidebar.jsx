import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Sidebar = () => {
  const [extented, setExtended] = useState(false);
  const { newChat, allConversations, loadConversation, currentConversationId } =
    useContext(Context);

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={newChat} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extented && <p>New chat</p>}
        </div>

        {extented && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {allConversations.map((conv) => (
              <div
                key={conv.id}
                className={`recent-entry ${
                  conv.id === currentConversationId ? "active" : ""
                }`}
                onClick={() => loadConversation(conv.id)}
              >
                <img src={assets.message_icon} alt="" />
                <p>{conv.entries[0]?.prompt.slice(0, 18) || "New Chat"}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <div>
            <Tippy content="Under construction…Just like my life.">
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <img
                  className="icon-with-tooltip"
                  src={assets.setting_icon}
                  alt=""
                />
                {extented && <p>Settings and help</p>}
              </div>
            </Tippy>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
