document.addEventListener("DOMContentLoaded", () => {
  const usersList = document.getElementById("users-list");
  const userForm = document.getElementById("user-form");

  function fetchUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        usersList.innerHTML = "";
        users.forEach((user) => {
          const li = document.createElement("li");
          li.textContent = `${user.name} (${user.email})`;
          usersList.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching users:", error));
  }

  userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const newUser = {
      name: name,
      email: email,
    };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} (${user.email})`;
        usersList.appendChild(li);

        userForm.reset();
      })
      .catch((error) => console.error("Error adding user:", error));
  });

  fetchUsers();
});
