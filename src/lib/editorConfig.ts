interface ICallback {
  (param: string, arg: { alt: string }): void;
}
import { Editor } from "tinymce";
export const editorConfig = {
  height: 500,
  plugins: ["image", "codesample", "lists", "link", "fullscreen"],
  toolbar:
    "undo redo | blocks fontsize | bold italic | alignleft aligncenter alignright | bullist numlist | blockquote | link | fullscreen | code image | codesample",
  codesample_global_prismjs: true,
  content_style: `
    body {
      font-family: Verdana, Arial, Helvetica, sans-serif;
      font-size: 1.05em;
      line-height: 1.4;
      color: #222f3e;
      background-color: #fff;
    }
    p { margin: 0 0 0.7em 0; }
    h1 { font-size: 2.3em; margin: 0.5em 0; font-weight: bold; }
    h2 { font-size: 1.8em; margin: 0.6em 0; font-weight: bold; }
    h3 { font-size: 1.15em; margin: 0.7em 0; font-weight: bold; }
    h4 { font-size: 1.05em; margin: 0.8em 0; font-weight: bold; }
    h5 { font-size: 1.02em; margin: 0.9em 0; font-weight: bold; }
    h6 { font-size: 1em; margin: 1em 0; font-weight: bold; }
    
    /* 리스트 스타일 - PostContent.css와 동일 */
    ul { margin: 1em 0; padding-left: 30px; list-style-type: disc; }
    ol { margin: 1em 0; padding-left: 30px; list-style-type: decimal; }
    li { margin: 0.5em 0; font-size: 1em; line-height: 1.6; padding-left: 0.5em; }
    ul ul { margin: 0.25em 0; list-style-type: circle; }
    ul ul ul { list-style-type: square; }
    ol ol { margin: 0.25em 0; list-style-type: lower-alpha; }
    ol ol ol { list-style-type: lower-roman; }
    
    /* 인용문 스타일 - PostContent.css와 동일 */
    blockquote { 
      border-left: 4px solid #ddd; 
      margin: 1.5em 0; 
      padding: 0.5em 0em 0.2em 0.5em; 
      font-style: italic; 
      font-size: 1.02em; 
      background-color: #f9f9f9; 
      color: #666; 
      quotes: "\\201C""\\201D""\\2018""\\2019"; 
    }
    
    /* 테이블 스타일 */
    table { border-collapse: collapse; width: 100%; margin: 0.7em 0; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; vertical-align: top; font-size: 1.02em; }
    th { background-color: #f0f0f0; font-weight: bold; }
    
    /* 이미지 스타일 */
    img { max-width: 100%; height: auto; display: block; margin: 0.3em 0; }
    
    /* 강조 스타일 */
    strong, b { font-weight: bold; }
    em, i { font-style: italic; }
    
    /* 링크 스타일 */
    a { color: #0066cc; text-decoration: underline; }
    a:hover { color: #004499; }
    
    /* 코드 스타일 */
    code { 
      font-family: "Courier New", Courier, monospace; 
      background-color: #f4f4f4; 
      padding: 2px 4px; 
      border-radius: 3px; 
    }
    pre { 
      background-color: #f4f4f4; 
      padding: 10px; 
      border-radius: 3px; 
      overflow-x: auto; 
      margin: 0.7em 0; 
    }
    pre code { background-color: transparent; padding: 0; }
    
    /* 구분선 */
    hr { border: 0; height: 1px; background-color: #ccc; margin: 0.7em 0; }
  `,
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "TypeScript", value: "typescript" },
    { text: "JSX", value: "jsx" },
  ],
  automatic_uploads: true,
  setup: (editor: Editor) => {
    // 이벤트 리스너를 수동으로 패치
    editor.on("init", () => {
      // 모든 `touchstart` 이벤트 리스너를 패시브로 설정
      const originalAddEventListener = EventTarget.prototype.addEventListener;

      EventTarget.prototype.addEventListener = function (
        type,
        listener,
        options
      ) {
        if (type === "touchstart" && typeof options === "object") {
          options.passive = true;
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    });
  },
  file_picker_types: "image",
  file_picker_callback: function (
    callback: ICallback,
    _value: string,
    meta: Record<string, any>
  ) {
    if (meta.filetype === "image") {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = function () {
        if (input.files) {
          const file = input.files[0];
          const reader = new FileReader();
          // onload 이벤트에서 파일을 base64로 읽어서 callback 호출
          reader.onload = function (e) {
            const result = e.target?.result;
            if (typeof result === "string") {
              // result가 string 타입일 경우만 callback 호출
              callback(result, {
                alt: file.name, // 이미지의 alt 텍스트를 파일 이름으로 설정
              });
            } else {
              // 결과가 string이 아닌 경우 처리
              console.error("Failed to read file as base64 string");
            }
          };
          // 오류 처리: 파일 읽기 실패 시 처리
          reader.onerror = function () {
            console.error("Error reading file");
          };
          // 파일을 base64로 읽기
          reader.readAsDataURL(file);
        }
      };
    }
  },
};
