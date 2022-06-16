import validates from "../sign_up/validates.js"

var addBtn = document.querySelector('.add-btn')
var updateBtn = document.querySelector('.update-btn')
var addProductBtn = document.querySelector('.add-product-btn')
var updateProductBtn = document.querySelector('.update-product-btn')
var deleteProductBtn = document.querySelector('.delete-product-btn')
var cancelBtn = document.querySelector('.cancel-btn')
var formAddProduct = document.querySelector('.form-add-product')
var productNameInput = document.querySelector('.product-name')
var productIdInput = document.querySelector('.product-id')
var productQuantityInput = document.querySelector('.product-quantity')
var productTitleInput = document.querySelector('.product-title')
var productDescriptionInput = document.querySelector('.product-description')
var productPriceInput = document.querySelector('.product-price')
var productCategory = document.querySelector('.product-category-id')
var productType = document.querySelector('.product-type-id')
var productImageInput = document.querySelector('.product-img')

var formControls = formAddProduct.querySelectorAll('.form-control:not(select)')
var productApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/products"


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

fetch("https://629c5b853798759975d46095.mockapi.io/api/products_type")
    .then(res => res.json())
    .then(types => {
        var htmls = types.map(type => {
            return `
            <option>${type.id}</option>
            `
        })
        document.querySelector('#type').innerHTML = htmls.join('')
    })


addProductBtn.onclick = function (e) {
    e.preventDefault()
    formAddProduct.style.display = 'block'
    addBtn.onclick = function () {
        if (validates.isRequired(productIdInput) && validates.isRequired(productNameInput)
            && validates.isRequired(productQuantityInput) && validates.isRequired(productPriceInput)
            && validates.isRequired(productTitleInput) && validates.isRequired(productImageInput)
            && validates.isRequired(productDescriptionInput)
        ) {
            var date = new Date()
            var data = {
                "id": productIdInput.value,
                "name": productNameInput.value,
                "category_id": productCategory.value,
                "quantity": productQuantityInput.value,
                "image": productImageInput.value,
                "type_id": productType.value,
                "date": date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
                "title": productTitleInput.value,
                "description": productDescriptionInput.value
            }
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



cancelBtn.onclick = function () {
    formAddProduct.classList.remove('isEditing')
    formAddProduct.style.display = 'none'
}
var productsList = document.querySelector('.products-list')

fetch(productApi + "?sortBy=date&orderby=desc")
    .then(res => res.json())
    .then(products => {
        var htmls = products.map((product) => {
            return `
            <tr class="product-item" data-index=${product.id}>
                <th><input type="checkbox" class="select-checkbox" data-index=${product.id}></th>
                <td><a href="" class="product-id" data-index=${product.id}>${product.id}</a></td>
                <td><a href="" class="category-item" data-index=${product.category_id} >${product.category_id}</a></td>
                <td><a href="" class="type-item" data-index=${product.type_id}>${product.type_id}</a></td>
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
                productIdInput.value = selectedItem.querySelector('.product-id').textContent
                productPriceInput.value = selectedItem.querySelector('.product-price').textContent
                productCategory.value = selectedItem.querySelector('.category-item').textContent
                productType.value = selectedItem.querySelector('.type-item').textContent
                productNameInput.value = selectedItem.querySelector('.product-name').textContent
                productQuantityInput.value = selectedItem.querySelector('.product-quantity').textContent
                productTitleInput.value = selectedItem.querySelector('.product-title').textContent
                productDescriptionInput.value = selectedItem.querySelector('.product-description').textContent

                updateBtn.onclick = function (e) {
                    if (validates.isRequired(productIdInput) && validates.isRequired(productNameInput)
                        && validates.isRequired(productQuantityInput) && validates.isRequired(productPriceInput)
                        && validates.isRequired(productTitleInput) && validates.isRequired(productImageInput)
                        && validates.isRequired(productDescriptionInput)
                    ) {
                        var date = new Date()
                        var data = {
                            "id": productIdInput.value,
                            "name": productNameInput.value,
                            "category_id": productCategory.value,
                            "quantity": productQuantityInput.value,
                            "image": productImageInput.value,
                            "type_id": productType.value,
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
                        selectedItem.querySelector('.product-id').textContent = productIdInput.value
                        selectedItem.querySelector('.product-price').textContent = productPriceInput.value
                        selectedItem.querySelector('.category-item').textContent = productCategory.value
                        selectedItem.querySelector('.type-item').textContent = productType.value
                        selectedItem.querySelector('.product-name').textContent = productNameInput.value
                        selectedItem.querySelector('.product-quantity').textContent = productQuantityInput.value
                        selectedItem.querySelector('.product-title').textContent = productTitleInput.value
                        selectedItem.querySelector('.product-description').textContent = productDescriptionInput.value

                        productImageInput.value = ""
                        selectedCheckbox.checked = false
                        formAddProduct.classList.remove('isEditing')
                        formAddProduct.style.display = 'none'
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
                    fetch(productApi + "/" + selectedCheckbox.dataset.index, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    })
                    document.querySelector('.product-item[data-index="' + selectedCheckbox.dataset.index + '"]').remove()
                })
            }
        }
    })




