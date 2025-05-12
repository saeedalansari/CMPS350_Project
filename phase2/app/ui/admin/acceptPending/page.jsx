import StudentCourse from "../../../../repos/studentCourse";
import { Logout } from "../../localStorageUser";
import PageTitle from "../../PageTitle";
import ActionAccept from "./ActionAccept";
import Back from "../../instructor/grades/Back";
export default async function AcceptPending({ searchParams }) {
  const classId = (await searchParams).classId;
  const studentCourses = await StudentCourse.getStudentCourses(
    classId,
    "pending"
  );
  const materialName = studentCourses[0]?.class?.course?.name;
  return (
    <>
      <PageTitle title="Management students, courses." />
      <main>
        <div id="btns-list" className="btns-list">
          <Logout />
          <Back />
        </div>
        <h1 className="title-form" id="material_name">
          {materialName}
        </h1>
        <div id="cours-list" className="cours-list">
          {studentCourses.map((studentClass) => (
            <div key={studentClass.id} className="card">
              <img src="/img/student.webp" alt={studentClass.student.name} />
              <p>
                <span>student name</span> : {studentClass.student.name}
              </p>
              <ActionAccept studentCourseId={studentClass.id} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
