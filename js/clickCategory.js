
export default function handleClickCategory() {
    var categories = document.querySelectorAll('.category-item')
    Array.from(categories).forEach(category => {
        category.onclick = function(e) {
            e.preventDefault();
            sessionStorage.setItem('category_id',JSON.stringify(category.dataset.index))
            
            // sessionStorage.setItem('type_id',JSON.stringify(''))
            window.location.href = '../category/category.html'
        }
    })
}