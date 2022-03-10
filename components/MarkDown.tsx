import ReactMarkdown from "react-markdown";

const Markdown: React.FC<MarkDownProps> = ({markdown}) => {
    return (
        <ReactMarkdown className="markdown-body">
           {markdown}
        </ReactMarkdown>
    )

}

interface MarkDownProps {
    markdown: string;
}

export default Markdown;