const category = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        categoryDisplay(data.categories)
        allPlants()
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
                    <h1 class = 'font-semibold'>${post.name}</h1>
                    <p>${post.description}</p>
                    <div class="flex justify-between">
                        <button class="btn  rounded-3xl bg-[#DCFCE7]">${post.category}</button>
                        <h3><span class = "text-2xl">৳</span>${post.price}</h3>
                    </div>
                    <button class="btn bg-[#15803D] text-white w-full rounded-3xl">Add to Cart</button>
                </div> 
        
        `





        container.append(newContainer)
    })
    
}

// button e click korle ei section kaj korbe
const loadData = (no)=> {
    const url = `https://openapi.programming-hero.com/api/category/${no}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        displaLoadData(data.plants)
    })
}
const displaLoadData = (data) => {
    const conatiner = document.getElementById('card-container')
    conatiner.innerHTML = "";
    data.forEach(post => {
       const newContainer = document.createElement('div');
       newContainer.innerHTML = `
       <div class="space-y-5 w-[350px] h-full rounded-lg shadow-md p-5">
                    <img class="h-60 w-full rounded-lg" src="${post.image}" alt="">
                    <h1 class = 'font-semibold'>${post.name}</h1>
                    <p>${post.description}</p>
                    <div class="flex justify-between">
                        <button class="btn  rounded-3xl bg-[#DCFCE7]">${post.category}</button>
                        <h3><span class = "text-2xl">৳</span>${post.price}</h3>
                    </div>
                    <button class="btn bg-[#15803D] text-white w-full rounded-3xl">Add to Cart</button>
                </div> 
       
       `
       conatiner.append(newContainer)
    })
}



// Button section with API
const categoryDisplay = (id) => {
    const container = document.getElementById('category-container')
    id.forEach(data => {
        const newContainer = document.createElement('h3');
        newContainer.innerHTML = `
                  <div>
                      <button onclick = "loadData(${data.id})" class="  hover:bg-[#15803D] hover:text-white w-full font-[400] cursor-pointer
                       rounded-xl text-left p-2">${data.category_name}</button>
                </div>
        
        `
        container.append(newContainer)
    })
}



category();