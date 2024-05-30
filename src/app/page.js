import { auth } from "../auth";
import { signOut } from "next-auth/react";
import { signIn } from "next-auth/react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";

export default async function Home() {
  const session = await auth();

  if (!session)
    return (
      <>
        <Navbar />
        <Button text="SignIn" callback={signIn} />
      </>
    );

  const { name, image, email } = session.user;

  return (
    <div className="w-screen h-auto">
      <Navbar />
      <h1>{name}</h1>
      <p>{email}</p>
      <img src={image}></img>
      <Button text="SignOut" callback={signOut} />
    </div>
  );
}
