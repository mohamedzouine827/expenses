import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-lg text-center">
    <h1 className="text-2xl font-bold sm:text-3xl">Sign In</h1>

  </div>
    <div  className="flex items-center justify-center mt-4">
    <SignIn path="/sign-in" />
  </div>
</div>
  );
}

 

