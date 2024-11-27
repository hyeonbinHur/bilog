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
    // 파일 타입이 "image"인 경우에만 실행
    if (meta.filetype === "image") {
      // 파일 입력을 위한 input 요소를 생성
      const input = document.createElement("input");
      // 'file' 타입으로 설정하여 사용자가 파일을 선택할 수 있게 설정
      input.setAttribute("type", "file");
      // 사용자가 선택할 수 있는 파일 종류를 'image/*'로 설정하여 이미지 파일만 선택 가능하게 설정
      input.setAttribute("accept", "image/*");
      // 파일 선택을 위한 input을 클릭해서 파일 선택 창을 여는 코드
      input.click();
      // 사용자가 파일을 선택한 후 실행되는 이벤트 핸들러
      input.onchange = function () {
        // 파일이 선택되었는지 확인
        if (input.files) {
          // 선택된 파일을 가져옴
          const file = input.files[0];
          // FileReader를 사용하여 파일을 읽음
          const reader = new FileReader();
          // 파일 읽기가 완료되었을 때 실행되는 콜백 함수
          reader.onload = function (e: ProgressEvent) {
            // FileReader의 result 속성을 사용해 읽은 데이터 가져옴
            const target = e.target as FileReader;
            // 읽은 데이터가 있으면 실행
            if (target && target.result) {
              // 콜백을 호출하여 파일을 에디터에 삽입
              callback(target.result.toString(), {
                alt: file.name, // 이미지의 alt 텍스트를 파일의 이름으로 설정
              });
            }
          };

          // 파일을 DataURL 형식(즉, Base64)으로 읽음
          reader.readAsDataURL(file);
        }
      };
    }
  },
};
