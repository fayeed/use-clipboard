import { MutableRefObject } from "react";

export interface UseClipboardProps {
  /**
   * It's callback function that is called after the `copy` command
   * is executed.
   *
   * @param text: The selected clipboard text.
   */
  onSuccess?: (text: string) => void;

  /**
   * Triggers when the hook encounters an error.
   * If passed hook won't throw an error.
   *
   * @param error: cause of the error
   */
  onError?: (error: string) => void;

  /**
   * Disables the new clipboard API `navigator.clipboard` even if
   * it is supported.
   */
  disableClipboardAPI?: boolean;

  /**
   * revert back the isCopied flag to false again if a value is set.
   */
  copiedDuration?: number;
}

export interface useClipboardReturnType {
  /**
   * Use ref to pull the text content from.
   */
  ref: MutableRefObject<any>;

  /**
   * Use it to perform the copy operation
   */
  copy: (text?: string) => void;

  /**
   * Use it to perform the cut operation
   */
  cut: () => void;

  /**
   * Indicates wheater the content was successfully copied or not.
   */
  isCoppied: boolean;

  /**
   * Current selected clipboard content.
   */
  clipboard: string;

  /**
   * Clears the user clipboard.
   */
  clearClipboard: () => void;

  /**
   * Check to see if the browser supports the new `navigator.clipboard` API.
   */
  isSupported: () => boolean;
}
