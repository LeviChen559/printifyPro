import React, { useState, FC, FormEvent } from "react";
import { Container } from "./style";
import FormPropsTextFields from "../../components/FormPropsTextFields";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "../../components/button";
import SendIcon from "@mui/icons-material/Send";
import { iUpdateFormData } from "@/app/type";


interface iProps {
  formData: iUpdateFormData;
  setFormData: React.Dispatch<React.SetStateAction<iUpdateFormData>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const UserUpdeForm: FC<iProps> = (prop) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);



  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={prop.onSubmit}
    >
      <Container>
      <FormPropsTextFields
          id="name"
          required={false}
          value={prop.formData.name}
          label="name"
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
          label="email"
          placeholder="123@gmail.com"
          type="email"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, email: e.target.value })
          }
          startIcon={<EmailIcon />}
        />
        <FormPropsTextFields
          id="password"
          required={false}
          value={prop.formData.password}
          label="password"
          placeholder="12345678"
          type={showPassword ? "text" : "password"}
          startIcon={<KeyIcon />}
          endIcon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          onClick={() => setShowPassword(!showPassword)}
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, password: e.target.value })
          }
        />
        <Button
          btnText="Update"
          width="100%"
          endIcon={<SendIcon />}
          onClick={() => prop.onSubmit}
          type="submit"
        />
      </Container>
    </Box>
  );
};

export default UserUpdeForm;
