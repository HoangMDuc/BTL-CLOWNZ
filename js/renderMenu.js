export default function  renderMenu() {
    return (
        fetch("https://62890e4b10e93797c162141e.mockapi.io/clownz/categories")
        .then(res => res.json())
        .then(categories => {
            var htmls = renderCategory('undefined', categories)
            if(JSON.parse(sessionStorage.getItem('usersAccount')) != undefined) {
                if(JSON.parse(sessionStorage.getItem('usersAccount'))["isAdmin"] == true) {
                    var adminLink 
                    if(window.location.href.indexOf('index.html') != -1) {
                        adminLink = './admin/home.html'
                    }else {
                        adminLink = '../admin/home.html'
                    }
                    document.querySelector('.navbar-nav').innerHTML = htmls.join('') +  `<li class="nav-item p-3">
                        <a class="nav-link hover-text p-0 text-dark admin-link"
                            href="${adminLink}">TRANG QUẢN TRỊ</a>
                        </li>`
                }else {
                    document.querySelector('.navbar-nav').innerHTML = htmls.join('')
                }
                
            }else {
                document.querySelector('.navbar-nav').innerHTML = htmls.join('')

            }
        })

    )

    function renderCategory(id, categories) {
        var ids = []
        categories.forEach((category) => {
            if (category.parent_category_id == id) {
                if(category.id != 6) {
                    ids.push(category.id)
                }
                
            }
        })
        var categoryItems = categories.filter((category) => {
            return ids.includes(category.id)
        })
        if (categoryItems.length == 0) {
            return ''
        } else {
            return (
                categoryItems.map(categoryItem => {
                    var subCategories = categories.filter((category) => {
                        return category.parent_category_id == categoryItem.id
                    })
                    if (subCategories.length == 0) {
                        return `
                        <li class="nav-item p-3">
                            <a class="nav-link hover-text p-0 text-dark category-item" aria-current="page"
                                href="./category/category.html" data-index=${categoryItem.id}>${categoryItem.name}</a>
                        </li>
                        `
                    } else {
                        return `
                        <li class="nav-item p-3 dropdown">
                            <a class="nav-link hover-text p-0 dropdown-toggle text-dark category-item" href="#"
                                id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false" data-index=${categoryItem.id}>
                                ${categoryItem.name}
                            </a>
                            <ul class="dropdown-menu border-0 ${categoryItem.parent_category_id == 'undefined' ? "" : "submenu"}"
                                aria-labelledby="offcanvasNavbarDropdown">
                                ${renderCategory(categoryItem.id, categories).join('')}
                            </ul>
                        </li>
                    `
                    }
                })
            )
        }

    }
}