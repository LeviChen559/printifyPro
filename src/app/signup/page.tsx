"use client";
import styles from "../page.module.css";
import SignupCard from "../../section/signupCard/index";
import { Typography } from "@mui/material";
export default function SignUp() {
  

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <Typography variant="h5">
        Sign up to get started
      </Typography>
        <div className={styles.ctas}>
          <SignupCard />
        </div>
      </main>
    </div>
  );
}
