import React,{FC} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface iCard{
    role: string,
    name: string,
    email: string
}


const UserCard:FC<iCard> =(prop)=> {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {prop.role}
        </Typography>
        <Typography variant="h5" component="div">
          {prop.name}
        </Typography>
        {/* <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          adjective
        </Typography> */}
        <Typography variant="body2">{prop.email}</Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard