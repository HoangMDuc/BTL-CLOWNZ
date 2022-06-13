import addProductQuantity from "../js/handleAddProductQuantity.js"
import clickDeleteProductBtn from "./clickdeleteProductBtn.js";
import reduceProductQuantity from "./handleReduceProductQuantity.js";

export default function renderCart() {
    var tongTien = 0;
    var totalProduct = 0;
    var cartItemList = JSON.parse(sessionStorage.getItem('cart-items'))["list-items"]
    if (cartItemList.length != 0) {
        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
            .then(res => res.json())
            .then(products => {
                var htmls = cartItemList.map((cartItem, index) => {
                    totalProduct += Number(cartItem["quantity"])
                    var product = products.find((item) => {
                        return item.id == cartItem.product_id
                    })
                    tongTien += cartItem["quantity"] * product.price
                    var source;

                    if (window.location.href.indexOf("/index.html") != -1) {

                        source = "." + product.image[0]
                    } else {

                        source = ".." + product.image[0]
                    }
                    return `
                    <li class="d-flex shopping-item gap-5 mb-2">
                            <img src="${source}" alt="" class="shopping-item-img">
                                <div class="shopping-item-info">
                                    <h4 class="shopping-item-name mb-2">${product.name}</h4>
                                    <div class="product-price" data-index=${index}>${product.price}</div>
                                    <div class="quantity-select d-flex w-50 mt-3">
                                        <span class="reduce-quantity border px-3" data-index="${index}" >-</span>
                                        <input type="number" readonly class="color-element border bg-white text-dark fw-bolder shopping-item-quantity" value="${cartItem["quantity"]}" min="1" max= ${product.quantity}" data-index="${index}" style="width:40px;">
                                        <span class="raise-quantity border px-3" data-index="${index}" >+</span>
                                        <i class="fa-solid fa-xmark cart-delete px-1 ms-5"></i>
                                    </div>
                                </div>
                        </li>
                    
                    `
                })
                // <input type="number" readonly class="color-element border bg-white text-dark fw-bolder shopping-item-quantity" value="${cartItem["quantity"]}" min="1" max= ${product.quantity}" data-index="${index}">
                document.querySelector('.cart-quantity').textContent = totalProduct
                document.querySelector('.shopping-list').innerHTML = htmls.join('') + `
                        <div class="d-flex justify-content-between ps-3 pe-4 mt-2 fs-4">
                        <p class="total-price-text fw-light text-dark">
                            Tổng tiền:
                        </p>
                        <div class="total-price text-danger">${tongTien}</div>
                    </div>
                `

                document.querySelector('.btn-container').innerHTML = `<div class="row pb-2 btn-container">
                <div class="col-6">
                    <button class="btn-pay btn-see-more w-100 m-0 ">
                        <a href="../payment/payment.html" class="text-decoration-none text-light">Thanh toán</a>
                    </button>
                </div>
                <div class="col-6">
                    <button class="btn-pay btn-see-more w-100 m-0">
                        <a href="../cart_shopping/cart_shopping.html" class="text-decoration-none text-light">Giỏ hàng</a>
                    </button>
                </div>
                </div>`
                clickDeleteProductBtn()
                addProductQuantity()
                reduceProductQuantity()
            })
       

    } else {
        document.querySelector('.shopping-list').innerHTML = `
        <img src="https://cdn.glitch.global/e2574871-198c-4501-b55d-72f80a1b636a/empty-cart.png?v=1654910380833" class="empty-cart"/></img>
        `
        document.querySelector('.btn-container').innerHTML = ''
        document.querySelector('.cart-quantity').textContent = '0'
        addProductQuantity()
        reduceProductQuantity()
    }

}

