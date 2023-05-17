import { FcGoogle } from "react-icons/fc";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import SectionTitle from "@/components/SectionTitle";
import { useEffect } from "react";
const LoginPage = ({ session }) => {
  const router = useRouter();
  const handleLoginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (session) {
      const destination = router.query.destination || "/users/profile";

      router.replace(destination);
    }
  }, [router, session]);

  if (session) {
    return null;
  }
  if (!session) {
    return (
      <div className="wrapper py-10 min-h-screen">
        <SectionTitle
          span={"Login"}
          h2={"Get Started with Google"}
          p={"Please login to continue with our features"}
        />
        <div className="flex justify-center">
          <button
            onClick={handleLoginWithGoogle}
            className="flex gap-2 items-center bg-black text-white py-3 px-6 rounded-lg mt-5"
          >
            <span>
              <FcGoogle />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
};

export default LoginPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const destination = context.query.destination || "/users/profile";
    return {
      redirect: {
        destination,
        parmanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
