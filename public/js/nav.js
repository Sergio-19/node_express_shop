
document.querySelector('.close-nav').onclick = closeNav
document.querySelector('.show-nav').onclick = showNav

function closeNav() {
    document.querySelector('.site-nav').style.left = '-300px'
}

function showNav() {
    document.querySelector('.site-nav').style.left = '0'
}






async function getCategoryList() {
 await fetch('/category/list', {method: 'POST'})
 .then((response)=> {
    return response.json()
    })
 .then((res)=>{
        showCategoryList(res.category)
    })

    
}

function showCategoryList(data) {
    let out = `<ul class = 'category-list'>
                 <li><a href = '/'>Главная</a></li> 
               `
       data.forEach( (cat) => {
            out += `<li><a href = '/cat?id=${cat.id}'>${cat.category}</a></li>`
       }); 
       
       out += `</ul>`

       document.querySelector('#category-list').innerHTML = out
}

getCategoryList()