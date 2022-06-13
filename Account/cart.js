import { Load } from "../js/load_user.js";
import renderCart from "../js/renderCart.js"
import handleClickCategory from "../js/clickCategory.js"
import handleClickType from "../js/clickType.js"

Load.start()
renderCart()

var userName = document.querySelector('.user_name')

const App = {
    start() {
        this.loadUserInfo() 
    },
    loadUserInfo() {
        var user = JSON.parse(sessionStorage.getItem('usersAccount'))
      
            userName.textContent = user.name
        
        
        //  greeting.textContent += user.name
    }
}

App.start()

handleClickCategory()
handleClickType()
