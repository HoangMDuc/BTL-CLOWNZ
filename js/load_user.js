var loginBtn = document.querySelector('.log-in')
var logoutBtn = document.querySelector('.log-out')
var account = document.querySelector('.account')
var loginMessage = document.querySelector('.login-message')
var user = JSON.parse(sessionStorage.getItem('usersAccount'))
const Load = {
    start() {
        if (sessionStorage.getItem('login') != null) {
            if(JSON.parse(sessionStorage.getItem('login'))== 'true') {
                loginBtn.style.display = "none";
                account.style.display = "block";
                var names = user.name.split(' ')
                loginMessage.textContent = "Xin chào " + names[names.length-1]
            }
            
        }
        this.handleEvents()

    },
    handleEvents() {
        logoutBtn.onclick = function (e) {
            // e.preventDefault()
            sessionStorage.setItem('login', JSON.stringify('false'))
            sessionStorage.setItem('usersAccount', JSON.stringify(
                {
                   
                }
            ))
            
        }
    }
}



export { Load }