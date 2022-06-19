var addUserBtn = document.querySelector('.add-user-btn')
var updateUserBtn = document.querySelector('.update-user-btn')
var deleteUserBtn = document.querySelector('.delete-user-btn')
var formAddUser = document.querySelector('.form-add-user')

import validates from "../sign_up/validates.js"

var addBtn = document.querySelector('.add-btn')
var updateBtn = document.querySelector('.update-btn')
var cancelBtn = document.querySelector('.cancel-btn')
var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-input')

var userNameInput = document.querySelector('.form-control.user-name')
var userEmailInput = document.querySelector('.form-control.user-email')
var userPhoneInput = document.querySelector('.form-control.user-phone')
var userPasswordInput = document.querySelector('.form-control.user-password')
var userIsAdmin = document.querySelector('.form-control.user-isAdmin')


var formControls = formAddUser.querySelectorAll('.form-control:not(select)')
var usersApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/users"



var logoutBtn = document.querySelector('.log-out')
logoutBtn.onclick = function () {
    sessionStorage.setItem('login', { 'islogin': false })
}

document.querySelector('.user_name').textContent = JSON.parse(sessionStorage.getItem('usersAccount'))["name"]

addUserBtn.onclick = function (e) {
    e.preventDefault()
    formAddUser.style.display = 'block'
    addBtn.onclick = function () {
        if (validates.isRequired(userNameInput)
            && validates.isRequired(userEmailInput) && validates.isEmail(userEmailInput)
            && validates.isRequired(userPhoneInput) && validates.isTel(userPhoneInput) && validates.isRequired(userPasswordInput)
            && validates.isPassword(userPasswordInput)
        ) {
            fetch(usersApi + "?email=" + userEmailInput.value)
                .then(res => res.json())
                .then(users => {
                    if (users.length != 0) {
                        userEmailInput.nextElementSibling.textContent = "Email đã tồn tại"
                        userEmailInput.classList.add("invalid")
                        userEmailInput.focus()
                    } else {
                        var data = {
                            "name": userNameInput.value,
                            "email": userEmailInput.value,
                            "phoneNumber": userPhoneInput.value,
                            "password": userPasswordInput.value,
                            "isAdmin": userIsAdmin.value
                        }
                        fetch(usersApi, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(data) // body data type must match "Content-Type" header
                        })
                            .then(() => {
                                window.location.reload()
                            })

                    }
                })


        }
    }

    formControls.forEach((formControl) => {
        formControl.oninput = function () {
            formControl.classList.remove('invalid')
        }
    })
}

searchInput.oninput = function () {
    if (searchInput.value.length > 0) {
        searchBtn.removeAttribute('disabled')
    } else {
        searchBtn.setAttribute('disabled', null)
    }
}



cancelBtn.onclick = function () {
    formAddUser.classList.remove('isEditing')
    formAddUser.style.display = 'none'
    userNameInput.value = ""
    userEmailInput.value = ""
    userPhoneInput.value = ""
    userPasswordInput.value = ""
    userIsAdmin.value = "true"
}
var usersList = document.querySelector('.users-list')

fetch(usersApi)
    .then(res => res.json())
    .then(users => {
        var htmls = users.map((user) => {
            return `
            <tr class="user-item" data-index=${user.id}>
                <td><label for=""><input type="checkbox" class="select-checkbox" data-index=${user.id}></label>
                <td><a href="" class ="user-id">${user.id}</a></td>
                <td  class="user-name">${user.name}</td>
                <td class="user-email" colspan="2">${user.email}</td>
                <td class="user-phone">${user.phoneNumber}</td>
                <td class="user-password">${user.password}</td>
                <td class="user-isAdmin">${user.isAdmin}</td>
            </tr>
            `

        })
        usersList.innerHTML = htmls.join('')

    })
    .then(() => {
        var checkboxs = document.querySelectorAll('.select-checkbox')
        checkboxs.forEach((checkbox) => {
            checkbox.onclick = function () {
                // var checked
                var checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
                if (checkedItem.length == 1) {
                    updateUserBtn.removeAttribute('disabled')
                    deleteUserBtn.removeAttribute('disabled')
                    addUserBtn.setAttribute('disabled', null)
                } else if (checkedItem.length > 1) {
                    updateUserBtn.setAttribute('disabled', null)
                    deleteUserBtn.removeAttribute('disabled')
                    addUserBtn.setAttribute('disabled', null)
                } else if (checkedItem.length == 0) {
                    updateUserBtn.setAttribute('disabled', null)
                    deleteUserBtn.setAttribute('disabled', null)
                    addUserBtn.removeAttribute('disabled')
                }
            }
        })
        updateUserBtn.onclick = function (e) {
            e.preventDefault()
            formAddUser.classList.add('isEditing')
            formAddUser.style.display = 'block'

            var selectedCheckbox = document.querySelector('input[type="checkbox"]:checked')
            var selectedItem = document.querySelector('.user-item[data-index="' + selectedCheckbox.dataset.index + '"]')
            console.log(selectedItem)
            if (selectedCheckbox.length != 0) {
                // productIdInput.value = selectedItem.querySelector('.product-id').textContent
                var oldEmail = selectedItem.querySelector('.user-email').textContent
                userNameInput.value = selectedItem.querySelector('.user-name').textContent
                userEmailInput.value = selectedItem.querySelector('.user-email').textContent
                userPhoneInput.value = selectedItem.querySelector('.user-phone').textContent
                userPasswordInput.value = selectedItem.querySelector('.user-password').textContent
                userIsAdmin.value = selectedItem.querySelector('.user-isAdmin').textContent
                
                updateBtn.onclick = function (e) {
                    if (validates.isRequired(userNameInput)
                        && validates.isRequired(userEmailInput) && validates.isEmail(userEmailInput)
                        && validates.isRequired(userPhoneInput) && validates.isTel(userPhoneInput) && validates.isRequired(userPasswordInput)
                        && validates.isPassword(userPasswordInput)
                    ) {
                        if(oldEmail != userEmailInput.value) {
                            fetch(usersApi + "?email=" + userEmailInput.value)
                            .then(res => res.json())
                            .then(users => {
                                if (users.length != 0) {
                                    userEmailInput.nextElementSibling.textContent = "Email đã tồn tại"
                                    userEmailInput.classList.add("invalid")
                                    userEmailInput.focus()
                                }else {
                                    var data = {
                                        "name": userNameInput.value,
                                        "email": userEmailInput.value,
                                        "phoneNumber": userPhoneInput.value,
                                        "password": userPasswordInput.value,
                                        "isAdmin": userIsAdmin.value
                                    }
                                    fetch(usersApi + '/' + selectedCheckbox.dataset.index, {
                                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                        headers: {
                                            'Content-Type': 'application/json'
                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        body: JSON.stringify(data) // body data type must match "Content-Type" header
                                    })
                                    .then( () => {
                                        window.location.reload()
                                    })
                                }
                            })
                        }
                        else {
                            var data = {
                                "name": userNameInput.value,
                                "email": userEmailInput.value,
                                "phoneNumber": userPhoneInput.value,
                                "password": userPasswordInput.value,
                                "isAdmin": userIsAdmin.value
                            }
                            fetch(usersApi + '/' + selectedCheckbox.dataset.index, {
                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                headers: {
                                    'Content-Type': 'application/json'
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify(data) // body data type must match "Content-Type" header
                            })
                            .then( () => {
                                window.location.reload()
                            })
                        }
                       
                        // selectedItem.querySelector('.user-name').textContent = userNameInput.value
                        // selectedItem.querySelector('.user-email').textContent = userEmailInput.value
                        // selectedItem.querySelector('.user-phone').textContent = userPhoneInput.value
                        // selectedItem.querySelector('.user-password').textContent = userPasswordInput.value
                        // selectedItem.querySelector('.user-isAdmin').textContent = userIsAdmin.value
                        

                        // userNameInput.value = ""
                        // userEmailInput.value = ""
                        // userPhoneInput.value = ""
                        // userPasswordInput.value = ""
                        // userIsAdmin.value = "True"
                        
                        // selectedCheckbox.checked = false
                        // formAddUser.classList.remove('isEditing')
                        // formAddUser.style.display = 'none'
                    }

                }
                formControls.forEach((formControl) => {
                    formControl.oninput = function () {
                        formControl.classList.remove('invalid')
                    }
                })
            }


        }

        deleteUserBtn.onclick = function () {
            var selectedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked')
            if (selectedCheckboxs.length == 0) {
                return;
            } else {
                selectedCheckboxs.forEach(selectedCheckbox => {
                    fetch(usersApi + "/" + selectedCheckbox.dataset.index, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    })
                    .then( () => {
                        window.location.reload()
                    })
                    // document.querySelector('.user-item[data-index="' + selectedCheckbox.dataset.index + '"]').remove()
                })
            }
        }

        searchBtn.onclick = function (e) {
            e.preventDefault()
            fetch(usersApi + "/" + "?search=" + searchInput.value)
                .then(res => res.json())
                .then(users => {
                    var htmls = users.map((user) => {
                        return `
                        <tr class="user-item" data-index=${user.id}>
                            <td><label for=""><input type="checkbox" class="select-checkbox" data-index=${user.id}></label>
                            <td><a href="" class ="user-id">${user.id}</a></td>
                            <td class="user-name">${user.name}</td>
                            <td class="user-email" colspan="2">${user.email}</td>
                            <td class="user-phone">${user.phoneNumber}</td>
                            <td class="user-password">${user.password}</td>
                            <td class="user-isAdmin">${user.isAdmin}</td>
                        </tr>
                    `

                    })
                    usersList.innerHTML = htmls.join('')
                })
        }
    })




