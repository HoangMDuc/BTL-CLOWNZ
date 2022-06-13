import { Load } from "../js/load_user.js";
Load.start()
import handleClickCategory from "../js/clickCategory.js";
import handleClickType from "../js/clickType.js";

var userNames = document.querySelectorAll('.user_name')
var user_email = document.querySelector('.user_email')
import renderCart  from "../js/renderCart.js";
renderCart()

const App = {
    start() {
        this.loadUserInfo() 
    },
    loadUserInfo() {
        var user = JSON.parse(sessionStorage.getItem('usersAccount'))
        userNames.forEach( userName => {
            userName.textContent = user.name
        })
        user_email.textContent = user.email
        //  greeting.textContent += user.name
    }
}



App.start()
handleClickCategory()
handleClickType()