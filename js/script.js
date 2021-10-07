const prices = {
    'landing-page': {
        pm: 700,
        design: 600,
        development: 1200,
        qa: 500
    },
    'online-store': {
        pm: 1200,
        design: 900,
        development: 2500,
        qa: 800,
    },
    'web-application': {
        pm: 2000,
        design: 1100,
        development: 3000,
        qa: 1000,
    },
    'mobile-application': {
        pm: 3000,
        design: 1500,
        development: 4000,
        qa: 1300,
    }
};

function getFormValues() {
    const websiteTypeElement = document.querySelector('#project-type');
    const pmEl = document.querySelector('#pm');
    const designEl = document.querySelector('#design');
    const developmentEl = document.querySelector('#development');
    const qaEl = document.querySelector('#qa');

    return {
        websiteType: websiteTypeElement.value,
        pm: pmEl.checked,
        design: designEl.checked,
        development: developmentEl.checked,
        qa: qaEl.checked,
    }
}
function calculateWork() {
    const values = getFormValues()
    console.log(values);
    let totalPrice = 0;
    const workTypes = prices[values.websiteType];
    if (values.pm) {
        totalPrice = workTypes.pm;
    }
    if (values.design) {
        totalPrice = totalPrice + workTypes.design;
    }
    if (values.development) {
        totalPrice = totalPrice + workTypes.development;
    }
    if (values.qa) {
        totalPrice = totalPrice + workTypes.qa;
    }

    const totalPriseEl = document.querySelector('#total-price');

    totalPriseEl.textContent = totalPrice;

    console.log(totalPrice);
}


const formEl = document.querySelector('#project-prise-form');
const emailModal = document.querySelector('#modal-email');
const successModal = document.querySelector('#success-modal');

formEl.addEventListener('change', calculateWork);

formEl.addEventListener('submit', function (event) {
    event.preventDefault();

    emailModal.classList.add('modal-active');
});

const closeButtons = document.querySelectorAll('.modal-close-btn');

closeButtons.forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        emailModal.classList.remove('modal-active');
        successModal.classList.remove('modal-active');
    });
});

const modalEmailContainer = document.querySelector('#modal-email-container');
modalEmailContainer.addEventListener('submit', function (event) {
    event.preventDefault();

    const userEmailInput = document.querySelector('#user-email');
    if (userEmailInput.value) {

        const formData = new FormData(formEl);
        
        formData.append('Email', userEmailInput.value);

        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(formData).toString()
        })
            .then(function(){
            emailModal.classList.remove('modal-active');
            successModal.classList.add('modal-active');
            })
            .catch(() => alert(Failed_to_submit_the_form))
   
        return;
        }
    const inputContainer = document.querySelector('#email-input-container');

    inputContainer.classList.add('email-input-container-error')
});
