localStorage.setItem('login', JSON.stringify({ 'islogin': false }))


var btnCreateAcc = document.querySelector('.btn-create-acc');
var formRegister = document.querySelector('#customer_register');
var formInputs = formRegister.querySelectorAll('input')
let lastNameInput = document.querySelector('#lastName');
let firstNameInput = document.querySelector('#firstName');
let phoneInput = document.querySelector('#phone')
let emailInput = document.querySelector('#email')
let password = document.querySelector("#password")

var usersApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/users";
const validates = {
    isRequired: function (input) {
        if (input.value.trim() == "") {
            input.classList.add("invalid")
            input.nextElementSibling.textContent = "Vui lòng nhập trường này";
            return false
        }
        else {
            return true
        }
    },
    isTel: function (input) {
        if (this.isRequired(input)) {
            if (input.value.trim().replace(" ", "").length != 10) {
                input.classList.add("invalid")
                input.nextElementSibling.textContent = "Số điện thoại không hợp lệ";
                return false
            }
            else {
                return true
            }
        }
        else {
            return false;
        }

    },
    isEmail: function (input) {

        if (this.isRequired(input)) {
            if (input.value.trim() != "") {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if (!regex.test(input.value)) {
                    input.classList.add("invalid")
                    input.nextElementSibling.textContent = "Nhập sai định dạng email";
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return false
        }

    },
    isPassword: function (input) {
        if (input.value.trim().length < 6) {
            input.classList.add("invalid")
            input.nextElementSibling.textContent = "Mật khẩu tối thiểu phải có 6 kí tự";
            return false
        }
        else {
            return true
        }
    }
}
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
                    var date = new Date()
                    var formData = {

                        name: firstNameInput.value + " " + lastNameInput.value,
                        email: emailInput.value,
                        phoneNumber: phoneInput.value,
                        password: password.value,
                        isAdmin: false
                    }
                    createUsers(formData);
                    formRegister.reset();
                    localStorage.setItem('login', JSON.stringify({ 'islogin': 'true' }))
                    localStorage.setItem('usersAccount', JSON.stringify(
                        {
                            'name': `${formData.name}`,
                            'email': `${formData.email}`,
                            'phoneNumber': `${formData.phoneNumber}`,
                            'password': `${formData.password}`,
                            'isAdmin': false
                        }
                    ))
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
        .then(user => console.log(`Da tao thanh cong user ${user.name}`))

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


