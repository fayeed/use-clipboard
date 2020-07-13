# use-clipboard

> Copy to clipboard React hook.

[![NPM](https://img.shields.io/npm/v/use-clipboard.svg)](https://www.npmjs.com/package/use-clipboard) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-clipboard
```

## Usage

```tsx
import * as React from "react";

import { useClipboard } from "use-clipboard";

const Example = () => {
  const [inputRef, onClick] = useClipboard({
    onCopy: (text) => console.log(`Copied: ${text}`),
  });
  return (
    <div>
      <input ref={inputRef} defaultValue="Change this..." />
      <button onClick={onClick}>copy</button>
    </div>
  );
};
```

## [Live Demo](https://use-clipboard.now.sh)

## License

MIT © [fayeed](https://github.com/fayeed/use-clipboard/blob/master/LICENSE)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
