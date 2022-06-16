var addSliderBtn = document.querySelector('.add-slider-btn')
var updateSliderBtn = document.querySelector('.update-slider-btn')
var deleteSliderBtn = document.querySelector('.delete-slider-btn')
var formAddSlider = document.querySelector('.form-add-slider')
var cancelBtn = document.querySelector('.cancel-btn')
addSliderBtn.onclick = function(e) {
    e.preventDefault()
    formAddSlider.style.display = 'block'
}

updateSliderBtn.onclick = function(e) {
    e.preventDefault()
    formAddSlider.classList.add('isEditing')
}

cancelBtn.onclick = function() {
    formAddSlider.classList.remove('isEditing')
    formAddSlider.style.display = 'none'
}