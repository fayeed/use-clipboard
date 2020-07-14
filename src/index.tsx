import { useRef, useCallback, MutableRefObject } from "react";
import { UseClipboardProps } from "./props";
import deselectCurrent from "toggle-selection";

export const useClipboard = ({
  onCopy,
  text,
}: UseClipboardProps): [
  MutableRefObject<any>,
  (action?: "copy" | "cut") => void
] => {
  const ref = useRef<any>(null);

  const onClick = useCallback(
    (action = "copy") => {
      deselectCurrent();

      const range = document.createRange();

      const selection = document.getSelection()!;

      let span = document.createElement("span")!;

      const element = ref.current as HTMLElement;

      const isInput =
        element &&
        (element.tagName === "INPUT" || element.tagName === "TEXTAREA");

      const input = ref.current as HTMLInputElement;

      if (element) {
        if (isInput) {
          span.textContent = input.value;

          if (action === "cut") {
            input.select();
          }
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

        if (onCopy) onCopy(span.textContent!, true);
      });

      span.addEventListener("cut", function (e) {
        e.stopPropagation();

        if (action === "cut" && isInput) input.value = "";

        if (onCopy) onCopy(span.textContent!, true);
      });

      document.body.appendChild(span);

      range.selectNodeContents(span);

      selection.addRange(range);

      var successful = document.execCommand(
        typeof action === "object" ? "copy" : action
      );

      if (!successful) {
        throw new Error("Copy command was unsuccessful");
      } else {
        span.remove();

        if (action === "cut" && isInput) input.blur();
      }
    },
    [text, ref, onCopy]
  );

  return [ref, onClick];
};

export default useClipboard;
