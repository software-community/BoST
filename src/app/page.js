import { signIn } from "@/auth.js"

export default function Home() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button className="border border-black" type="submit">Signin with Google</button>
    </form>
  );
}
