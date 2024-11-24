"use client";
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import type { Editor as TinyMCEEditor } from "tinymce";

function getBase64ImageSize(base64String: string) {
  // Base64 문자열의 길이
  const base64Length = base64String.length;
  // 원본 이미지 크기 계산
  const sizeInBytes =
    base64Length -
    (base64String.endsWith("==") ? 2 : base64String.endsWith("=") ? 1 : 0);
  console.log(sizeInBytes);
}

const page = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const handleEditorChange = (content: string) => {
    // console.log(content);
  };
  return (
    <div>
      <Editor
        apiKey="gqc0hg4j4nc0irpy4hk3ex6f4ecuvxuaq19w8ghstfxict08"
        id="my-custom-editor-id"
        init={{
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
          file_picker_callback: function (callback, value, meta) {
            if (meta.filetype === "image") {
              const input: HTMLInputElement = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.click();
              input.onchange = function () {
                if (input.files) {
                  const file = input.files[0];
                  const reader = new FileReader();
                  reader.onload = function (e: ProgressEvent) {
                    const target = e.target as FileReader;
                    if (target && target.result) {
                      callback(target.result.toString(), {
                        alt: file.name,
                      });
                    }
                    getBase64ImageSize(target.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              };
            }
          },
        }}
        onInit={(e, editor) => (editorRef.current = editor)}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default page;
