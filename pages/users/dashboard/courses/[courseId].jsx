import SectionTitle from "@/components/SectionTitle";
import { getCourse } from "@/prisma/courses";
import Image from "next/image";

const CourseVideos = ({ course }) => {
  return (
    <div className="wrapper min-h-screen">
      <div className="flex lg:flex-row flex-col gap-5 mt-5">
        <div className="lg:w-[25rem] w-full rounded-md">
          <Image
            src={course.cover}
            alt={course.title}
            width={500}
            height={500}
            className="w-full h-full rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl ">{course.title}</h3>
          <div className="w-96">
            <div className="flex justify-between">
              <span className="text-gray-500 ">
                <span className="text-black font-semibold">by:</span>{" "}
                {course.instructor}
              </span>
              <span className="text-gray-500 ">
                <span className="text-black font-semibold">duration:</span>
                {course.duration}
              </span>
            </div>
          </div>
          <span className="text-gray-500 ">
            <span className="text-black font-semibold">
              Student{course.students > 0 ? "s" : ""}:
            </span>{" "}
            {course.students}
          </span>

          <p className="lg:w-[34rem]  w-full text-gray-500  text-[1rem]">
            {course.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseVideos;

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
