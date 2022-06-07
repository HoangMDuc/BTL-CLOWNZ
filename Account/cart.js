import { Load } from "../js/load_user.js";
Load.start()
var userName = document.querySelector('.user_name')

const App = {
    start() {
        this.loadUserInfo() 
    },
    loadUserInfo() {
        var user = JSON.parse(localStorage.getItem('usersAccount'))
      
            userName.textContent = user.name
        
        
        //  greeting.textContent += user.name
    }
}

App.start()