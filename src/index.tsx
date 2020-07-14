import { useRef, useCallback, useState, useEffect } from "react";
import { UseClipboardProps, useClipboardReturnType } from "./types";
import deselectCurrent from "toggle-selection";

export const useClipboard = ({
  onSuccess,
  onError,
  text,
  disableClipboardAPI = false,
  copiedDuration,
}: UseClipboardProps): useClipboardReturnType => {
  const ref = useRef<any>(null);
  const [isCoppied, setIsCoppied] = useState(false);
  const [clipboard, setClipbaord] = useState("");

  useEffect(() => {
    if (copiedDuration) setTimeout(() => setIsCoppied(false), copiedDuration);
  }, [isCoppied]);

  const isSupported = () => navigator.clipboard !== undefined;

  const handleError = (error: string) => {
    if (onError) onError(error);
    else throw new Error(error);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (onSuccess) onSuccess(text);
        setIsCoppied(true);

        setClipbaord(text);
      })
      .catch((err) => {
        if (onError) onError(err);
        setIsCoppied(false);
      });
  };

  const clearClipboard = () => {
    if (isSupported()) {
      navigator.clipboard.writeText("");
    } else {
      oldCopyToClipboard("copy");
    }
  };

  const oldCopyToClipboard = (
    action: "copy" | "cut",
    element?: HTMLElement,
    input?: HTMLInputElement,
    isInput?: boolean
  ) => {
    deselectCurrent();

    const range = document.createRange();

    const selection = document.getSelection()!;

    let span = document.createElement("span")!;
    span.style.whiteSpace = "pre"; // preserves the line break & etc.

    if (element) {
      if (isInput) {
        span.textContent = input!.value;

        if (action === "cut") {
          input!.select();
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

      if (isInput) input!.value = "";

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

      setIsCoppied(false);
    } else {
      setClipbaord(span.textContent!);
      setIsCoppied(true);
      span.remove();

      if (action === "cut" && isInput) input!.blur();
    }
  };

  const action = useCallback(
    (operation = "copy") => {
      const element = ref.current as HTMLElement;

      const isInput =
        element &&
        (element.tagName === "INPUT" || element.tagName === "TEXTAREA");

      const input = ref.current as HTMLInputElement;

      if (isSupported() && disableClipboardAPI) {
        if (element) {
          if (isInput) {
            copyToClipboard(input.value);
            if (operation === "cut") {
              input.value = "";
            }
          } else {
            copyToClipboard(element.innerText);
          }
        } else if (text) {
          copyToClipboard(text);
        } else {
          handleError("Both the ref & text were undefined");
        }
      } else {
        oldCopyToClipboard(operation, element, input, isInput);
      }
    },
    [text, ref, onSuccess]
  );

  return {
    ref,
    action,
    isCoppied,
    clipboard,
    clearClipboard,
    isSupported,
  };
};

/**
 * Checks to see if the browser uses the new navigator.clipboard API
 * supported from Chrome 66+, Firefox 63+, Safari
 */
useClipboard.isSupported = () => navigator.clipboard !== undefined;

export default useClipboard;
