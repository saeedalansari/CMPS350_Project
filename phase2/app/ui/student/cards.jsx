import RegisterButton from "./RegisterButton";
export default function StudentCards({ classes,userId }) {
  return classes.map((cls) => {
    const studentCourse = cls.studentCourses[0];
    const status = studentCourse?.status;
    const grade = studentCourse?.grade;
    return (
      <div key={cls.id} className="card">
        <img
          src={`/img/${status || "notregistered"}.jpg`}
          alt="${cls.course.name}"
        />
        <p>
          <span>material name</span> : {cls.course.name}
        </p>
        <p>
          <span>instructor name</span> : {cls.instructor.name}
        </p>
        {![undefined, null].includes(grade) && (
          <p>
            <span>grade</span> : {grade}
          </p>
        )}
        <div className="btns">
          {status ? (
            <button
              className="add-btn"
              style={{ cursor: "not-allowed" }}
            >
              {status}
            </button>
          ) : (
            <RegisterButton userId={userId} classId={cls.id} />
          )}
        </div>
      </div>
    );
  });
}
