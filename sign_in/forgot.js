
var usersApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/users";
var retrievalBtn = document.querySelector('.pw-retrieval')
var inputEmail = document.querySelector('input[name="Email"]')
import validates from "../sign_up/validates.js";
import handleClickType from "../js/clickType.js"
import handleClickCategory from "../js/clickCategory.js"
handleClickCategory()
handleClickType()
retrievalBtn.onclick = function (e) {
    e.preventDefault();
    if(validates.isEmail(inputEmail)) {
        fetch(usersApi)
            .then(res => res.json())
            .then(users => {
                var user1 = users.find( user => {
                    return user.email === inputEmail.value
                })
                if(user1) {
                    alert(user1.password)
                    inputEmail.value = ""
                }else {
                    alert("Không có tài khoản cần tìm")
                }
            })
    }


}

inputEmail.oninput = function () {
    inputEmail.classList.remove('invalid')
}

inputEmail.onblur = function() {
    validates.isEmail(inputEmail)
}