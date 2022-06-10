const validates = {
    isRequired: function (input) {
        if (input.value.trim() == "") {
            input.classList.add("invalid")
            input.nextElementSibling.textContent = "Vui lòng nhập trường này";
            return false
        }
        else {
            return true
        }
    },
    isTel: function (input) {
        if (this.isRequired(input)) {
            if (input.value.trim().replace(" ", "").length != 10) {
                input.classList.add("invalid")
                input.nextElementSibling.textContent = "Số điện thoại không hợp lệ";
                return false
            }
            else {
                return true
            }
        }
        else {
            return false;
        }

    },
    isEmail: function (input) {

        if (this.isRequired(input)) {
            if (input.value.trim() != "") {
                var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if (!regex.test(input.value)) {
                    input.classList.add("invalid")
                    input.nextElementSibling.textContent = "Nhập sai định dạng email";
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        } else {
            return false
        }

    },
    isPassword: function (input) {
        if (input.value.trim().length < 6) {
            input.classList.add("invalid")
            input.nextElementSibling.textContent = "Mật khẩu tối thiểu phải có 6 kí tự";
            return false
        }
        else {
            return true
        }
    },
    isConfirmPassword: function(input1,input2) {
        if (input1.value.trim().length < 6) {
            input1.classList.add("invalid")
            input1.nextElementSibling.textContent = "Mật khẩu tối thiểu phải có 6 kí tự";
            return false
        } else if (input2.value.trim().length < 6) {
            input2.classList.add("invalid")
            input2.nextElementSibling.textContent = "Mật khẩu tối thiểu phải có 6 kí tự";
            return false
        }
        else if(input1.value.trim() !== input2.value.trim()) {
            input2.classList.add("invalid")
            input2.nextElementSibling.textContent = "Mật khẩu không trùng khớp";
            return false
        }else {
            return true
        }
    }
}

export default validates