const initialDonationSection = document.querySelector('section').innerHTML;

let totalCoins = 5500;

let donationAmounts = [0, 600, 2400];

const donationHistory = [];

function updateCoinDisplay() {
    const coinDisplay = document.getElementById('tcoin');
    coinDisplay.innerText = totalCoins;
}

function displayDonationSection() {
    const section = document.querySelector('section');
    section.innerHTML = initialDonationSection;

    document.querySelectorAll('.donateNow').forEach((button, index) => {
        button.addEventListener('click', function () {
            const inputField = this.previousElementSibling;
            const donationAmount = parseInt(inputField.value) || 0;

            if (donationAmount > 0 && totalCoins >= donationAmount) {
                totalCoins -= donationAmount;
                updateCoinDisplay();

                donationAmounts[index] += donationAmount;

                const coinButton = this.parentElement.querySelector('button span');
                coinButton.innerText = donationAmounts[index];

                const cause = this.closest('.border-2').querySelector('h1').textContent;
                const timestamp = new Date().toLocaleString();
                donationHistory.push({
                    amount: donationAmount,
                    cause: cause,
                    time: timestamp
                });

                inputField.value = '';
            } else {
                alert("Insufficient coins or invalid donation amount!");
            }
        });
    });

    updateCardCoinValues();

    updateCoinDisplay();
}

function updateCardCoinValues() {
    document.querySelectorAll('.donateNow').forEach((button, index) => {
        const coinButton = button.parentElement.querySelector('button span');
        coinButton.innerText = donationAmounts[index];
    });
}

function displayHistory() {
    const section = document.querySelector('section');
    section.innerHTML = '';

    const historyContainer = document.createElement('div');
    historyContainer.classList.add('mx-auto', 'w-[90%]', 'flex', 'flex-col', 'items-center', 'my-[80px]');
    
    const title = document.createElement('h1');
    title.classList.add('text-[24px]', 'font-[700]', 'text-[#111111]', 'mb-8');
    title.innerText = "Donation History";

    historyContainer.appendChild(title);

    donationHistory.forEach(entry => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('border-2', 'border-[#1111111a]', 'rounded-[16px]', 'flex', 'justify-between', 'm-8', 'p-8', 'gap-8');
        
        const donationDetails = document.createElement('p');
        donationDetails.classList.add('text-[16px]', 'font-[300]', 'text-[#111111B3]');
        donationDetails.innerHTML = `${entry.amount} Taka is Donated for ${entry.cause}<br>Date: ${entry.time}`;
        
        historyItem.appendChild(donationDetails);
        historyContainer.appendChild(historyItem);
    });

    section.appendChild(historyContainer);
}

const donateButton = document.querySelector('.nav-button:nth-child(1)');
const historyButton = document.querySelector('.nav-button:nth-child(2)');

historyButton.addEventListener('click', function () {
    displayHistory();

    historyButton.classList.add('bg-[#B4F461]');
    historyButton.classList.remove('bg-white');
    donateButton.classList.remove('bg-[#B4F461]');
    donateButton.classList.add('bg-white');
});

donateButton.addEventListener('click', function () {
    displayDonationSection();
    updateCoinDisplay();

    donateButton.classList.add('bg-[#B4F461]');
    donateButton.classList.remove('bg-white');
    historyButton.classList.remove('bg-[#B4F461]');
    historyButton.classList.add('bg-white');
});

updateCoinDisplay();
displayDonationSection();