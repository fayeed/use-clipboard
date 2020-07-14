import React, { useEffect } from "react";
import "./index.css";

import { useClipboard } from "use-clipboard";
import { useState } from "react";

export default function App() {
  const input = useClipboard({
    disableClipboardAPI: true,
  });

  const textArea = useClipboard();

  const text = useClipboard({
    onSuccess: (text) => {
      alert(text);
    },
    text: "Hello world",
  });

  return (
    <div id="container">
      <h1>
        <code>useClipboard</code>{" "}
        {textArea.isCoppied ? <span>Copied</span> : "Example"}
      </h1>

      <div className="itemContainer">
        <h3>Get the content of input, textarea or any text element:</h3>
        <pre>{`const {ref, copy, cut} = useClipboard()`}</pre>
        <label>TextArea</label>
        <textarea
          ref={textArea.ref}
          defaultValue={`textarea editing to see some magic happen!\nwhat is this!`}
          rows={4}
        />
        <div className="btnContainer">
          <button onClick={textArea.copy}>copy textarea</button>
          <button onClick={textArea.cut}>cut textarea</button>
          <button onClick={textArea.clearClipboard}>clear clipboard</button>
        </div>
        <label>Input</label>
        <input
          ref={input.ref}
          defaultValue={`Start editing to see some magic happen! `}
        />
        <div className="btnContainer">
          <button onClick={input.copy}>copy input</button>
          <button onClick={input.clear}>cut input</button>
          <button onClick={input.clearClipboard}>clear clipboard</button>
        </div>
      </div>

      <div className="itemContainer">
        <h3>
          Using no ref: Hello world!, this will copy the text provided to the
          hook
        </h3>
        <pre>
          {`const {ref, copy, cut} = useClipboard();
        
<button onClick={() => copy("Hello World!")}>copy</button>`}
        </pre>
        <label>Hello World!</label>

        <div className="btnContainer">
          <button onClick={() => text.copy("Hello World!")}>copy</button>
          <button onClick={input.clearClipboard}>clear clipboard</button>
        </div>
      </div>

      <textarea rows={5} />
    </div>
  );
}
