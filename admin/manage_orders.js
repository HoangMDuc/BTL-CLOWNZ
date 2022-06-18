import validates from "../sign_up/validates.js"

var addBtn = document.querySelector('.add-btn')
var updateBtn = document.querySelector('.update-btn')
var addOrderBtn = document.querySelector('.add-order-btn')
var updateOrderBtn = document.querySelector('.update-order-btn')
var deleteOrderBtn = document.querySelector('.delete-order-btn')
var cancelBtn = document.querySelector('.cancel-btn')
var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-input')
var formAddOrder = document.querySelector('.form-add-order')
var productQuantityInput = document.querySelector('.form-control.product-quantity')
var orderPriceInput = document.querySelector('.form-control.order-price')
var productPriceInput = document.querySelector('.form-control.product-price')
var orderUserIdSelect = document.querySelector('.form-control.order-user-id')
var orderAddress = document.querySelector('.order-address')
var orderProductIdSelect = document.querySelector('.order-products-id')
var productSizeInput = document.querySelector('.product-size')
var paymethod = document.querySelector('.paymethod')
var shipmethod = document.querySelector('.shipmethod')
var paymentStatus = document.querySelector('.paymentStatus')
var shipStatus = document.querySelector('.shipStatus')

var formControls = formAddOrder.querySelectorAll('.form-control:not(select)')
var ordersApi = "https://629c5b853798759975d46095.mockapi.io/api/orders"


document.querySelector('.user_name').textContent = JSON.parse(sessionStorage.getItem('usersAccount'))["name"]
fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/users")
    .then(res => res.json())
    .then(users => {
        var htmls = users.map(user => {
            return `
            <option>${user.id}</option>
            `
        })
        orderUserIdSelect.innerHTML = htmls.join('')
        return users[0].id
    })
    .then((id) => {
        fetch("https://629c5b853798759975d46095.mockapi.io/api/user_address?user_id=" + id)
            .then(res => res.json())
            .then(userAddress => {
                var htmls = userAddress.map(address => {
                    return `
                <option>${address.street}, ${address.wards}, ${address.district}, ${address.city},</option>
                `
                })
                orderAddress.innerHTML = htmls.join('')
            })


    })
fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
    .then(res => res.json())
    .then(products => {
        var htmls = products.map(product => {
            return `
        <option value="${product.id}">${product.id}</option>
        `
        })
        orderProductIdSelect.innerHTML = htmls.join('')
        return products[0]
    })
    .then( product => {
        productPriceInput.value = product.price
    })

orderUserIdSelect.onchange = function () {

    fetch("https://629c5b853798759975d46095.mockapi.io/api/user_address?user_id=" + orderUserIdSelect.value)
        .then(res => res.json())
        .then(userAddress => {
            var htmls = userAddress.map(address => {
                return `
                <option>${address.street}, ${address.wards}, ${address.district}, ${address.city},</option>
                `
            })
            orderAddress.innerHTML = htmls.join('')
        })
}


orderProductIdSelect.onchange = function () {
    orderPriceInput.value = ""
    productPriceInput.value = ""
    productQuantityInput.value = ""
    var option = orderProductIdSelect.querySelector('option:checked')


    if (option) {
        // console.log
        var productId = option.textContent;
        productQuantityInput.removeAttribute('readonly')
        productSizeInput.removeAttribute('readonly')
        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products/" + productId)
            .then(res => res.json())
            .then(product => {
                productPriceInput.value = ` ${product.price}`
            })
    } else {
        productQuantityInput.setAttribute('readonly', null)
        productSizeInput.setAttribute('readonly', null)
    }



}


productQuantityInput.onchange = function () {
    var price = productPriceInput.value
    var quantity = productQuantityInput.value
    var totalPrice = 0;
    if (Number.parseInt(quantity)) {
        totalPrice += Number(quantity) * Number(price)
    } else {
        alert("Nhập sai dữ liệu")
    }

    orderPriceInput.value = totalPrice
}

productSizeInput.onchange = function () {
    if (!['M', 'L', 'XL', 'XXL'].includes(productSizeInput.value.trim())) {
        alert("Nhập sai dữ liệu")
    }

}



addOrderBtn.onclick = function (e) {
    e.preventDefault()
    formAddOrder.style.display = 'block'
    addBtn.onclick = function () {
        if (
            validates.isRequired(productQuantityInput) && validates.isRequired(productPriceInput)
            && validates.isRequired(productSizeInput) && validates.isRequired(orderPriceInput)

        ) {

            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products/" + orderProductIdSelect.value)
                .then(res => res.json())
                .then(product => {
                    var date = new Date()
                    var data = {
                        "createdAt": date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
                        "address": orderAddress.value,
                        "price": orderPriceInput.value,
                        "paymethod": paymethod.value,
                        "shipmethod": shipmethod.value,
                        "user_id": orderUserIdSelect.value,
                        "products": [{
                            "productName": product.name,
                            "productId": orderProductIdSelect.value,
                            "productQuantity": productQuantityInput.value,
                            "productSize": productSizeInput.value
                        }],
                        "shipStatus": shipStatus.value,
                        "paymentStatus": paymentStatus.value
                    }
                    fetch(ordersApi, {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify(data) // body data type must match "Content-Type" header
                    })
                        .then(() => {
                            window.location.reload()
                        })

                })

        }
    }

    formControls.forEach((formControl) => {
        formControl.oninput = function () {
            formControl.classList.remove('invalid')
        }
    })
}

searchInput.oninput = function () {
    if (searchInput.value.length > 0) {
        searchBtn.removeAttribute('disabled')
    } else {
        searchBtn.setAttribute('disabled', null)
    }
}



cancelBtn.onclick = function () {
    formAddOrder.classList.remove('isEditing')
    formAddOrder.style.display = 'none'
    orderPriceInput.value = ""
    productQuantityInput.value = ""
    productSizeInput.value = ""
    productPriceInput.value = ""
}
var ordersList = document.querySelector('.orders-list')

fetch(ordersApi)
    .then(res => res.json())
    .then(orders => {
        var htmls = orders.map((order) => {
            var shoppingItems = order.products.map(product => {
                return `
                <li class="list-group-item p-0" data-index=${product.productId}>
                <div class="ms-2 me-auto d-flex list__item" >
                    <div class="fw-bold">
                        <span class="product-name">${product.productName}</span>
                        (
                            <span class="product-size">${product.productSize}</span>
                        )
                    </div>
                    <div class="badge bg-primary rounded-pill product-quantity">
                        ${product.productQuantity}
                    </div>
                </div>
                
            </li>
                `
            })

            return `
            <tr class="order-item" data-index=${order.id}>
                <td><label for=""><input type="checkbox" class="select-checkbox"data-index=${order.id} ></label></td>
                <td class="order-id" data-index=${order.id}>${order.id}</td>
                <td ><a href="" class ="user-id">${order.user_id}</a></td>
                <td class="user-address">${order.address}</td>
                <td colspan="2">
                    <ol class="list-group list-group-flush fw-light">
                        ${shoppingItems.join('')}
                    </ol>
                </td>
                <td>${order.createdAt}</td>
                <td class="order-price">${order.price}</td>
                <td class="order-paymethod">${order.paymethod}</td>
                <td class="order-shipmethod">${order.shipmethod}</td>
                <td class="order-paymentStatus">${order.paymentStatus}</td>
                <td class="order-shipStatus">${order.shipStatus}</td>
            </tr>
            `

        })
        ordersList.innerHTML = htmls.join('')

    })
    .then(() => {
        var checkboxs = document.querySelectorAll('.select-checkbox')
        checkboxs.forEach((checkbox) => {
            checkbox.onclick = function () {
                // var checked
                var checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
                if (checkedItem.length == 1) {
                    updateOrderBtn.removeAttribute('disabled')
                    deleteOrderBtn.removeAttribute('disabled')
                    addOrderBtn.setAttribute('disabled', null)
                } else if (checkedItem.length > 1) {
                    updateOrderBtn.setAttribute('disabled', null)
                    deleteOrderBtn.removeAttribute('disabled')
                    addOrderBtn.setAttribute('disabled', null)
                } else if (checkedItem.length == 0) {
                    updateOrderBtn.setAttribute('disabled', null)
                    deleteOrderBtn.setAttribute('disabled', null)
                    addOrderBtn.removeAttribute('disabled')
                }
            }
        })
        updateOrderBtn.onclick = function (e) {
            e.preventDefault()
            formAddOrder.classList.add('isEditing')
            formAddOrder.style.display = 'block'

            var selectedCheckbox = document.querySelector('input[type="checkbox"]:checked')
            var selectedItem = document.querySelector('.order-item[data-index="' + selectedCheckbox.dataset.index + '"]')
            if (selectedCheckbox.length != 0) {
                // productIdInput.value = selectedItem.querySelector('.product-id').textContent
                // orderUserIdSelect.value = selectedItem.querySelector('.user-id').textContent


                // productQuantityInput.value = selectedItem.querySelector('.product-quantity').textContent
                // productSizeInput.value = selectedItem.querySelector('.product-size').textContent
                // orderPriceInput.value = selectedItem.querySelector('.order-price').textContent
                // shipmethod.value = selectedItem.querySelector('.order-shipmethod').textContent
                // paymethod.value = selectedItem.querySelector('.order-paymethod').textContent
                // shipStatus.value = selectedItem.querySelector('.order-shipStatus').textContent
                // paymentStatus.value = selectedItem.querySelector('.order-paymentStatus').textContent

                updateBtn.onclick = function (e) {
                    if (validates.isRequired(productQuantityInput) && validates.isRequired(productPriceInput)
                        && validates.isRequired(productSizeInput) && validates.isRequired(orderPriceInput)
                    ) {
                        var date = new Date()
                        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products/" + orderProductIdSelect.value)
                        .then ( res => res.json())
                        .then (product => {
                            var data = {
                                "createdAt": date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
                                "address": orderAddress.value,
                                "price": orderPriceInput.value,
                                "paymethod": paymethod.value,
                                "shipmethod": shipmethod.value,
                                "user_id": orderUserIdSelect.value,
                                "products": [{
                                    "productName": product.name,
                                    "productId": orderProductIdSelect.value,
                                    "productQuantity": productQuantityInput.value,
                                    "productSize": productSizeInput.value
                                }],
                                "shipStatus": shipStatus.value,
                                "paymentStatus": paymentStatus.value
                            }
                            fetch(ordersApi + '/' + selectedCheckbox.dataset.index, {
                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                headers: {
                                    'Content-Type': 'application/json'
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify(data) // body data type must match "Content-Type" header
                            })
                            .then( () => {
                                window.location.reload()
                            })
                        })
                        
                        
                    }

                }
                formControls.forEach((formControl) => {
                    formControl.oninput = function () {
                        formControl.classList.remove('invalid')
                    }
                })
            }


        }

        deleteOrderBtn.onclick = function () {
            var selectedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked')
            if (selectedCheckboxs.length == 0) {
                return;
            } else {
                selectedCheckboxs.forEach(selectedCheckbox => {
                    fetch(ordersApi + "/" + selectedCheckbox.dataset.index, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    })
                    document.querySelector('.order-item[data-index="' + selectedCheckbox.dataset.index + '"]').remove()
                })
            }
        }

        searchBtn.onclick = function (e) {
            e.preventDefault()
            fetch(ordersApi + "/" + "?search=" + searchInput.value)
                .then(res => res.json())
                .then(orders => {
                    var htmls = orders.map((order) => {
                        var shoppingItems = order.products.map(product => {
                            return `
                            <li class="list-group-item p-0">
                            <div class="ms-2 me-auto d-flex list__item">
                                <div class="fw-bold">
                                    <span>${product.productName}</span>
                                    (
                                        <span>${product.productSize}</span>
                                    )
                                </div>
                                <div class="badge bg-primary rounded-pill">
                                    ${product.productQuantity}
                                </div>
                            </div>
                            
                        </li>
                            `
                        })

                        return `
                        <tr class="order-item" data-index=${order.id}>
                            <td><label for=""><input type="checkbox" class="select-checkbox"data-index=${order.id} ></label></td>
                            <td class="order-id" data-index=${order.id}>${order.id}</td>
                            <td ><a href="" class ="user-id">${order.user_id}</a></td>
                            <td class="user-address">${order.address}</td>
                            <td colspan="2">
                                <ol class="list-group list-group-flush fw-light">
                                    ${shoppingItems.join('')}
                                </ol>
                            </td>
                            <td>${order.createdAt}</td>
                            <td>${order.price}</td>
                            <td>${order.paymethod}</td>
                            <td>${order.shipmethod}</td>
                            <td>${order.paymentStatus}</td>
                            <td>${order.shipStatus}</td>
                        </tr>
                        `


                    })
                    ordersList.innerHTML = htmls.join('')
                })
        }
    })




