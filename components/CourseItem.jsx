import { currentConverter } from "@/utils/currencyConverter";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const CourseItem = ({ course }) => {
  return (
    <div className="w-full lg:w-[25rem] shadow-md rounded-md overflow-hidden">
      <div className="w-full lg:h-[20rem] h-[25rem] overflow-hidden object-cover">
        <Image
          src={course.cover}
          alt={course.title}
          priority
          width={640}
          height={360}
          className="w-full h-full"
        />
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-3xl font-medium">{course.title}</h3>

        <p className="flex gap-5 justify-between text-gray-500">
          <span>
            by{" "}
            <span className="text-black font-semibold">{course.duration}</span>
          </span>
          <span>
            Duration:{" "}
            <span className="text-black font-semibold">{course.duration}</span>
          </span>
        </p>
        <p className="flex justify-between text-gray-500">
          <span>
            Enrolled Students:{" "}
            <span className="text-black font-semibold">{course.students}</span>{" "}
          </span>
          <span>
            Rating:{" "}
            <span className="text-black font-semibold">{course.rating}</span>
          </span>
        </p>
        <p className="text-gray-500 ">
          {course.description.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            {currentConverter(course.price, "en-GB", "EUR")}
          </p>
          <Button
            color="primary"
            size="default"
            href={`/courses/${course.id}`}
            placeholder="View Details "
          />
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
