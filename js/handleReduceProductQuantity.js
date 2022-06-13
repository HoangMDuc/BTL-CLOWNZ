import renderCart from "./renderCart.js"

export default function reduceProductQuantity() {
    var raiseQuantityBtns = document.querySelectorAll('.reduce-quantity')
    raiseQuantityBtns.forEach( (raiseQuantityBtn) => {
        raiseQuantityBtn.onclick = function() {
            var cartItems = JSON.parse(sessionStorage.getItem('cart-items'))["list-items"]
            
            var quantityElement = raiseQuantityBtn.parentElement.querySelector('.shopping-item-quantity[data-index="' + raiseQuantityBtn.dataset.index +'"]')
            // console.log('.shopping-item-quantity[data-index="' + raiseQuantityBtn.dataset.index +'"]')
            // console.log(raiseQuantityBtn.parentElement.querySelectorAll('.shopping-item-quantity[data-index="' + raiseQuantityBtn.dataset.index +'"]'))
            
            quantityElement.value--;
            cartItems[raiseQuantityBtn.dataset.index]["quantity"] = quantityElement.value
            
            sessionStorage.setItem('cart-items', JSON.stringify({
                "list-items" : cartItems
            }))
            var totalProduct = document.querySelector('.total-product')
            var cardQuantity = document.querySelector('.cart-quantity')
            cardQuantity.textContent = Number(cardQuantity.textContent) - 1
            if(window.location.href.indexOf('/cart_shopping.html') != -1) {
                totalProduct.textContent = Number(totalProduct.textContent) - 1
            }
            var totalPrices = document.querySelectorAll('.total-price')
            var productPrice = document.querySelector('.product-price[data-index="' + raiseQuantityBtn.dataset.index + '"]')
            Array.from(totalPrices).forEach( (totalPrice) => {
                 totalPrice.textContent = Number(totalPrice.textContent) - Number(productPrice.textContent)
            })
            var quantityElements = document.querySelectorAll('.shopping-item-quantity[data-index="' + raiseQuantityBtn.dataset.index +'"]')
            
            quantityElements.forEach( (element) => {
                element.value = quantityElement.value
            })
             renderCart()
        }
    })
}

