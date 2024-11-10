import React, { useState, FC, KeyboardEvent } from "react";
import { Typography } from "@mui/material";
interface iProps {
  text: string;
  type: string;
  placeholder?: string;
//   children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
}

const EditAbleTextFields: FC<iProps> = ({
  text,
  type,
  placeholder = "Editable content",
//   children,
  ...props
}) => {
  const [isEditing, setEditing] = useState<boolean>(false);
    const [task, setTask] = useState<string>(text);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, type?: string) => {
    // Handle when key is pressed, e.g., Escape to cancel editing
    if (event.key === "Escape") {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
          tabIndex={0} // Needed for onKeyDown to work with div
        >
           <textarea
            //   type="text"
              name="task"
              rows={3}
              placeholder="Write a task name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              style={{ fontSize: 32,width:"100%"}}
            />
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <Typography variant="h3">{text || placeholder}</Typography>
        </div>
      )}
    </section>
  );
};

export default EditAbleTextFields;