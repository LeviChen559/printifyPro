import React, { forwardRef } from "react";
import {
  Container,
} from "./style";
import { iLabelInfo } from "../labelTable";

// import Barcode from "react-barcode";

import "react-edit-text/dist/index.css";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Text from '@tiptap/extension-text'


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
  const editor = useEditor({
    extensions: [StarterKit,Text],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <Container id="labelCard" ref={ref}>
     <EditorContent editor={editor} />
    </Container>
  );
});

LabelCard.displayName = "LabelCard";
export default LabelCard;
