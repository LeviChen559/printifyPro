import React,{useState,FC} from "react";
import { SignupContainer } from "./style";
import FormPropsTextFields from "../../components/FormPropsTextFields";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from "../../components/button";
import SendIcon from "@mui/icons-material/Send";
import { iFormData } from "@/app/type";
import bcrypt  from'bcryptjs';

interface iProps{
  // signupClcik: (formData: iFormData) => Promise<never>
}


const SignupCard:FC<iProps> = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [formData, setFormData] = useState<iFormData>({
      email: "",
      password: "",
    })
    console.log("formData",formData)

    
    const handleFormSubmit=async() =>{
 
      const hashPassword = await bcrypt.hash(formData.password, 10);
      console.log("setFormData", hashPassword);
      // Continue with other logic
    }
  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleFormSubmit}>
      <SignupContainer>
        <FormPropsTextFields
          id="email"
          required
          value={formData.email}
          label="require"
          placeholder="123@gmail.com"
          type="email"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          startIcon={<EmailIcon />}
        />
        <FormPropsTextFields
          id="password"
          required
          value={formData.password}
          label="require"
          placeholder="12345678"
          type={showPassword?"text":"password"}
          startIcon={<KeyIcon />}
          endIcon={showPassword?<VisibilityIcon />:<VisibilityOffIcon />}
          onClick={()=>setShowPassword(!showPassword)}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <Button btnText="Sign Up" width="100%" endIcon={<SendIcon />}  onClick={() => handleFormSubmit} type="submit"/>
      </SignupContainer>
    </Box>
  );
};

export default SignupCard;
