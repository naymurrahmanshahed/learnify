import SectionTitle from "@/components/SectionTitle";
import { getCourse } from "@/prisma/courses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

// STRIPE PROMISE

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckOut = ({ course }) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    courseTitle: course.title,
    price: course.price,
  });

  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name,
        email: session.user.email,
      }));
    }
  }, []);

  const handleCheckOut = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    // SEND A POST REQ. TO THE SERVER

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: [course],
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      address: formData.address,
      courseTitle: formData.courseTitle,
    });
    // REDIRECT TO THE STRIPE PAYMENT

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      console.log(result.error.message);
    }
  };
  return (
    <div className="wrapper py-10 min-h-screen">
      <SectionTitle
        span={"checkout"}
        h2={"Please provide your details"}
        p={"Fill out this form to continue checkout"}
      />
      <div className="flex justify-center ">
        <form
          onSubmit={handleCheckOut}
          className="flex flex-col gap-5 mt-10 w-full lg:w-[35rem] "
        >
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="name" className="cursor-pointer">
              Name
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="name"
              placeholder="sarah"
              readOnly
              value={formData.name}
            />
          </div>
          <div className="form-control form-control flex flex-col gap-2">
            <label htmlFor="email" className="cursor-pointer">
              Name
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="email"
              id="email"
              placeholder="hello@example.com"
              readOnly
              value={formData.email}
            />
          </div>
          <div className="form-control form-control flex flex-col gap-2">
            <label htmlFor="mobile" className="cursor-pointer">
              Phone number
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="tel"
              id="mobile"
              placeholder="+88015xxxxxxx"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>
          <div className="form-control form-control flex flex-col gap-2">
            <label htmlFor="address" className="cursor-pointer">
              Address
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="address"
              placeholder="ABC Street,NY"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <div className="form-control form-control flex flex-col gap-2">
            <label htmlFor="courseTitle" className="cursor-pointer">
              Course title
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="text"
              id="courseTitle"
              placeholder="ABC Street,NY"
              value={formData.courseTitle}
              readOnly
            />
          </div>

          <div className="form-control form-control flex flex-col gap-2">
            <label htmlFor="price" className="cursor-pointer">
              Price(USD)
            </label>
            <input
              className="outline-none border py-3 px-4 rounded-lg focus:border-gray-700"
              type="number"
              id="price"
              placeholder="$100"
              value={formData.price}
              readOnly
            />
          </div>
          <button
            role="link"
            type="submit"
            className="bg-black py-4 text-white rounded-lg hover:bg-gray-700 duration-300 "
          >
            Proceed to checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;

export const getServerSideProps = async ({ query }) => {
  const course = await getCourse(query.courseId);

  const updatedCourse = {
    ...course,
    updatedAt: course.updatedAt.toString(),
    createdAt: course.createdAt.toString(),
  };

  return {
    props: {
      course: updatedCourse,
    },
  };
};
