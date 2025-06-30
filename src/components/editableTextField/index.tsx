import { iEditedMode } from "@/type/labelType";
import React, { Dispatch, SetStateAction, useState } from "react";

interface EditableTextFieldProps {
  name: string;
  value: string | number | undefined;
  onChange?:
    | Dispatch<SetStateAction<string>>
    | Dispatch<SetStateAction<number>>;
  style?: React.CSSProperties;
  readonly?: boolean;
  width?: string | number;
  height?: string | number;
  showBorder?: boolean;
  editMode?: iEditedMode;
  onEditMode?: () => void;
  textAlign?: "left" | "center" | "right";
  minWidth?: string | number;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  name,
  value,
  onChange,
  style = {},
  readonly = false,
  width = "auto",
  height = "24px",
  showBorder = true,
  editMode,
  onEditMode,
  textAlign = "center",
  minWidth,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const newValue = e.target.value;
    // Type guard to handle both string and number setState functions
    if (typeof value === "number") {
      (onChange as Dispatch<SetStateAction<number>>)(Number(newValue) || 0);
    } else {
      (onChange as Dispatch<SetStateAction<string>>)(newValue);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
    onEditMode?.();
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <input
      name={name}
      type="text"
      style={{
        ...style,
        display: "inline-block",
        textAlign: textAlign,
        background: isEditing && editMode === name ? "#eeeeee" : "transparent",
        // minHeight: '24px',
        border: readonly || !showBorder ? "none" : "1px solid #bcbcbc80",
        borderRadius: readonly || !showBorder ? "none" : "4px",
        width: width,
        height: height,
        padding: showBorder ? "0px" : "1px",
        outline: "none",
        minWidth: minWidth,
      }}
      value={value?.toString() ?? ""}
      onChange={handleChange}
      readOnly={readonly}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default EditableTextField;
