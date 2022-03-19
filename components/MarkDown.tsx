import ReactMarkdown from "react-showdown";

const Markdown: React.FC<MarkDownProps> = ({markdown}) => {
    return (
        <div className="markdown-body">
            <ReactMarkdown options={{
					openLinksInNewWindow: true,
					underline: true,
					omitExtraWLInCodeBlocks: true,
					simplifiedAutoLink: true,
					tables: true,
					strikethrough: true,
					smoothLivePreview: true,
					tasklists: true,
					ghCompatibleHeaderId: true,
					encodeEmails: true
				}} markdown={markdown}/>
        </div>
    )

}

interface MarkDownProps {
    markdown: string;
}

export default Markdown;