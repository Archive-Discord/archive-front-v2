import ReactMarkdown from "react-showdown";

const Markdown: React.FC<MarkDownProps> = ({markdown}) => {
    return (
        <div className="markdown-body">
            <ReactMarkdown markdown={markdown}/>
        </div>
    )

}

interface MarkDownProps {
    markdown: string;
}

export default Markdown;