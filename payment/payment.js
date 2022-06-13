import { Load } from "../js/load_user.js"


Load.start()

var user_email = document.querySelector('.user_email')
var userName = document.querySelector('.user_name')
var user = JSON.parse(sessionStorage.getItem('usersAccount'))
userName.value = user.name
user_email.value = user.email