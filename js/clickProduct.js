
function handleClickProducts () {
    var products = document.querySelectorAll('.product-card')
    Array.from(products).forEach(product => {
        product.onclick = function(e) {
            e.preventDefault();
            sessionStorage.setItem('product_id',JSON.stringify(product.dataset.index))
            window.location.href = '../product/product.html'
        }
    })
}
export default handleClickProducts