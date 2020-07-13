import { useRef, useCallback, MutableRefObject } from "react";
import { UseClipboardProps } from "./props";
import deselectCurrent from "toggle-selection";

export const useClipboard = ({
  onCopy,
  text,
}: UseClipboardProps): [MutableRefObject<any>, () => void] => {
  const ref = useRef<any>(null);

  const onClick = useCallback(() => {
    deselectCurrent();

    const range = document.createRange();

    const selection = document.getSelection()!;

    let span = document.createElement("span")!;

    const element = ref.current as HTMLElement;

    if (element) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        span.textContent = (element as HTMLInputElement).value;
      } else {
        span.textContent = element.innerText!;
      }
    } else if (text) {
      span.textContent = text!;
    } else {
      throw new Error("Both the ref & text were undefined");
    }

    span.addEventListener("copy", function (e) {
      e.stopPropagation();

      onCopy(span.textContent!, successful);
    });

    document.body.appendChild(span);

    range.selectNodeContents(span);

    selection.addRange(range);

    var successful = document.execCommand("copy");

    if (!successful) {
      throw new Error("Copy command was unsuccessful");
    } else {
      span.remove();
    }
  }, [text, ref, onCopy]);

  return [ref, onClick];
};

export default useClipboard;
