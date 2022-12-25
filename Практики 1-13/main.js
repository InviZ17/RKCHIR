
function confirmRedirect(e) {
    let link = e.target;
    if (e.target.tagName !== "A")
        link = e.target.closest("A");
    if (link.tagName && !confirm(`Перейти на страницу ${link.host}?`))
        e.preventDefault();
}


//Галерея изображений
function changeMainImage(e) {
    if (e.target.tagName === "IMG") {
        let mainImg = document.getElementById("main_image").getElementsByTagName("img")[0];
        let showImage = e.target.cloneNode(true);
        let mainImgDiv = document.getElementById("main_image").getBoundingClientRect();

        let centerX = mainImgDiv.left;
        let centerY = mainImgDiv.top;

        showImage.id = "clonedImage";
        showImage.style.top = "0px";
        showImage.style.left = centerX;
        showImage.style.zIndex = "1";
        showImage.classList.add("prepare_image");
        showImage.classList.add("show_image");

        document.getElementsByClassName("gallery2")[0].appendChild(showImage);
        let imgX = showImage.getBoundingClientRect().left - 400;

        let moveImage = setInterval(function() {
            showImage.style.top = "0px";
            showImage.style.left = centerX;
        }, 1);

        setTimeout(function() {
            showImage.remove();
            clearInterval(moveImage);
            mainImg.src = e.target.src;
        }, 10)
    }
}

//Список
function selectElements(e) {
    let element = e.target;
    let listElements = document.getElementById("list").getElementsByTagName("li");

    if (element.tagName === "LI") {
        if (e.ctrlKey) {
            if (element.classList.contains("selected"))
                element.classList.remove("selected");
            else
                element.classList.add("selected");
        } else {
            for (let i = 0; i < listElements.length; i++) {
                if (listElements[i]!=element)
                listElements[i].classList.remove("selected");
            }
            if (element.classList.contains("selected"))
                element.classList.remove("selected");
            else element.classList.add("selected");
        }
    }
}


//Создание слайдера
let doSlide = false,
    moveDist;
let slider, slideCont, item, clonedItem, totalCost, kart;

onmousedown = function(e) {
    if (e.target.id === "slide") {
        doSlide = true;
        slideCont = document.getElementById("slideContainer");
        slider = e.target;
    }

    item = e.target.closest(".item");

    if (item && !item.classList.contains("clone")) {
        placed = false;
        totalCost = document.getElementById("totalCost");
        kart = document.getElementById("kart");

        clonedItem = item.cloneNode(true);

        clonedItem.ondragstart = function(e) { 
            e.preventDefault();
        }
        clonedItem.classList.add("clone");
        clonedItem.style.position = "absolute";
        document.body.append(clonedItem);
        moveAt(clientX, clientY);
    }
}

function moveAt(pageX, pageY) {
    clonedItem.style.left = pageX - clonedItem.offsetWidth / 2 + 'px';
    clonedItem.style.top = pageY - clonedItem.offsetHeight / 2 + 'px';
}

onmousemove = function(e) {
    if (doSlide) {
        moveDist = e.clientX - slideCont.getBoundingClientRect().left;
        if (moveDist > 3 && moveDist <= slideCont.offsetWidth - 26) {
            slider.style.left = moveDist + "px";
        }
    }

    //Обновляем координаты перетаскиваемого товара, относительно позиции курсора
    if (clonedItem && !placed) {
        moveAt(e.pageX, e.pageY);
    }
}

onmouseup = function(e) {
    //Если отжали кнопку со слайдера
    doSlide = false;

    //Если товар ещё не не перенесён в "корзину" и курсор находится не в её области
    if (clonedItem && !placed) {
        //Если курсор находится в области "корзины"
        if (placeable) {
            //Товар перестаёт следовать за курсором
            clonedItem.getElementsByTagName("img")[0].remove();
            clonedItem.classList.remove("item");
            //Добавляем к итоговой стоимости товаров в "корзине" стоимость добавленного туда товара
            totalCost.innerHTML = parseInt(totalCost.innerHTML) + parseInt(clonedItem.getElementsByClassName("cost")[0].innerHTML)+"₽";
            clonedItem.style.position = "static";
            //Добавляем сам товар в "корзину"
            kart.append(clonedItem);
            placed = true;

            //Если не перетащили товар в "корзину"
        } else
            clonedItem.remove();
    }
}

//"Обнуляем" переменные для Drag-and-drop'а товара
let placeable = false,
    placed = false;
// Создание пользовательского списка
const listBlock = document.querySelector('.create-list');

const list = document.createElement('ul');
list.classList.add('user-list');
list.style = `text-align: left;`;
listBlock.append(list);
window.onload = (event2) =>{


// while (true) {
//     let item = prompt("Введите элемент, чтобы добавить его в список.", "");

//     if (!item) break;

//     let listItem = document.createElement('li');
//     listItem.textContent = item;
//     list.append(listItem);
// }

// Появляющееся и исчезающее уведомление
const notification = document.querySelector('.notif');
const notifList = ['Уведомление 1', 'Уведомление 2', 'Уведомление 3', 'Уведомление 4', 'Уведомление 5', 'Уведомление 6', 'Уведомление 7'];

function showNotification(text) {
    let notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = text;
    notif.style = `
    padding: 10px 20px;
    display: inline-block;
    border: 1px solid black;
    `;

    notification.append(notif);

    setTimeout(() => { notif.remove() }, 1500);
}

setInterval(() => { showNotification(notifList[Math.floor(Math.random() * notifList.length)]) }, 3000);

// Область с картинкой
const area = document.querySelector(".area");
const steam = area.querySelector('img');

// Центрируем
steam.style.top = Math.round(area.clientHeight / 2 - steam.offsetHeight / 2) + "px";
steam.style.left = Math.round(area.clientWidth / 2 - steam.offsetWidth / 2) + "px";

// Отображаем координаты
const clickX = document.querySelector('.clickX').querySelector('span');
const clickY = document.querySelector('.clickY').querySelector('span');

area.onclick = function(click) {
    clickX.textContent = click.clientX;
    clickY.textContent = click.clientY;
}

// Возможность закрыть уведомления
const notif = document.querySelector('.notifs');
const notifBtn = notif.querySelector('.notif__btn');
const notifInner = notif.querySelector('.notif__inner');
const notifCounter = document.querySelector('.indicator1');
const notifArr = [
    'Уведомление 1',
    'Уведомление 2',
    'Уведомление 3',
    'Уведомление 4',
    'Уведомление 5'
];

let numberNotif = 0;
let counter = 0;

//Создаем уведомление
function createNotif() {
    if(counter<10){
    let element = document.createElement('div');
    element.classList.add('notif__item');
    
    // Добавляем поочерёдно уведомления
        element.textContent = "Уведомление "+(counter+1);//notifArr[numberNotif];
        numberNotif++;
        counter++;
    
    element.style = `
    position: relative;
    width: 10%;
    padding: 10px 20px;
    display: inline-block;
    border: 1px solid white;
    margin-bottom: 5px;
    `;

    notifInner.append(element);

    // Добавляем кнопку для закрытия уведомления
    let closeTab = document.createElement('img');
    closeTab.className = 'fa-solid fa-xmark';
    closeTab.src="images/close1.png"
    closeTab.style = `
    position: absolute;
    cursor: pointer;
    `;

    element.append(closeTab);

    notifCounter.textContent = counter;
}
}

// Добавляем задержку появления новых уведомлений при нажатии
let timerId = setInterval(createNotif, 4000);

notifBtn.addEventListener('click', () => {
    clearInterval(timerId);
    setTimeout(function() {
        timerId = setInterval(createNotif, 4000);
    }, 10000);
});

// Добавляем событие при нажатии кнопки закрытия уведомления
notifInner.onclick = function(event) {
    if (!event.target.classList.contains('fa-xmark')) return;

    let notif = event.target.closest('.notif__item');
    notif.remove();

    // Уменьшаем счётчик количества уведомлений
    counter--;
    notifCounter.textContent = counter;
};
}
