import renderCart from "./renderCart.js"

export default function clickBuyBtn() {
    var buyBtn = document.querySelector('.buy-btn')
    buyBtn.onclick = function () {
        var size = document.querySelector('.size-element.active').textContent
        var product_quantity = document.querySelector('.product-quantity').value
        var cartItems = JSON.parse(sessionStorage.getItem('cart-items'))
        if (!checkItems(cartItems, size)) {
            cartItems["list-items"].push({
                "product_id": JSON.parse(sessionStorage.getItem('product_id')),

                "quantity": product_quantity,
                "size": size
            })
        } else {
            var vt;
            cartItems["list-items"].forEach((element, index) => {
                // console.log(element["product_id"] == JSON.parse(sessionStorage.getItem('product_id')))
                if (element["product_id"] == JSON.parse(sessionStorage.getItem('product_id')) && element["size"] == size) {
                    vt = index
                }
            });
            cartItems["list-items"][vt] = {
                "product_id": JSON.parse(sessionStorage.getItem('product_id')),

                "quantity": product_quantity,
                "size": size
            }
        }

        sessionStorage.setItem('cart-items', JSON.stringify(
            cartItems
        ))
       renderCart()
       console.log('a')
        
    }

    function checkItems(cartItems, size) {
        var item = cartItems["list-items"].find((item) => {
            return (item["product_id"] == JSON.parse(sessionStorage.getItem('product_id')) && item["size"] == size)
        })
        if (item) {
            return true
        }
        return false
    }
}

