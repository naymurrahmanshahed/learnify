import Button from "@/components/Button";
import prisma from "@/prisma/prisma";
import { currentConverter } from "@/utils/currencyConverter";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const OrdersPage = ({ session, customer }) => {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/users/login");
    }
  }, [session, router]);

  if (!session && !customer) {
    return null;
  }

  return (
    <div className="wrapper py-10 min-h-screen">
      <h2 className="text-3xl mb-5">
        You enrolled: {customer.orders.length} course
        {customer.orders.length > 1 ? "s" : ""}
      </h2>

      <div className="courses flex flex-wrap gap-10">
        {customer.orders.map((course) => (
          <div
            key={course.id}
            className="course p-5 shadow-md rounded-lg space-y-3"
          >
            <h2 className="text-2xl">{course.courseTitle}</h2>
            <p className="text-lg">
              Amount: {currentConverter(course.amountTotal)}
            </p>
            <Button
              href={`/users/dashboard/courses/${course.courseId}`}
              placeholder={"Study Now"}
            ></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const customer = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    include: {
      orders: true,
    },
  });

  if (!session || !customer) {
    return {
      redirect: {
        destination: "/users/login",
        permanent: true,
      },
    };
  }

  const updatedCustomer = {
    ...customer,
    updatedAt: customer.updatedAt.toString(),
    createdAt: customer.createdAt.toString(),

    orders: customer.orders.map((order) => ({
      ...order,
      updatedAt: order.updatedAt.toString(),
      createdAt: order.createdAt.toString(),
    })),
  };

  return {
    props: {
      session,
      customer: updatedCustomer,
    },
  };
};
