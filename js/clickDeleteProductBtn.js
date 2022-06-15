// import renderShoppingCart from "../cart_shopping/cart-shopping.js"
import renderCart from "./renderCart.js"

export default function clickDeleteProductBtn() {

    var deleteBtns = document.querySelectorAll('.cart-delete')
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.onclick = function () {
            
            var index = deleteBtn.dataset.index
            var cartItemList = JSON.parse(sessionStorage.getItem('cart-items'))["list-items"]
            cartItemList.splice(index, 1)
            sessionStorage.setItem('cart-items', JSON.stringify({
                "list-items": cartItemList
            }))
            renderCart()
            if (cartItemList.length == 0) {
                document.querySelector('.total-product').textContent = "0"
                document.querySelector('.shopping-item-container').classList.add('flex-column', 'align-items-center', 'justify-content-center')
                document.querySelector('.shopping-item-container').innerHTML = `
                <img src="https://cdn.glitch.global/e2574871-198c-4501-b55d-72f80a1b636a/empty-cart.png?v=1654910380833" class="empty-cart"/></img>
                <button class="btn-see-more btn-continue">
                    <a href="../index.html" class="text-decoration-none text-light">TIẾP TỤC MUA HÀNG</a>
                </button>
                `
            } else {
                var tongTien = 0;
                var totalProduct = 0;
                fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
                    .then(res => res.json())
                    .then(products => {
                        var htmls = cartItemList.map((cartItem, index) => {
                            totalProduct += Number(cartItem["quantity"])
                            var product = products.find((item) => {
                                return item.id == cartItem.product_id
                            })
                            tongTien += cartItem["quantity"] * product.price
                            return `
                                <div class="product-card col-12 d-flex align-items-center mb-3 shopping-item" data-index=${index} >
                                <a class="text-decoration-none text-dark">
                                    <img class="img-product-cart" src="..${product.image[0]}" alt="">
                                        <div>
                                            <div class="p-5">
                                                <p class="hover-text">${product.name} / ${cartItem["size"]}</p>
                                                <a href="#" class="text-danger cart-delete" data-index=${index}>Xoá</a>
                                            </div>
                                        </div>
                                        <div class="p-5">
                                            <p class="text-danger product-price" data-index=${index}>${product.price}</p>
                                        </div>
                                        <div class="p-5">
                                            <div class="border d-flex align-items-center" style="width: auto;" >
                                                <button class="bg-white border-0 reduce-quantity" data-index=${index}>
                                                    <h1 class="">-</h1>
                                                </button>
                                                <input type="number" class="color-element bg-white text-dark fw-bolder shopping-item-quantity" value="${cartItem["quantity"]}" min="1" max= ${product.quantity}"
                                                    style="width: 45px;" data-index=${index}>
                                                <button class="bg-white border-0 raise-quantity" data-index=${index}>
                                                        <h1 class="" >+</h1>
                                                </button>
                                            </div>
                                        </div>
                                </a>
                                </div>
                            
                                `
                        })

                        document.querySelector('.total-product').textContent = `${totalProduct}`
                        document.querySelector('.shopping-item-list').innerHTML = htmls.join('')
                        var divbtn = `
                            <span class="ms-4 ps-1">Tạm tính: </span>
                                <strong class="text-danger total-price">${tongTien}</strong>
                                <form action="../payment/payment.html">
                                    <button class="btn-see-more btn-main">THANH TOÁN NGAY</button>
                                </form>
                                <div>
                                    <button class="btn-see-more btn-continue">
                                        <a href="../index.html" class="text-decoration-none text-light">TIẾP TỤC MUA HÀNG</a>
                                    </button>
                                </div>
                            `
                        document.querySelector('.cart-control').innerHTML = divbtn
                    })
            }

        }
    })
}

