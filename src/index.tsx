import { useRef, useCallback, MutableRefObject } from "react";
import { UseClipboardProps } from "./props";
import deselectCurrent from "toggle-selection";

export const useClipboard = ({
  onSuccess,
  onError,
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
        const error = "Both the ref & text were undefined";

        if (onError) onError(error);
        else throw new Error(error);
      }

      span.addEventListener("copy", function (e) {
        e.stopPropagation();

        if (onSuccess) onSuccess(span.textContent!);
      });

      span.addEventListener("cut", function (e) {
        e.stopPropagation();

        if (action === "cut" && isInput) input.value = "";

        if (onSuccess) onSuccess(span.textContent!);
      });

      document.body.appendChild(span);

      range.selectNodeContents(span);

      selection.addRange(range);

      var successful = document.execCommand(
        typeof action === "object" ? "copy" : action
      );

      if (!successful) {
        const error = "Copy command was unsuccessful";

        if (onError) onError(error);
        else throw new Error(error);
      } else {
        span.remove();

        if (action === "cut" && isInput) input.blur();
      }
    },
    [text, ref, onSuccess]
  );

  return [ref, onClick];
};

export default useClipboard;
