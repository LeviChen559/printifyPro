import React, { useState, FC, FormEvent } from "react";
import { Container, Header } from "./style";
import FormPropsTextFields from "../../components/FormPropsTextFields";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "../../components/button";
import SendIcon from "@mui/icons-material/Send";
import { iUpdateFormData } from "@/app/type";
import DropdownMenu from "@/components/dropdownMenu";
import CancelIcon from '@mui/icons-material/Cancel';
interface iProps {
  formData: iUpdateFormData;
  setFormData: React.Dispatch<React.SetStateAction<iUpdateFormData>>;
  setUpdateUserId?: React.Dispatch<React.SetStateAction<number | null>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  type: "add" | "update";
}

const UserUpdateForm: FC<iProps> = (prop) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return prop.type === "add" ? (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={prop.onSubmit}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        background: "#fff",
        maxWidth: 360,
        width: "100%",
        maxHeight: 450,
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Container>
        <Header>Add a user</Header>
        <FormPropsTextFields
          id="name"
          required={false}
          value={prop.formData.name}
          autoComplete="username"
          label="Name"
          sx={{ width: "100%" }}
          placeholder=""
          type="text"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, name: e.target.value })
          }
          startIcon={<AccountCircleIcon />}
        />
        <FormPropsTextFields
          id="email"
          required={false}
          value={prop.formData.email}
          label="Email"
          placeholder="123@gmail.com"
          type="email"
          autoComplete="email"
          sx={{ width: "100%" }}
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, email: e.target.value })
          }
          startIcon={<EmailIcon />}
        />
        <FormPropsTextFields
          id="password"
          required={false}
          value={prop.formData.password}
          label="Password"
          autoComplete="password"
          placeholder="12345678"
          type={showPassword ? "text" : "password"}
          sx={{ width: "100%" }}
          startIcon={<KeyIcon />}
          endIcon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          onClick={() => setShowPassword(!showPassword)}
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, password: e.target.value })
          }
        />
        <DropdownMenu
          type="role"
          value={prop.formData.role}
          placeholder="Select a Role"
          onChange={(value) =>
            prop.setFormData({ ...prop.formData, role: value })
          }
          width={"100%"}
        />
        <Button
          btnText="Submit"
          width="100%"
          endIcon={<SendIcon sx={{ color: "#ffffff" }} />}
          onClick={() => prop.onSubmit}
          type="submit"
        />
      </Container>
    </Box>
  ) : (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={prop.onSubmit}
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        background: "#fff",
        maxWidth: 360,
        width: "100%",
        maxHeight: "auto",
        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Container>
        <Header>Update the user</Header>
        <FormPropsTextFields
          id="name"
          required={false}
          value={prop.formData.name}
          autoComplete="username"
          label="Name"
          sx={{ width: "100%" }}
          placeholder=""
          type="text"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, name: e.target.value })
          }
          startIcon={<AccountCircleIcon />}
        />
        <FormPropsTextFields
          id="email"
          required={false}
          value={prop.formData.email}
          label="Email"
          placeholder="123@gmail.com"
          type="email"
          autoComplete="email"
          sx={{ width: "100%" }}
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, email: e.target.value })
          }
          startIcon={<EmailIcon />}
        />
        <FormPropsTextFields
          id="password"
          required={false}
          value={prop.formData.password}
          label="Password"
          autoComplete="password"
          placeholder="12345678"
          type={showPassword ? "text" : "password"}
          sx={{ width: "100%" }}
          startIcon={<KeyIcon />}
          endIcon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          onClick={() => setShowPassword(!showPassword)}
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, password: e.target.value })
          }
        />
        <DropdownMenu
          type="role"
          value={prop.formData.role}
          placeholder="Select a Role"
          onChange={(value) =>
            prop.setFormData({ ...prop.formData, role: value })
          }
          width={"100%"}
        />
        <Button
          btnText="Submit"
          width="100%"
          endIcon={<SendIcon sx={{ color: "#ffffff" }} />}
          onClick={() => prop.onSubmit}
          type="submit"
        />
         <Button
          btnText="Cancel"
          width="100%"
          backgroundColor="#f4433680"
          hoverBackgroundColor="#f4433650"
          endIcon={<CancelIcon sx={{ color: "#ffffff" }} />}
          onClick={() => prop.setUpdateUserId?.(null)}
          type="button"
        />
      </Container>
    </Box>
  );
};

export default UserUpdateForm;
