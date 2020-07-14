import { useRef, useCallback, MutableRefObject } from "react";
import { UseClipboardProps } from "./props";
import deselectCurrent from "toggle-selection";

export const useClipboard = ({
  onSuccess,
  onError,
  text,
  disableClipboardAPI = false,
}: UseClipboardProps): [
  MutableRefObject<any>,
  (action?: "copy" | "cut") => void
] => {
  const ref = useRef<any>(null);

  const handleError = (error: string) => {
    if (onError) onError(error);
    else throw new Error(error);
  };

  const onClick = useCallback(
    (action = "copy") => {
      const element = ref.current as HTMLElement;

      const isInput =
        element &&
        (element.tagName === "INPUT" || element.tagName === "TEXTAREA");

      const input = ref.current as HTMLInputElement;

      if (useClipboard.isSupported() && disableClipboardAPI) {
        if (element) {
          if (isInput) {
            navigator.clipboard
              .writeText(input.value)
              .then(() => onSuccess && onSuccess(input.value))
              .catch((err) => onError && onError(err));
            if (action === "cut") {
              input.value = "";
            }
          } else {
            navigator.clipboard
              .writeText(element.innerText)
              .then(() => onSuccess && onSuccess(element.innerText))
              .catch((err) => onError && onError(err));
          }
        } else if (text) {
          navigator.clipboard
            .writeText(text)
            .then(() => onSuccess && onSuccess(text))
            .catch((err) => onError && onError(err));
        } else {
          handleError("Both the ref & text were undefined");
        }
      } else {
        deselectCurrent();

        const range = document.createRange();

        const selection = document.getSelection()!;

        let span = document.createElement("span")!;

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
          handleError("Both the ref & text were undefined");
        }

        span.addEventListener("copy", function (e) {
          e.stopPropagation();

          if (onSuccess) onSuccess(span.textContent!);
        });

        span.addEventListener("cut", function (e) {
          e.stopPropagation();

          if (isInput) input.value = "";

          if (onSuccess) onSuccess(span.textContent!);
        });

        document.body.appendChild(span);

        range.selectNodeContents(span);

        selection.addRange(range);

        var successful = document.execCommand(
          typeof action === "object" ? "copy" : action
        );

        if (!successful) {
          handleError("Copy command was unsuccessful");
        } else {
          span.remove();

          if (action === "cut" && isInput) input.blur();
        }
      }
    },
    [text, ref, onSuccess]
  );

  return [ref, onClick];
};

/**
 * Checks to see if the browser uses the new navigator.clipboard API
 * supported from Chrome 66+, Firefox 63+, Safari
 */
useClipboard.isSupported = () => navigator.clipboard !== undefined;

useClipboard.clearClipboard = function () {
  console.log("clipboard clear");
};

export default useClipboard;
