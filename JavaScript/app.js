let totalCoins = 5500;

function updateCoinDisplay() {
    const coinDisplay = document.getElementById('tcoin');
    coinDisplay.innerText = totalCoins;
}

document.querySelectorAll('.donateNow').forEach(button => {
    button.addEventListener('click', function () {
        
        const inputField = this.previousElementSibling;
        const donationAmount = parseInt(inputField.value) || 0;

        if (donationAmount > 0 && totalCoins >= donationAmount) {

            totalCoins -= donationAmount;
            updateCoinDisplay();

            
            const coinButton = this.parentElement.querySelector('button span');
            let currentCoinAmount = parseInt(coinButton.innerText);
            currentCoinAmount += donationAmount;
            coinButton.innerText = currentCoinAmount;

            
            inputField.value = '';
        } else {
            alert("Insufficient coins or invalid donation amount!");
        }
    });
});

updateCoinDisplay();