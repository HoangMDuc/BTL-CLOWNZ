import validates from "../sign_up/validates.js"

document.querySelector('.user_name').textContent = JSON.parse(sessionStorage.getItem('usersAccount'))["name"]
var slidersApi = "https://62890e4b10e93797c162141e.mockapi.io/clownz/slider"
var addSliderBtn = document.querySelector('.add-slider-btn')
var updateSliderBtn = document.querySelector('.update-slider-btn')
var deleteSliderBtn = document.querySelector('.delete-slider-btn')
var formAddSlider = document.querySelector('.form-add-slider')
var cancelBtn = document.querySelector('.cancel-btn')
var addBtn = document.querySelector('.add-btn')
var updateBtn = document.querySelector('.update-btn')
var searchBtn = document.querySelector('.search-btn')
var searchInput = document.querySelector('.search-input')
var sliderImageInput = document.querySelector('.form-control.slider-image')
var formControls = document.querySelectorAll('.form-control')

if(sessionStorage.getItem('usersAccount') != null) {
    if(JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == undefined) {
        console.log(JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"], JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == undefined)
        alert("Bạn không có quyền truy cập vào đây!")
        window.location.href = '../index.html'
    }else {
        if(JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == false) {
            window.location.href = '../index.html'
        }else {
            console.log(JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"],JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == false)
        }

    }
}else {
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

addSliderBtn.onclick = function (e) {
    e.preventDefault()
    formAddSlider.style.display = 'block'

    addBtn.onclick = function () {
        if (validates.isRequired(sliderImageInput)
        ) {

            var data = {
                "image": sliderImageInput.value

            }
            fetch(slidersApi, {
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
    formAddSlider.style.display = 'none'
    formAddSlider.classList.remove('isEditing')
    sliderImageInput.value = ""
}

fetch(slidersApi)
    .then(res => res.json())
    .then(sliders => {
        var htmls = sliders.map(slider => {
            return `
                <tr class="slider" data-index=${slider.id}>
                    <th><label for=""><input type="checkbox" class="select-checkbox" data-index=${slider.id}></label>
                    <td><a href="" class="slider-id" data-index=${slider.id}>${slider.id}</a></td>
                    <td colspan="3"><img src="..${slider.image}" alt="" class="slider-image"></td>
                </tr>
            `

        })

        document.querySelector('.sliders-list').innerHTML = htmls.join('')
    })
    .then(() => {
        var checkboxs = document.querySelectorAll('.select-checkbox')
        checkboxs.forEach(checkbox => {
            checkbox.onchange = function () {
                var checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
                if (checkedItem.length == 1) {
                    updateSliderBtn.removeAttribute('disabled')
                    deleteSliderBtn.removeAttribute('disabled')
                    addSliderBtn.setAttribute('disabled', null)
                } else if (checkedItem.length > 1) {
                    updateSliderBtn.setAttribute('disabled', null)
                    deleteSliderBtn.removeAttribute('disabled')
                    addSliderBtn.setAttribute('disabled', null)
                } else if (checkedItem.length == 0) {
                    updateSliderBtn.setAttribute('disabled', null)
                    deleteSliderBtn.setAttribute('disabled', null)
                    addSliderBtn.removeAttribute('disabled')
                }
            }
        })
        // checkboxs.forEach((checkbox) => {
        //     checkbox.onclick = function () {
        //         // var checked
        //         var checkedItem = document.querySelectorAll('input[type="checkbox"]:checked')
        //         if (checkedItem.length == 1) {
        //             updateSliderBtn.removeAttribute('disabled')
        //             deleteSliderBtn.removeAttribute('disabled')
        //             addSliderBtn.setAttribute('disabled', null)
        //         } else if (checkedItem.length > 1) {
        //             updateSliderBtn.setAttribute('disabled', null)
        //             deleteSliderBtn.removeAttribute('disabled')
        //             addSliderBtn.setAttribute('disabled', null)
        //         } else if (checkedItem.length == 0) {
        //             updateSliderBtn.setAttribute('disabled', null)
        //             deleteSliderBtn.setAttribute('disabled', null)
        //             addSliderBtn.removeAttribute('disabled')
        //         }
        //     }
        // })

        updateSliderBtn.onclick = function (e) {
            e.preventDefault()
            formAddSlider.classList.add('isEditing')
            formAddSlider.style.display = 'block'

            var selectedCheckbox = document.querySelector('input[type="checkbox"]:checked')
            var selectedItem = document.querySelector('.slider[data-index="' + selectedCheckbox.dataset.index + '"]')
            if (selectedCheckbox.length != 0) {


                updateBtn.onclick = function (e) {
                    if (
                        validates.isRequired(sliderImageInput)
                    ) {
                        var data = {


                            "image": sliderImageInput.value

                        }
                        fetch(slidersApi + '/' + selectedCheckbox.dataset.index, {
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
                        // selectedItem.querySelector('.slider-image').src = ".." + sliderImageInput.value

                        // sliderImageInput.value = ""
                        // updateSliderBtn.setAttribute('disabled',null)
                        // selectedCheckbox.checked = false
                        // formAddSlider.classList.remove('isEditing')
                        // formAddSlider.style.display = 'none'
                    }

                }
                formControls.forEach((formControl) => {
                    formControl.oninput = function () {
                        formControl.classList.remove('invalid')
                    }
                })
            }


        }

        deleteSliderBtn.onclick = function () {
            var selectedCheckboxs = document.querySelectorAll('input[type="checkbox"]:checked')
            if (selectedCheckboxs.length == 0) {
                return;
            } else {
                selectedCheckboxs.forEach(selectedCheckbox => {
                    fetch(slidersApi + "/" + selectedCheckbox.dataset.index, {
                        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    })
                        .then(() => {
                            window.location.reload()
                        })
                    // deleteSliderBtn.setAttribute('disabled',null)
                    // document.querySelector('.slider[data-index="' + selectedCheckbox.dataset.index + '"]').remove()
                })
            }
        }

        searchBtn.onclick = function (e) {
            e.preventDefault()
            fetch(slidersApi + "/" + "?id=" + searchInput.value)
                .then(res => res.json())
                .then(sliders => {
                    var htmls = sliders.map(slider => {
                        return `
                        <tr class="slider" data-index=${slider.id}>
                            <th><label for=""><input type="checkbox" class="select-checkbox" data-index=${slider.id}></label>
                            <td><a href="" class="slider-id" data-index=${slider.id}>${slider.id}</a></td>
                            <td colspan="3"><img src="..${slider.image}" alt="" class="slider-image"></td>
                        </tr>
                    `

                    })

                    document.querySelector('.sliders-list').innerHTML = htmls.join('')
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