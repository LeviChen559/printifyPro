"use client";
import { useState, FormEvent } from "react";
import styles from "../page.module.css";
import SigninCard from "../../section/signinCard/";
import { signIn } from "next-auth/react";
import { iFormData } from "@/app/type";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [formData, setFormData] = useState<iFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // e.preventDefault();
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (res?.error) {
      setError(res.error);
    } else {
     
      router.push (`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/mylabels`)
    }
  };
 
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {/* <Typography variant="h5">
        Sign in to the Dashboard
      </Typography> */}
        <div className={styles.ctas}>
          <SigninCard
            formData={formData}
            setFormData={setFormData}
            onSubmit={(e) => handleSubmit(e)}
            error={error}
          />
        </div>
      </main>
    </div>
  );
}
