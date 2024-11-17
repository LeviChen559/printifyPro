import React, { forwardRef } from "react";
import { Container } from "./style";
import { iLabelInfo } from "@/type/labelType";

// import Barcode from "react-barcode";

import "react-edit-text/dist/index.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";

interface iProp {
  labelInfo: iLabelInfo;
  showProductNameZH?: boolean;
  showProductNameEN?: boolean;
  isEditedMode?: boolean;
  ref: React.RefObject<HTMLDivElement> | undefined;
  setProductNameEN?: (value: string) => void;
  setProductNameZH?: (value: string) => void;
  productNameEN?: string;
  productNameZH?: string;
  setIngredientInfo?: (value: string) => void;
  ingredientInfo?: string;
  setWeight?: (value: number) => void;
  weight?: number;
  setManufacturedFor?: (value: string) => void;
  manufacturedFor?: string;
  setWeightUnit?: React.Dispatch<React.SetStateAction<string>>;
  weightUnit?: string;
}
export type Ref = HTMLDivElement;

const LabelCard = forwardRef<Ref, iProp>((prop, ref) => {
 
  const editor1 = useEditor({
    extensions: [
      StarterKit,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });
  const editor2 = useEditor({
    extensions: [
      StarterKit,
      Text,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });
  if (!editor1||!editor2) {
    return null;
  }
  return (
    <Container id="labelCard" ref={ref}>
      <div id="btn">
        <button
          onClick={() =>
            editor1?editor1:editor2.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor1.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor1.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor1.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor1.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor1.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
      </div>
    
      <EditorContent editor={editor1} onClick={()=>console.log("type")}/>
      <EditorContent editor={editor2} />
    </Container>
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
