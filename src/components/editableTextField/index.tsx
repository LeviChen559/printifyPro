import React, { Dispatch, SetStateAction, useState } from 'react';

interface EditableTextFieldProps {
  name: string;
  value: string | number | undefined;
  onChange?: Dispatch<SetStateAction<string>> | Dispatch<SetStateAction<number>>;
  style?: React.CSSProperties;
  readonly?: boolean;
  width?: string | number;
  height?: string | number;
  showBorder?: boolean;
}

const EditableTextField: React.FC<EditableTextFieldProps> = ({
  name,
  value,
  onChange,
  style = {},
  readonly = false,
  width = '100%',
  height = '24px',
  showBorder = true
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    
    const newValue = e.target.value;
    // Type guard to handle both string and number setState functions
    if (typeof value === 'number') {
      (onChange as Dispatch<SetStateAction<number>>)(Number(newValue) || 0);
    } else {
      (onChange as Dispatch<SetStateAction<string>>)(newValue);
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
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
        display: 'flex',
        alignItems: 'center',
        background: isEditing ? '#eeeeee' : 'transparent',
        minHeight: '24px',
        border: readonly || !showBorder ? 'none' : '1px solid #bcbcbc80',
        borderRadius: readonly ? 'none' : '4px',
        width,
        height,
        padding: '0 8px',
        outline: 'none',
      }}
      value={value?.toString() ?? ''}
      onChange={handleChange}
      readOnly={readonly}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default EditableTextField;