import validates from "../sign_up/validates.js"

var addBtn = document.querySelector('.add-btn')
var updateBtn = document.querySelector('.update-btn')
var addProductBtn = document.querySelector('.add-product-btn')
var updateProductBtn = document.querySelector('.update-product-btn')
var deleteProductBtn = document.querySelector('.delete-product-btn')
var cancelBtn = document.querySelector('.cancel-btn')
var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-input')
var formAddProduct = document.querySelector('.form-add-product')
var productNameInput = document.querySelector('.form-control.product-name')
var productQuantityInput = document.querySelector('.form-control.product-quantity')
var productTitleInput = document.querySelector('.form-control.product-title')
var productDescriptionInput = document.querySelector('.form-control.product-description')
var productPriceInput = document.querySelector('.form-control.product-price')
var productCategory = document.querySelector('.form-control.product-category-id')
var productType = document.querySelector('.form-control.product-type-id')
var productImageInput = document.querySelector('.form-control.product-img')

var formControls = formAddProduct.querySelectorAll('.form-control:not(select)')
var productApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/products"


var logoutBtn = document.querySelector('.log-out')
logoutBtn.onclick = function () {
    sessionStorage.setItem('login', { 'islogin': false })
}



document.querySelector('.user_name').textContent = JSON.parse(sessionStorage.getItem('usersAccount'))["name"]
fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
    .then(res => res.json())
    .then(categories => {
        var htmls = categories.map(category => {
            return `
            <option>${category.id}</option>
            `
        })
        document.querySelector('#category').innerHTML = htmls.join('')
    })



addProductBtn.onclick = function (e) {
    e.preventDefault()
    formAddProduct.style.display = 'block'
    addBtn.onclick = function () {
        if (validates.isRequired(productNameInput)
            && validates.isRequired(productQuantityInput) && validates.isRequired(productPriceInput)
            && validates.isRequired(productTitleInput) && validates.isRequired(productImageInput)
            && validates.isRequired(productDescriptionInput)
        ) {
            var date = new Date()
            var categoryId = productCategory.value
            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
                .then(res => res.json())
                .then(categories => {
                    var categoryItem = categories.find((category) => {
                        return categoryId == category.id
                    })
                    if (categoryItem.parent_category_id != 'undefined') {
                        var id = Number(categoryId)
                        var parentCategoryId = [id]
                        var parentCategoryId = [id]

                        while (id != undefined) {
                            var category = categories.find(category => {
                                return category.id == id
                            })
                            if (category != undefined) {
                                if (category.parent_category_id != null) {
                                    parentCategoryId.push(category.parent_category_id)
                                    id = category.parent_category_id
                                } else {
                                    id = undefined
                                }
                            } else {
                                id = undefined
                            }
                        }
                        return parentCategoryId
                    } else {
                        return undefined
                    }
                })
                .then(parentCategoryIds => {
                    console.log(parentCategoryIds)
                    if (parentCategoryIds != undefined) {
                        parentCategoryIds.forEach((parentCategoryId) => {
                            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId)
                                .then(res => res.json())
                                .then(category => {
                                    var categoryData = {
                                        "products_quantity": category.products_quantity + 1
                                    }
                                    console.log(categoryData.products_quantity)
                                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId, {
                                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                        headers: {
                                            'Content-Type': 'application/json'
                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        body: JSON.stringify(categoryData)
                                    })
                                })

                        })
                    }

                })

            var data = {
                "name": productNameInput.value,
                "price": productPriceInput.value,
                "category_id": productCategory.value,
                "quantity": productQuantityInput.value,
                "image": productImageInput.value,
                "date": date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
                "title": productTitleInput.value,
                "description": productDescriptionInput.value
            }
            // fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories/")
            fetch(productApi, {
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
    formAddProduct.classList.remove('isEditing')
    formAddProduct.style.display = 'none'
    productImageInput.value = ""
    productDescriptionInput.value = ""
    productNameInput.value = ""
    productPriceInput.value = ""
    productTitleInput.value = ""
    productQuantityInput.value = ""
}
var productsList = document.querySelector('.products-list')

fetch(productApi)
    .then(res => res.json())
    .then(products => {
        var htmls = products.map((product) => {
            return `
            <tr class="product-item" data-index=${product.id}>
                <th><input type="checkbox" class="select-checkbox" data-index=${product.id}></th>
                <td><a href="" class="product-id" data-index=${product.id}>${product.id}</a></td>
                <td><a href="" class="category-item" data-index=${product.category_id} >${product.category_id}</a></td>
                <td colspan="2" class="product-name">${product.name}</td>
                <td><img src="..${product.image}" class="product-img" alt=""></td>
                <th class="product-quantity">${product.quantity}</th>
                <td class="product-price">${product.price}</td>
                <th class="product-title">${product.title}</th>
                <th class="product-description">${product.description}</th>
            </tr>
            `

        })
        productsList.innerHTML = htmls.join('')

    })
    .then(() => {
        var checkboxs = document.querySelectorAll('.select-checkbox')
        checkboxs.forEach((checkbox) => {
            checkbox.onclick = function () {
                // var checked
                var checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
                if (checkedItem.length == 1) {
                    updateProductBtn.removeAttribute('disabled')
                    deleteProductBtn.removeAttribute('disabled')
                    addProductBtn.setAttribute('disabled', null)
                } else if (checkedItem.length > 1) {
                    updateProductBtn.setAttribute('disabled', null)
                    deleteProductBtn.removeAttribute('disabled')
                    addProductBtn.setAttribute('disabled', null)
                } else if (checkedItem.length == 0) {
                    updateProductBtn.setAttribute('disabled', null)
                    deleteProductBtn.setAttribute('disabled', null)
                    addProductBtn.removeAttribute('disabled')
                }
            }
        })
        updateProductBtn.onclick = function (e) {
            e.preventDefault()
            formAddProduct.classList.add('isEditing')
            formAddProduct.style.display = 'block'

            var selectedCheckbox = document.querySelector('input[type="checkbox"]:checked')
            var selectedItem = document.querySelector('.product-item[data-index="' + selectedCheckbox.dataset.index + '"]')
            if (selectedCheckbox.length != 0) {
                // productIdInput.value = selectedItem.querySelector('.product-id').textContent
                productPriceInput.value = selectedItem.querySelector('.product-price').textContent
                productCategory.value = selectedItem.querySelector('.category-item').textContent
                productNameInput.value = selectedItem.querySelector('.product-name').textContent
                productQuantityInput.value = selectedItem.querySelector('.product-quantity').textContent
                productTitleInput.value = selectedItem.querySelector('.product-title').textContent
                productDescriptionInput.value = selectedItem.querySelector('.product-description').textContent
                var oldCategoryId = selectedItem.querySelector('.category-item').textContent
                updateBtn.onclick = function (e) {
                    if (validates.isRequired(productNameInput)
                        && validates.isRequired(productQuantityInput) && validates.isRequired(productPriceInput)
                        && validates.isRequired(productTitleInput) && validates.isRequired(productImageInput)
                        && validates.isRequired(productDescriptionInput)
                    ) {
                        if (oldCategoryId != productCategory.value) {
                            var categoryId = oldCategoryId
                            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
                                .then(res => res.json())
                                .then(categories => {
                                    var categoryItem = categories.find((category) => {
                                        return categoryId == category.id
                                    })
                                    if (categoryItem.parent_category_id != 'undefined') {
                                        var id = Number(categoryId)
                                        var parentCategoryId = [id]
                                        var parentCategoryId = [id]

                                        while (id != undefined) {
                                            var category = categories.find(category => {
                                                return category.id == id
                                            })
                                            if (category != undefined) {
                                                if (category.parent_category_id != null) {
                                                    parentCategoryId.push(category.parent_category_id)
                                                    id = category.parent_category_id
                                                } else {
                                                    id = undefined
                                                }
                                            } else {
                                                id = undefined
                                            }
                                        }
                                        return parentCategoryId
                                    } else {
                                        return undefined
                                    }
                                })
                                .then(parentCategoryIds => {
                                    if (parentCategoryIds != undefined) {
                                        parentCategoryIds.forEach((parentCategoryId) => {
                                            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId)
                                                .then(res => res.json())
                                                .then(category => {
                                                    var categoryData = {
                                                        "products_quantity": category.products_quantity - 1
                                                    }
                                                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId, {
                                                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                                        },
                                                        body: JSON.stringify(categoryData)
                                                    })
                                                })

                                        })
                                    }

                                })

                            // số lượng + 1 ở category mới

                            var newCategoryId = productCategory.value
                            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
                                .then(res => res.json())
                                .then(categories => {
                                    var categoryItem = categories.find((category) => {
                                        return newCategoryId == category.id
                                    })
                                    if (categoryItem.parent_category_id != 'undefined') {
                                        var id = Number(newCategoryId)
                                        var parentCategoryId = [id]
                                        var parentCategoryId = [id]

                                        while (id != undefined) {
                                            var category = categories.find(category => {
                                                return category.id == id
                                            })
                                            if (category != undefined) {
                                                if (category.parent_category_id != null) {
                                                    parentCategoryId.push(category.parent_category_id)
                                                    id = category.parent_category_id
                                                } else {
                                                    id = undefined
                                                }
                                            } else {
                                                id = undefined
                                            }
                                        }
                                        return parentCategoryId
                                    } else {
                                        return undefined
                                    }
                                })
                                .then(parentCategoryIds => {
                                    if (parentCategoryIds != undefined) {
                                        parentCategoryIds.forEach((parentCategoryId) => {
                                            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId)
                                                .then(res => res.json())
                                                .then(category => {
                                                    var categoryData = {
                                                        "products_quantity": category.products_quantity + 1
                                                    }
                                                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId, {
                                                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                                        headers: {
                                                            'Content-Type': 'application/json'
                                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                                        },
                                                        body: JSON.stringify(categoryData)
                                                    })
                                                })

                                        })
                                    }

                                })
                            // .then( () => {
                            //     fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories/" + productCategory.value)
                            //     .then(res => res.json())
                            //     .then(category => {
                            //         var categoryData = {
                            //             "products_quantity": category.products_quantity + 1
                            //         }
                            //         fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories/" + productCategory.value, {
                            //             method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                            //             headers: {
                            //                 'Content-Type': 'application/json'
                            //                 // 'Content-Type': 'application/x-www-form-urlencoded',
                            //             },
                            //             body: JSON.stringify(categoryData)
                            //         })
                            //     })
                            // })

                        }

                        var date = new Date()
                        var data = {

                            "name": productNameInput.value,
                            "price": productPriceInput.value,
                            "category_id": productCategory.value,
                            "quantity": productQuantityInput.value,
                            "image": productImageInput.value,
                            "date": date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
                            "title": productTitleInput.value,
                            "description": productDescriptionInput.value
                        }
                        fetch(productApi + '/' + selectedCheckbox.dataset.index, {
                            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                            headers: {
                                'Content-Type': 'application/json'
                                // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: JSON.stringify(data) // body data type must match "Content-Type" header
                        })
                            .then(() => {
                                // window.location.reload()
                            })
                        // selectedItem.querySelector('.product-price').textContent = productPriceInput.value
                        // selectedItem.querySelector('.category-item').textContent = productCategory.value
                        // selectedItem.querySelector('.type-item').textContent = productType.value
                        // selectedItem.querySelector('.product-name').textContent = productNameInput.value
                        // selectedItem.querySelector('.product-quantity').textContent = productQuantityInput.value
                        // selectedItem.querySelector('.product-title').textContent = productTitleInput.value
                        // selectedItem.querySelector('.product-description').textContent = productDescriptionInput.value
                        // selectedItem.querySelector('.product-img').src = ".." + productImageInput.value

                        // productImageInput.value = ""
                        // productDescriptionInput.value = ""
                        // productNameInput.value = ""
                        // productPriceInput.value = ""
                        // productTitleInput.value = ""
                        // productQuantityInput.value = ""
                        // selectedCheckbox.checked = false
                        // formAddProduct.classList.remove('isEditing')
                        // formAddProduct.style.display = 'none'
                    }

                }
                formControls.forEach((formControl) => {
                    formControl.oninput = function () {
                        formControl.classList.remove('invalid')
                    }
                })
            }


        }

        deleteProductBtn.onclick = function () {
            var selectedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked')
            if (selectedCheckboxs.length == 0) {
                return;
            } else {
                selectedCheckboxs.forEach(selectedCheckbox => {
                    var selectedItem = document.querySelector('.product-item[data-index="' + selectedCheckbox.dataset.index + '"]')
                    var productCategoryId = selectedItem.querySelector('.category-item').textContent
                    var categoryId = productCategoryId
                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
                        .then(res => res.json())
                        .then(categories => {
                            var categoryItem = categories.find((category) => {
                                return categoryId == category.id
                            })
                            if (categoryItem.parent_category_id != 'undefined') {
                                var id = Number(categoryId)
                                var parentCategoryId = [id]
                                var parentCategoryId = [id]

                                while (id != undefined) {
                                    var category = categories.find(category => {
                                        return category.id == id
                                    })
                                    if (category != undefined) {
                                        if (category.parent_category_id != null) {
                                            parentCategoryId.push(category.parent_category_id)
                                            id = category.parent_category_id
                                        } else {
                                            id = undefined
                                        }
                                    } else {
                                        id = undefined
                                    }
                                }
                                return parentCategoryId
                            } else {
                                return undefined
                            }
                        })
                        .then(parentCategoryIds => {
                            if (parentCategoryIds != undefined) {
                                parentCategoryIds.forEach((parentCategoryId) => {
                                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId)
                                        .then(res => res.json())
                                        .then(category => {
                                            var categoryData = {
                                                "products_quantity": category.products_quantity - 1
                                            }
                                            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories" + "/" + parentCategoryId, {
                                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                                },
                                                body: JSON.stringify(categoryData)
                                            })
                                        })

                                })
                            }

                        })


                    fetch(productApi + "/" + selectedCheckbox.dataset.index, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    })
                        .then(() => {
                            window.location.reload()
                        })
                    // document.querySelector('.product-item[data-index="' + selectedCheckbox.dataset.index + '"]').remove()
                })
            }
        }

        searchBtn.onclick = function (e) {
            e.preventDefault()
            fetch(productApi + "/" + "?search=" + searchInput.value)
                .then(res => res.json())
                .then(products => {
                    var htmls = products.map((product) => {
                        return `
                    <tr class="product-item" data-index=${product.id}>
                        <th><input type="checkbox" class="select-checkbox" data-index=${product.id}></th>
                        <td><a href="" class="product-id" data-index=${product.id}>${product.id}</a></td>
                        <td><a href="" class="category-item" data-index=${product.category_id} >${product.category_id}</a></td>
                        <td colspan="2" class="product-name">${product.name}</td>
                        <td><img src="..${product.image}" class="product-img" alt=""></td>
                        <th class="product-quantity">${product.quantity}</th>
                        <td class="product-price">${product.price}</td>
                        <th class="product-title">${product.title}</th>
                        <th class="product-description">${product.description}</th>
                    </tr>
                    `

                    })
                    productsList.innerHTML = htmls.join('')
                })
        }
    })




