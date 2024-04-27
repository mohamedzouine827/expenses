import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Sign Up</h1>

  </div>
    <div  className="flex items-center justify-center mt-4">
  <SignUp path="/sign-up"/>
  </div>
</div>
  );
}
