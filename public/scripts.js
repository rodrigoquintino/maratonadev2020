/* NODE.JS é o interpretador JS para o Chrome */
/* https://nodejs.org/ */
/* Digite "node -v" no terminal do VS
acessado por " CRTL + ' " para verificar 
se a versão do NODE.JS instalada */

document
    .querySelector('header button')
    .addEventListener("click", function(){
        document
            .querySelector('.form')
            .classList.toggle('hide')
})

