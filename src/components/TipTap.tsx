"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

const Tiptap = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Update form value on change
    },
  });

  // Ensure editor is in sync with external value changes
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return <EditorContent editor={editor} />;
};

export default Tiptap;
