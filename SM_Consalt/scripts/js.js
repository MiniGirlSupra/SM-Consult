"use strict"

// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('form');
//     form.addEventListener('submit', formSend);
//
//     async function formSend(e) {
//         e.preventDefault();
//
//         let error = formValidate(form);
//
//     }
//
//     function formValidate(form) {
//         let error = 0;
//         let formReq = document.querySelectorAll('.req');
//
//         for (let index = 0; index < formReq.length; index++) {
//             const input = formReq[index];
//             formRemoveError(input);
//
//             if (input.classList.contains('email')) {
//                 if (emailTest(input)) {
//                     formAddError(input);
//                     error++;
//                 }
//             } else {
//                 if (input.value === '') {
//                     formAddError(input);
//                     error++;
//                 }
//
//             }
//
//
//         }
//
//     }
//
//     function formAddError(input) {
//         input.parentElement.classList.add('error');
//         input.classList.add('error');
//     }
//
//     function formRemoveError(input) {
//         input.parentElement.classList.remove('error');
//         input.classList.remove('error');
//     }
//
//     //функция теста email
//     function emailTest(input) {
//         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
//
//     }
//
// });

const form = document.forms['form'];
const validFormArr = [];
const formArr = Array.from(form);
const button = form.elements['button'];

formArr.forEach((el) => {
    if (el.hasAttribute('data-reg')) {
        el.setAttribute('is-valid', '0');
        validFormArr.push(el);
    }
})

form.addEventListener('input', inputHandler);
button.addEventListener('click', buttonHandler);

function inputHandler({target}) {
    if (target.hasAttribute('data-reg')) {
        inputCheck(target);
    }
}

function inputCheck(el) {
    const inputValue = el.value;
    const inputReg = el.getAttribute('data-reg');
    const reg = new RegExp(inputReg);

    if (reg.test(inputValue)) {
        el.style.border = '2px solid rgb(3, 95, 25, 1)';
        el.setAttribute('is-valid', '0');
    } else {
        el.style.border = '2px solid rgb(185, 11, 11)';
        el.setAttribute('is-valid', '1');

    }
}

function buttonHandler(e) {
    const allValid = [];
    validFormArr.forEach((el) => {
        allValid.push(el.getAttribute('is-valid'));
    })
    const isAllValid = allValid.reduce((acc, current) => {
        return acc && current;
    });
    if (!Boolean(Number(isAllValid))) {
        e.preventDefault();
        return;
    }
}