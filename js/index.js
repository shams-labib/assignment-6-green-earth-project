const category = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        categoryDisplay(data.categories)
    })
}

const categoryDisplay = (id) => {
    const container = document.getElementById('category-container')
    id.forEach(data => {
        const newContainer = document.createElement('h3');
        newContainer.innerHTML = `
                  <div>
                      <button class="  hover:bg-[#15803D] hover:text-white w-full font-[400] cursor-pointer
                       rounded-xl text-left p-2">${data.category_name}</button>
                </div>
        
        `
        container.append(newContainer)
    })
}



category();