import { Load } from "../js/load_user.js";
import handleClickCategory from "../js/clickCategory.js"
import handleClickProducts from "../js/clickProduct.js"
import renderCart from "../js/renderCart.js";
import renderMenu from "../js/renderMenu.js";
var sortRadios = document.querySelectorAll('.form-check-input')

Load.start()
renderCart()
renderMenu()
    .then(() => {
        handleClickCategory()
    })

function renderCategory() {
    var category_id = JSON.parse(sessionStorage.getItem('category_id'))
    var api;
    if (category_id == 6) {
        api = "https://62890e4b10e93797c162141e.mockapi.io/products" + "?sortBy=date&orderby=desc&p=1&l=10"
        fetch(api)
            .then(res => res.json())
            .then(products => {

                fetch("https://62890e4b10e93797c162141e.mockapi.io/categories/" + category_id)
                    .then(res => res.json())
                    .then((data) => {

                        document.querySelector('.card-background').style.backgroundImage = `url('..${data.image}')`
                        document.querySelector('.category-name').textContent = data.name
                    })

                var htmls = products.map(product => {
                    return `
                <div class="col-4">
                    <a href="#" class="product-card text-decoration-none text-dark" data-index = ${product.id}>
                        <div class="card text-center">
                            <img class="card-img-top"
                                src="..${product.image}"
                                alt="">
                            <div class="card-body">
                                <h4 class="text-uppercase">${product.title}</h4>
                                <h3 class="text-uppercase">${product.name}</h3>
                                <strong>${product.price}đ</strong>

                            </div>
                        </div>
                    </a>
                </div>
                `
                })
                document.querySelector('.product-list').innerHTML = htmls.join('')
                handleClickProducts()
            })
    } else {
        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
            .then(res => res.json())
            .then(categories => {
                var parentCategoryId = [Number(category_id)]

                var tempCateogyId = [Number(category_id)]
                while (tempCateogyId.length != 0) {
                    var ids = []
                    categories.forEach((category) => {
                        if (tempCateogyId.includes(category.parent_category_id)) {
                            ids.push(Number(category.id))
                        }
                    })
                    if (ids.length != 0) {
                        parentCategoryId = parentCategoryId.concat(ids)
                        tempCateogyId = ids
                    } else {
                        tempCateogyId = []
                    }
                }
                return parentCategoryId
            })
            .then(parentCategoryId => {

                fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products?sortby=name&orderby=asc")
                    .then(res => res.json())
                    .then(productsList => {
                        var products = productsList.filter((product) => {

                            return parentCategoryId.includes(product.category_id)
                        })
                        fetch("https://62890e4b10e93797c162141e.mockapi.io/categories/" + category_id)
                            .then(res => res.json())
                            .then((data) => {

                                document.querySelector('.card-background').style.backgroundImage = `url('..${data.image}')`
                                document.querySelector('.category-name').textContent = data.name
                            })

                        var htmls = products.map(product => {
                            return `
                                <div class="col-4">
                                    <a href="#" class="product-card text-decoration-none text-dark" data-index = ${product.id}>
                                        <div class="card text-center">
                                            <img class="card-img-top"
                                                src="..${product.image}"
                                                alt="">
                                            <div class="card-body">
                                                <h4 class="text-uppercase">${product.title}</h4>
                                                <h3 class="text-uppercase">${product.name}</h3>
                                                <strong>${product.price}đ</strong>

                                            </div>
                                        </div>
                                    </a>
                                </div>
                                `
                        })
                        document.querySelector('.product-list').innerHTML = htmls.join('')

                        handleClickProducts()
                    })
                return parentCategoryId
            })
            .then((parentCategoryId) => {
                sortRadios.forEach(sortRadio => {
                    sortRadio.onclick = function () {
                        console.log("https://62890e4b10e93797c162141e.mockapi.io/clownz/products?" + sortRadio.value)
                        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products?" + sortRadio.value)
                            .then(res => res.json())
                            .then(productsList => {
                                var products = productsList.filter((product) => {

                                    return parentCategoryId.includes(product.category_id)
                                })
                                fetch("https://62890e4b10e93797c162141e.mockapi.io/categories/" + category_id)
                                    .then(res => res.json())
                                    .then((data) => {

                                        document.querySelector('.card-background').style.backgroundImage = `url('..${data.image}')`
                                        document.querySelector('.category-name').textContent = data.name
                                    })

                                var htmls = products.map(product => {
                                    return `
                                <div class="col-4">
                                    <a href="#" class="product-card text-decoration-none text-dark" data-index = ${product.id}>
                                        <div class="card text-center">
                                            <img class="card-img-top"
                                                src="..${product.image}"
                                                alt="">
                                            <div class="card-body">
                                                <h4 class="text-uppercase">${product.title}</h4>
                                                <h3 class="text-uppercase">${product.name}</h3>
                                                <strong>${product.price}đ</strong>

                                            </div>
                                        </div>
                                    </a>
                                </div>
                                `
                                })
                                document.querySelector('.product-list').innerHTML = htmls.join('')

                                handleClickProducts()
                            })
                    }
                })
            })
    }









}



renderCategory()
handleClickProducts()
