
let cart = {};

document.querySelectorAll('.add-to-cart').forEach((el)=> {
    el.onclick = addToCart
})

function addToCart() {
    let goodsId = this.dataset.goods_id
    if(cart[goodsId]) {
        cart[goodsId]++
    } else {
        cart[goodsId] = 1
    }
    console.log(cart)
    addCartInfo()
}

function addCartInfo() {

    fetch('/goods/cart', {method: 'POST', 
                          body: JSON.stringify({key: Object.keys(cart)}),
                          headers: {'Accept': 'application/json', 'Content-type': 'application/json'}
                         
                        }).then((response)=> {
                           return response.json()
                        }).then((body)=>{
                            console.log(body)
                        })
                    }

let push = document.querySelector('.push-test')
push.onclick = addCartInfo

// push.addEventListener('click', ()=> {addCartInfo(cart)} )

