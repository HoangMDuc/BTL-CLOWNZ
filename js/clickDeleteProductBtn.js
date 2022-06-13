import renderCart from "./renderCart.js"

export default function clickDeleteProductBtn () {

    var deleteBtns = document.querySelectorAll('.cart-delete')
    deleteBtns.forEach( (deleteBtn) => {
        deleteBtn.onclick = function() {
            var index = deleteBtn.dataset.index
            var cartItems = JSON.parse(sessionStorage.getItem('cart-items'))["list-items"]
            cartItems.splice(index,1)
            sessionStorage.setItem('cart-items', JSON.stringify({
                "list-items" : cartItems
            }))
            renderCart()
        }
    })
}

