
const loadAllPhones = async (status,searchText) => {

    document.getElementById('spinner').style.display = 'none';

    // fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    // .then(res => res.json())
    // .then(data => console.log(data));

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:'iphone'}`);
    const data = await response.json();
    if(status){
        displayAllPhones(data.data);
    }
    else{
        displayAllPhones(data.data.slice(0, 6));
    }
}

const displayAllPhones = (phones) => {
    const phoneContainer = document.getElementById('phones-container');
    phones.forEach(phone => {
        const {brand, image, slug} = phone;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 w-96 shadow-xl mt-2">
  <figure class="px-10 pt-10">
    <img
      src="${image}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button onclick="phoneDetails('${slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
        `;
        phoneContainer.appendChild(div);
    })
}


const handleShowAll = () => {
    loadAllPhones(true)
}


const handleSearch = () => {
    document.getElementById('spinner').style.display = 'block';
    const searchText = document.getElementById('search-box').value;
    setTimeout(function () {
        loadAllPhones(false, searchText)
    }, 3000);
}

const phoneDetails = async (slugs) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();
    console.log(data.data);
    const {brand, image, slug} = data.data;

    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
    <div class="modal-box text-center space-y-4">
    <img class="mx-auto py-3" src="${image}" />
      <h3 class="text-2xl font-bold">${brand}</h3>
      <p class="py-4">${slug}</p>
      <div class="modal-action flex justify-center">
        <form method="dialog">
          <button class="btn btn-primary">Close</button>
        </form>
      </div>
    </div>
  </dialog>
    `;

    my_modal_1.showModal()
}

loadAllPhones(false,'iphone')