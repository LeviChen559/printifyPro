import React, { useState, FC, FormEvent } from "react";
import { Container } from "./style";
import FormPropsTextFields from "../../components/FormPropsTextFields";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "../../components/button";
import SendIcon from "@mui/icons-material/Send";
import { iFormData } from "@/app/type";
import { Typography } from "@mui/material";
import Link from "next/link";
import { FormHelperText } from "@mui/material";

interface iProps {
  formData: iFormData;
  setFormData: React.Dispatch<React.SetStateAction<iFormData>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  error:string |null
}

const SignInCard: FC<iProps> = (prop) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={prop.onSubmit}
    >
      <Container>
        <Typography variant="h4" color="textPrimary"> Sign In</Typography>
        <FormPropsTextFields
          id="email"
          required
          value={prop.formData.email}
          label="Email"
          placeholder="123@gmail.com"
          type="email"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, email: e.target.value })
          }
          startIcon={<EmailIcon />}
          sx={{width:"100%",color:"textPrimary"}}
        />
        <FormPropsTextFields
          id="password"
          required
          value={prop.formData.password}
          label={prop.error===null ?"Password":"Error"}
          placeholder="12345678"
          type={showPassword ? "text" : "password"}
          startIcon={<KeyIcon />}
          endIcon={showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          onClick={() => setShowPassword(!showPassword)}
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, password: e.target.value })
          }
          sx={{width:"100%",height:50}}
          error={prop.error===null ? false : true}
        />{prop.error===null ? null : <FormHelperText error sx={{fontSize:16}}>{prop.error}</FormHelperText>}
        <Button
          btnText="Sign in"
          width="100%"
          endIcon={<SendIcon  sx={{color:"#ffffff"}}/>}
          onClick={() => prop.onSubmit}
          type="submit"
        />
        <Link href="/forgetpassward" >
        <Typography variant="body2" color="textPrimary"> Forget passward</Typography>
        </Link>
      </Container>
    </Box>
  );
};

export default SignInCard;
