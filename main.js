const cardInfo = JSON.parse(localStorage.getItem("cards")) || [];

// llamado del name
const nameCard =document.querySelector('.card__details-name')
const nameInput =document.querySelector('#cardholder')
const nameErrorDiv =document.querySelector('.form__cardholder--error')

//llamdo del numero
const numberCard  = document.querySelector('.card__number')
const numberInput = document.querySelector('#cardNumber')
const numberErrorDiv = document.querySelector('.form__cardnumber--error')

// llamado a la fecha mes
const monthCard = document.querySelector('.card__month')
const monthInput =  document.querySelector('#cardMonth')
const monthErrorDiv = document.querySelector('.form__input-mm--error')

// llamdo a la fecha año
const yearCard = document.querySelector('.card__year')
const yearInput = document.querySelector('#cardYear')
const yearErrorDiv = document.querySelector('.form__input-yy--error')

//llamdo al cvc
const cvcCard = document.querySelector('.card-back__cvc')
const cvcInput = document.querySelector('#cardCvc')
const cvcErrorDiv = document.querySelector('.form__input-cvc--error')

// llamado boton
const confirmBtn = document.querySelector('.form__submit')
const formSection = document.querySelector('.form')
const thanksSection = document.querySelector('.thanks-section')
let butonThanks = document.getElementById('buttonThanks')
// variables
let nameValidate = false;
let numberValidate = false;
let monthValidate = false;
let yearValidate = false;
let cvcValidate = false;

// escuchadores dinamicos
nameInput.addEventListener('input', () => {
    if(nameInput.value == ''){
        nameCard.innerText = 'Michael Mayers'
    } else {
        nameCard.innerText = nameInput.value
    }
})

numberInput.addEventListener('input', event => {
    let inputValue = event.target.value;
    numberCard.innerText = numberInput.value;

    let exprecion = /[A-z]/g;
    if(exprecion.test(numberInput.value)){
        showMistake(numberInput, numberErrorDiv, 'Wrong format, numbers only', true)
    } else {
        numberInput.value = inputValue.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showMistake(numberInput, numberErrorDiv, '', false);
    }

    if(numberInput.value == ''){
        numberCard.innerText = '0000 0000 0000 0000';
    }
})

monthInput.addEventListener('input',() => {
    monthCard.innerText = monthInput.value;
    validate(monthInput, monthErrorDiv)
})

yearInput.addEventListener('input', () => {
    yearCard.innerText = yearInput.value;
    validate(yearInput, yearErrorDiv)
})

cvcInput.addEventListener('input', () => {
    cvcCard.innerText = cvcInput.value;
    validate(cvcInput, cvcErrorDiv);
})

confirmBtn.addEventListener('click', event => {
    event.preventDefault();

    if(verification(nameInput, nameErrorDiv)){
        nameValidate = true;
    }

    if(verification(numberInput, numberErrorDiv) == true){
        if(numberInput.value.length == 19){
            showMistake(numberInput, numberErrorDiv, '', false);
            numberValidate = true;
        } else {
            showMistake(numberInput, numberErrorDiv, 'The number is incomplete')
            numberValidate = false;
        }
    }

    if(verification(monthInput, monthErrorDiv)){
        if(parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <=12){
            showMistake(monthInput, monthErrorDiv, '', false)
            monthValidate = true;
        } else {    
            showMistake(monthInput, monthErrorDiv, 'Wrong Month')
            monthValidate = false;
        }
    }

    if(verification(yearInput, yearErrorDiv)){
        if(parseInt(yearInput.value) > 22 && parseInt(yearInput.value) <= 27){
            showMistake(yearInput, yearErrorDiv, '', false)
            yearValidate = true;
        } else {    
            showMistake(yearInput, yearErrorDiv, 'Wrong Year')
            yearValidate = false;
        }
    }

    if(verification(cvcInput, cvcErrorDiv)){
        if(cvcInput.value.length == 3){
            showMistake(cvcInput, cvcErrorDiv, '', false)
            cvcValidate = true;
        } else {
            showMistake(cvcInput, cvcErrorDiv, 'Wrong cvc')
            cvcValidate = false;
        }
    }

    if(nameValidate == true && numberValidate == true && monthValidate == true && yearValidate == true && cvcValidate == true){
        formSection.style.display = 'none'
        thanksSection.style.display = 'block'
        infoSave()
    }
    
})

butonThanks.addEventListener('click', () => {
    thanksSection.style.display = 'none'
    formSection.style.display = 'block'
})

// funciones
function showMistake(divInput, divError, msgError, show = true){
    if(show){
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(0deg, 100%, 66%)';
    } else {
        divError.innerText = msgError;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
    
}

function verification( divInput, divError){
    if(divInput.value.length > 0){
        showMistake(divInput, divError, '', false);
        return true
    } else {
        showMistake(divInput, divError, "Can't be empty");
        return false
    }
}

function validate(input, divError){
    let exprecion = /[A-z]/g;
    if(exprecion.test(input.value)){
        showMistake(input, divError, 'Wrong format, numbers only')
    } else {
        showMistake(input,divError, '', false)
    }

}

function infoSave(){
    const newCardInfo = {
        name: nameInput.value,
        number: numberInput.value,
        month: monthInput.value,
        year: yearInput.value,
        cvc: cvcInput.value
    }
    cardInfo.push(newCardInfo);
    localStorage.setItem("cards", JSON.stringify(cardInfo));
    console.log(cardInfo)
    formSection.reset();
}

