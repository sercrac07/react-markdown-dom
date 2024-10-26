import { InlineNode, InlineNodeType, Node, NodeType, parser } from '@ast-exp/markdown'
import './index.css'

interface Props {
  source: string
  theme?: string
}

function handleNode(node: Node): React.ReactNode {
  if (node.type === NodeType.Program) {
    return node.children.map(handleNode)
  } else if (node.type === NodeType.Paragraph) {
    return <p>{node.children.map(handleInline)}</p>
  } else if (node.type === NodeType.Heading) {
    const Tag = `h${node.level}` as keyof JSX.IntrinsicElements
    return <Tag>{node.children.map(handleInline)}</Tag>
  } else if (node.type === NodeType.BlockQuote) {
    return <blockquote>{node.children.map(handleNode)}</blockquote>
  } else if (node.type === NodeType.List) {
    if (node.ordered) {
      return <ol>{node.children.map(handleNode)}</ol>
    } else {
      return <ul>{node.children.map(handleNode)}</ul>
    }
  } else if (node.type === NodeType.ListItem) {
    if (node.checked) {
      return (
        <label>
          <input type="checkbox" checked={node.checked !== null} readOnly />
          {node.children.map(handleNode)}
        </label>
      )
    }
    return <li>{node.children.map(handleNode)}</li>
  } else if (node.type === NodeType.CodeBlock) {
    return <pre>{node.value}</pre>
  } else if (node.type === NodeType.Table) {
    return (
      <table>
        <thead>
          {node.header.map((cell, i) => (
            <th className={`align-${node.alignment?.[i] ?? 'left'}`}>{cell.map(handleInline)}</th>
          ))}
        </thead>
        <tbody>
          {node.rows.map(row => (
            <tr>
              {row.map((cell, i) => (
                <td className={`align-${node.alignment?.[i] ?? 'left'}`}>{cell.map(handleInline)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

function handleInline(inline: InlineNode) {
  if (inline.type === InlineNodeType.Text) {
    return inline.value
  } else if (inline.type === InlineNodeType.Code) {
    return <code>{inline.value}</code>
  } else if (inline.type === InlineNodeType.Link) {
    return <a href={inline.url}>{inline.children.map(handleInline)}</a>
  } else if (inline.type === InlineNodeType.Image) {
    return <img src={inline.url} alt={inline.alt} />
  } else if (inline.type === InlineNodeType.Emphasis) {
    return <em>{inline.children.map(handleInline)}</em>
  } else if (inline.type === InlineNodeType.Strong) {
    return <strong>{inline.children.map(handleInline)}</strong>
  }
}

export default function Markdown(props: Props) {
  return <div className={`markdown-dom ${props.theme ? `${props.theme}-theme` : 'light-theme'}`}>{handleNode(parser(props.source))}</div>
}
