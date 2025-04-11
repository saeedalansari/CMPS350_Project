const host = "http://localhost:3000/api";

class ErrorForm {
  static showError(error) {
    const alert_form = document.querySelector("#alert_form");
    alert_form.textContent = error;
    setTimeout(() => {
      alert_form.textContent = "";
    }, 3000);
    alert_form.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

class Requests {
  static async requestGet(url) {
    return fetch(host + url);
  }
  static async requestPost(url, data) {
    return fetch(host + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  static async requestPATCH(url, data) {
    return fetch(host + url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  static async requestDelete(url, data) {
    return fetch(host + url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
}
class EnterGrades {
  static async saveGrade(event, classId, studentClassId) {
    console.log(event);
    event.preventDefault();
    const grade = event.target.querySelector("#grade").value;
    const sendData = {
      studentClassId,
      grade,
    };
    const request = await Requests.requestPATCH(`/enterGrade`, sendData);
    try {
      const data = await request.json();
      if (data.success) {
        EnterGrades.showCards(classId);
      } else {
        ErrorForm.showError(data.message);
      }
    } catch (error) {
      alert_form.textContent = error.message;
      ErrorForm.showError(error.message);
    }
  }
  static async getRegistered(classId) {
    const request = await Requests.requestGet(`/enterGrade?classId=${classId}`);
    const data = await request.json();
    return data;
  }

  static async showCards(classId) {
    const cours_list = document.querySelector("#cours-list");
    const data = (await EnterGrades.getRegistered(classId)).data;
    const material_name = document.querySelector("#material_name");
    material_name.textContent = "enter grades to " + data.name;
    cours_list.innerHTML = data.studentsClassesData
      .map(
        (studentClass) => `
          <div class="card">
            <img src="img/grades.png" alt="${studentClass.student_name}"/>
            <p><span>student name</span> : ${studentClass.student_name}</p>
                <form onsubmit="EnterGrades.saveGrade(event,${classId},${studentClass.id})" class="btns">
                  <input name="grade" class="update-btn input_grade" type="number" id="grade" placeholder="enter grade" min="0" max="100">
                  <button type="submit" class="update-btn" >save and finalize</button>
                </form>
          </div>
        `
      )
      .join("");
  }

  static async ShowRegistered(classId) {
    const main = document.querySelector("main");
    main.innerHTML = `
    <div id="btns-list" class="btns-list">
      <button class="add-btn" id="add-cours" onclick="Login.Logout()">logout</button>
      <button class="add-btn" id="add-cours" onclick="MainPage.ShowMainPage()">Back</button>
    </div>
    <h1 class="title-form" id="material_name"></h1>
    <h2 id="alert_form"></h2>
    <div id="cours-list" class="cours-list">
    </div>
    `;
    EnterGrades.showCards(classId);
  }
}
class AcceptPending {
  static async acceptPending(classId, studentClassId) {
    const request = await Requests.requestPATCH(`/acceptPending`, {
      studentClassId,
    });
    try {
      const data = await request.json();
      if (data.success) {
        AcceptPending.showCards(classId);
      } else {
        ErrorForm.showError(data.message);
      }
    } catch (error) {
      alert_form.textContent = error.message;
      ErrorForm.showError(error.message);
    }
  }
  static async removePending(classId, studentClassId) {
    const request = await Requests.requestDelete(`/acceptPending`, {
      studentClassId,
    });
    try {
      const data = await request.json();
      if (data.success) {
        AcceptPending.showCards(classId);
      } else {
        ErrorForm.showError(data.message);
      }
    } catch (error) {
      alert_form.textContent = error.message;
      ErrorForm.showError(error.message);
    }
  }
  static async getPending(classId) {
    const request = await Requests.requestGet(
      `/acceptPending?classId=${classId}`
    );
    const data = await request.json();
    return data;
  }

  static async showCards(classId) {
    const cours_list = document.querySelector("#cours-list");
    const data = (await AcceptPending.getPending(classId)).data;
    const material_name = document.querySelector("#material_name");
    material_name.textContent = "pending material name : " + data.name;
    cours_list.innerHTML = data.studentsClassesData
      .map(
        (studentClass) => `
          <div class="card">
            <img src="https://i0.wp.com/rollercoasteryears.com/wp-content/uploads/Thrive-During-Finals-.jpg?resize=1000%2C667&ssl=1" alt="${studentClass.student_name}"/>
            <p><span>student name</span> : ${studentClass.student_name}</p>
                <div class="btns">
                  <button class="update-btn" onclick="AcceptPending.acceptPending(${classId},${studentClass.id})">accept</button>
                  <button class="delete-btn" onclick="AcceptPending.removePending(${classId},${studentClass.id})">Remove</button>
                </div>
          </div>
        `
      )
      .join("");
  }

  static async ShowAcceptPending(classId) {
    const main = document.querySelector("main");
    main.innerHTML = `
    <div id="btns-list" class="btns-list">
      <button class="add-btn" id="add-cours" onclick="Login.Logout()">logout</button>
      <button class="add-btn" id="add-cours" onclick="MainPage.ShowMainPage()">Back</button>
    </div>
    <h1 class="title-form" id="material_name"></h1>
      <h2 id="alert_form"></h2>
    <div id="cours-list" class="cours-list">
    </div>
    `;
    AcceptPending.showCards(classId);
  }
}

class AddCours {
  static async getCourses() {
    const request = await Requests.requestGet(`/courses`);
    const data = await request.json();
    return data;
  }

  static async submitAddCours(event) {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const prerequisites = Array.from(
      document.querySelector("#prerequisites").selectedOptions
    ).map((option) => option.value);
    const request = await Requests.requestPost(`/courses`, {
      name,
      prerequisites,
    });
    try {
      const data = await request.json();
      if (data.success) {
        MainPage.ShowMainPage();
      } else {
        ErrorForm.showError(data.message);
      }
    } catch (error) {
      alert_form.textContent = error.message;
      ErrorForm.showError(error.message);
    }
  }
  static async ShowAddCours() {
    const main = document.querySelector("main");
    main.innerHTML = `
    <div id="btns-list" class="btns-list">
      <button class="add-btn" id="add-cours" onclick="Login.Logout()">logout</button>
      <button class="add-btn" id="add-cours" onclick="MainPage.ShowMainPage()">Back</button>
    </div>
      <h2 id="alert_form"></h2>
      <form onsubmit="AddCours.submitAddCours(event)" class="cours-form" id="cours-form">
          <h1>add course</h1>
          <div class="form-input">
            <label for="name">name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-input">
            <label for="prerequisites">prerequisites</label>
            <select id="prerequisites" name="prerequisites" multiple>
            ${(await AddCours.getCourses()).data
              .map(
                (course) =>
                  `<option value="${course.id}">${course.name}</option>`
              )
              .join("")}
            </select>
          </div>
          
          <div class="form-btns">
            <input type="submit" value="Add" />
          </div>
        </form>
    `;
    AcceptPending.showCards(classId);
  }
}
class AddClass {
  static async getInstructors() {
    const request = await Requests.requestGet(`/instructors`);
    const data = await request.json();
    return data;
  }

  static async submitAddClass(event) {
    event.preventDefault();
    const courseId = document.querySelector("#courseId").value;
    const instructorId = document.querySelector("#instructorId").value;
    const maxStudents = document.querySelector("#maxStudents").value;
    const request = await Requests.requestPost(`/classes`, {
      courseId,
      instructorId,
      maxStudents,
    });
    try {
      const data = await request.json();
      if (data.success) {
        MainPage.ShowMainPage();
      } else {
        ErrorForm.showError(data.message);
      }
    } catch (error) {
      alert_form.textContent = error.message;
      ErrorForm.showError(error.message);
    }
  }
  static async ShowAddClass() {
    const main = document.querySelector("main");
    main.innerHTML = `
    <div id="btns-list" class="btns-list">
      <button class="add-btn" id="add-cours" onclick="Login.Logout()">logout</button>
      <button class="add-btn" id="add-cours" onclick="MainPage.ShowMainPage()">Back</button>
    </div>
      <h2 id="alert_form"></h2>
      <form onsubmit="AddClass.submitAddClass(event)" class="cours-form" id="cours-form">
        <h1>add class</h1>
        <div class="form-input">
        <label for="courseId">Course</label>
        <select id="courseId" name="courseId">
        <option value="null" disabled selected>--------</option>
        ${(await AddCours.getCourses()).data
          .map(
            (course) => `<option value="${course.id}">${course.name}</option>`
          )
          .join("")}
              </select>
              </div>
        <div class="form-input">
        <label for="instructorId">instructor</label>
          <select id="instructorId" name="instructorId">
              <option value="null" disabled selected>--------</option>
            ${(await AddClass.getInstructors()).data
              .map(
                (instructor) =>
                  `<option value="${instructor.id}">${instructor.name}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="form-input">
          <label for="maxStudents">max Students</label>
          <input type="number" id="maxStudents" name="maxStudents" required />
        </div>
        <div class="form-btns">
          <input type="submit" value="Add" />
        </div>
      </form>
    `;
    AcceptPending.showCards(classId);
  }
}

class MainPage {
  static async getClasses() {
    const user = Login.getUser();
    const searchInput = document.querySelector("#search");
    const searchValue = searchInput ? searchInput.value : null;
    const search = searchValue ? `&search=${searchValue}` : "";
    const request = await Requests.requestGet(
      `/home?userId=${user.id}${search}`
    );
    const data = await request.json();
    return data;
  }
  static CardMaterialStudent(Class) {
    if (!Class.studentClasse) {
      return `
        <div class="card">
          <img src="img/notregistered.jpg" alt="${Class.name}"/>
          <p><span>material name</span> : ${Class.name}</p>
          <div class="btns">
            <button class="update-btn" onclick="MainPage.RegisterMaterial(${Class.id})">regester</button>
          </div>
        </div>
      `;
    }
    if (Class.studentClasse?.status === "finalized") {
      return `
        <div class="card">
          <img src="img/finalized.jpg" alt="${Class.name}"/>
          <p><span>material name</span> : ${Class.name}</p>
          <p><span>grade</span> : ${Class.studentClasse.grade}</p>
          <div class="btns">
            <button class="add-btn" id="add-cours" style="cursor: not-allowed" disabled>${Class.studentClasse.status}</button>
          </div>
        </div>
        `;
    } else {
      return `
      <div class="card">
        <img src="img/${Class.studentClasse.status}.jpg" alt="${Class.name}"/>
        <p><span>material name</span> : ${Class.name}</p>
        <div class="btns">
          <button class="add-btn" id="add-cours" style="cursor: not-allowed" disabled>${Class.studentClasse.status}</button>
        </div>
      </div>
      `;
    }
  }

  static async RegisterMaterial(classId) {
    const user = Login.getUser();
    const request = await Requests.requestPost(`/register`, {
      userId: user.id,
      classId,
    });
    try {
      const data = await request.json();
      if (data.success) {
        MainPage.showCards();
      } else {
        ErrorForm.showError(data.message);
      }
    } catch (error) {
      alert_form.textContent = error.message;
      ErrorForm.showError(error.message);
    }
  }
  static async cardsStudent() {
    const cours_list = document.querySelector("#cours-list");
    cours_list.innerHTML = (await MainPage.getClasses()).data
      .map((Class) =>
        MainPage.CardMaterialStudent(
          Class,
          `
          <div class="btns">
            ${
              Class.studentClasse
                ? `
            <button class="add-btn" id="add-cours" disabled>${Class.studentClasse.status}</button>`
                : `<button class="update-btn" onclick="MainPage.RegisterMaterial(${Class.id})">regester</button>`
            }
            
          </div>
        `
        )
      )
      .join("");
  }
  static async cardsInstructor() {
    const cours_list = document.querySelector("#cours-list");
    cours_list.innerHTML = (await MainPage.getClasses()).data
      .map(
        (Class) => `
          <div class="card">
            <img src="img/material.png" alt="${Class.name}"/>
            <p><span>number of registered</span> : ${Class.numberRegistered}</p>
            <p><span>number of Finalized</span> : ${Class.numberFinalized}</p>
            <div class="btns">
              <button class="update-btn" onclick="EnterGrades.ShowRegistered(${Class.id})">enter grades</button>
            </div>
          </div>
        `
      )
      .join("");
  }
  static async cardsAdministrators() {
    const cours_list = document.querySelector("#cours-list");
    cours_list.innerHTML = (await MainPage.getClasses()).data
      .map(
        (Class) => `
          <div class="card">
            <img src="img/material.png" alt="${Class.name}"/>
            <p><span>number of pending</span> : ${Class.numberPending}</p>
            <p><span>number of registered</span> : ${Class.numberRegistered}</p>
            <p><span>number of Finalized</span> : ${Class.numberFinalized}</p>
            ${
              Class.numberPending
                ? `<div class="btns">
              <button class="update-btn" onclick="AcceptPending.ShowAcceptPending(${Class.id})">accept pending</button>
            </div>`
                : ""
            }
          </div>
        `
      )
      .join("");
  }

  static showCards() {
    const user = Login.getUser();
    if (user.role === "student") {
      MainPage.cardsStudent();
    } else if (user.role === "instructor") {
      MainPage.cardsInstructor();
    } else if (user.role === "administrator") {
      MainPage.cardsAdministrators();
    }
  }
  static submitSearch(event) {
    event.preventDefault();
    MainPage.showCards();
  }
  static async ShowMainPage() {
    const user = Login.getUser();
    const main = document.querySelector("main");
    main.innerHTML = `
    <div id="btns-list" class="btns-list">
      <button class="add-btn" id="add-cours" onclick="Login.Logout()">logout</button>
      ${
        user.role === "administrator"
          ? `
        <button class="add-btn" id="add-cours" onclick="AddCours.ShowAddCours()">add course</button>
        <button class="add-btn" id="add-cours" onclick="AddClass.ShowAddClass()">add class</button>
      `
          : ""
      }
    </div>
      <h2 id="alert_form"></h2>
      <form onsubmit="MainPage.submitSearch(event)" id="class-search" class="cours-search">
        <input type="text" id="search" name="search" placeholder="Search by Name" />
        <button class="search-btn" >Search</button> 
    </form>
    <div id="cours-list" class="cours-list">
    </div>
    `;
    MainPage.showCards();
  }
}

class Login {
  static saveUser(user) {
    localStorage.setItem("userData", JSON.stringify(user));
  }
  static Logout() {
    localStorage.removeItem("userData");
    window.location.reload();
  }
  static getUser() {
    return JSON.parse(localStorage.getItem("userData"));
  }

  static async submitLogin(event) {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const request = await Requests.requestPost(`/login`, {
      username,
      password,
    });
    try {
      const data = await request.json();
      if (data.success) {
        Login.saveUser(data.data);
        MainPage.ShowMainPage();
      } else {
        ErrorForm.showError(data.message);
      }
    } catch (error) {
      alert_form.textContent = error.message;
      ErrorForm.showError(error.message);
    }
  }

  static ShowLogin() {
    const main = document.querySelector("main");
    main.innerHTML = `
        <h2 id="alert_form"></h2>
        <form class="cours-form" id="cours-form">
          <h1>login</h1>
          <div class="form-input">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div class="form-input">
            <label for="password">Password</label>
            <input type="text" id="password" name="password" required />
          </div>
          
          <div class="form-btns">
            <input type="submit" value="login" />
            <input type="reset" value="Cancel" id="cancel" />
          </div>
        </form>
      `;
    const form = document.querySelector("#cours-form");
    form.addEventListener("submit", Login.submitLogin);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = Login.getUser();
  if (!user) {
    Login.ShowLogin();
  } else {
    MainPage.ShowMainPage();
  }
});
