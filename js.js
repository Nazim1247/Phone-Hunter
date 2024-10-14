

document.getElementById('blog-btn').addEventListener('click', () => {
    window.location.href='home.html';
});

const donateBtn = document.querySelectorAll('.donate-btn');
donateBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleDonate(e.target);
    });
});

const updateNavbarBalance = (amountBalance) => {
    const navbarBalance = Number(document.getElementById('available-balance').innerText);
    const newBalance = navbarBalance - amountBalance;
    document.getElementById('available-balance').innerText = newBalance.toFixed(2);
};

const donationHistory = (historyTitle, donated) => {
    const historyContainer = document.getElementById('history-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="border-2 border-solid rounded-md p-5 gap-5">
    <h3>${historyTitle}</h3>
    <p>TK : ${donated}</p>
    <p>Date : ${new Date().toLocaleDateString()}</p>
    </div>
    `;
    historyContainer.appendChild(div);
}

const handleDonate = (button) => {
    const cardElement = button.closest('.cart');
    const amountBalance = Number(cardElement.querySelector('.input').value);
    const donateBalance = Number(cardElement.querySelector('.balance').innerText);
    const navbarBalance = Number(document.getElementById('available-balance').innerText);
    if(isNaN(amountBalance) || amountBalance <= 0 || navbarBalance < amountBalance){
        alert('Please give valid input.');
        return;
    };
    const donated = donateBalance + amountBalance;
    cardElement.querySelector('.balance').innerText = donated.toFixed(2);

    updateNavbarBalance(amountBalance);
    cardElement.querySelector('.input').value = '';
    document.getElementById('my_modal_1').showModal();

    const historyTitle = cardElement.querySelector('.font-bold').innerText;

    donationHistory(historyTitle, donated);
};

document.getElementById('show-history-btn').addEventListener('click', () => {
    document.getElementById('show-donation-btn').classList.remove('bg-[#B4F461]');
    document.getElementById('show-donation-btn').classList.add('text-gray-500');
    document.getElementById('show-history-btn').classList.add('bg-[#B4F461]');
    document.getElementById('show-history-btn').classList.remove('text-gray-500');
    document.getElementById('history-container').classList.remove('hidden');
    document.getElementById('donation-container').classList.add('hidden');

});

document.getElementById('show-donation-btn').addEventListener('click', () => {
    document.getElementById('show-history-btn').classList.remove('bg-[#B4F461]');
    document.getElementById('show-history-btn').classList.add('text-gray-500');
    document.getElementById('show-donation-btn').classList.add('bg-[#B4F461]');
    document.getElementById('show-donation-btn').classList.remove('text-gray-500');
    document.getElementById('history-container').classList.add('hidden');
    document.getElementById('donation-container').classList.remove('hidden');
})

