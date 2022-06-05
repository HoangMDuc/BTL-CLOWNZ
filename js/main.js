var loginBtn = document.querySelector('.log-in')
var logoutBtn = document.querySelector('.log-out')

const App = {
    start() {
        if(JSON.parse(localStorage.getItem('login'))["islogin"] == 'true') {
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
        }
        this.handleEvents()
    },
    handleEvents() {
        logoutBtn.onclick  = function () {
            localStorage.setItem('login',{'islogin': false})
        }
    }
}

App.start()