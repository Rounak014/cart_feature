let shop=document.getElementById("shop");
let basket =JSON.parse(localStorage.getItem("data"))||[];
let generateproduct=()=>{
    return (shop.innerHTML=shopitmesdata.map((x)=>{
        let search =basket.find((p)=>p.id===x.id)||[]
        return   `
        <div id=p-id-${x.id} class="item">
        <img width="220" src=${x.img} alt="">
            <div class="details">
                <h3>${x.name}</h3>
                <p>${x.desc}</p>
                <div class="price-quantity">
                    <h2>$ ${x.price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${x.id})" class="bi bi-dash-lg"></i>
                        <div id=${x.id} class="quantity">
                        ${
                            search.item===undefined?0:search.item}
                            </div>
                        <i onclick="increment(${x.id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div> 
        `;
    }).join("")); 
    };
generateproduct();
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
    update(id);
    localStorage.setItem("data",JSON.stringify(basket));

};
let decrement=(id)=>{
    let slecteditem=id;
    let search=basket.find((x)=>x.id===slecteditem.id);
    if(search===undefined)return;
    else{
        if(search.item>0)search.item-=1;
        else ;
    }
    update(id);
     // deleting the element which is removed from the basket 
    basket = basket.filter((x)=>x.item!=0);
    localStorage.setItem("data",JSON.stringify(basket));
    
};
let update=(id)=>{
    let slecteditem=id;
    let search=basket.find((x)=>x.id===slecteditem.id);
    id.innerText=search.item;
    calculation();
};
let calculation=()=>{
    let carticon=document.getElementById("cartAmount");
    let value=basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
    carticon.innerHTML=value;
}
calculation();

 
