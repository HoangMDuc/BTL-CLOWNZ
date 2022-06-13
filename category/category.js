import { Load } from "../js/load_user.js";
import handleClickCategory from "../js/clickCategory.js"
import handleClickType from "../js/clickType.js"
import handleClickProducts from "../js/clickProduct.js"
import renderCart from "../js/renderCart.js";

Load.start()
renderCart()


function renderCategory() {
    var category_id = JSON.parse(sessionStorage.getItem('category_id'))
    var api;
    if (category_id != 6) {
        api = "https://62890e4b10e93797c162141e.mockapi.io/products" + "?category_id=" + category_id + "&sortBy=name&orderby=asc"
    } else {
        api = "https://62890e4b10e93797c162141e.mockapi.io/products" + "?sortBy=date&orderby=desc&p=1&l=10"
    }

    return (

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
                                src="..${product.image[0]}"
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
                handleClickCategory()
                handleClickProducts()
                handleClickType()
            })
    )
}


function renderType() {
    var type_id = JSON.parse(sessionStorage.getItem('type_id'))

    return (
        fetch("https://62890e4b10e93797c162141e.mockapi.io/products" + "?type_id=" + type_id + "&sortBy=name&orderby=asc")
            .then(res => res.json())
            .then(products => {
                fetch("https://629c5b853798759975d46095.mockapi.io/api/products_type/" + type_id)
                    .then(res => res.json())
                    .then((data) => {
                        document.querySelector('.card-background').style.backgroundImage = `url('..${data.image}')`
                        document.querySelector('.category-name').textContent = data.name
                    })

                var htmls = products.map(product => {

                    return `
                    <div class="col-4">
                        <a class="product-card text-decoration-none text-dark" data-index = ${product.id} href="#">
                            <div class="card text-center">
                                <img class="card-img-top"
                                    src="..${product.image[0]}"
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
                handleClickCategory()
                handleClickProducts()
                handleClickType()
            })
    )
}


if (JSON.parse(sessionStorage.getItem('type_id')) != "") {
    renderType()
        .then(() => {
            var radioBts = document.querySelectorAll('.form-check-input')
            Array.from(radioBts).map(radioBt => {
                radioBt.onclick = function () {
                    fetch("https://62890e4b10e93797c162141e.mockapi.io/products" + "?type_id=" + JSON.parse(sessionStorage.getItem('type_id')) + "&" + radioBt.value)
                        .then(res => res.json())
                        .then(products => {
                            var htmls = products.map(product => {

                                return `
                                <div class="col-4">
                                    <a class="product-card text-decoration-none text-dark" data-index = ${product.id} href="#">
                                        <div class="card text-center">
                                            <img class="card-img-top"
                                                src="..${product.image[0]}"
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
                            handleClickCategory()
                            handleClickProducts()
                            handleClickType()
                        })
                }
            })
        })
} else {
    renderCategory()
        .then(() => {
            var radioBts = document.querySelectorAll('.form-check-input')
            Array.from(radioBts).map(radioBt => {
                radioBt.onclick = function () {
                    fetch("https://62890e4b10e93797c162141e.mockapi.io/products" + "?category_id=" + JSON.parse(sessionStorage.getItem('category_id')) + "&" + radioBt.value)
                        .then(res => res.json())
                        .then(products => {
                            var htmls = products.map(product => {

                                return `
                                <div class="col-4">
                                <a class="product-card text-decoration-none text-dark" data-index = ${product.id} href="#">
                                    <div class="card text-center">
                                        <img class="card-img-top"
                                            src="..${product.image[0]}"
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
                            handleClickCategory()
                            handleClickProducts()
                            handleClickType()
                        })
                }
            })
        })
}
handleClickCategory()
handleClickProducts()
handleClickType()