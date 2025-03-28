import { getDates } from "../../proto.js";
import ViewDates from "./viewDates.js";

const Computers = document.getElementById("Computers");
const Users = document.getElementById("Users");
Users.style.display = "none";

async function UsersDates() {

    const userRoleSelect = document.getElementById("ComputerNewUsersRole");

    while (userRoleSelect.options.length > 0) {
        userRoleSelect.remove(0);
    }

    const Option = document.createElement('option');
    Option.value = "0";
    Option.textContent = "Выберите роль";
    userRoleSelect.appendChild(Option);

    const adminOption = document.createElement('option');
    adminOption.value = "admin";
    adminOption.textContent = "Администратор";
    userRoleSelect.appendChild(adminOption);

    const menegerOption = document.createElement('option');
    menegerOption.value = "meneger";
    menegerOption.textContent = "Менеджер";
    userRoleSelect.appendChild(menegerOption);

    const userOption = document.createElement('option');
    userOption.value = "user";
    userOption.textContent = "Пользователь";
    userRoleSelect.appendChild(userOption);

    let users = await getDates("users");

    const currentUser = JSON.parse(localStorage.getItem('userData'));

    Computers.style.display = "none";
    Users.style.display = "block";

    const tableBody = document.getElementById('UsersComputers');
    tableBody.innerHTML = '';

    const filteredUsers = users.filter(user => user.users_name !== currentUser[0]);

    for (const item of filteredUsers) {
        const tr = document.createElement('tr');
        tr.setAttribute('id', "users_row_" + item.users_id)

        const tdEdit = document.createElement('td');
        const buttonEdit = document.createElement("button");
        const imgEdit = new Image();
        imgEdit.src = "./images/pencil.png";
        imgEdit.alt = "Edit";
        buttonEdit.appendChild(imgEdit);
        buttonEdit.id = "EditUsersButton" + item.users_id;
        tdEdit.appendChild(buttonEdit);
        tr.appendChild(tdEdit);

        const tdDelete = document.createElement('td');
        const buttonDelete = document.createElement("button");
        const imgDelete = new Image();
        imgDelete.src = "./images/delete.png";
        imgDelete.alt = "Delete";
        buttonDelete.appendChild(imgDelete);
        buttonDelete.id = "DeleteUsersButton" + item.users_id;
        tdDelete.appendChild(buttonDelete);
        tr.appendChild(tdDelete);

        const tdUsername = document.createElement('td');
        tdUsername.textContent = item.users_name;
        tr.appendChild(tdUsername);

        const tdPassword = document.createElement('td');
        tdPassword.textContent = item.users_password;
        tr.appendChild(tdPassword);

        const tdRole = document.createElement('td');
        tdRole.textContent = item.users_role;
        tr.appendChild(tdRole);

        const tdOwner = document.createElement('td');
        tdOwner.textContent = item.users_owner;
        tr.appendChild(tdOwner);

        tableBody.appendChild(tr);
    }
}

document.getElementById("UsersGoBackButton").addEventListener("click", () => {
    Computers.style.display = "block";
    Users.style.display = "none";
    ViewDates();
});

export default UsersDates;
