
let sortByPriceData = [];
const sortByPrice = () => {
    document.getElementById('spinner').style.display = 'block'
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((response) => response.json())
    .then((data) => {
        sortByPriceData = data.pets;
        displayAllPets(sortByPriceData);
        activeRemove()
    })
    .catch((error) => console.log(error));
    }, 2000);
};

const loadAllPetsCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((response) => response.json())
    .then((data) => displayAllPetsCategories(data.categories))
    .catch((error) => console.log(error))
};

const displayAllPetsCategories = (categories) => {
    const categoriesBtn = document.getElementById('btn-categories');
    categories.innerHTML = '';
    categories.forEach(categoryBtn => {  
        const {category_icon, category, id} = categoryBtn;
        const div = document.createElement('div');
    div.innerHTML = `
    <div id="btn-${category}" onclick="loadCategoryItems('${category}')" class="flex justify-center items-center gap-3 border-2 border-solid py-2 px-8 rounded-xl active-btn">
    <img src="${category_icon}" />
    <p class="text-xl font-bold">${category}</p>
    </div>
    `;
    categoriesBtn.appendChild(div);
});
};

const loadAllPets = () => {
    document.getElementById('spinner').style.display = 'block'
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    .then((response) => response.json())
    .then((data => displayAllPets(data.pets)))
    .catch((error => console.log(error)))
    }, 2000)
};

const displayAllPets = (pets) => {
    const petContainer = document.getElementById('pet-container');
    petContainer.innerHTML = '';
    document.getElementById('spinner').style.display = 'none'
    sortByPriceData.sort((a, b) => {
        return b.price - a.price;
    })
    if(pets.length === 0){
        petContainer.innerHTML = `
        <div class="grid col-span-3 text-center bg-slate-50 shadow-sm rounded-md py-10 gap-5">
        <img class="mx-auto" src="images/error.webp" />
        <h3 class="text-3xl font-bold">No Content Available</h3>
        </div>
        `;
        return;
    }
    pets.forEach((pet) => {
        const {image, pet_name, breed, date_of_birth, gender, price, petId} = pet;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="p-4 border-2 shadow-sm rounded-lg">
        <img class="w-full h-[220px] rounded-lg" src="${image}" />
        <h3 class="text-xl font-bold py-2">${pet_name}</h3>
        <p>Breed: ${breed?`${breed}`:'Not Available'}</p>
        <p>Birth: ${date_of_birth?`${date_of_birth}`:'Not Available'}</p>
        <p>Gender: ${gender?`${gender}`:'Not Available'}</p>
        <p>price: ${price?`${price}`:'Not Available'}</p>
        <div class="flex gap-3 mt-2">
        <button onclick="likeBtn('${image}')" class="btn btn-sm"><i class="fa-solid fa-heart"></i></button>
        <button id="adopt-btn" onclick="adoptBtn('${petId}')" class="btn btn-sm">Adopt</button>
        <button onclick="loadDetails('${petId}')" class="btn btn-sm">Details</button>
        </div>
        </div>
        `;
        petContainer.appendChild(div);
    })
};

const loadCategoryItems = (id) => {
    document.getElementById('spinner').style.display = 'block'
    setTimeout(() => {
        fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((response) => response.json())
    .then((data) => {
        activeRemove()
        const activeButton = document.getElementById(`btn-${id}`)
        
        activeButton.classList.add("!text-white")
        activeButton.classList.add("!bg-[#0E7A81]")
        displayAllPets(data.data);
    })
    .catch((error) => console.log(error))
    }, 2000);
};

const activeRemove = () => {
    const removes = document.getElementsByClassName('active-btn');
    for(let remove of removes){

        remove.classList.remove("!text-white")
        remove.classList.remove("!bg-[#0E7A81]")
    }
};

const likeBtn = (images) => {
    const imageBtn = document.getElementById('image-btn');
    const div = document.createElement('div');
    div.innerHTML = `
    <img class="rounded-md" src="${images}" />
    `;
    imageBtn.appendChild(div)
};

const adoptBtn = (adopt) => {
    const modalContent = document.getElementById('modal-content');
    let count = 4;
    const countDown = setInterval(() => {
        document.getElementById('my_modal_1').showModal()
        count--;
        modalContent.innerHTML = `
        <p class="text-3xl font-bold">${count}</p>
        `;
        
        if(count <= 0){
            clearInterval(countDown);
            document.getElementById('my_modal_1').close()
            document.getElementById('modal-content').innerHTML = '';
        };
        
    }, 1000);
};

const loadDetails = (petId) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((response) => response.json())
    .then((data) => displayDetails(data.petData))
    .catch((error) => console.log(error))
};

const displayDetails = (pets) => {
    const detailsCard = document.getElementById('details-card');
    const {image, pet_name, breed, date_of_birth, gender, price, petId, vaccinated_status, pet_details} = pets;
    console.log(pets)
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="p-4 border-2 shadow-sm rounded-lg">
        <img class="w-full h-[220px] rounded-lg" src="${image}" />
        <h3 class="text-xl font-bold py-2">${pet_name}</h3>
        <p>Breed: ${breed?`${breed}`:'Not Available'}</p>
        <p>Birth: ${date_of_birth?`${date_of_birth}`:'Not Available'}</p>
        <p>Gender: ${gender?`${gender}`:'Not Available'}</p>
        <p>Vaccine: ${vaccinated_status?`${vaccinated_status}`:'Not Available'}</p>
        <p>price: ${price?`${price}`:'Not Available'}</p>
        <hr class="py-2 mt-4" />
        <p>Details:<br/> ${pet_details?`${pet_details}`:'Not Available'}</p>
    `;
    detailsCard.appendChild(div)
    document.getElementById('my_modal_2').showModal()
};


loadAllPets()
loadAllPetsCategories()