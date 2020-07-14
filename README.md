# 📋 use-clipboard-hook

> Copy/Cut to clipboard React hook.

[![NPM](https://img.shields.io/npm/v/use-clipboard-hook.svg)](https://www.npmjs.com/package/use-clipboard-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

Using npm:

```bash
npm install --save use-clipboard-hook
```

Using yarn:

```bash
yarn add use-clipboard-hook
```

## Usage

```tsx
import * as React from "react";

import { useClipboard } from "use-clipboard-hook";

const Example = () => {
  const {ref, copy, cut} = useClipboard({
    onSuccess: (text) => alert(`Copied: ${text}`),
  });
  return (
    <div>
      <input ref={ref} defaultValue="Change this..." />
      <button onClick={copy}>copy</button>
      <button onClick={cut}>cut</button>
    </div>
  );
};
```

## API

### `useClipboard(options: UseClipboardProps): useClipboardReturnType`

#### `UseClipboardProps`

* `onSuccess` - It's a callback function that is called after the `copy` or `cut` command is executed.
* `onError` - Triggers when the hook encounters an error. If passed hook won't throw an error.
* `disableClipboardAPI` - Disables the new clipboard API `navigator.clipboard` even if it is supported.
* `copiedDuration` - Revert back the isCopied flag to false again if a value is set.

#### `useClipboardReturnType`

* `ref` - Use ref to pull the text content from.
* `copy` - Used to perform the copy operation.
* `cut` - Used to perform the cut operation.
* `isCoppied` - Indicates wheater the content was successfully copied or not.
* `clipboard` - Current selected clipboard content.
* `clearClipboard` - Clears the user clipboard.
* `isSupported` - Check to see if the browser supports the new `navigator.clipboard` API.

## [Live Demo](https://use-clipboard.now.sh)

## Credits 👨🏻‍💻

toggle-selection - [sudodoki](https://github.com/sudodoki)

## Found this project useful? ❤️

If you found this project useful, then please consider giving it a ⭐️ on Github and sharing it with your friends via social media.

## Issues and feedback 💭

If you have any suggestion for including a feature or if something doesn't work, feel free to open a Github [issue](https://github.com/fayeed/use-clipboard/issues) for us to have a discussion on it.

## License

MIT © [fayeed](https://github.com/fayeed/use-clipboard/blob/master/LICENSE)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
