import validates from "../sign_up/validates.js"


document.querySelector('.user_name').textContent = JSON.parse(sessionStorage.getItem('usersAccount'))["name"]
var categoriesApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/categories"
var addCategoryBtn = document.querySelector('.add-category-btn')
var updateCategoryBtn = document.querySelector('.update-category-btn')
var deleteCategoryBtn = document.querySelector('.delete-category-btn')
var formAddCategory = document.querySelector('.form-add-category')
var cancelBtn = document.querySelector('.cancel-btn')
var addBtn = document.querySelector('.add-btn')
var updateBtn = document.querySelector('.update-btn')
var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-input')
var categoryNameInput = document.querySelector('.form-control.category-name')
var categoryQuantityInput = document.querySelector('.form-control.category-quantity')
var categoryImageInput = document.querySelector('.form-control.category-img')
var categoryParentId = document.querySelector('.form-control.parent-category-id')
var formControls = document.querySelectorAll('.form-control')

fetch(categoriesApi)
    .then(res => res.json())
    .then(categories => {

        var htmls = categories.map(category => {
            if(category.id != 6) {
                return `
                    <option value=${category.id}>${category.id}</option>
                    `
            }else {
                return ''
            }
        })
        categoryParentId.innerHTML = `<option value="undefined">Không</option>` + htmls.join('')
    })

if (sessionStorage.getItem('usersAccount') != null) {
    if (JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == undefined) {
        console.log(JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"], JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == undefined)
        alert("Bạn không có quyền truy cập vào đây!")
        window.location.href = '../index.html'
    } else {
        if (JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == false) {
            window.location.href = '../index.html'
        } else {
            console.log(JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"], JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == false)
        }

    }
} else {
    alert("Bạn không có quyền truy cập vào đây!")
    window.location.href = '../index.html'
}


var logoutBtn = document.querySelector('.log-out')
logoutBtn.onclick = function () {
    sessionStorage.setItem('login', JSON.stringify('false'))
    sessionStorage.setItem('usersAccount', JSON.stringify(
        {

        }
    ))
}

addCategoryBtn.onclick = function (e) {
    e.preventDefault()
    formAddCategory.style.display = 'block'

    addBtn.onclick = function () {
        if (validates.isRequired(categoryNameInput)
            && validates.isRequired(categoryImageInput)
        ) {

            var data = {
                "name": categoryNameInput.value,
                "products_quantity": 0,
                "image": categoryImageInput.value,
                "parent_category_id": Number(categoryParentId.value)
            }
            fetch(categoriesApi, {
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




            // categoryImageInput.value = ""
            // categoryNameInput.value = ""
            // categoryQuantityInput.value = 0
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
    formAddCategory.style.display = 'none'
    formAddCategory.classList.remove('isEditing')
    categoryImageInput.value = ""
    categoryNameInput.value = ""
    categoryQuantityInput.value = 0
    categoryParentId.querySelector('option[disabled="null"').removeAttribute('disabled')
}

fetch(categoriesApi)
    .then(res => res.json())
    .then(categories => {
        var htmls = categories.map(category => {
            return `
                <tr class="category" data-index=${category.id}>
                    <th><label for=""><input type="checkbox" class="select-checkbox" data-index=${category.id}></label>
                    <td><a href="" class="category-id category-item" data-index=${category.id}>${category.id}</a></td>
                    <td colspan="2" class="category-name">${category.name}</td>
                    <td><img src="..${category.image}" alt="" class="category-img"></td>
                    <td class="parent-category-id">${category["parent_category_id"]}</td>
                    <th class="category-product-quantity">${category["products_quantity"]}</th>
                </tr>
            `

        })

        document.querySelector('.categories-list').innerHTML = htmls.join('')
    })
    .then(() => {
        var checkboxs = document.querySelectorAll('.select-checkbox')
        checkboxs.forEach((checkbox) => {
            checkbox.onclick = function () {
                // var checked
                var checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
                if (checkedItem.length == 1) {
                    updateCategoryBtn.removeAttribute('disabled')
                    deleteCategoryBtn.removeAttribute('disabled')
                    addCategoryBtn.setAttribute('disabled', null)
                } else if (checkedItem.length > 1) {
                    updateCategoryBtn.setAttribute('disabled', null)
                    deleteCategoryBtn.removeAttribute('disabled')
                    addCategoryBtn.setAttribute('disabled', null)
                } else if (checkedItem.length == 0) {
                    updateCategoryBtn.setAttribute('disabled', null)
                    deleteCategoryBtn.setAttribute('disabled', null)
                    addCategoryBtn.removeAttribute('disabled')
                }
            }
        })

        updateCategoryBtn.onclick = function (e) {
            e.preventDefault()
            formAddCategory.classList.add('isEditing')
            formAddCategory.style.display = 'block'

            

            var selectedCheckbox = document.querySelector('input[type="checkbox"]:checked')
            var selectedItem = document.querySelector('.category[data-index="' + selectedCheckbox.dataset.index + '"]')
            categoryParentId.querySelector('option[value="' + selectedCheckbox.dataset.index +'"]').setAttribute('disabled',null)
            if (selectedCheckbox.length != 0) {
                categoryNameInput.value = selectedItem.querySelector('.category-name').textContent
                categoryQuantityInput.value = selectedItem.querySelector('.category-product-quantity').textContent
                var oldParentCategoryId = selectedItem.querySelector('.parent-category-id').textContent
                var categoryProductQuantity = selectedItem.querySelector('.category-product-quantity').textContent
                updateBtn.onclick = function (e) {
                    if (validates.isRequired(categoryNameInput)
                        && validates.isRequired(categoryImageInput)
                    ) {
                        var data = {
                            "name": categoryNameInput.value,
                            "products_quantity": categoryQuantityInput.value,
                            "image": categoryImageInput.value,
                            "parent_category_id": Number(categoryParentId.value)

                        }

                        if (oldParentCategoryId != categoryParentId.value) {
                            if (categoryProductQuantity != 0) {

                                fetch(categoriesApi)
                                    .then(res => res.json())
                                    .then(categories => {
                                        if (oldParentCategoryId != 'undefined') {
                                            var id = Number(oldParentCategoryId)
                                            var parentCategoryId = [id]

                                            while (id != undefined) {
                                                var category = categories.find(category => {
                                                    return category.id == id
                                                })
                                                if (category != undefined) {
                                                    if (category.parent_category_id != 'undefined') {
                                                        console.log(category.parent_category_id, category.parent_category_id != 'undefined')
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
                                                fetch(categoriesApi + "/" + parentCategoryId)
                                                    .then(res => res.json())
                                                    .then(category => {
                                                        var categoryData = {
                                                            "products_quantity": category.products_quantity - Number(categoryProductQuantity)
                                                        }
                                                        fetch(categoriesApi + "/" + parentCategoryId, {
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

                                fetch(categoriesApi)
                                    .then(res => res.json())
                                    .then(categories => {
                                        if (categoryParentId.value != 'undefined') {
                                            var id = Number(categoryParentId.value)
                                            var parentCategoryId = [id]

                                            while (id != undefined) {
                                                var category = categories.find(category => {
                                                    return category.id == id
                                                })
                                                if (category != undefined) {
                                                    if (category.parent_category_id != 'undefined') {
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
                                                fetch(categoriesApi + "/" + parentCategoryId)
                                                    .then(res => res.json())
                                                    .then(category => {
                                                        var categoryData = {
                                                            "products_quantity": category.products_quantity + Number(categoryProductQuantity)
                                                        }
                                                        fetch(categoriesApi + "/" + parentCategoryId, {
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
                                fetch(categoriesApi + '/' + selectedCheckbox.dataset.index, {
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
                            } else {
                                console.log(123)
                                fetch(categoriesApi + '/' + selectedCheckbox.dataset.index, {
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
                            }


                        } else {
                            fetch(categoriesApi + '/' + selectedCheckbox.dataset.index, {
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
                        }

                        selectedItem.querySelector('.category-name').textContent = categoryNameInput.value
                        selectedItem.querySelector('.category-product-quantity').textContent = categoryQuantityInput.value
                        selectedItem.querySelector('.category-img').src = ".." + categoryImageInput.value

                        categoryImageInput.value = ""
                        categoryNameInput.value = ""
                        categoryQuantityInput.value = 0
                        selectedCheckbox.checked = false
                        formAddCategory.classList.remove('isEditing')
                        formAddCategory.style.display = 'none'
                    }

                }
                formControls.forEach((formControl) => {
                    formControl.oninput = function () {
                        formControl.classList.remove('invalid')
                    }
                })
            }


        }

        deleteCategoryBtn.onclick = function () {
            var selectedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked')
            if (selectedCheckboxs.length == 0) {
                return;
            } else {
                selectedCheckboxs.forEach(selectedCheckbox => {
                    var selectedItem = document.querySelector('.category[data-index="' + selectedCheckbox.dataset.index + '"]')
                    var oldParentCategoryId = selectedItem.querySelector('.parent-category-id').textContent
                    var categoryProductQuantity = selectedItem.querySelector('.category-product-quantity').textContent


                    fetch(categoriesApi)
                        .then(res => res.json())
                        .then(categories => {
                            if (oldParentCategoryId != 'undefined') {
                                var id = Number(oldParentCategoryId)
                                var parentCategoryId = [id]

                                while (id != undefined) {
                                    var category = categories.find(category => {
                                        return category.id == id
                                    })
                                    if (category != undefined) {
                                        if (category.parent_category_id != 'undefined') {
                                            console.log(category.parent_category_id, category.parent_category_id != 'undefined')
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
                                    fetch(categoriesApi + "/" + parentCategoryId)
                                        .then(res => res.json())
                                        .then(category => {
                                            var categoryData = {
                                                "products_quantity": category.products_quantity - Number(categoryProductQuantity)
                                            }
                                            fetch(categoriesApi + "/" + parentCategoryId, {
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

                    fetch(categoriesApi + "/" + selectedCheckbox.dataset.index, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    })
                        .then(() => {
                            window.location.reload()
                        })
                })
            }
        }

        searchBtn.onclick = function (e) {
            e.preventDefault()
            fetch(categoriesApi + "/" + "?name=" + searchInput.value)
                .then(res => res.json())
                .then(categories => {
                    var htmls = categories.map(category => {
                        return `
                        <tr class="category" data-index=${category.id}>
                            <th><label for=""><input type="checkbox" class="select-checkbox" data-index=${category.id}></label>
                            <td><a href="" class="category-id category-item" data-index=${category.id}>${category.id}</a></td>
                            <td colspan="2" class="category-name">${category.name}</td>
                            <td><img src="..${category.image}" alt="" class="category-img"></td>
                            <th class="category-product-quantity">${category["products_quantity"]}</th>
                        </tr>
                    `

                    })

                    document.querySelector('.categories-list').innerHTML = htmls.join('')
                })
        }
    })