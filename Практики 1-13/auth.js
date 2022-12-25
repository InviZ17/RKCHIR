// let result = prompt('Желаете пройти регистрацию на сайте?');

// if (result == 'Да') {
//     alert("Круто!");
//     let login = prompt('Введите свой логин в поле ниже');

//     if (login == 'Админ') {
//         let pass = prompt('Введите пароль!');

//         if (pass == "Я главный") {
//             alert("Здравствуйте!");
//         } else if (pass == '' || pass == null) {
//             alert("Отменено!");
//         } else {
//             alert("Неверный пароль!");
//         }
//     } else if (login == '' || login == null) {
//         alert("Отменено!");
//     } else {
//         alert("Я вас не знаю!");
//     }
// } else {
//     alert("Попробуй ещё раз!");
// }


window.onload = function() {
const randomSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let canvas = document.getElementById('captchaCanvas').getContext('2d');
    let captchaInput = document.getElementById("enterCaptcha");
    let checkSum = false,
        a = 0,
        b = 0;
    let captcha = {
        code: "",
        refresh() {
            this.code = "";
            for (let i = 0; i < 5; i++) {
                this.code += randomSymbols[Math.floor(Math.random() * randomSymbols.length)];
            }
            return this.code;
        }
    }

    function refreshCanvas() {
        captchaInput.value = "";
        captcha.refresh();
        canvas.canvas.width = 150;
        canvas.font = "italic 20pt Arial";
        canvas.fillStyle = "white";
        canvas.fillRect(0, Math.random() * 20 + 10, canvas.measureText(captcha.code).width + 5, 2);
        canvas.fillText(captcha.code, 0, 30);
    }

    function refreshCanvasSumm() {
        captchaInput.value = "";
        canvas.canvas.width = 150;
        canvas.font = "italic 20pt Arial";
        canvas.fillStyle = "white";
        a = Math.floor(Math.random() * 100);
        b = Math.floor(Math.random() * 100);
        canvas.fillRect(0, Math.random() * 20 + 10, canvas.measureText(captcha.code).width + 5, 2);
        canvas.fillText(a + " + " + b, 0, 30);
    }

    refreshCanvas();
    refresh.onclick = () => refreshCanvas();
    submitCaptcha.onclick = function() {
        if (captchaInput.value === "") {
            alert("Поле ввода пусто! Повторите попытку");
            return false;
        }
        if (checkSum) {
            checkSum = false;
            if (Number(captchaInput.value) === (a + b)) {
                alert("Каптча пройдена");
                refreshCanvas();
                return true;
            } else {
                alert("Неверная сумма! Попробуйте снова");
                refreshCanvas();
                return false;
            }
        }
        if (captchaInput.value === captcha.code) {
            alert("Каптча пройдена");
            refreshCanvas();
            return true;
        } else {
            refreshCanvasSumm();
            checkSum = true;
        }
    }
}