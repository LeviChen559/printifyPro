import { iEditedMode } from '@/type/labelType';
import React, { Dispatch, SetStateAction, useState } from 'react';

interface EditableTextareaFieldProps {
  name: string;
  value: string | number | undefined;
  onChange?: Dispatch<SetStateAction<string>>;
  style?: React.CSSProperties;
  readonly?: boolean;
  rows?: number;
  editMode:iEditedMode
  onEditMode?: () => void;
  showBorder?: boolean;
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
  showBorder = true
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleFocus = () => {
    setIsEditing(true);
    onEditMode?.();
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <textarea
      name={name}
      style={{
        ...style,
        width: '100%',
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word',
        background: isEditing || editMode===name ? '#eeeeee' : 'transparent',
        resize: 'none',
        border: readonly || !showBorder ? 'none' : '1px solid #bcbcbc80',
        borderRadius: readonly ? 'none' : '4px',
      }}
      rows={rows}
      value={value?.toString() ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
      readOnly={readonly}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default EditableTextareaField;