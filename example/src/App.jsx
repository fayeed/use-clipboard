import React, { useEffect } from "react";
import "./index.css";

import { useClipboard } from "use-clipboard";
import { useState } from "react";

const examples = [
  `// Basic example to copy the content of element to the clipboard.
import React from "react";
import useClipboard from "use-clipboard-hook";
  
export function App() {
  const {copy, ref} = useClipboard();
  
  return (
    <div>
      <textarea ref={ref}/>
      <button onClick={copy}>copy</button>
    </div>
  );
}`,
  `// Advanced example
import React from "react";
import useClipboard from "use-clipboard-hook";

export function App() {
  const {copy, cut, clearClipboard, ref} = useClipboard({
    onSucess: (text) => alert(text),
    onError: (error) => alert(error),
    disableClipboardAPI: true, // disables the new clipboard api
    copiedDuration: 1000 // revert backs the isCopied to false
  });

  return (
    <div>
      <textarea ref={ref}/>
      <button onClick={copy}>copy</button>
      <button onClick={cut}>cut</button>
      <button onClick={clearClipboard}>clear</button>
    </div>
  );
}`,
  `// overrides the elements text to be coppied.
import React from "react";
import useClipboard from "use-clipboard-hook";

export function App() {
  const {copy, ref} = useClipboard();

  return (
    <div>
      <textarea ref={ref}/>
      <button onClick={() => copy("Hello World!")}>copy</button>
    </div>
  );
}`,
];

export default function App() {
  const [inputText, setInput] = useState(examples[0]);
  const [example, setExample] = useState(0);
  const input = useClipboard({
    disableClipboardAPI: true,
    onSuccess: () => {
      alert("Successfully coppied to clipboard.");
    },
  });

  useEffect(() => setInput(examples[example]), [example]);

  const textArea = useClipboard();

  return (
    <div id="container">
      <h1>
        <code>useClipboard</code>{" "}
      </h1>

      <div className="npm" onClick={input.copy}>
        <code ref={input.ref}>npm i use-clipboard-hook</code>
        <span>copy</span>
      </div>

      <div className="codeContainer">
        <div className="code">
          <textarea
            ref={textArea.ref}
            rows={23}
            value={inputText}
            readOnly
          ></textarea>
        </div>
        <div className="optionContainer">
          <button onClick={textArea.copy}>Copy code</button>
          <button onClick={textArea.cut}>Cut code</button>
          <button onClick={textArea.clearClipboard}>Clear clipboard</button>
          <button onClick={() => setExample(example + 1 > 2 ? 0 : example + 1)}>
            Next example
          </button>
          <button onClick={() => setExample(example - 1 < 0 ? 2 : example - 1)}>
            Previous example
          </button>
        </div>
      </div>

      <textarea rows={8} placeholder="Paste here..." />
    </div>
  );
}
