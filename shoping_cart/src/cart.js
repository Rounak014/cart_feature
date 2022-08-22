
let label=document.getElementById("label");
let shoppingcart=document.getElementById("shopping-cart");
let basket =JSON.parse(localStorage.getItem("data"))||[];
let calculation=()=>{
    let carticon=document.getElementById("cartAmount");
    let value=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    carticon.innerHTML=value;
}
calculation();
let generatecartitems=()=>{
    if (basket.length!== 0) {
        return (shoppingcart.innerHTML=basket
            .map((x)=>{
            let {id, item } =x;
            let search=shopitmesdata.find((y)=>y.id===id)||[];
            return`
            <div class="cart-item" >
                <img width="100" src=${search.img} alt=""/>
                <div class ="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>

                        </h4>
                        <i onclick="removeitem(${x.id})" class="bi bi-x-lg"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                        <div id=${x.id} class="quantity">${x.item}</div>
                        <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3>$ ${item*search.price }

                
                </div>

            </div>
            `;
            
        }).join(""));
    }
    else {
        shoppingcart.innerHTML =``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="homebtn">Back to home</button>
        </a>
        `;
    }

}
generatecartitems();
let increment=(id)=>{
    console.log(id)
    let slecteditem =id;
    let search=basket.find((x)=>x.id===slecteditem.id);
    if(search===undefined){
        basket.push({
            id:slecteditem.id,
            item:1,
            });
    }
    else {
        search.item +=1;
    }
    generatecartitems();
    update(id);
    localStorage.setItem("data",JSON.stringify(basket));

};
let decrement=(id)=>{
    let slecteditem=id;
    let search=basket.find((x)=>x.id===slecteditem.id);
    if(search===undefined)return;
    else if(search.item>0)search.item-=1;
    update(id);
    // deleting the element which is removed from the basket 
    basket = basket.filter((x)=>x.item!=0);
    generatecartitems();
    localStorage.setItem("data",JSON.stringify(basket));
    
};
let update=(id)=>{
    let slecteditem=id;
    let search=basket.find((x)=>x.id===slecteditem.id);
    id.innerText=search.item;
    calculation();
    totalamount();
};
let removeitem=(id)=>{
    let temp=id;
    basket = basket.filter((x)=>x.id!=temp.id);
    localStorage.setItem("data",JSON.stringify(basket));
    generatecartitems();
    calculation();
    totalamount();
};
let clearcart=()=>{
    basket=[];
    generatecartitems();
    localStorage.setItem("data",JSON.stringify(basket));
    calculation();  
}
let totalamount=()=>{
    if(basket.length!=0){
        let amount=basket.map((x)=>{
            let{item,id}=x;
            let search=shopitmesdata.find((y)=>y.id==id)||[];
            return item*search.price;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML=`
        <h2>Total Bill :$ ${amount}</h2> 
        <button class ="checkout">Checkout</button>
        <button onclick="clearcart()" class ="removeALL">Clear Cart</button>
        `
        ;
        // console.log(amount);
    }
    else return;
}
totalamount();

 
