import { getDates } from "../proto.js";
import ViewDates from "./dates/viewDates.js";
import hashPassword from "../functions/hashPassword.js"

async function Login() {
    const Computers = document.getElementById("Computers");
    Computers.style.display = "none";

    document.getElementById("UserButtonLogin").addEventListener("click", async () => {
        const users = await getDates("users");

        const username = document.getElementById('UserLoginInput').value;
        const userPassword = document.getElementById('UserPasswordInput').value;

        const correspondingUser = users.find(user => user.users_name === username);

        if (!correspondingUser) {
            alert("Неверное имя пользователя.");
            return;
        }
        if (correspondingUser.users_password !== await hashPassword(userPassword)) {
            alert("Неверный пароль.");
            return;
        }

        localStorage.removeItem('userData');
        
        const userData = [correspondingUser.users_name, correspondingUser.users_role];
        localStorage.setItem('userData', JSON.stringify(userData));

        document.getElementById('UserLoginInput').value = "";
        document.getElementById('UserPasswordInput').value = "";

        if(correspondingUser.users_role === "user"){
            const createUsers = document.getElementById("ComputerCreateUsers");
            createUsers.style.display = "none";
            const CreateComputer = document.getElementById("ComputerCreateComputer");
            CreateComputer.style.display = "none";
            const CreateDates = document.getElementById("ComputerCreateDates");
            CreateDates.style.display = "none";
        }

        if(correspondingUser.users_role === "meneger"){
            const createUsers = document.getElementById("ComputerCreateUsers");
            createUsers.style.display = "none";
        }

        ViewDates();

        const LoginSection = document.getElementById("Login");
        LoginSection.style.display = "none";
        Computers.style.display = "block";
    });
}

export default Login;