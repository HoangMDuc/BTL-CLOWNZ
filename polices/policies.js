import handleClickCategory from "../js/clickCategory.js";
import { Load } from "../js/load_user.js";
import renderCart from "../js/renderCart.js"
import clickDeleteProductBtn from "../js/clickdeleteProductBtn.js";
import renderMenu from "../js/renderMenu.js";
Load.start()
renderCart()

renderMenu()
.then(() => {
    handleClickCategory()
})