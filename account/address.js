import handleClickCategory from "../js/clickCategory.js"
import { Load } from "../js/load_user.js"
import renderMenu from "../js/renderMenu.js"
import validates from "../sign_up/validates.js"
Load.start()
renderMenu()
.then( () => {
    handleClickCategory()
    
})

var addressApi = "https://629c5b853798759975d46095.mockapi.io/api/user_address"
var userName = document.querySelector('.user_name')
var user = JSON.parse(sessionStorage.getItem('usersAccount'))
var addNewAddressBtn = document.querySelector('.btn-add')
var addForm = document.querySelector('.add-form')
var closeFormBtn = document.querySelector('.close-form')
var cancelBtn = document.querySelector('.btn-cancel')
var addAddressBtn = document.querySelector('.btn-add-address')
var updateBtn = document.querySelector('.btn-update-address')
var companyInput = document.querySelector('input[name="Company"]')
var streetInput = document.querySelector('input[name="street"]')
var cityInput = document.querySelector('input[name="city"]')
var districtInput = document.querySelector('input[name="district"]')
var wardsInput = document.querySelector('input[name="wards"]')
var isDefault = document.querySelector('input[name="IsDefault"]')
var inputs = document.querySelectorAll('input[name]')

document.querySelector('input[name="FullName"]').value = user.name
document.querySelector('input[name="Phone"]').value = user.phoneNumber
userName.textContent = user.name



addNewAddressBtn.onclick = function () {
    addForm.style.display = 'block';
    addAddressBtn.onclick = function (e) {
        e.preventDefault()
        if (validates.isRequired(companyInput) && validates.isRequired(streetInput) && validates.isRequired(cityInput)
        && validates.isRequired(districtInput) && validates.isRequired(wardsInput)) {
        var data = {
            "user_id": user.id,
            "street": streetInput.value,
            "wards": wardsInput.value,
            "district": districtInput.value,
            "city": cityInput.value,
            "isDefault": isDefault.checked,
            "company": companyInput.value
        }
        if(isDefault.checked) {
            var addressList = document.querySelector(".address-list")
            var defaultAddress = addressList.querySelector('.row.isDefault')
            if(defaultAddress) {
                var defaultAddressData = {
                    "user_id": user.id,
                    "street": defaultAddress.querySelector('.street-address').textContent,
                    "wards": defaultAddress.querySelector('.wards-address').textContent,
                    "district": defaultAddress.querySelector('.district-address').textContent,
                    "city": defaultAddress.querySelector('.city-address').textContent,
                    "isDefault": false,
                    "company": defaultAddress.querySelector('.company-address').textContent
                }
                fetch(addressApi + '/' + defaultAddress.dataset.index, {
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(defaultAddressData)
                })
                .then( () => {
                    fetch(addressApi, {
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
                
            }else {
                fetch(addressApi, {
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
        }else {
            fetch(addressApi, {
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
    }
}
closeFormBtn.onclick = function () {
    addForm.style.display = 'none';
    addForm.classList.remove('editing')
}

cancelBtn.onclick = function (e) {
    e.preventDefault()
    addForm.classList.remove('editing')
    addForm.style.display = 'none';
}



fetch(addressApi + "?user_id=" + user.id + "&sortBy=isDefault&order=desc")
    .then(res => res.json())
    .then(userAddress => {
        console.log(userAddress)
        var htmls = userAddress.map((item, index) => {
            return `
            <div class="row ${item.isDefault == true ? "isDefault" : ""} align-items-center mb-4 address-item" data-index=${item.id}>
                <div class = "col-9">
                    <p>
                        <strong>Họ tên: </strong>
                        ${user.name} <span class = "default-Address">Địa chỉ mặc định</span>
                    </p>
                    <p>
                        <strong>Địa chỉ: </strong>
                        <span class="street-address">${item.street}</span>,
                        <span class="wards-address">${item.wards}</span>,
                        <span class="district-address">${item.district}</span>,
                        <span class="city-address">${item.city}</span>,
                        ViệtNam
                    </p>
                    <p>
                        Số điện thoại: 
                        <strong>${user.phoneNumber}</strong>
                        
                    </p>
                    <p>
                        Công ty: 
                        <strong class="company-address">${item.company}</strong>
                        
                    </p>
                </div>
                <div class = "col-3 address-control">
                    <p class="edit-address" data-index=${item.id}>Chỉnh sửa địa chỉ</p>
                    <p class="delete-address" data-index=${item.id}>Xóa</p>
                </div>
            </div>
            `
        })
        document.querySelector('.address-list').innerHTML = htmls.join('')
    })
    .then(() => {
        var deleteAddressBtns = document.querySelectorAll('.delete-address')
        var editAddressBtns = document.querySelectorAll('.edit-address')
        deleteAddressBtns.forEach(deleteAddressBtn => {
            deleteAddressBtn.onclick = function () {
                fetch(addressApi + '/' + deleteAddressBtn.dataset.index, {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                document.querySelector('.address-item[data-index="' + deleteAddressBtn.dataset.index + '"]').remove()
            }
        });
        editAddressBtns.forEach(editAddressBtn => {
            editAddressBtn.onclick = function () {
                addForm.style.display = 'block';
                addForm.classList.add('editing')
                var itemWillUpdate = document.querySelector('.row[data-index="'+ editAddressBtn.dataset.index + '"]')
                
                streetInput.value = itemWillUpdate.querySelector('.street-address').textContent
                wardsInput.value = itemWillUpdate.querySelector('.wards-address').textContent
                districtInput.value = itemWillUpdate.querySelector('.district-address').textContent
                cityInput.value = itemWillUpdate.querySelector('.city-address').textContent
                companyInput.value = itemWillUpdate.querySelector('.company-address').textContent
                isDefault.checked = itemWillUpdate.classList.contains('isDefault')
                
                if(isDefault.checked ) {
                    
                    isDefault.parentElement.classList.remove('d-flex')
                    isDefault.parentElement.classList.add('d-none')
                }else {
                    isDefault.parentElement.classList.add('d-flex')
                    isDefault.parentElement.classList.remove('d-none')
                }

                updateBtn.onclick = function (e) {
                    e.preventDefault();
                    
                    if (validates.isRequired(companyInput) && validates.isRequired(streetInput) && validates.isRequired(cityInput)
                        && validates.isRequired(districtInput) && validates.isRequired(wardsInput)) {
                            var data = {
                            "user_id": user.id,
                            "street": streetInput.value,
                            "wards": wardsInput.value,
                            "district": districtInput.value,
                            "city": cityInput.value,
                            "isDefault": isDefault.checked,
                            "company": companyInput.value
                        }

                        if(isDefault.checked) {
                            var addressList = document.querySelector(".address-list")
                            var defaultAddress = addressList.querySelector('.row.isDefault')
                            if(defaultAddress) {
                                var defaultAddressData = {
                                    "user_id": user.id,
                                    "street": defaultAddress.querySelector('.street-address').textContent,
                                    "wards": defaultAddress.querySelector('.wards-address').textContent,
                                    "district": defaultAddress.querySelector('.district-address').textContent,
                                    "city": defaultAddress.querySelector('.city-address').textContent,
                                    "isDefault": false,
                                    "company": defaultAddress.querySelector('.company-address').textContent
                                }
                                fetch(addressApi + '/' + defaultAddress.dataset.index, {
                                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                    headers: {
                                        'Content-Type': 'application/json'
                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: JSON.stringify(defaultAddressData)
                                })
                                .then( () => {
                                    fetch(addressApi + '/' + editAddressBtn.dataset.index, {
                                        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                        headers: {
                                            'Content-Type': 'application/json'
                                            // 'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                        body: JSON.stringify(data)
                                    })
                                    .then( () => {
                                        window.location.reload()
                                    })
                                    
                                })
                            }else {
                                fetch(addressApi + '/' + editAddressBtn.dataset.index, {
                                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                    headers: {
                                        'Content-Type': 'application/json'
                                        // 'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                    body: JSON.stringify(data)
                                })
                                .then( () => {
                                    window.location.reload()
                                })
                            }
                        }
                        else {
                            fetch(addressApi + '/' + editAddressBtn.dataset.index, {
                                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                                headers: {
                                    'Content-Type': 'application/json'
                                    // 'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                body: JSON.stringify(data)
                            })
                            .then( () => {
                                window.location.reload()
                            })
                            
                        }
                        
                    }

                }

                inputs.forEach(input => {
                    input.oninput = function () {
                        input.classList.remove('invalid')
                    }
                })
            }
        });
    })


