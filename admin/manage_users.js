var addUserBtn = document.querySelector('.add-user-btn')
var updUserBtn = document.querySelector('.update-user-btn')
var deleteUserBtn = document.querySelector('.delete-user-btn')
var formAddUser = document.querySelector('.form-add-user')
addUserBtn.onclick = function(e) {
    e.preventDefault()
    formAddUser.style.display = 'block'
}