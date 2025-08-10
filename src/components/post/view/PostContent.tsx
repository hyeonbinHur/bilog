import parse from "html-react-parser";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./PostContent.css";

const PostContent = ({ htmlContent }: { htmlContent: string }) => {
  //Variable Declaration
  const [isClient, setIsClient] = useState(false);
  const contentWithoutHtmlTags = extractBodyContent(htmlContent);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 렌더링하도록 설정
  }, []);

  // HTML에서 body 부분만 추출하는 유틸리티 함수
  function extractBodyContent(html: string) {
    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.innerHTML; // body 내부의 HTML만 추출
    }
    return html; // 서버에서 실행될 경우 원본 HTML 반환
  }

  const transform = (node: any) => {
    if (node.name === "code" && isClient) {
      return (
        <div className="w-[100%] rounded-md overflow-hidden bg-[#3a404d]">
          <div className="flex justify-between p-2 text-white text-xs">
            <p className="text-sm"> Example code </p>
          </div>

          <SyntaxHighlighter
            style={atomOneDark}
            language="typescript"
            customStyle={{
              padding: "25px",
            }}
            showLineNumbers={true}
          >
            {node.children[0]?.data || ""}
          </SyntaxHighlighter>
        </div>
      );
    }
  };

  return (
    <section>
      <div className={`prose max-w-none leading-loose tinymce-content`}>
        {parse(contentWithoutHtmlTags, { replace: transform })}
      </div>
    </section>
  );
};

export default PostContent;
