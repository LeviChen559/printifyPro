import React, { FC, FormEvent } from "react";
import { Container } from "./style";
import FormPropsTextFields from "../../components/FormPropsTextFields";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import Button from "../../components/button";
import SendIcon from "@mui/icons-material/Send";
import { iCustomer } from "@/app/type";

interface iProps {
  formData: iCustomer;
  setFormData: React.Dispatch<React.SetStateAction<iCustomer>>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CustomerForm: FC<iProps> = (prop) => {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={prop.onSubmit}
    >
      <Container>
        <FormPropsTextFields
          id="firstName"
          required={false}
          defaultValue=""
          label="First Name"
          placeholder=""
          type="text"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, firstName: e.target.value })
          }
          startIcon={<AccountCircleIcon />} 
          sx={{flex:"1 0 200px"}}
        />
        <FormPropsTextFields
          id="lastName"
          required={false}
          defaultValue=""
          label="Last Name"
          placeholder=""
          type="text"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, lastName: e.target.value })
          }
          startIcon={<AccountCircleIcon />}
          sx={{flex:"1 0 200px"}}
        />
        <FormPropsTextFields
          id="phoneNumber"
          required={false}
          defaultValue=""
          label="Phone Number"
          placeholder=""
          type="text"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, phoneNumber: e.target.value })
          }
          startIcon={<PhoneIphoneIcon />}
          sx={{flex:"1 0 200px"}}
        />
        <FormPropsTextFields
          id="email"
          required={false}
          defaultValue=""
          label="email"
          placeholder="123@gmail.com"
          type="email"
          onChange={(e) =>
            prop.setFormData({ ...prop.formData, email: e.target.value })
          }
          startIcon={<EmailIcon />}
          sx={{flex:"1 0 200px"}}
        />
        <FormPropsTextFields
          id="ticketId"
          required={false}
          defaultValue=""
          label="Ticket Id"
          placeholder="1"
          type={"number"}
          startIcon={<ConfirmationNumberIcon />}
          onChange={(e) =>
            prop.setFormData({
              ...prop.formData,
              ticketId: Number(e.target.value),
            })
          }
          sx={{flex:"1 0 200px"}}
        />
        <FormPropsTextFields
          id="ticketSet"
          required={false}
          defaultValue=""
          label="Ticket Set"
          placeholder="1"
          type={"number"}
          startIcon={<ConfirmationNumberIcon />}
          onChange={(e) =>
            prop.setFormData({
              ...prop.formData,
              ticketSet: Number(e.target.value),
            })
          }
          sx={{flex:"1 0 200px"}}
        />

        <Button
          btnText="Buy Tickets"
          width="100%"
          endIcon={<SendIcon />}
          onClick={() => prop.onSubmit}
          type="submit"
          
        />
        
      </Container>
    </Box>
  );
};

export default CustomerForm;
