import { iEditedMode } from "@/type/labelType";
import React, { Dispatch, SetStateAction, useState } from "react";

interface EditableTextareaFieldProps {
  name: string;
  value: string | number | undefined;
  onChange?: Dispatch<SetStateAction<string>>;
  style?: React.CSSProperties;
  readonly?: boolean;
  rows?: number;
  editMode: iEditedMode;
  onEditMode?: () => void;
  showBorder: boolean;
  width?: string | number;
  wordBreak?:
    | "break-all"
    | "break-word"
    | "keep-all"
    | "normal"
    | "initial"
    | "inherit"
    | "unset";
}

const EditableTextareaField: React.FC<EditableTextareaFieldProps> = ({
  name,
  value,
  editMode,
  onChange,
  style = {},
  readonly = false,
  rows = 2,
  onEditMode,
  showBorder = true,
  width = "100%",
  wordBreak = "normal",
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
    onEditMode?.();
  };

  const handleBlur = () => {
    setIsEditing(false);
  };
  console.log("isEditing", isEditing);
  return (
    <textarea
      name={name}
      style={{
        ...style,
        width: width,
        margin: 0,
        padding:
           showBorder ? "0px" : "1px",
        overflow: "hidden",
        whiteSpace: "normal",
        wordBreak: wordBreak,
        overflowWrap: "break-word",
        background: isEditing && editMode === name ? "#eeeeee" : "transparent",
        resize: "none",
        border: readonly || !showBorder ? "none" : "1px solid #bcbcbc80",
        borderRadius: readonly || !showBorder ? "none" : "4px",
        boxSizing: "border-box",
      }}
      rows={rows}
      value={value?.toString() ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readonly}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default EditableTextareaField;
