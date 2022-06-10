export default function handleClickType() {
    var types = document.querySelectorAll('.type-item')
    Array.from(types).forEach(type => {
        type.onclick = function(e) {
            e.preventDefault();
            sessionStorage.setItem('type_id',JSON.stringify(type.dataset.index))
            sessionStorage.setItem('category_id',JSON.stringify(''))
            window.location.href = '../category/category.html'
        }
    })
}

