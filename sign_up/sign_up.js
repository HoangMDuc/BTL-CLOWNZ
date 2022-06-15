sessionStorage.setItem('login', JSON.stringify({ 'islogin': false }))
var btnCreateAcc = document.querySelector('.btn-create-acc');
var formRegister = document.querySelector('#customer_register');
var formInputs = formRegister.querySelectorAll('input')
let lastNameInput = document.querySelector('#lastName');
let firstNameInput = document.querySelector('#firstName');
let phoneInput = document.querySelector('#phone')
let emailInput = document.querySelector('#email')
let password = document.querySelector("#password")
import validates  from "./validates.js";


var usersApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/users";

btnCreateAcc.onclick = function (e) {
    e.preventDefault();
    // validates.isRequired(lastNameInput)
    // validates.isRequired(firstNameInput)
    // validates.isRequired(phoneInput)
    // validates.isEmail(emailInput)
    // validates.isTel(phoneInput)
    // validates.isPassword(password)



    if (!(validates.isRequired(lastNameInput) && validates.isRequired(firstNameInput)
        && validates.isEmail(emailInput) && validates.isTel(phoneInput) 
        && validates.isPassword(password))) {
        document.querySelector(".invalid").focus();
    }
    else {

        checkUserCreated()
            .then((user) => {
                if (user) {
                    emailInput.nextElementSibling.textContent = "Email đã tồn tại"
                    emailInput.classList.add("invalid")
                    email.focus()
                } else {
                    
                    var formData = {
                        name: lastNameInput.value + " " + firstNameInput.value,
                        email: emailInput.value,
                        phoneNumber: phoneInput.value,
                        password: password.value,
                        isAdmin: false
                    }
                    createUsers(formData);
                    formRegister.reset();
                    sessionStorage.setItem('login', JSON.stringify('true'))
                   
                    window.location.href = "../index.html"
                }

            })

    }
}


formInputs.forEach((input) => {
    input.oninput = function () {
        input.classList.remove("invalid")

    }
})

lastNameInput.onblur = function (e) {
    validates.isRequired(e.target)
}
firstNameInput.onblur = function (e) {
    validates.isRequired(e.target)
}
emailInput.onblur = function (e) {
    validates.isEmail(e.target)
}
phoneInput.onblur = function (e) {
    validates.isTel(e.target)
}
password.onblur = function (e) {
    validates.isPassword(e.target)
}


function createUsers(user) {
    fetch(usersApi, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(user => {
        sessionStorage.setItem('usersAccount', JSON.stringify(
            {
                'id': `${user.id}`,
                'name': `${user.name}`,
                'email': `${user.email}`,
                'phoneNumber': `${user.phoneNumber}`,
                'password': `${user.password}`,
                'isAdmin': false
            }
        ))
    })

}


function checkUserCreated() {
    return fetch(usersApi)
        .then(res => res.json())
        .then(function (users) {
            var userCreated = users.find((user) => {

                return user.email === emailInput.value
            })
            return userCreated
        })
}




