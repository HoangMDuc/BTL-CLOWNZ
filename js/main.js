import handleClickCategory from "./clickCategory.js"
import handleClickProducts from "./clickProduct.js"
import { Load } from "./load_user.js"
import renderCart from "./renderCart.js"
import renderMenu from "./renderMenu.js"

if (sessionStorage.getItem('login') === null) {
    sessionStorage.setItem('login', false)
}
if (sessionStorage.getItem('product_id') === null) {
    sessionStorage.setItem('product_id', '')

}
if (sessionStorage.getItem('category_id') === null) {
    sessionStorage.setItem('category_id', '')
}


// if(localStorage.getItem('category_id') == undefined) {
//     localStorage.setItem('category_id','') 
// }

if (sessionStorage.getItem('cart-items') == null) {
    sessionStorage.setItem('cart-items', JSON.stringify({
        // 'user_id': JSON.parse(sessionStorage.getItem('usersAccount'))["id"],
        'list-items': []
    }))
}

Load.start()

renderCart()

const App = {
    start() {
        Promise.all([this.loadArrival(),
        this.loadTop(),
        this.loadBottom(),
        this.loadAccessory()])
            .then(() => {
                this.handleEvents();
            })
        this.loadSlider()
        renderMenu()
        .then( () => {
            handleClickCategory()
        })
    },
    handleEvents() {
        handleClickProducts()
        

    },
    loadSlider() {
        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/slider")
            .then(res => res.json())
            .then(sliders => {
                var htmls = sliders.map((slider, index) => {
                    if (index == 0) {
                        return `
                        <div class="carousel-item active" data-bs-interval="1500">
                            <img src=".${slider.image}" class="d-block w-100" alt="..." style="height: 459.44px;">
                        </div>
                    `
                    } else {
                        return `
                        <div class="carousel-item" data-bs-interval="1500">
                            <img src=".${slider.image}" class="d-block w-100" alt="..." style="height: 459.44px;">
                        </div>
                    `
                    }

                })
                document.querySelector('.carousel-inner').innerHTML = htmls.join('') + document.querySelector('.carousel-inner').innerHTML
            })
    },
    loadArrival() {
        return (
            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz" + "/products?sortBy=date&order=desc&p=1&l=4")
                .then(res => res.json())
                .then(products => {
                    var htmls = products.map(product => {
                        return `
                    <div class="col-3">
                        <a href="./product/product.html" class="text-decoration-none text-dark product-card" data-index=${product.id}>
                            <div class="card text-center position-relative border-0">
                                <img class="card-img-top" src="${product.image}" alt="Backbag">
                                <span class="position-absolute card-sticker">New Arrial</span>
                                <div class="card-body" style="height:111px;">
                                    <h4 class="text-uppercase">${product.title}</h4>
                                    <h3 class="text-uppercase">${product.name}</h3>
                                    <strong>${product.price}đ</strong>
                                </div>
                            </div>
                            <div class="product-card__actions">
                            <button class="btn-see-more btn-main m-0 btn-detail">CHI TIẾT</button>
                        </div>
                        </a>
                    </div>`
                    })
                    document.querySelector('.products-arrival').innerHTML = htmls.join('')
                })
        )
    },
    loadTop() {

        return (


            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
                .then(res => res.json())
                .then(categories => {
                    var parentCategoryId = [3]

                    var tempCateogyId = [3]
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
                    console.log(parentCategoryId)
                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
                        .then(res => res.json())
                        .then(productsList => {
                            var products = productsList.filter((product) => {
                                return parentCategoryId.includes(product.category_id)
                            })
                            if (products.length > 4) {
                                var products = products.splice(0, 4)
                            }
                            console.log(products)
                            var htmls = products.map(product => {
                                return `
                                <div class="col-3">
                                    <a href="./product/product.html" class="text-decoration-none text-dark product-card" data-index=${product.id}>
                                        <div class="card text-center border-0">
                                            <img class="card-img-top "
                                                src=".${product.image}"
                                                alt="Backbag">
                                            <div class="card-body" style="height: 111px">
                                                <h4 class="text-uppercase">${product.title}</h4>
                                                <h3 class="text-uppercase">${product.name}</h3>
                                                <strong>${product.price}</strong>
                                            </div>
                                        </div>
                                        <div class="product-card__actions">
                                            <button class="btn-see-more btn-main m-0 btn-detail">CHI TIẾT</button>
                                        </div>

                                    </a>
                                </div>`

                            })
                            document.querySelector('.products-top').innerHTML = htmls.join('')

                        })
                })
        )
    },
    loadBottom() {
        return (

            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
                .then(res => res.json())
                .then(categories => {
                    var parentCategoryId = [4]

                    var tempCateogyId = [4]
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
                    console.log(parentCategoryId)
                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
                        .then(res => res.json())
                        .then(productsList => {
                            var products = productsList.filter((product) => {

                                return parentCategoryId.includes(product.category_id)
                            })
                            if (products.length > 4) {
                                var products = products.splice(0, 4)
                            }
                            var htmls = products.map(product => {
                                return `
                                <div class="col-3">
                                    <a href="./product/product.html" class="text-decoration-none text-dark product-card" data-index=${product.id}>
                                        <div class="card text-center border-0">
                                            <img class="card-img-top "
                                                src="./${product.image}"
                                                alt="Backbag">
                                            <div class="card-body" style="height: 111px">
                                                <h4 class="text-uppercase">${product.title}</h4>
                                                <h3 class="text-uppercase">${product.name}</h3>
                                                <strong>${product.price}</strong>
                                            </div>
                                        </div>
                                        <div class="product-card__actions">
                                            <button class="btn-see-more btn-main m-0 btn-detail">CHI TIẾT</button>
                                        </div>

                                    </a>
                                </div>`

                            })
                            document.querySelector('.products-bottom').innerHTML = htmls.join('')

                        })
                })
        )
    },
    loadAccessory() {
        return (

            fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
                .then(res => res.json())
                .then(categories => {
                    var parentCategoryId = [5]

                    var tempCateogyId = [5]
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
                    console.log(parentCategoryId)
                    fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/products")
                        .then(res => res.json())
                        .then(productsList => {
                            var products = productsList.filter((product) => {

                                return parentCategoryId.includes(product.category_id)
                            })
                            if (products.length > 4) {
                                var products = products.splice(0, 4)
                            }
                            var htmls = products.map(product => {
                                return `
                                <div class="col-3">
                                    <a href="./product/product.html" class="text-decoration-none text-dark product-card" data-index=${product.id}>
                                        <div class="card text-center border-0">
                                            <img class="card-img-top "
                                                src="./${product.image}"
                                                alt="Backbag">
                                            <div class="card-body" style="height: 111px">
                                                <h4 class="text-uppercase">${product.title}</h4>
                                                <h3 class="text-uppercase">${product.name}</h3>
                                                <strong>${product.price}</strong>
                                            </div>
                                        </div>
                                        <div class="product-card__actions">
                                            <button class="btn-see-more btn-main m-0 btn-detail">CHI TIẾT</button>
                                        </div>

                                    </a>
                                </div>`

                            })
                            document.querySelector('.products-accessory').innerHTML = htmls.join('')

                        })
                })
        )
    },
    
}

App.start();




// [
//     {
//         "name": "BASIC FOR LIFE T-SHIRT",
//         "price": 299000,
//         "category_id": "3",
//         "quantity": 55,
//         "image": [
//             "img/top/tshirts/sp1.1.jpg"
//         ],
//         "type_id": "1",
//         "date": "date 1",
//         "title": "TEES AND POLO SHIRTS",
//         "description": [
//             "mô tả 1"
//         ],
//         "id": "1"
//     },
//     {
//         "name": "C LETTER T-SHIRT",
//         "price": 379000,
//         "category_id": "3",
//         "quantity": 55,
//         "image": [
//             "img/top/tshirts/c-letter.webp"
//         ],
//         "type_id": "1",
//         "date": "date 2",
//         "title": "TEES AND POLO SHIRTS",
//         "description": [],
//         "id": "2"
//     },
//     {
//         "name": "CLOWNZ SKULL T_SHIRT",
//         "price": 349000,
//         "category_id": "3",
//         "quantity": 60,
//         "image": [
//             "img/top/tshirts/sp1.2.jpg"
//         ],
//         "type_id": "1",
//         "date": "date 3",
//         "title": "TEES AND POLO SHIRTS",
//         "description": [],
//         "id": "3"
//     },
//     {
//         "name": "CLOWNZ LEO PARTSHIRT",
//         "price": 399000,
//         "category_id": "3",
//         "quantity": 19,
//         "image": [
//             "/img/top/shirts/sp4.1.jpg"
//         ],
//         "type_id": "2",
//         "date": "4",
//         "title": "SƠ MI & FLANNEL SHIRTS",
//         "description": [],
//         "id": "4"
//     },
//     {
//         "name": "Z-BOT APOCALYPSE T-SHIRT",
//         "price": 349000,
//         "category_id": "1",
//         "quantity": 96,
//         "image": [
//             "/img/z-bot capsule/sp1.webp"
//         ],
//         "type_id": "2",
//         "date": "date 5",
//         "title": "TEES AND POLO SHIRTS",
//         "description": [],
//         "id": "5"
//     },
//     {
//         "name": "DIAMOND Z-BOT T-SHIRT",
//         "price": 349000,
//         "category_id": "1",
//         "quantity": 63,
//         "image": [
//             "/img/z-bot capsule/sp2.webp"
//         ],
//         "type_id": "2",
//         "date": "date 6",
//         "title": "TEES AND POLO SHIRTS",
//         "description": [],
//         "id": "6"
//     },
//     {
//         "name": "CLOWNZ GOOD VIBE T-SHIRT",
//         "price": 379000,
//         "category_id": "2",
//         "quantity": 33,
//         "image": [
//             "/img/young_wild n'trippy/sp1.webp"
//         ],
//         "type_id": "1",
//         "date": "date 7",
//         "title": "TEES & POLO SHIRTS",
//         "description": [],
//         "id": "7"
//     },
//     {
//         "name": "CLOWNZ LEOPARD PANTS",
//         "price": 349000,
//         "category_id": "4",
//         "quantity": 16,
//         "image": [
//             "/img/bottom/pants/sp3.1.png"
//         ],
//         "type_id": "6",
//         "date": "date 8",
//         "title": "SHORTS AND TRUNKS",
//         "description": [
//             "desc1"
//         ],
//         "id": "8"
//     },
//     {
//         "name": "CLOWNZ CRYSTAL CLEAR MINI BAG",
//         "price": 399000,
//         "category_id": "5",
//         "quantity": 16,
//         "image": [
//             "/img/accessory/bag/sp1.jpg"
//         ],
//         "type_id": "8",
//         "date": "date 9",
//         "title": "TÚI CHÉO",
//         "description": [],
//         "id": "9"
//     },
//     {
//         "name": "CLOWNZ RACING FLAMES JEANS",
//         "price": 649000,
//         "category_id": "4",
//         "quantity": 16,
//         "image": [
//             "/img/bottom/jeans&denim/1-13.jpg"
//         ],
//         "type_id": "6",
//         "date": "date 10",
//         "title": "PANTS AND JEANS",
//         "description": [],
//         "id": "10"
//     },
//     {
//         "name": "CLOWNZ RACING FLAMES WIND PANTS",
//         "price": 399000,
//         "category_id": "4",
//         "quantity": 16,
//         "image": [
//             "/img/bottom/pants/24.jpg"
//         ],
//         "type_id": "5",
//         "date": "date 11",
//         "title": "PANTS AND JEANS",
//         "description": [],
//         "id": "11"
//     },
//     {
//         "name": "FINISH LINE TRACK PANTS",
//         "price": 449000,
//         "category_id": "4",
//         "quantity": 16,
//         "image": [
//             "/img/bottom/pants/sp5.1.jpg"
//         ],
//         "type_id": "5",
//         "date": "date 12",
//         "title": "PANTS AND JEANS",
//         "description": [],
//         "id": "12"
//     },
//     {
//         "name": "CLONWZ UTILITY CROSSBAG",
//         "price": 449000,
//         "category_id": "5",
//         "quantity": 16,
//         "image": [
//             "/img/accessory/bag/sp1.webp"
//         ],
//         "type_id": "8",
//         "date": "date 13",
//         "title": "TÚI CHÉO",
//         "description": [],
//         "id": "13"
//     },
//     {
//         "name": "CLONWZ C LETTER CAP",
//         "price": 299000,
//         "category_id": "5",
//         "quantity": 16,
//         "image": [
//             "/img/accessory/hat/c-letter-cap.webp"
//         ],
//         "type_id": "9",
//         "date": "date 14",
//         "title": "CAPS",
//         "description": [],
//         "id": "14"
//     },
//     {
//         "name": "CLONWZ SPORTY CAP",
//         "price": 299000,
//         "category_id": "5",
//         "quantity": 16,
//         "image": [
//             "/img/accessory/hat/sporty-cap.png"
//         ],
//         "type_id": "9",
//         "date": "date 15",
//         "title": "CAPS",
//         "description": [],
//         "id": "15"
//     }
// ]