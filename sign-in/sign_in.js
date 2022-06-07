import validates from "../sign-up/validates.js";
var inputEmail = document.querySelector('#customer_email')
var inputPw = document.querySelector('#customer_password')
var btnLogin = document.querySelector('.btn-login')




btnLogin.onclick = function (e) {
    
    e.preventDefault();
    if(validates.isEmail(inputEmail) && validates.isPassword(inputPw)) {
        
        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/users")
            .then(res => res.json())
            .then(users => {
                var userAcc = users.find( user => {
                    return user.email === inputEmail.value
                })
                if(!userAcc) {
                    alert("Sai tài khoản")
                }else if(userAcc.password === inputPw.value) {
                    if(userAcc.isAdmin) {
                        window.location.href = '../admin/admin.html'
                    }else {
                        window.location.href = '../index.html'
                    }
                    
                    localStorage.setItem('login', JSON.stringify({ 'islogin': 'true' }))
                    localStorage.setItem('usersAccount', JSON.stringify(
                        {
                            'name': `${userAcc.name}`,
                            'email': `${userAcc.email}`,
                            'phoneNumber': `${userAcc.phoneNumber}`,
                            'password': `${userAcc.password}`,
                            'isAdmin': userAcc.isAdmin
                        }
                    ))
                }
            })
    }
}

inputPw.oninput = function() {
    inputPw.classList.remove('invalid')
}

inputEmail.oninput = function() {
    inputEmail.classList.remove('invalid')
}

inputPw.onblur = function() {
    validates.isPassword(inputPw)
}

inputEmail.onblur = function() {
    validates.isEmail(inputEmail)
}