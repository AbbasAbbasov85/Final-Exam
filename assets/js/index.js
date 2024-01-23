let product = document.getElementById("product")
let loadbtn = document.getElementById("loadbtn")


let page = 1
let limit = 4



async function getProduct() {
    await axios.get(`https://655c839c25b76d9884fd6e12.mockapi.io/product?page=${page}&limit=${limit}`)
        .then((res) => {
            db = res.data
            db.forEach((item) => {
                let div = document.createElement("div")
                div.className = "box"
                div.innerHTML = `
           
            <img src="${item.image}" alt="">
            <p>${item.title}</p>
            <h6>${item.price} $</h6>
            <button onclick="addToCart(${item.id})"><i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
            <button onclick="wishAdded(${item.id})"> <i class="fa-solid fa-heart"></i></button>
        `
                product.appendChild(div)
            })
        })
        .catch((err) => console.log(err))
}
getProduct()

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find((item) => item.id == id);
    if (cartItem) {
        cartItem.count = (cartItem.count || 1) + 1;
    } else {
        let newItem = { ...db.find((item) => item.id == id), count: 1 };
        cart.push(newItem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
}



function wishlist(id) {
    let wish = JSON.parse(localStorage.getItem("wish")) || []
    let wishItem = wish.find((item) => item.id == id)
    if (wishItem) {
        alert("Wislistde artiq bu mehsul var !")
    } else {
        wish.push(db.find((item) => item.id == id))
        localStorage.setItem("wish", JSON.stringify(wish))
    }
    console.log(wish);
}