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

  /**
   * The text that needs to copied to the clipboard.
   * If the ref is set this field is ignored.
   *
   * If both are not set it will throw an error.
   */
  text?: string;
}
