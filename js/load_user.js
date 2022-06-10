var loginBtn = document.querySelector('.log-in')
var logoutBtn = document.querySelector('.log-out')

const Load = {
    start() {
        if (JSON.parse(sessionStorage.getItem('login')) == 'true') {
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
        }
        this.handleEvents()

    },
    handleEvents() {
        logoutBtn.onclick = function () {
            sessionStorage.setItem('login', { 'islogin': false })
        }
    }
}



export { Load }