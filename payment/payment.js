import { Load } from "../js/load_user.js"


Load.start()

var user_email = document.querySelector('.user_email')
var userName = document.querySelector('.user_name')
var user = JSON.parse(sessionStorage.getItem('usersAccount'))
userName.value = user.name
user_email.value = user.email
var addressApi = "https://629c5b853798759975d46095.mockapi.io/api/user_address"
var addressSelection = document.querySelector('.address-selection')
var orderBtn = document.querySelector('.order-btn')
fetch(addressApi + "?user_id=" + user.id + "&sortBy=isDefault&order=desc")
    .then(res => res.json())
    .then(address => {
        if (address[0]) {
            document.querySelector('input[name="street"]').value = address[0].street
            document.querySelector('input[name="wards"]').value = address[0].wards
            document.querySelector('input[name="district"]').value = address[0].district
            document.querySelector('input[name="city"]').value = address[0].city
            var htmls = address.map((item) => {
                return `
                <option class="${item.isDefault ? "" : "isDefault"}">
                ${item.street}, ${item.wards}, ${item.district}, ${item.city}, VietNam
                </option>
                `
            })
            
            addressSelection.innerHTML = htmls.join('')
            addressSelection.onchange = function () {
                var addressSelected = addressSelection.value.split(',')

                document.querySelector('input[name="wards"]').value = addressSelected[1]
                document.querySelector('input[name="district"]').value = addressSelected[2]
                document.querySelector('input[name="city"]').value = addressSelected[3]
                document.querySelector('input[name="street"]').value = addressSelected[0]
            }
        }
    }
    )
var cartItems = JSON.parse(sessionStorage.getItem('cart-items'))["list-items"]
fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
    .then(res => res.json())
    .then((products) => {
        var totalProducts = 0;
        var totalPayment = 0;
        var totalPrice = 0;
        var htmls = cartItems.map((cartItem) => {
            totalProducts += Number(cartItem["quantity"])
            var product = products.find((product) => {
                return product.id == cartItem["product_id"]
            })
            totalPrice += Number(cartItem["quantity"] * product.price)

            return `
            <li class="d-flex product-item gap-3 mb-2">
                <div class="product-img position-relative " >
                    <img src="..${product.image}" alt="" class="border p-2 rounded " style="width: 50px">
                    <span class="product-quantity position-absolute">${cartItem["quantity"]}</span>
                </div>
                <div class="product-info me-5 ms-2" >
                    <h4 class="product-name" style="font-size: 14px">${product.name}</h4>
                    <h5 class="product-size" style="font-size: 12px">${cartItem["size"]}</h5>
                </div>
                <span>${product.price}</span>
            </li>
        `
        })
        document.querySelector('.total-quantity').textContent = totalProducts
        document.querySelector('.list-products').innerHTML = htmls.join('')
        document.querySelector('.total-price').innerHTML = totalPrice
        if (totalPrice > 500000) {
            document.querySelector('.ship-price').innerHTML = 0
        } else {
            document.querySelector('.ship-price').innerHTML = 30000
        }
        
        document.querySelector('.total-payment').textContent = totalPrice + Number(document.querySelector('.ship-price').textContent)
        return products
    })
    .then( (products)=> {
        orderBtn.onclick = function() {
            var productsList = cartItems.map( (cartItem) =>{
                var product = products.find( (product) => {
                    return product.id == cartItem["product_id"]
                })
                return {
                    productName : product.name,
                    productId : product.id,
                    productQuantity: cartItem["quantity"],
                    productSize: cartItem["size"],
                }
            })
            var date = new Date()
            
            var data = {
                "createdAt": `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                "address": addressSelection.value,
                "price": document.querySelector('.total-payment').textContent,
                "paymethod":"Thanh toán khi giao hàng",
                "shipmethod": "Chuyển phát nhanh",
                "user_id": user.id,
                "products": productsList,
                "shipStatus": "Chưa giao",
                "paymentStatus": "Chưa thanh toán"
            }
            fetch("https://629c5b853798759975d46095.mockapi.io/api/orders", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            })
            .then( (data) => data.json() )
            .then( (data) => {
                // console.log(data)
                alert("Đặt hàng thành công")
                sessionStorage.setItem('cart-items', JSON.stringify({
                    "list-items" : []
                }))
                window.location.href = "../cart_shopping/cart_shopping.html"
            })
            
        }
    })
