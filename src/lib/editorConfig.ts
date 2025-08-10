interface ICallback {
  (param: string, arg: { alt: string }): void;
}
import { Editor } from "tinymce";
export const editorConfig = {
  height: 500,
  plugins: ["image", "codesample"],
  toolbar:
    "undo redo | bold italic | alignleft aligncenter alignright | code image | codesample",
  codesample_global_prismjs: true,
  content_style: `
    body {
      font-family: Verdana, Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      color: #222f3e;
      background-color: #fff;
    }
    p { margin: 0 0 1em 0; }
    h1 { font-size: 2em; margin: 0.67em 0; font-weight: bold; }
    h2 { font-size: 1.5em; margin: 0.83em 0; font-weight: bold; }
    h3 { font-size: 1.17em; margin: 1em 0; font-weight: bold; }
    h4 { font-size: 1em; margin: 1.33em 0; font-weight: bold; }
    h5 { font-size: 0.83em; margin: 1.67em 0; font-weight: bold; }
    h6 { font-size: 0.67em; margin: 2.33em 0; font-weight: bold; }
    ul, ol { margin: 1em 0; padding-left: 40px; }
    li { margin: 0.5em 0; }
    blockquote { margin: 1em 40px; padding: 0; font-style: italic; }
    table { border-collapse: collapse; width: 100%; margin: 1em 0; }
    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; vertical-align: top; }
    th { background-color: #f0f0f0; font-weight: bold; }
    img { max-width: 100%; height: auto; display: block; margin: 0.5em 0; }
    strong, b { font-weight: bold; }
    em, i { font-style: italic; }
    a { color: #0066cc; text-decoration: underline; }
    a:hover { color: #004499; }
    code { font-family: "Courier New", Courier, monospace; background-color: #f4f4f4; padding: 2px 4px; border-radius: 3px; font-size: 0.9em; }
    pre { background-color: #f4f4f4; padding: 10px; border-radius: 3px; overflow-x: auto; margin: 1em 0; }
    pre code { background-color: transparent; padding: 0; }
    hr { border: 0; height: 1px; background-color: #ccc; margin: 1em 0; }
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
