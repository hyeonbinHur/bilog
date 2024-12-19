import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

// HTML에서 body 부분만 추출하는 유틸리티 함수
const extractBodyContent = (html: string) => {
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.innerHTML; // body 내부의 HTML만 추출
  }
  return html; // 서버에서 실행될 경우 원본 HTML 반환
};

const PostContent = ({ htmlContent }: { htmlContent: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 렌더링하도록 설정
  }, []);

  const transform = (node: any) => {
    // <pre><code> 태그를 감지하여 SyntaxHighlighter로 스타일링
    if (node.name === "code" && isClient) {
      return (
        <div className="bg-gray-500 grid place-items-center">
          <div className="max-w-[90%] min-w-[70%] rounded-md overflow-hidden bg-[#3a404d]">
            <div className="flex justify-between p-2 text-white text-xs">
              <p className="text-sm"> Example code </p>
            </div>
            <SyntaxHighlighter
              style={atomOneDark}
              language="jsx"
              customStyle={{
                padding: "25px",
              }}
              showLineNumbers={true}
            >
              {node.children[0]?.data || ""}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    }
  };

  // body 태그만 추출하여 파싱하기
  const contentWithoutHtmlTags = extractBodyContent(htmlContent);

  // HTML 문자열을 React 컴포넌트로 변환
  return <div>{parse(contentWithoutHtmlTags, { replace: transform })}</div>;
};

export default PostContent;
