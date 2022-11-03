// An object o0f dynamically loaded pages
let pages = {
    login: "login.html",
    homePage: "homePage.html",
    cart: "cart.html",
    about: "about.html",
    contact: "contact.html",
    dashboard: "dashboard.html",
    favorite: "favorite.html",
    reviews: "reviews.html"
}

let pdt1 = {
    id: "1",
    name: "Aine",
    image: "gbarkz-vqKnuG8GaQc-unsplash.jpg",
    price: "$15",
    promotion: false,
    discount: "20%",
    prev: "$20"
}

// Arrays for display control
let menuItems = [about, cart, contact, dashboard, reviews]
let footerItems = [homePage, favorite]
let favorites = []
let carts = []
let pdts = []
let orders = []

// essential variables for state control
let homeNavTrigger = false
let promoControl = true;
let home;
let id;
let identifier
let favoriteIcon
let favoriteItemId;


// A processor function that dynamically loads the pages
function pageProcessor(pageName, functionality){
    let pageRequest = new XMLHttpRequest()
    pageRequest.onload = function(){
        if (homeNavTrigger) {
            for (const x of footerItems) {
                menuItems.push(x)
            }
        }
        if (menuItems.includes(functionality)){
            if (functionality == homePage) {
                document.querySelector(".home-screen main").innerHTML = home
            } else {
                document.querySelector(".home-screen main").innerHTML = this.responseText
            }
        } else {
            document.querySelector(".overall-container").innerHTML = this.responseText
            if (functionality == homePage){
                home = document.querySelector(".home-screen main").innerHTML
                homeNavTrigger = true
            }
        }
        functionality()
    }
    pageRequest.open("GET", "./pages/" + pages[pageName])
    pageRequest.send()
}

// Loading the home page or login page from the index page 
let indexBtns = document.querySelectorAll(".welcome-screen button")
indexBtns.forEach(element => {
    element.addEventListener('click', () => {
        if (element.textContent == "Get Account"){
            pageProcessor("login", loginPage)
        } else {
            pageProcessor("homePage", homePage)
        }
    })
})

// Functions that contain JS for operating on the dynamically loaded pages
function loginPage(){
    document.querySelector(".login-screen button[type='submit']").addEventListener('click', (e) =>{
        e.preventDefault()
        pageProcessor("homePage", homePage)
    })
}
function homePage(){
    let menuBtn = document.querySelector(".home-screen .menu")
    let menuBar = document.querySelector(".side-bar")
    let menuList = document.querySelector(".menu-list")
    let overlay = document.querySelector(".overlay")

    menuBtn.addEventListener('click', () =>{
        document.querySelector("footer .sec").style.display = "none"
        menuBar.style.display = "block"
        menuList.style.animation = "menuGlow 0.4s ease-in-out"
    })
    overlay.addEventListener('click', () =>{
        menuList.style.animation = "menuShrink 0.4s ease-in-out"
        setTimeout(() =>{
            menuBar.style.display = "none"
        }, 250)
    })
    overlay.addEventListener("touchmove", () => {
        setTimeout(() =>{
            menuList.style.animation = "menuShrink 0.4s ease-in-out"
            setTimeout(() =>{
                menuBar.style.display = "none"
            }, 150)
        },250)
    })

    document.querySelector(".home-screen .cart").addEventListener("click", () =>{
        pageProcessor("cart", cart)
    })
    document.querySelector("#homePage").addEventListener("click", () => {
        document.querySelector(".main-header").style.display = "block"
    })
    promoDisplay()
    document.querySelector(".promo-banner .close-banner").addEventListener("click", () =>{
        promoControl = false;
        promoDisplay()
    })
    document.querySelector(".home-screen .selected").addEventListener('click', () =>{
        let arrow = document.querySelector(".home-screen .selected .fas")
        document.querySelector(".home-screen .options").style.display = "flex"
        arrow.classList.replace("fa-chevron-down", "fa-chevron-up")
    })
    document.querySelectorAll(".home-screen .filtrate").forEach(element => {
        let arrow = document.querySelector(".home-screen .selected .fas")
        element.addEventListener("click", () =>{
            document.querySelector(".home-screen .selected > span").textContent = element.textContent
            arrow.classList.replace("fa-chevron-up", "fa-chevron-down")
            document.querySelector(".home-screen .options").style.display = "none"
        })
    })
    document.querySelector(".home-screen #srch").addEventListener("click", () =>{
        let srchBar = document.querySelector("footer .sec")
        srchBar.style.display = "block"
    })
    document.querySelector(".home-screen main").addEventListener("click", () =>{
        document.querySelector("footer .sec").style.display = "none"
    })
    document.querySelectorAll(".fav").forEach(element => {
        let identity = element.getAttribute("class")
        if(favorites.includes(identity)){
            element.classList.add("favorite-true")
        }
    })
    pdtTemplate()
    specTempelate()
    favoriteItem()
    sectionSelector(".menu-item")
    sectionSelector(".footer-item")
}

function favorite(){
    crossPurpose()
    promoControl = false
    if (favorites.length == 0){
        document.querySelector("#favorite-window").textContent = "You have no favorite item yet!"
    }
}

function about(){
    crossPurpose()
}
function contact(){
    crossPurpose()
}
function cart(){
    crossPurpose()
}
function dashboard(){
    crossPurpose()
}
function reviews(){
    crossPurpose()
}
function specOrganiser(type){
    let homeScreenChildren = document.querySelectorAll(".home-screen-child")
    let photoTempelate = document.querySelector(".photo-tempelate")
    document.querySelector(".spec-back").addEventListener("click", () =>{
        if(type == "home"){
            homeScreenChildren.forEach(element => {
                if (element.tagName == "footer"){
                    element.style.display = "flex"
                } else if(element.classList.contains("side-bar")) {
                    element.style.display = "none"
                } else {
                    element.style.display = "block"
                }
            })
            document.querySelector(".home-screen").removeChild(photoTempelate)
        } else if(type == "cart"){
            document.querySelector("#cart").click()
        }
        favoriteItem( )
    })
    if (orders.length > 0) {
        let order = orders[0]
        let confirmedOrder = orders.shift()
    }
    photoTempelate.querySelector(".order").addEventListener("click", () =>{
        orders.push(photoTempelate)
        alert("Order made, Thank you!")
    })
    photoTempelate.querySelectorAll(".cart").forEach(element =>{
        element.addEventListener("click", () =>{
            carts.push(photoTempelate)
            alert("item added to cart")
        })
    })
    let identity = photoTempelate.querySelector("img").getAttribute("class")
    if (favorites.includes(identity)){
        photoTempelate.querySelector(".fav").classList.add("favorite-true")
    }
    favoriteItem()
}

// shortner function for adding click listners to classes used by the page processor 
function sectionSelector(class_selector){
    document.querySelectorAll(class_selector).forEach(element => {
        element.addEventListener("click", () =>{
            document.querySelector("footer .sec").style.display = "none"
            let id = element.getAttribute("id")
            pageProcessor(id, eval(id))
            if (class_selector == ".menu-item"){
                document.querySelector(".menu-list").style.animation = "menuShrink 0.4s ease-in-out"
                setTimeout(() =>{
                    document.querySelector(".side-bar").style.display = "none"
                }, 250)
            }
        })
    })
}

// function for controlling promotion banner display
function promoDisplay(){
    if (!promoControl){
        document.querySelector(".home-screen .promo-banner").style.display = "none"
        return
    } else {
        setTimeout(() =>{
            setInterval(() =>{
                document.querySelector(".home-screen .promo-banner").style.display = "block"
                setTimeout(() =>{
                    document.querySelector(".home-screen .promo-banner").style.display = "none"
                }, 10000)
            }, 30000)
        }, 1000)
    }
}

function pdtTemplate(){
    let photo = "../Tools/" + pdt1.image
    let price = pdt1.price
    let name = pdt1.name
    let discount, prev, tempelate;
    let promo = pdt1.promotion
    identifier = pdt1.id
    if (promo){
        discount = pdt1.discount
        prev = pdt1.prev
    } else {
        discount = " "
        prev = " "
    }
        tempelate = `<div class="filtered-item">
                        <div class="filtered-image">
                            <img src=${photo} alt=${name} class=${identifier}>
                        </div>
                        <div class="desc">
                            <div class="price-tag">
                                <span class="name">${name}</span>
                                <span class="prev-price"><del style="color: blue; background-color: azure;">${prev}</del></span>
                                <span class="curr-price">${price}</span>
                            </div>
                            <div>
                                <span class="discount-percent">${discount}</span>
                            </div>
                            <div>
                                <span class="fav"><i class="fas fa-heart"></i></span>
                                <span class="cart"><i class="fas fa-cart-plus"></i></span>
                            </div>
                        </div>
                    </div>`
    document.querySelector(".filtered-display").innerHTML += tempelate
    document.querySelector(".filtered-display").innerHTML += tempelate
    document.querySelector(".filtered-display").innerHTML += tempelate
}

function specTempelate(){
    let photo, promo, price, name
    let photoTempelate = document.createElement("div")
    photoTempelate.setAttribute("class", "photo-tempelate")
    let homeScreenChildren = document.querySelectorAll(".home-screen-child")
    document.querySelectorAll("img").forEach(picture =>{
        picture.addEventListener("click", () =>{
            id = picture.getAttribute("class")
            let parent =picture.parentElement
            let grandParent = parent.parentElement
            name = grandParent.querySelector(".name").textContent
            price = grandParent.querySelector(".curr-price").textContent
            photo = picture.getAttribute("src")
            if (picture.classList.contains("promo-code")){
                promo = grandParent.querySelector(".discount-percent").textContent
            } else {
                promo = " "
            }
            photoTempelate.innerHTML = `<div class="spec-image">
                                            <img src=${photo} alt=${name} class="${id}">
                                        </div>
                                        <section class="spec-header">
                                            <span class="spec-back"><i class="fas fa-chevron-left"></i></span>
                                            <button class="order">Order now</button>
                                            <div class="tags">
                                                <span class="fav"><i class="fas fa-heart"></i></span>
                                                <i class="fas fa-cart-shopping cart"></i>
                                            </div>
                                        </section>
                                        <section class="spec-desc">
                                            <div class="typo">
                                                <span>${name}</span>
                                                <div class="colors">
                                                    <span class="color" id="red"></span>
                                                    <span class="color" id="blue"></span>
                                                    <span class="color" id="black"></span>
                                                    <span class="color" id="yellow"></span>
                                                    <span class="color" id="green"></span>
                                                </div>
                                            </div>
                                            <div class="size">
                                                <span>Size</span>
                                                <div class="sizes">
                                                    <span>xs</span>
                                                    <span>sm</span>
                                                    <span>lg</span>
                                                    <span>xl</span>
                                                </div>
                                            </div>
                                            <div class="offer">
                                                <div class="spec-price">
                                                    <span>${price}</span>
                                                    <span>${promo}</span>
                                                </div>
                                                <div class="add">
                                                    <span>Add to bag</span>
                                                </div>
                                            </div>
                                        </section>`
            homeScreenChildren.forEach(element => {
                element.style.display = "none"
            })
            document.querySelector(".home-screen").appendChild(photoTempelate)
            specOrganiser("home")
            
        })
    })
}

function idInspector(){
    if(favorites.includes(favoriteItemId)){
        let idIndex = favorites.indexOf(favoriteItemId)
        favorites.splice(idIndex, 1)
    } else {
        favorites.push(favoriteItemId)
    }
    if(favorites.includes(favoriteItemId)){
        favoriteIcon.classList.add("favorite-true")
    } else {
        favoriteIcon.classList.remove("favorite-true")
    }
}

function favoriteItem(){
    document.querySelectorAll(".fav").forEach(element => {
        element.addEventListener("click", () =>{
            let parent
            favoriteIcon = element
            parent = element.parentElement.parentElement.parentElement
            favoriteItemId = parent.querySelector("img").getAttribute("class")
            console.log(favorites)
            idInspector()
        })
    })
}

function crossPurpose(){
    let header = document.querySelector(".main-header")
    header.style.display = "none"
    document.querySelector(".fa-chevron-left").addEventListener("click", () => {
        header.style.display = "block"
        document.querySelector("#homePage").click()
    })
}
// let tri = [1,2,3]
// tri.pop(1)
// console.log(tri)