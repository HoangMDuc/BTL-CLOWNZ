import validates from "../sign_up/validates.js"
var updateBtn = document.querySelector('.update-btn')

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
var closeDetailBtn = document.querySelector('.x-close')
var detailForm = document.querySelector('.detail-form-container')
var formControls = formAddOrder.querySelectorAll('.form-control:not(select)')
var ordersApi = "https://629c5b853798759975d46095.mockapi.io/api/orders"

var logoutBtn = document.querySelector('.log-out')
logoutBtn.onclick = function () {
    sessionStorage.setItem('login', { 'islogin': false })
}

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
    .then(product => {
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
                
                <td class="createdAt">${order.createdAt}</td>
                <td class="order-price">${order.price}</td>
                <td class="order-paymethod">${order.paymethod}</td>
                <td class="order-shipmethod">${order.shipmethod}</td>
                <td class="order-paymentStatus">${order.paymentStatus}</td>
                <td class="order-shipStatus">${order.shipStatus}</td>
                <td class="view-order-detail" data-index=${order.id}>Xem chi tiết</td>
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
                } else if (checkedItem.length > 1) {
                    updateOrderBtn.setAttribute('disabled', null)
                    deleteOrderBtn.removeAttribute('disabled')
                } else if (checkedItem.length == 0) {
                    updateOrderBtn.setAttribute('disabled', null)
                    deleteOrderBtn.setAttribute('disabled', null)
                }
            }
        })

        var viewDetailBtns = document.querySelectorAll('.view-order-detail')
        viewDetailBtns.forEach(viewDetailBtn => {
            viewDetailBtn.onclick = function () {
                detailForm.style.display = 'block';

                var selectedItem = document.querySelector('.order-item[data-index="' + viewDetailBtn.dataset.index + '"]')
                document.querySelector('#order-id').textContent = selectedItem.querySelector('.order-id').textContent
                document.querySelector('#createdAt').textContent = selectedItem.querySelector('.createdAt').textContent
                document.querySelector('#user-id').textContent = selectedItem.querySelector('.user-id').textContent
                document.querySelector('#address').textContent = selectedItem.querySelector('.user-address').textContent
                document.querySelector('#shipmethod').textContent = selectedItem.querySelector('.order-shipmethod').textContent
                document.querySelector('#paymethod').textContent = selectedItem.querySelector('.order-paymethod').textContent
                document.querySelector('#shipStatus').textContent = selectedItem.querySelector('.order-shipStatus').textContent
                document.querySelector('#paymentStatus').textContent = selectedItem.querySelector('.order-paymentStatus').textContent
                
                fetch(ordersApi + '/' + viewDetailBtn.dataset.index)
                    .then(res => res.json())
                    .then(order => {
                        var totalPrice = 0
                        var listProduct = order.products.map((product,index) => {
                            totalPrice += Number(product.productPrice) * Number(product.productQuantity)
                            return `
                            <tr>
                                <td class="center">${index}</td>
                                <td class="left strong">${product.productId}</td>
                                <td class="left">${product.productName}</td>
                                <td>${product.productSize}</td>
                                <td class="right">${product.productPrice}</td>
                                <td class="center">${product.productQuantity}</td>
                                <td class="right">${Number(product.productPrice) * Number(product.productQuantity)}</td>
                            </tr>
                        `
                        })
                        
                        document.querySelector('.products-list-body').innerHTML = listProduct.join('')
                        document.querySelector('.products-list-body').innerHTML +=    `
                            <tr>
                                <td class="center"></td>
                                <td class="left strong"></td>
                                <td class="left"></td>
                                <td></td>
                                <td class="right"></td>
                                <td class="center"><h5>Tổng tiền:</h5></td>
                                <td class="right">${totalPrice}</td>
                            </tr>`
                    })
            }
        })

        closeDetailBtn.onclick = function () {
            detailForm.style.display = 'none';
        }
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
                            .then(res => res.json())
                            .then(product => {
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
                        .then(() => {
                            window.location.reload()
                        })
                    // document.querySelector('.order-item[data-index="' + selectedCheckbox.dataset.index + '"]').remove()
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




    // [
    //     {
    //       "name": "Z-BOT CAPSULE",
    //       "products_quantity": 4,
    //       "image": "/img/z-bot capsule/banner.webp",
    //       "parent_category_id" : null,
    //       "id": "1"
    //     },
    //     {
    //       "name": "YOUNG/WILD N'TRIPPY",
    //       "products_quantity": 1,
    //       "image": "/img/young_wild n-trippy/banner.webp",
    //       "parent_category_id" : null,
    //       "id": "2"
    //     },
    //     {
    //       "name": "TOP",
    //       "products_quantity": 1,
    //       "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //       "parent_category_id" : null,
    //       "id": "3"
    //     },
    //     {
    //       "name": "BOTTOM",
    //       "products_quantity": 5,
    //       "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //       "parent_category_id" : null,
    //       "id": "4"
    //     },
    //     {
    //       "name": "ACESSORY",
    //       "products_quantity": 4,
    //       "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //       "parent_category_id" : null,
    //       "id": "5"
    //     },
    //     {
    //       "name": "NEW ARRIVAL",
    //       "products_quantity": 10,
    //       "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //       "parent_category_id" : null,
    //       "id": "6"
    //     },
    //     {
    //         "name": "T-shirt",
    //         "id": "7",
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "parent_category_id" : 3,
    //         "products_quantity": 0
    //       },
    //       {
    //         "name": "Shirt",
    //         "id": "8",
    //         "parent_category_id" : 3,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 3
    //       },
    //       {
    //         "name": "Hoodie",
    //         "id": "9",
    //         "parent_category_id" : 3,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 0
    //       },
    //       {
    //         "name": "Jacket",
    //         "id": "10",
    //         "parent_category_id" : 3,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 2
    //       },
    //       {
    //         "name": "Sweetshirt",
    //         "id": "11",
    //         "parent_category_id" : 3,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 3
    //       },
    //       {
    //         "name": "Pants",
    //         "id": "12",
    //         "parent_category_id" : 4,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 3
    //       },
    //       {
    //         "name": "Jeans adn Denim",
    //         "id": "13",
    //         "parent_category_id" : 4,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 0
    //       },
    //       {
    //         "name": "Bag",
    //         "id": "14",
    //         "parent_category_id" : 5,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 2
    //       },
    //       {
    //         "name": "Hat",
    //         "id": "15",
    //         "parent_category_id" : 5,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 2
    //       },
    //       {
    //         "name": "Backpack",
    //         "id": "16",
    //         "parent_category_id" : 5,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 0
    //       },
    //       {
    //         "name": "Others",
    //         "id": "17",
    //         "parent_category_id" : 5,
    //         "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //         "products_quantity": 0
    //       }
    //   ]

    // [
    //     {
    //      "name": "C LETTER T-SHIRT",
    //      "price": 379000,
    //      "quantity": 55,
    //      "image": "/img/top/tshirts/c-letter.webp",
    //      "category_id": 7,
    //      "date": "date 2",
    //      "title": "TEES AND POLO SHIRTS",
    //      "description": "",
    //      "id": "2"
    //     },
    //     {
    //      "name": "CLOWNZ SKULL T_SHIRT",
    //      "price": 349000,
    //      "quantity": 60,
    //      "image": "/img/top/tshirts/sp1.2.jpg",
    //      "category_id": 7,
    //      "date": "date 3",
    //      "title": "TEES AND POLO SHIRTS",
    //      "description": "",
    //      "id": "3"
    //     },
    //     {
    //      "name": "CLOWNZ LEO PARTSHIRT",
    //      "price": 399000,
    //      "quantity": "19",
    //      "image": "/img/top/shirts/sp4.1.jpg",
    //      "category_id": 8,
    //      "date": "16-6-2022",
    //      "title": "SƠ MI & FLANNEL SHIRTS",
    //      "description": "Đây là sản phẩm có id  bằng 4",
    //      "id": "4"
    //     },
    //     {
    //      "name": "Z-BOT APOCALYPSE T-SHIRT",
    //      "price": 349000,
    //      "quantity": 96,
    //      "image": "/img/z-bot capsule/sp1.webp",
    //      "category_id": 8,
    //      "date": "date 5",
    //      "title": "TEES AND POLO SHIRTS",
    //      "description": "",
    //      "id": "5"
    //     },
    //     {
    //      "name": "DIAMOND Z-BOT T-SHIRT",
    //      "price": 349000,
    //      "quantity": 63,
    //      "image": "/img/z-bot capsule/sp2.webp",
    //      "category_id": 8,
    //      "date": "date 6",
    //      "title": "TEES AND POLO SHIRTS",
    //      "description": "",
    //      "id": "6"
    //     },
    //     {
    //      "name": "CLOWNZ GOOD VIBE T-SHIRT",
    //      "price": 379000,
    //      "quantity": 33,
    //      "image": "/img/young_wild n-trippy/sp1.webp",
    //      "category_id": 8,
    //      "date": "date 7",
    //      "title": "TEES & POLO SHIRTS",
    //      "description": "",
    //      "id": "7"
    //     },
    //     {
    //      "name": "CLOWNZ LEOPARD PANTS",
    //      "price": 349000,
    //      "quantity": 16,
    //      "image": "/img/bottom/pants/sp3.1.png",
    //      "category_id": 13,
    //      "date": "date 8",
    //      "title": "SHORTS AND TRUNKS",
    //      "description": "desc1",
    //      "id": "8"
    //     },
    //     {
    //      "name": "CLOWNZ CRYSTAL CLEAR MINI BAG",
    //      "price": 399000,
    //      "quantity": 16,
    //      "image": "/img/accessory/bag/sp1.jpg",
    //      "category_id": 14,
    //      "date": "date 9",
    //      "title": "TÚI CHÉO",
    //      "description": "",
    //      "id": "9"
    //     },
    //     {
    //      "name": "CLOWNZ RACING FLAMES JEANS",
    //      "price": 649000,
    //      "quantity": 16,
    //      "image": "/img/bottom/jeans&denim/1-13.jpg",
    //      "category_id": 13,
    //      "date": "date 10",
    //      "title": "PANTS AND JEANS",
    //      "description": "",
    //      "id": "10"
    //     },
    //     {
    //      "name": "CLOWNZ RACING FLAMES WIND PANTS",
    //      "price": 399000,
    //      "quantity": 16,
    //      "image": "/img/bottom/pants/24.jpg",
    //      "category_id": 11,
    //      "date": "date 11",
    //      "title": "PANTS AND JEANS",
    //      "description": "",
    //      "id": "11"
    //     },
    //     {
    //      "name": "FINISH LINE TRACK PANTS",
    //      "price": 449000,
    //      "quantity": 16,
    //      "image": "/img/bottom/pants/sp5.1.jpg",
    //      "category_id": 12,
    //      "date": "date 12",
    //      "title": "PANTS AND JEANS",
    //      "description": "",
    //      "id": "12"
    //     },
    //     {
    //      "name": "CLONWZ UTILITY CROSSBAG",
    //      "price": 449000,
    //      "quantity": 16,
    //      "image": "/img/accessory/bag/sp1.webp",
    //      "category_id": 13,
    //      "date": "date 13",
    //      "title": "TÚI CHÉO",
    //      "description": "",
    //      "id": "13"
    //     },
    //     {
    //      "name": "CLONWZ C LETTER CAP",
    //      "price": 299000,
    //      "quantity": 16,
    //      "image": "/img/accessory/hat/c-letter-cap.webp",
    //      "category_id": 13,
    //      "date": "date 14",
    //      "title": "CAPS",
    //      "description": "",
    //      "id": "14"
    //     },
    //     {
    //      "name": "CLONWZ SPORTY CAP",
    //      "price": 299000,
    //      "quantity": 16,
    //      "image": "/img/accessory/hat/sporty-cap.png",
    //      "category_id": 14,
    //      "date": "date 15",
    //      "title": "CAPS",
    //      "description": "",
    //      "id": "15"
    //     },
    //     {
    //      "name": "áo mùa hè",
    //      "price": "299000",
    //      "quantity": "15",
    //      "image": "/img/top/hoodie/sp1.1.jpg",
    //      "category_id": 1,
    //      "title": "mùa hè",
    //      "date": "19-6-2022",
    //      "description": "mùa hè ",
    //      "id": "18"
    //     },
    //     {
    //      "name": "áo đẹp",
    //      "price": "390000",
    //      "quantity": "16",
    //      "image": "/img/top/shirts/sp6.1.jpg",
    //      "category_id": 12,
    //      "title": "Nice áo",
    //      "date": "19-6-2022",
    //      "description": "áo good",
    //      "id": "19"
    //     },
    //     {
    //      "name": "Quần cute của bé Duy",
    //      "price": "1000000",
    //      "quantity": "10",
    //      "image": "/img/bottom/pants/quancuabeduy.png",
    //      "category_id": 13,
    //      "title": "Quần của bé Duy siêu xinh xắn",
    //      "date": "19-6-2022",
    //      "description": "Quần của bé Duy đã từng mặc",
    //      "id": "20"
    //     }
    //    ]


