export interface UseClipboardProps {
  /**
   * It's callback function that is called after the `copy` command
   * is executed.
   *
   * @param text: The selected clipboard text.
   * @param result: Indicates wheater the copy was successful or not
   */
  onCopy?: (text: string, result: boolean) => void;

  /**
   * The text that needs to copied to the clipboard.
   * If the ref is set this field is ignored.
   *
   * If both are not set it will throw an error.
   */
  text?: string;
}
