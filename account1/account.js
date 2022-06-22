import { Load } from "../js/load_user.js";
import renderCart  from "../js/renderCart.js";
import handleClickCategory from "../js/clickCategory.js";
import renderMenu from "../js/renderMenu.js";
Load.start()
var addressApi = "https://629c5b853798759975d46095.mockapi.io/api/user_address"
var userNames = document.querySelectorAll('.user_name')
var user_email = document.querySelector('.user_email')
renderMenu()
.then( () => {
    handleClickCategory()

})

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
       
        fetch(addressApi + "?user_id=" + user.id + "&sortBy=isDefault&order=desc&p=1&l=1")
        .then( res => res.json())
        .then( address => {
            
            if(address[0]) {
                
                var accountInfor = document.querySelector('.account-infor')
                
                accountInfor.innerHTML += `
                <p> <strong>Công ty:</strong> ${address[0].company}</p>
                <p> <strong>Địa chỉ:</strong> ${address[0].street}, ${address[0].wards}, ${address[0].district}, ${address[0].city}, Việt Nam</p>
                `
            }else {
                accountInfor.innerHTML += `
                <p>Bạn chưa điền địa chỉ</p>
                `
            }
        })
        //  greeting.textContent += user.name
    }
}



App.start()