export interface iFormData {
    email: string;
    password: string;
  }

  export interface iUpdateFormData {
    name: string;
    email: string;
    password: string;
    role: string;
  }
  export interface iUser {
  
      id: string;
      role: string;
      name: string;
      email: string;
      password: string;

  
  }

  export interface iCustomer {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    ticketId: number;
    ticketSet: number;

  }

  export interface iCustomerSearchProps {
    searchValue: string;
    searchType: string;
  }

  export const enum USERTYPE {
     "user"= "user",
     "manager"="manager",
     "admin"="admin"
  } 
