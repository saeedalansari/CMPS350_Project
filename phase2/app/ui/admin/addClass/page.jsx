import Courses from "../../../../repos/courses";
import User from "../../../../repos/user";
import { Logout } from "../../localStorageUser";
import PageTitle from "../../PageTitle";
import FormAddClass from "./FormAddClass";
import Back from "../../instructor/grades/Back";
export default async function AcceptPending({ searchParams }) {
  const courses = await Courses.getCourses();
  const instractors = await User.getInstructors();

  return (
    <>
      <PageTitle title="Management students, courses." />
      <main>
        <h2 id="alert_form"></h2>
        <div id="btns-list" className="btns-list">
          <Logout />
          <Back />
        </div>
        <FormAddClass courses={courses} instractors={instractors} />
      </main>
    </>
  );
}
