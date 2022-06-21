import renderCart from "../js/renderCart.js";
import handleClickCategory from "../js/clickCategory.js"
import handleClickProducts from "../js/clickProduct.js"
import { Load } from "../js/load_user.js";
Load.start()
var cartItemList = JSON.parse(sessionStorage.getItem('cart-items'))["list-items"]

if(cartItemList.length == 0) {
    document.querySelector('.total-product').textContent = "0"
    document.querySelector('.shopping-item-container').classList.add('flex-column', 'align-items-center', 'justify-content-center')
    document.querySelector('.shopping-item-container').innerHTML = `
    <img src="https://cdn.glitch.global/e2574871-198c-4501-b55d-72f80a1b636a/empty-cart.png?v=1654910380833" class="empty-cart"/></img>
    <button class="btn-see-more btn-continue">
        <a href="../index.html" class="text-decoration-none text-light">TIẾP TỤC MUA HÀNG</a>
    </button>
    `
    renderCart()
}else {
    renderShoppingCart()
    .then( () => {
        renderCart()
    })
}

export default function renderShoppingCart() {
        var tongTien = 0;
        var totalProduct = 0;
        return (
            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
            .then( res => res.json ())
            .then(products => {
                var htmls = cartItemList.map((cartItem, index) => {
                    totalProduct += Number(cartItem["quantity"])
                    var product = products.find((item) => {
                        return item.id == cartItem.product_id
                    })
                    tongTien += cartItem["quantity"] * product.price
                    return `
                    <div class="product-card col-12 mb-3 shopping-item" data-index=${index} >
                    <a class="text-decoration-none text-dark d-flex align-items-center ">
                        <img class="img-product-cart" src="..${product.image[0]}" alt="">
                            <div>
                                <div class="p-5">
                                    <p class="hover-text">${product.name} / ${cartItem["size"]}</p>
                                    <span class="text-danger cart-delete" data-index=${index}>Xoá</span>
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
                // console.log(products)
                // var shoppingItemContainer = document.querySelector('.shopping-item-container')
                // var deleteBtns = shoppingItemContainer.querySelectorAll('.cart-delete')
                // console.log(deleteBtns)
                // deleteBtns.forEach( (deleteBtn) => {
                //     deleteBtn.onclick = function() {
                //         alert(1)
                //     }
                // })
            })
            
            
        )
            

    

}



handleClickProducts()
handleClickCategory()

