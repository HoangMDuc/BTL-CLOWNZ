import { Load } from "../js/load_user.js";
import renderCart from "../js/renderCart.js";
import validates from "../sign_up/validates.js"
import handleClickCategory from "../js/clickCategory.js"
import renderMenu from "../js/renderMenu.js";
renderCart()
renderMenu()
.then( () => {
    handleClickCategory()
})

Load.start()
var usersApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/users";
var userName = document.querySelector('.user_name')
var oldPw = document.querySelector('input[name="OldPassword"]')
var newPw = document.querySelector('input[name="Password"]')
var confirmPw = document.querySelector('input[name="ConfirmPassword"]')
var resetPwBtn = document.querySelector('.reset-pw')
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

oldPw.onblur = function() {
    validates.isPassword(oldPw)
}

newPw.onblur = function() {
    validates.isPassword(newPw)

}

confirmPw.onblur = function() {
    validates.isPassword(confirmPw)
    validates.isConfirmPassword(newPw,confirmPw)
}

oldPw.oninput = function() {
    oldPw.classList.remove('invalid')
}

newPw.oninput = function() {
    newPw.classList.remove('invalid')
}

confirmPw.oninput = function() {
    confirmPw.classList.remove('invalid')
}

resetPwBtn.onclick = function(e) {
    e.preventDefault()
    if(validates.isPassword(oldPw) && validates.isPassword(newPw) && validates.isPassword(confirmPw)) {
        fetch(usersApi)
            .then(res => res.json())
            .then(users => {
                users.forEach( user => {
                    if(user.email == JSON.parse(localStorage.getItem('usersAccount'))["email"]) {
                        if(user.password === oldPw.value) {
                            var user1 = {
                                'name': `${user.name}`,
                                'email': `${user.email}`,
                                'phoneNumber': `${user.phoneNumber}`,
                                'password': `${newPw.value}`,
                                'isAdmin': user.isAdmin
                            }
                            localStorage.setItem('usersAccount', JSON.stringify(user1))
                            var option = {
                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                headers: {
                                  'Content-Type': 'application/json'
                                  // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify(user1) 
                            }
                            fetch(usersApi + '/' + user.id,option) 
                            .then(function(response){
                                return response.json()
                            })
                            .then(res => {
                                alert("Đã cập nhật mật khẩu")
                            })
                        }
                        else {
                            alert('Mật khẩu hiện tại không đúng');
                        }
                    }
                    
                })
            })
    }
    
}


