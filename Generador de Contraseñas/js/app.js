const form = document.querySelector('form');
const slider = document.querySelector('#slider');
const label = document.querySelector('label');
const resultado = document.querySelector('#resultado');

const characters = 'abcdefghijklmnopqrstuvwxyz';
const nums = '1234567890';
const simbols = '!#$%&()*+,-./:;<=>?@[\]^_{|}~';

window.onload = () => {
    slider.value = 2;
    label.textContent = `Longitud: ${slider.value}`
}

form.addEventListener('submit', event => {
    event.preventDefault();
    resultado.classList.remove('text-gray-600', 'italic');
    showRandom();
});

slider.addEventListener('input', event => {
    label.textContent = `Longitud: ${slider.value}`
});

function showRandom() {
    const numsInput = document.querySelector('#nums');
    const mayusInput = document.querySelector('#mayus');
    const simbolsInput = document.querySelector('#simbols');
    let password = '';

    for (let index = 0; index < slider.value; index++) {
        let char;

        char = characters[Math.floor(Math.random() * characters.length)]
        
        if (mayusInput.checked && Math.floor(Math.random() * 10)%2) {
            char = char.toUpperCase();
        } 

        if (numsInput.checked || simbolsInput.checked) {
            const decider = Math.floor(Math.random() * 10)%3;

            if (numsInput.checked && decider == 1) {
                    char = nums[Math.floor(Math.random() * nums.length)];
            }
            if (simbolsInput.checked && decider == 2) {
                if (Math.floor(Math.random() * 10)%2) {
                    char = simbols[Math.floor(Math.random() * simbols.length)];
                } 
            }
        }

        password = password + char;
    }
    
    resultado.textContent = password;
}