export default function InstructorCards({ classes, userId }) {
  return classes.map((item) => (
    <div key={item.id} className="card">
      <img src="/img/material.png" alt="${item.name}" />
      <p>
        <span>course name</span> : {item.course.name}
      </p>
      <p>
        <span>number of registered</span> : {item.numberRegistered}
      </p>
      <p>
        <span>number of Finalized</span> : {item.numberFinalized}
      </p>
      {item.numberRegistered !== 0 && (
        <div className="btns">
          <a
            href={`/ui/instructor/grades?classId=${item.id}`}
            className="update-btn"
            // onclick="EnterGrades.ShowRegistered(${item.id})"
          >
            enter grades
          </a>
        </div>
      )}
    </div>
  ));
}
