"use client";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { editorConfig } from "@/src/lib/editorConfig";

interface EditorWrapperProps {
  apiKey: string;
  onEditorChange: (content: string) => void;
  value: string;
  onInit?: (event: any, editor: TinyMCEEditor) => void;
}

export default function EditorWrapper({ 
  apiKey, 
  onEditorChange, 
  value, 
  onInit 
}: EditorWrapperProps) {
  return (
    <Editor
      apiKey={apiKey}
      id="my-custom-editor-id"
      init={editorConfig}
      onInit={onInit}
      onEditorChange={onEditorChange}
      value={value}
    />
  );
}