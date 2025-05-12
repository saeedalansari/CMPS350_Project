export default function AdminCards({ classes }) {
  return classes.map((item) => (
    <div key={item.id} className="card">
      <img src="/img/material.png" alt={item.course.name} />
      <p>
        <span>course name</span> : {item.course.name}
      </p>
      <p>
        <span>instructor name</span> : {item.instructor.name}
      </p>
      <p>
        <span>number of pending</span> : {item.numberPending}
      </p>
      <p>
        <span>number of registered</span> : {item.numberRegistered}
      </p>
      <p>
        <span>number of Finalized</span> : {item.numberFinalized}
      </p>
      {item.numberPending !== 0 && (
        <div className="btns">
          <a
            href={`/ui/admin/acceptPending?classId=${item.id}`}
            className="update-btn"
          >
            accept pending
          </a>
        </div>
      )}
    </div>
  ));
}
