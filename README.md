# React Markdown DOM

A React component that renders Markdown as HTML.

## Installation

```bash
npm install react-markdown-dom
```

## Usage

```jsx
import React from 'react'
import ReactMarkdown from 'react-markdown-dom'
import 'react-markdown-dom/dist/index.css' // If you want to use the default theme "light" or "dark"

const App = () => <ReactMarkdown source="# Hello, world!" />
```

## API Reference

| Props  | Type   | Default | Description           |
| ------ | ------ | ------- | --------------------- |
| source | string |         | Markdown source code. |
| theme  | string | light   | Theme name.           |

## License

[MIT](LICENSE)
