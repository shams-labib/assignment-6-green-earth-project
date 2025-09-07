const category = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        categoryDisplay(data.categories)
        allPlants()
    })
}

// modal show koarnor jonno
const modalDataLoad = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displayModal(data.plants);
    })
}
const displayModal = (id) => {
       const container = document.getElementById("word-container");
       container.innerHTML = ` 
       <div class="space-y-3 p-4">
            <h1 class="font-semibold text-xl">${id.name}</h1>
            <img class="h-[40vh] w-full rounded-lg" src="${id.image}" alt="">
            <p class="font-semibold">Category : ${id.category}</p>
            <p>Price: <span class = "text-2xl">৳</span>${id.price}</p>
            <h3>Description : ${id.description}</h3>
        </div>
       `

       document.getElementById("my_modal_5").showModal();
}


const removeActive = ()=> {
   const remove = document.querySelectorAll('.activeBtn')
   remove.forEach(rm => {
    rm.classList.remove('active')
   })
}
// All plants section
const allPlants = () =>{
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displaAllplants(data.plants)
    })
}
const displaAllplants = (posts)=> {
    const container = document.getElementById('card-container');
    // container.innerHTML = "";
    posts.forEach(post => {
        const newContainer = document.createElement('div');
        newContainer.innerHTML = `
           <div class="space-y-5 w-[350px] h-full rounded-lg shadow-md p-5 ">
                    <img class="h-60 w-full rounded-lg" src="${post.image}" alt="">
                    <h1 onclick="modalDataLoad(${post.id})" class = 'font-semibold'>${post.name}</h1>
                    <p>${post.description}</p>
                    <div class="flex justify-between">
                        <button class="btn  rounded-3xl bg-[#DCFCE7]">${post.category}</button>
                        <h3><span class = "text-2xl">৳</span>${post.price}</h3>
                    </div>
                    <button onclick = "addtoCart('${post.name}', ${post.price})" class="btn bg-[#15803D] text-white w-full rounded-3xl">Add to Cart</button>
                </div> 
        
        `
        container.append(newContainer)
    })
    
}

// button e click korle ei section kaj korbe
const loadData = (no)=> {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/category/${no}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`activeClass-${no}`)
        clickBtn.classList.add('active')
        displaLoadData(data.plants);
    })
}
const displaLoadData = (data) => {
    const conatiner = document.getElementById('card-container')
    conatiner.innerHTML = "";
    data.forEach(post => {
       const newContainer = document.createElement('div');
       newContainer.innerHTML = `
       <div class=" w-[350px]  rounded-lg shadow-md p-5 space-y-5">
                    <img class="h-60 w-full rounded-lg" src="${post.image}" alt="">
                    <h1  onclick="modalDataLoad(${post.id})" class = 'font-semibold'>${post.name}</h1>
                    <p>${post.description}</p>
                    <div class="flex justify-between">
                        <button class="btn  rounded-3xl bg-[#DCFCE7]">${post.category}</button>
                        <h3><span class = "text-2xl">৳</span>${post.price}</h3>
                    </div>
                    <button onclick = "addtoCart('${post.name}',${post.price})" class="btn bg-[#15803D] text-white w-full rounded-3xl">Add to Cart</button>
                </div> 
       
       `
       conatiner.append(newContainer)
       manageSpinner(false)
    })
}

// spinner section
const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove('hidden');
        document.getElementById("card-container").classList.add('hidden');
    }
    else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('card-container').classList.remove('hidden');
    }
}


// Button section with API
const categoryDisplay = (id) => {
    const container = document.getElementById('category-container')
    id.forEach(data => {
        const newContainer = document.createElement('h3');
        newContainer.innerHTML = `
                  <div>
                      <button id= "activeClass-${data.id}" onclick = "loadData(${data.id})" class="  hover:bg-[#15803D] hover:text-white w-full font-[400] cursor-pointer
                       rounded-xl text-left p-1 activeBtn">${data.category_name}</button>
                </div>
        
        `
        container.append(newContainer)
    })
}
let total = 0;
// cart section
const addtoCart = (name, number) => {
    alert(`${name} has been added to the cart`)
    const num = number;
      const container = document.getElementById('cart-section');
      const newContainer = document.createElement('div');
      newContainer.innerHTML = `
                      <div  class="bg-[#F0FDF4] p-2 rounded-xl mt-3 flex justify-between ">
                       <div>
                        <h1 class="font-semibold">${name}</h1>
                      <p ><span class="text-xl">৳</span>${number} x 1</p>
                      </div>
                      <div class = "remove-items cursor-pointer">
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                      </div>
                </div>
      `
      total +=num;
      document.getElementById('total').innerHTML = total;

      const removeBtn = newContainer.querySelector('.remove-items');
      removeBtn.addEventListener('click', ()=>{
          container.removeChild(newContainer)
          total -=num;
          document.getElementById('total').innerHTML = total;
      })
      
      container.append(newContainer)
}
category();