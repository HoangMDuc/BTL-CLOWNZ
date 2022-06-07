import { Load } from "../js/load_user.js";
Load.start()

var userNames = document.querySelectorAll('.user_name')
var user_email = document.querySelector('.user_email')

const App = {
    start() {
        this.loadUserInfo() 
    },
    loadUserInfo() {
        var user = JSON.parse(localStorage.getItem('usersAccount'))
        userNames.forEach( userName => {
            userName.textContent = user.name
        })
        user_email.textContent = user.email
        //  greeting.textContent += user.name
    }
}

App.start()