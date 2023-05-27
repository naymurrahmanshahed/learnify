import Button from "@/components/Button";
import { AiOutlineCheckCircle } from "react-icons/ai";

const SuccessPage = () => {
  return (
    <div className="wrapper py-10 min-h-screen">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-3xl flex items-center gap-2">
          <span className="text-emerald-500">
            <AiOutlineCheckCircle />
          </span>
          {"You've enrolled successfully!"}
        </h2>
        <Button href={"/orders"} placeholder="Got to your orders" />
      </div>
    </div>
  );
};

export default SuccessPage;
