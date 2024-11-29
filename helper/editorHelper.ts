interface ICallback {
  (param: string, arg: { alt: string }): void;
}

export const editorConfig = {
  height: 500,
  plugins: ["image", "codesample"],
  toolbar:
    "undo redo | bold italic | alignleft aligncenter alignright | code image | codesample",
  codesample_global_prismjs: true,
  codesample_languages: [
    { text: "HTML/XML", value: "markup" },
    { text: "JavaScript", value: "javascript" },
    { text: "TypeScript", value: "typescript" },
    { text: "JSX", value: "jsx" },
  ],
  automatic_uploads: true,
  file_picker_types: "image",
  file_picker_callback: function (
    callback: ICallback,
    value: string,
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
