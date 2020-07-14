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
   * The text that needs to copied to the clipboard.
   * If the ref is set this field is ignored.
   *
   * If both are not set it will throw an error.
   */
  text?: string;
}
