import React, { useEffect } from "react";
import "./index.css";

import { useClipboard } from "use-clipboard";
import { useState } from "react";

export default function App() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setInterval(() => setCopied(false), 5000);
  }, []);

  const [inputRef, onInputCopy] = useClipboard({
    onCopy: () => setCopied(true),
  });

  const [textAreaRef, onTextAreaCopy] = useClipboard({
    onCopy: () => setCopied(true),
  });

  const [, onTextCopy] = useClipboard({
    onCopy: (text) => {
      setCopied(true);
      alert(`Successfully coppied "${text}"`);
    },
    text: "Hello world",
  });

  return (
    <div id="container">
      <h1>
        <code>useClipboard</code> {copied ? <span>Copied</span> : "Example"}
      </h1>

      <div className="itemContainer">
        <h3>Get the content of input, textarea or any text element:</h3>
        <pre>
          {`const [inputRef, onInputCopy] = useClipboard({
  onCopy: () => console.log("Input copied"),
});`}
        </pre>
        <label>TextArea</label>
        <textarea
          ref={textAreaRef}
          defaultValue={`textarea editing to see some magic happen!`}
          rows={4}
        />
        <div className="btnContainer">
          <button onClick={onTextAreaCopy}>copy textarea</button>
          <span onClick={onTextAreaCopy}>click span to copy</span>
        </div>
        <label>Input</label>
        <input
          ref={inputRef}
          defaultValue={`Start editing to see some magic happen! `}
        />
        <div className="btnContainer">
          <button onClick={onInputCopy}>copy input</button>
          <span onClick={onInputCopy}>click span to copy</span>
        </div>
      </div>

      <div className="itemContainer">
        <h3>
          Using no ref: Hello world!, this will copy the text provided to the
          hook
        </h3>
        <pre>
          {`const [, onInputCopy] = useClipboard({
  onCopy: () => console.log("Input copied"),
  text: "Hello World!"
});`}
        </pre>
        <label>Hello World!</label>

        <div className="btnContainer">
          <button onClick={onTextCopy}>copy</button>
          <span onClick={onTextCopy}>click span to copy</span>
        </div>
      </div>

      <textarea rows={5} />
    </div>
  );
}
