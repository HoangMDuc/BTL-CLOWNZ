import validates from "../sign_up/validates.js"


document.querySelector('.user_name').textContent = JSON.parse(sessionStorage.getItem('usersAccount'))["name"]
var typesApi = "https://629c5b853798759975d46095.mockapi.io/api/products_type"
var addTypeBtn = document.querySelector('.add-type-btn')
var updateTypeBtn = document.querySelector('.update-type-btn')
var deleteTypeBtn = document.querySelector('.delete-type-btn')
var formAddType = document.querySelector('.form-add-type')
var cancelBtn = document.querySelector('.cancel-btn')
var addBtn = document.querySelector('.add-btn')
var updateBtn = document.querySelector('.update-btn')
var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-input')
var typeNameInput = document.querySelector('.form-control.type-name')
var typeQuantityInput = document.querySelector('.form-control.type-quantity')
var typeImageInput = document.querySelector('.form-control.type-image')
var categoryIdSelect = document.querySelector('.form-control.category-id')
var formControls = document.querySelectorAll('.form-control')

fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
.then(res => res.json())
.then(categories => {
    var htmls = categories.map( category => {
        return `
        <option value=${category.id}>${category.id}</option>
        `
    })
    categoryIdSelect.innerHTML = htmls.join('')
})

addTypeBtn.onclick = function (e) {
    e.preventDefault()
    formAddType.style.display = 'block'

    addBtn.onclick = function () {
        if (validates.isRequired(typeNameInput)
            && validates.isRequired(typeImageInput)
        ) {

            var data = {
                "name": typeNameInput.value,
                "products_quantity": typeQuantityInput.value,
                "image": typeImageInput.value,

            }
            fetch(typesApi, {
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
searchInput.oninput = function() { 
    if(searchInput.value.length > 0) {
        searchBtn.removeAttribute('disabled')
    }else {
        searchBtn.setAttribute('disabled',null)
    }
}

cancelBtn.onclick = function () {
    formAddType.style.display = 'none'
    formAddType.classList.remove('isEditing')
    typeImageInput.value = ""
    typeNameInput.value = ""
    typeQuantityInput.value = 0
}

fetch(typesApi)
    .then(res => res.json())
    .then(types => {
        var htmls = types.map(type => {
            return `
                <tr class="type" data-index=${type.id}>
                    <th><label for=""><input type="checkbox" class="select-checkbox" data-index=${type.id}></label>
                    <td><a href="" class="type-id type-item" data-index=${type.id}>${type.id}</a></td>
                    <td colspan="2" class="type-name">${type.name}</td>
                    <td><img src="..${type.image}" alt="" class="type-img"></td>
                    <th class="type-product-quantity">${type["products_quantity"]}</th>
                </tr>
            `

        })

        document.querySelector('.types-list').innerHTML = htmls.join('')
    })
    .then(() => {
        var checkboxs = document.querySelectorAll('.select-checkbox')
        checkboxs.forEach((checkbox) => {
            checkbox.onclick = function () {
                // var checked
                var checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
                if (checkedItem.length == 1) {
                    updateTypeBtn.removeAttribute('disabled')
                    deleteTypeBtn.removeAttribute('disabled')
                    addTypeBtn.setAttribute('disabled', null)
                } else if (checkedItem.length > 1) {
                    updateTypeBtn.setAttribute('disabled', null)
                    deleteTypeBtn.removeAttribute('disabled')
                    addTypeBtn.setAttribute('disabled', null)
                } else if (checkedItem.length == 0) {
                    updateTypeBtn.setAttribute('disabled', null)
                    deleteTypeBtn.setAttribute('disabled', null)
                    addTypeBtn.removeAttribute('disabled')
                }
            }
        })

        updateTypeBtn.onclick = function (e) {
            e.preventDefault()
            formAddType.classList.add('isEditing')
            formAddType.style.display = 'block'

            var selectedCheckbox = document.querySelector('input[type="checkbox"]:checked')
            var selectedItem = document.querySelector('.type[data-index="' + selectedCheckbox.dataset.index + '"]')
            if (selectedCheckbox.length != 0) {
                typeNameInput.value = selectedItem.querySelector('.type-name').textContent
                typeQuantityInput.value = selectedItem.querySelector('.type-product-quantity').textContent

                updateBtn.onclick = function (e) {
                    if (validates.isRequired(typeNameInput)

                        && validates.isRequired(typeImageInput)
                    ) {
                        var data = {

                            "name": typeNameInput.value,
                            "products_quantity": typeQuantityInput.value,
                            "image": typeImageInput.value,

                        }
                        fetch(typesApi + '/' + selectedCheckbox.dataset.index, {
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



                        // selectedItem.querySelector('.type-name').textContent = typeNameInput.value
                        // selectedItem.querySelector('.type-product-quantity').textContent = typeQuantityInput.value
                        // selectedItem.querySelector('.type-img').src = ".." + typeImageInput.value

                        // typeImageInput.value = ""
                        // typeNameInput.value = ""
                        // typeQuantityInput.value = 0
                        // selectedCheckbox.checked = false
                        // formAddType.classList.remove('isEditing')
                        // formAddType.style.display = 'none'
                    }

                }
                formControls.forEach((formControl) => {
                    formControl.oninput = function () {
                        formControl.classList.remove('invalid')
                    }
                })
            }


        }

        deleteTypeBtn.onclick = function () {
            var selectedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked')
            if (selectedCheckboxs.length == 0) {
                return;
            } else {
                selectedCheckboxs.forEach(selectedCheckbox => {
                    fetch(typesApi + "/" + selectedCheckbox.dataset.index, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    })
                    .then( () => {
                        window.location.reload()
                    })
                    // document.querySelector('.type[data-index="' + selectedCheckbox.dataset.index + '"]').remove()
                })
            }
        }

        searchBtn.onclick = function(e) {
            e.preventDefault()
            fetch(typesApi + "/" + "?name=" + searchInput.value)
            .then( res => res.json())
            .then( types => {
                var htmls = types.map(type => {
                    return `
                        <tr class="type" data-index=${type.id}>
                            <th><label for=""><input type="checkbox" class="select-checkbox" data-index=${type.id}></label>
                            <td><a href="" class="type-id type-item" data-index=${type.id}>${type.id}</a></td>
                            <td colspan="2" class="type-name">${type.name}</td>
                            <td><img src="..${type.image}" alt="" class="type-img"></td>
                            <th class="type-product-quantity">${type["products_quantity"]}</th>
                        </tr>
                    `
        
                })
        
                document.querySelector('.types-list').innerHTML = htmls.join('')
            })
        }
    })


    // [
    //     {
    //      "name": "T-shirt",
    //      "id": "1",
    //      "category_id": "3",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Shirt",
    //      "id": "2",
    //      "category_id": "3",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Hoodie",
    //      "id": "3",
    //      "category_id": "3",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Jacket",
    //      "id": "4",
    //      "category_id": "3",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Sweetshirt",
    //      "id": "5",
    //      "category_id": "3",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Pants",
    //      "id": "6",
    //      "category_id": "4",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Jeans adn Denim",
    //      "id": "7",
    //      "category_id": "4",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Bag",
    //      "id": "8",
    //      "category": "5",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Hat",
    //      "id": "9",
    //      "category": "5",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Backpack",
    //      "id": "10",
    //      "category": "5",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     },
    //     {
    //      "name": "Others",
    //      "id": "11",
    //      "category": "5",
    //      "image": "/img/top/hoodie/black-friday-banner-web-2-7beff7d0-5c32-4423-8d0b-c95c16b1378e.jpg",
    //      "products_quantity": 0
    //     }
    //    ]