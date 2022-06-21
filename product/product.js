import { Load } from "../js/load_user.js";

import handleClickCategory from "../js/clickCategory.js";
import clickBuyBtn from "../js/clickBuyBtn.js"
import renderCart from "../js/renderCart.js"
renderCart()
Load.start()


function render() {
    var product_id = JSON.parse(sessionStorage.getItem('product_id'))
    return (
        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products/" + product_id)
            .then(res => res.json())
            .then(product => {
                var productImg = document.querySelector('.product-img')
                productImg.src = `..${product.image}`
                document.querySelector('.product-img-list').innerHTML = `
                                <div class="col-2_4"><img class="w-100 border" src="..${product.image}" alt=""></div>
                                <div class="col-2_4"><img class="w-100 border" src="..${product.image}" alt=""></div>
                                <div class="col-2_4"><img class="w-100 border" src="..${product.image}" alt=""></div>
                                <div class="col-2_4"><img class="w-100 border" src="..${product.image}" alt=""></div>
                                <div class="col-2_4"><img class="w-100 border" src="..${product.image}" alt=""></div>
                    `
                document.querySelector('.product-info').innerHTML = `
                    <h1 class="pb-3">${product.name}</h1>
                    <span class="h2">${product.price}</span>
                    <p>Tình trạng: <span class="text-danger">${product.quantity == 0 ? "Hết hàng" : `Còn hàng(${product.quantity})`}</span></p>
                    <!-- Chọn màu -->
                    
                    <!-- Chọn size -->
                    <div class="row gap-4 py-4">
                        <span class="col-auto">Size: </span>
                        <span class="border size-element col-auto active">M</span>
                        <span class="border size-element col-auto">L</span>
                        <span class="border size-element col-auto">XL</span>
                        <span class="border size-element col-auto">XXL</span>
                    </div>
                    <!-- số lượng -->
                    <div class="row py-4">
                        <span class="col-2">Số lượng: </span>
                        <div class="border" style="width: auto;">
                        <button class="bg-white border-0 minus-btn"><h1>-</h1></button>
                        <input type="number" class="bg-white text-dark fw-bolder product-quantity" value="1" style="width: 45px;" readonly min="1" max="${product.quantity}">
                        <button class="bg-white border-0 add-btn"><h1>+</h1></button>    
                        </div>
                    </div>
                    <div class="row px-5">
                        <button class="my-5 bg-danger border-0 buy-btn" style="height: 38px; width:310px;">
                            <span class="text-white text-center fw-bolder">MUA NGAY</span>
                        </button>    
                    </div>
                    <div class="row py-5">
                        <img src="../img/top/tshirts/bang-size-t-shirt-a9a35638-f098-43c9-a5e1-5ebd4959af11.webp" alt="">
                    </div>
                    <div>
                        <h4 class="text-dark p-2">Gọi đặt mua: <a class="hover-text text-primary text-decoration-none">058660 8660</a> (miễn phí 8:30 - 18:00).</h4>
                        <h5 class="text-dark p-2">
                            <i class='fas fa-shipping-fast' style='font-size:30px'></i>
                            MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG TỪ 500.000Đ
                        </h5>
                        <h5 class="text-dark p-2">
                            <i class='fa fa-check' style='font-size:30px'></i>
                            CAM KẾT 100% CHÍNH HÃNG
                        </h5>
                        <h5 class="text-dark p-2">
                            <i class="fa fa-shield" style="font-size:30px"></i>
                            BẢO HÀNH DO LỖI NHÀ SẢN XUẤT
                        </h5>
                    </div>
                    `
                var htmls = `
                    <li>desc</li>
                `


                document.querySelector('.desc').innerHTML = htmls
                return product
            })
    )
}

render()
    .then((product) => {
        handleClickCategory()
        var sizeElements = document.querySelectorAll('.size-element')
        var minusBtn = document.querySelector('.minus-btn')
        var addBtn = document.querySelector('.add-btn')
        var numberOfProduct = document.querySelector('.product-quantity')
        Array.from(sizeElements).forEach((sizeElement) => {
            sizeElement.onclick = function (e) {
                var sizeElementActive = document.querySelector('.size-element.active')
                if (sizeElementActive) {
                    sizeElementActive.classList.remove('active')
                }
                sizeElement.classList.add('active')
            }
        })

        minusBtn.onclick = function (e) {
            if (numberOfProduct.value == 1) {
                return;
            }
            else {
                numberOfProduct.value--;
            }

        }

        addBtn.onclick = function () {
            if (numberOfProduct.value == product.quantity) {
                return;
            }
            else {
                numberOfProduct.value++;
            }
        }
        clickBuyBtn()
        renderCart()
    })






