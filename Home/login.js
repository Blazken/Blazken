// let container = document.getElementById("container");
let myForm = document.getElementById("myform");
// let email = document.getElementById("email");
let password = document.getElementById("password");
let output = document.getElementById("output")


myForm.addEventListener("submit", formEvent);

function formEvent(e) {
    e.preventDefault();
    if (email.value.lenght === 0) {
        output.innerHTML = "please enter your email";
        output.style.color = "red";
        output.style.fontSize = "1.9rem";
        output.style.fontFamily = "roboto";
    } else if (password.value.lenght > 6) {
        output.innerHTML = "your password cannot exceed 6 characters";
        output.style.color = "red";
        output.style.fontSize = "1.9rem";
        output.style.fontFamily = "roboto";
        // } else {
        //     output.innerHTML = "Congratulation! you have successful login";
        //     output.style.color = "green";
        //     output.style.fontSize = "1.9rem";
        //     output.style.fontFamily = "roboto";
    }
    // JSON.parse(window.localStorage.getItem("email"))
    window.location.href = "index.html"
}