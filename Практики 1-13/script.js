// var count=0;
// const heart = document.querySelector("body");
// document.querySelector('#like_button').onclick = function() {
//     if (like_button.style.backgroundColor == 'white') {
//         like_button.style.backgroundColor = 'red';
//         like_button.style.color = 'white';
        
//         heart.addEventListener("mousemove", (event) => {
//             const xPos = event.pageX;
//             const yPos = event.pageY;
//             const spanEl = document.createElement("span");
//             spanEl.style.left = xPos + "px";
//             spanEl.style.top = yPos + "px";
//             heart.appendChild(spanEl);
//             count+=1;
            
//             if (like_button.style.backgroundColor == 'red') {
//                 spanEl.style.visibility = "visible";
//             } else {
//                 spanEl.style.visibility = "hidden";
//             }
//         });

//     } else {
//         for (let index = 0; index < count; index++) {
//             heart.removeChild(heart.lastChild);
            
//         }
//         count=0;
//         like_button.style.backgroundColor = 'white';
//         like_button.style.color = 'black';
//     }
// };

counter = 3;
function notification_plus() {
    num = document.querySelector(".indicator");
    counter += 1; // увеличиваем количество уведомлений
    num.innerHTML = counter;

    // Создаём структуру нового уведомления
    let new_li = document.createElement('li');

    let new_span = document.createElement('span');
    new_span.classList.add('icon');

    let new_i = document.createElement('i');
    new_i.classList.add('fa-solid');
    new_i.classList.add('fa-user');

    let new_span1 = document.createElement('a');
    new_span1.classList.add('text');
    new_span1.textContent = "Новое уведомление!";

    // Формируем новое уведомление
    new_span.appendChild(new_i);

    new_li.appendChild(new_span);
    new_li.appendChild(new_span1);

    // Добавляем созданное уведомление
    let out_ul = document.querySelector(".dropdown-content");
    out_ul.appendChild(new_li);
}
let notify_plus = setInterval(notification_plus, 3000);

window.onload = function() {
    
    let value;
    //CART
    let cartItems = document.querySelector('.charity p span');
    let shoppingButtons = document.querySelector('.charity button');
    let accum = new Accumulator(1000);
    shoppingButtons.onclick = () => {
        
        addToCart();
    }
    function Accumulator(startingValue) {
        value = startingValue;
        cartItems.innerHTML = value;
        this.read = () => {
            check = Number(prompt("Введите сумму пожертвования: ", "0"));
            if (isNaN(check)){
                alert("Ошибка");
            }
            else {
                value += check;
            }
            
        }
    }

    function addToCart() {
        accum.read();
        if (value > 0) cartItems.innerHTML = value;
    }

        

    //STRINGS
    function truncate(str, maxlength) {
        if (str.length > maxlength) {
            str = str.substring(0, maxlength - 3);
            str += "...";
        }
        return str;
    }

    let cards = document.querySelectorAll('.textShortage p');
    for (let i = 0; i < cards.length; i++) {
        cards[i].innerHTML = truncate(cards[i].innerHTML, 25);
    }
}

//Массив с товарами
let mas = [];
let items = document.querySelectorAll('.elem');

for (i = 0; i < items.length; i++)
    mas.push(items[i]);

let replace = document.getElementById('replace');
let rem = document.getElementById('remove');

let buff,buffcollor;
let f = 0;

//Замена товаров
replace.onclick = function() {
    if (mas.length>1){
    let n = Math.floor(Math.random() * mas.length);
    let m = Math.floor(Math.random() * mas.length);
    while (n==m) m = Math.floor(Math.random() * mas.length);
    buff = mas[n].innerHTML;
    buffcollor = mas[n].style.backgroundColor;
    mas[n].innerHTML = mas[m].innerHTML;
    mas[n].style.backgroundColor = mas[m].style.backgroundColor;
    mas[m].innerHTML = buff;
    mas[m].style.backgroundColor = buffcollor;
    
    /*if (f == 0) {
        f = 1;

        //alert(mas[2].innerHTML + " -> " + mas[4].innerHTML);
        buff = mas[2].innerHTML;
        mas[2].innerHTML = mas[4].innerHTML;
        mas[4].innerHTML = buff;
    } else {
        f = 0;

        //alert(mas[1].innerHTML + " -> " + mas[3].innerHTML);
        buff = mas[1].innerHTML;
        mas[1].innerHTML = mas[3].innerHTML;
        mas[3].innerHTML = buff;
    }*/
}
};

let f1 = 0;

//Удаление первого товара
rem.onclick = function() {
    //if (f1 == 0) {
        f1 = 1;
        mas[0].style.display = "none";
        mas.splice(0,1);
    //} else {
        f1 = 0;
        //mas[0].style.display = "block";
    //}
}

//Заполнение массива элементами
let filt = [];
let a = document.querySelectorAll('.filt_elm');

for (i = 0; i < a.length; i++)
    filt.push(a[i].innerHTML);

filt = filt.map(item => Number(item));


let filting = document.getElementById('filting');

filting.onclick = function() {
    let min = Number(prompt("Введите нижнюю границу диапазона", "0"));
    let max = Number(prompt("Введите верхнюю границу диапазона", "1000"));

    //alert("Производится вывод элементов в диапазоне [" + min + ";" + max + "]");

    //Условие присвоения значений новому массиву, исходя из диапазона
    let new_filt = filt.filter((a) => {
        if (a >= min && a <= max) return true;
        return false;
    });
    
    let f = document.getElementsByClassName('new_f')
    //Очищаем предыдущие значения поля вывода
    for (j = 0; j < filt.length; j++) {
        f[j].innerHTML = "";
    }

    //Выводим новые значения в поле вывода, входящие в диапазон
    for (j = 0; j < new_filt.length; j++) {
        f[j].innerHTML = new_filt[j];
    }
    //alert(new_filt);
}


// Сортировка массива по возрастанию
function compareCountsUp(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

// Сортировка массива по убыванию
function compareCountsDown(a, b) {
    if (a > b) return -1;
    if (a == b) return 0;
    if (a < b) return 1;
}

// Выбор метода сортировки массива

sort.onclick = function() {
    let a = document.querySelectorAll('.new_f');
    let new_filt = [];
for (i = 0; i < a.length; i++){
    let n = a[i].innerHTML;
    if (n!=0) new_filt.push(n);
}
    new_filt = new_filt.map(item => Number(item));
    let s = prompt("Как сортировать? (По возрастанию/По убыванию)", "По возрастанию");

    if (s == "По возрастанию")
        new_filt.sort(compareCountsUp);
    if (s == "По убыванию")
        new_filt.sort(compareCountsDown);

    let f1 = document.getElementsByClassName('new_f');

    // Добавляем элементы в новый массив, отсортированный по возрастанию или убыванию
    for (j = 0; j < new_filt.length; j++)
        f1[j].innerHTML = new_filt[j];
}
