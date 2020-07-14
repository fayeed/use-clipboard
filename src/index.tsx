import { useRef, useCallback, useState, useEffect } from "react";
import { UseClipboardProps, useClipboardReturnType } from "./types";
import deselectCurrent from "toggle-selection";

export const useClipboard = (
  options?: UseClipboardProps
): useClipboardReturnType => {
  const { onSuccess, onError, disableClipboardAPI = false, copiedDuration } =
    options || {};
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
    isInput?: boolean,
    text?: string
  ) => {
    deselectCurrent();

    const range = document.createRange();

    const selection = document.getSelection()!;

    let span = document.createElement("span")!;
    span.style.whiteSpace = "pre"; // preserves the line break & etc.

    if (text) {
      span.textContent = text!;
    } else if (element) {
      if (isInput) {
        span.textContent = input!.value;

        if (action === "cut") {
          input!.select();
        }
      } else {
        span.textContent = element.innerText!;
      }
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

  const copy = (text?: string) =>
    action("copy", typeof text === "object" ? undefined : text);

  const cut = () => action("cut");

  const action = useCallback(
    (operation = "copy", text?: string) => {
      const element = ref.current as HTMLElement;

      const isInput =
        element &&
        (element.tagName === "INPUT" || element.tagName === "TEXTAREA");

      const input = ref.current as HTMLInputElement;

      if (isSupported() && !disableClipboardAPI) {
        if (text) {
          copyToClipboard(text);
        } else if (element) {
          if (isInput) {
            copyToClipboard(input.value);
            if (operation === "cut") {
              input.value = "";
            }
          } else {
            copyToClipboard(element.innerText);
          }
        } else {
          handleError("Both the ref & text were undefined");
        }
      } else {
        oldCopyToClipboard(operation, element, input, isInput, text);
      }
    },
    [ref, onSuccess, onError, disableClipboardAPI]
  );

  return {
    ref,
    isCoppied,
    clipboard,
    clearClipboard,
    isSupported,
    copy,
    cut,
  };
};

/**
 * Checks to see if the browser uses the new navigator.clipboard API
 * supported from Chrome 66+, Firefox 63+, Safari
 */
useClipboard.isSupported = () => navigator.clipboard !== undefined;

export default useClipboard;
