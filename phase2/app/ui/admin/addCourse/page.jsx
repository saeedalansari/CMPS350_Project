import Courses from "../../../../repos/courses";
import { Logout } from "../../localStorageUser";
import PageTitle from "../../PageTitle";
import FormAddCourse from "./FormAddCourse";
import Back from "../../instructor/grades/Back";
export default async function AcceptPending({ searchParams }) {
  const courses = await Courses.getCourses();

  return (
    <>
      <PageTitle title="Management students, courses." />
      <main>
        <h2 id="alert_form"></h2>
        <div id="btns-list" className="btns-list">
          <Logout />
          <Back />
        </div>
        <FormAddCourse courses={courses} />
      </main>
    </>
  );
}
