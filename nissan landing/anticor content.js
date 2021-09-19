const ANTICORROSIVE_FORM_CAPTIONS = {
    murano: {
        model: 'Nissan Murano',
        pricePrimary: '668 руб.',
        priceSecondary: '529 руб.',
    },
    xtrail: {
        model: 'Nissan X-Trail',
        pricePrimary: '668 руб.',
        priceSecondary: '529 руб.',
    },
    terrano: {
        model: 'Nissan Terrano',
        pricePrimary: '591 руб.',
        priceSecondary: '463 руб.',
    },
    qashqai: {
        model: 'Nissan Qashqai',
        pricePrimary: '591 руб.',
        priceSecondary: '463 руб.',
    },
    servicePrimary: 'Первичная обработка',
    serviceSecondary: 'Повторная обработка',
}

function changeAnticorrosiveForm(iModel, iServiceType, iPrice) {
    let form = document.querySelector('#service_form');
    form.style.display = 'block';

    const modelContainer = document.querySelector('#customAnticorrosiveModelContainer');
    const serviceContainer = document.querySelector('#customAnticorrosiveServiceContainer');
    const priceContainer = document.querySelector('#customAnticorrosivePriceContainer');

    modelContainer.innerText = iModel;
    serviceContainer.innerText = iServiceType;
    priceContainer.innerText = iPrice;

    let nameInput = form.querySelector('#service_form #name');
    nameInput.value = 'Антикоррозийная обработка';

    let worksInput = form.querySelector('#service_form #works');
    const worksValue = iModel + ' ' + iServiceType + ' ' + iPrice;
    worksInput.value = worksValue;
}

function scrollToForm() {
    const form = document.querySelector('#service_form');
    form.scrollIntoView({ behavior: "smooth", block: "center" });
}

function linkToCarAttributes(iLink) {
    const model = iLink.currentTarget.attributes.model.value;
    const service = iLink.currentTarget.attributes.service.value;

    const carServiceObj = {
        model: model,
        service: service
    }

    return carServiceObj;
}

function carClickHandler(e) {
    e.preventDefault();
    const carServiceObj = linkToCarAttributes(e);

    switch (carServiceObj.model) {
        case ANTICORROSIVE_FORM_CAPTIONS.murano.model:
            if (carServiceObj.service === ANTICORROSIVE_FORM_CAPTIONS.servicePrimary)
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.murano.model, ANTICORROSIVE_FORM_CAPTIONS.servicePrimary, ANTICORROSIVE_FORM_CAPTIONS.murano.pricePrimary);
            else
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.murano.model, ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary, ANTICORROSIVE_FORM_CAPTIONS.murano.priceSecondary);
            break;
        case ANTICORROSIVE_FORM_CAPTIONS.xtrail.model:
            if (carServiceObj.service === ANTICORROSIVE_FORM_CAPTIONS.servicePrimary)
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.xtrail.model, ANTICORROSIVE_FORM_CAPTIONS.servicePrimary, ANTICORROSIVE_FORM_CAPTIONS.xtrail.pricePrimary);
            else
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.xtrail.model, ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary, ANTICORROSIVE_FORM_CAPTIONS.xtrail.priceSecondary);
            break;
        case ANTICORROSIVE_FORM_CAPTIONS.terrano.model:
            if (carServiceObj.service === ANTICORROSIVE_FORM_CAPTIONS.servicePrimary)
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.terrano.model, ANTICORROSIVE_FORM_CAPTIONS.servicePrimary, ANTICORROSIVE_FORM_CAPTIONS.terrano.pricePrimary);
            else
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.terrano.model, ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary, ANTICORROSIVE_FORM_CAPTIONS.terrano.priceSecondary);
            break;
        case ANTICORROSIVE_FORM_CAPTIONS.qashqai.model:
            if (carServiceObj.service === ANTICORROSIVE_FORM_CAPTIONS.servicePrimary)
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.qashqai.model, ANTICORROSIVE_FORM_CAPTIONS.servicePrimary, ANTICORROSIVE_FORM_CAPTIONS.qashqai.pricePrimary);
            else
                changeAnticorrosiveForm(ANTICORROSIVE_FORM_CAPTIONS.qashqai.model, ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary, ANTICORROSIVE_FORM_CAPTIONS.qashqai.priceSecondary);
            break;
    }

    scrollToForm();
}

function initiateCarHandlers() {
    const modelContainer = document.querySelector('#anticorrosiveCarsFloor');
    const sectionName1 = modelContainer.attributes['data-section-name'];
    const sectionName2 = sectionName1.textContent.split('_')[1];
    const sectionName = sectionName2 + '__item';

    let carSections = modelContainer.querySelectorAll("[class=" + CSS.escape(sectionName) + "]");

    for (const carSection of carSections) {
        const model = carSection.querySelector('h3').innerText.toUpperCase();
        const buttons = carSection.querySelectorAll('a');

        switch (model) {
            case ANTICORROSIVE_FORM_CAPTIONS.murano.model.toUpperCase():
                buttons[0].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.murano.model);
                buttons[0].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.servicePrimary);
                buttons[1].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.murano.model);
                buttons[1].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary);
                break;
            case ANTICORROSIVE_FORM_CAPTIONS.xtrail.model.toUpperCase():
                buttons[0].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.xtrail.model);
                buttons[0].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.servicePrimary);
                buttons[1].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.xtrail.model);
                buttons[1].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary);
                break;
            case ANTICORROSIVE_FORM_CAPTIONS.terrano.model.toUpperCase():
                buttons[0].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.terrano.model);
                buttons[0].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.servicePrimary);
                buttons[1].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.terrano.model);
                buttons[1].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary);
                break;
            case ANTICORROSIVE_FORM_CAPTIONS.qashqai.model.toUpperCase():
                buttons[0].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.qashqai.model);
                buttons[0].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.servicePrimary);
                buttons[1].setAttribute('model', ANTICORROSIVE_FORM_CAPTIONS.qashqai.model);
                buttons[1].setAttribute('service', ANTICORROSIVE_FORM_CAPTIONS.serviceSecondary);
                break;
        }

        buttons[0].addEventListener('click', carClickHandler);
        buttons[1].addEventListener('click', carClickHandler);
    }
}

(function changeAnticorrosiveFormInitial() {
    let form = document.querySelector('#service_form');
    form.style.display = 'none';

    let styles = `
    #service_form #service_form{
        padding: 15px;
        margin-bottom: 90px;
        border: 1px solid #8a8a8a94;
        border-radius: 12px;
        box-shadow: 0px 0px 5px 1px #b7b7b74d;
        background: rgb(223,223,223);
        background: linear-gradient(90deg, rgba(223,223,223,1) 11%, rgba(250,249,249,1) 47%, rgb(224 224 224) 79%);
    }
    #customAnticorrosiveModelContainer, #customAnticorrosiveServiceContainer, #customAnticorrosivePriceContainer{
        font-size: 2.3rem;
        padding-bottom: 10px;
    }
    #service_form #service_form .form__section > .form__section-container{
        padding-top: 8px;
    }

    #service_form #service_form > .form__container > div:nth-child(1),
    #service_form #service_form > .form__container > div:nth-child(2) > div:nth-child(5),
    /*#service_form #service_form > .form__container > div:nth-child(3),*/
    #service_form #service_form > .form__container > div:nth-child(4),
    #service_form #service_form > .form__container .form__section-title
    {
        display: none;
    }`;

    const modelContainer = document.createElement("div");
    modelContainer.id = 'customAnticorrosiveModelContainer';
    const serviceContainer = document.createElement("div");
    serviceContainer.id = 'customAnticorrosiveServiceContainer';
    const priceContainer = document.createElement("div");
    priceContainer.id = 'customAnticorrosivePriceContainer';

    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    let phoneSection = form.querySelector('form > .form__container > div:nth-child(2)');
    phoneSection.prepend(priceContainer);
    phoneSection.prepend(serviceContainer);
    phoneSection.prepend(modelContainer);

    initiateCarHandlers();
})();