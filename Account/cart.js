import { Load } from "../js/load_user.js";
import renderCart from "../js/renderCart.js"
import handleClickCategory from "../js/clickCategory.js"
import handleClickType from "../js/clickType.js"

Load.start()
renderCart()

var userName = document.querySelector('.user_name')
var user = JSON.parse(sessionStorage.getItem('usersAccount'))
const App = {
    start() {
        this.loadUserInfo()
    },
    loadUserInfo() {


        userName.textContent = user.name


        //  greeting.textContent += user.name
    }
}

App.start()

handleClickCategory()
handleClickType()


fetch("https://629c5b853798759975d46095.mockapi.io/api/orders?user_id=" + user.id)
    .then(res => res.json())
    .then((orders) => {
        var htmls = orders.map(order => {
            return `
            <tr>
                <td>${order.id}</td>
                <td>${order.createdAt}</td>
                <td>${order.address}</td>
                <td>${order.price}</td>
                <td>${order.paymentStatus}</td>
                <td>${order.shipStatus}</td>
            </tr>
            `
        })
        document.querySelector('.orders-list').innerHTML = htmls.join('')
    })