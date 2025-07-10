import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Tooltip styling

const Main = () => {
  const { onSent, setInput, input, allConversations, currentConversationId } =
    useContext(Context);

  const activeConversation = allConversations.find(
    (c) => c.id === currentConversationId
  );
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <Tippy content="That’s you.">
          <img src={assets.user_icon} alt="" />
        </Tippy>
      </div>
      <div className="main-container">
        {!activeConversation || activeConversation.entries.length === 0 ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, there</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  onSent("Suggest beautiful pictures for a road trip")
                }
              >
                <p>Suggest beautiful pictures for a road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div
                className="card"
                onClick={() => onSent("What is Urban Planning?")}
              >
                <p>What is Urban Planning?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => onSent("Team activities for work retreat")}
              >
                <p>Team activities for work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => onSent("Project ideas on React")}
              >
                <p>Project ideas on React</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          activeConversation.entries.map((item, index) => (
            <div className="result" key={index}>
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{item.prompt}</p>
              </div>
              <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {item.loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: item.response }}></p>
                )}
              </div>
            </div>
          ))
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              placeholder="Ask Gemini"
            />
            <div>
              <Tippy content="Coming soon…Maybe?">
                <img
                  src={assets.gallery_icon}
                  alt=""
                  className="icon-with-tooltip"
                />
              </Tippy>

              <Tippy content="Voice input? LOL. Nope.">
                <img
                  src={assets.mic_icon}
                  alt=""
                  className="icon-with-tooltip"
                />
              </Tippy>

              {input && (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
