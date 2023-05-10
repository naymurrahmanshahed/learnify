import CourseItem from "@/components/CourseItem";
import SectionTitle from "@/components/SectionTitle";
import { getAllCourses } from "@/prisma/courses";
import React from "react";

const CoursesPage = ({ courses }) => {
  return (
    <div className="wrapper py-10">
      <SectionTitle
        span="Courses"
        h2="Browse all courses"
        p={"Learn Effectively That Will Take You Towards Your Goal"}
      />

      <div className="mt-10 flex flex-wrap gap-10">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

export const getServerSideProps = async () => {
  const courses = await getAllCourses();

  const updatedCourses = courses.map((course) => ({
    ...course,
    updatedAt: course.updatedAt.toString(),
    createdAt: course.createdAt.toString(),
  }));
  return {
    props: {
      courses: updatedCourses,
    },
  };
};
