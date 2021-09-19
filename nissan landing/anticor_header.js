const IS_ANTICORROSIVE_PAGE = window.location.pathname === '/anticorrosive/';

const VIDEO_TEMPLATE = '<video class="customAnticorrosiveStageVideoElement" loop autoplay muted preload="auto"><source src="https://info.renault.by/Action_service/anticorrosive/img/Krown_video.mp4" type="video/mp4"></video>';

const STAGE_CONTAINER = '.main-content > div:first-of-type';
const OLD_STAGE = '.main-content > div:first-of-type > div:first-of-type';
const ORDER_SERVICE_BUTTON = 'main > div:nth-child(2)';
const ORDER_SERVICE_BUTTON_ABSOLUTE = '.anchor__btn.anchor-btn';
const CARS_FLOOR = '#anticorrosiveCarsFloor';

const DESCRIPTION_1 = 'Антикоррозийная обработка позволяет сохранить красивый эстетический вид вашего автомобиля на долгие годы.';
const DESCRIPTION_2 = 'После антикоррозийной обработки автомобиль не подвержен коррозии и ему не страшны дорожные реагенты. В нижней части автомобиля меньше налипает грязь и намерзает снег. Увеличивается срок эксплуатации агрегатов и всего автомобиля в целом.';

function anticorrosiveHeaderStyleGet() {
    const style = `
    .customAnticorrosiveStageVideoContainer { 
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: #000;
        overflow: hidden;
    }
    .customAnticorrosiveStageVideoElement {
        width: 100%;
        height: auto;
    }
    .customAnticorrosiveStageTitle{
        position: absolute;
        align-self: flex-end;
        top: 5%;
        right: 5%;
        width: 800px;
        font-size: 50px;
        text-align: right;
        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
        font-family: NissanBrand,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    }
    .customAnticorrosiveDescription{
        position: absolute;
        padding-bottom: 25px;
        padding-left: 11.4%;
        padding-right: 11.4%;
        bottom:0
    }
    .customAnticorrosiveInnerDescription1{
        padding-bottom: 23px;
        font-size: 32px;
        line-height: 1.2;
        text-align: center;
        color: #ffffff;
        font-weight: bold;
    }
    .customAnticorrosiveInnerDescription2{
        font-size: 18px;
        text-align: justify;
        color: #ffffff;
        font-family: NissanBrand,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
    }
    .customAnticorrosiveBgLayer{
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: #0000008c;
    }
    .orderServiceButtonHidden{
        visibility: hidden;
    }
    #customAnticorrosivePrimaryServiceFloor .h5, #customAnticorrosiveSecondaryServiceFloor .h5{
        font-size: 2.4rem;
        font-weight: 500;
    }


    /* ---mobile phones landscape; tablets--- */
    @media (max-width: 1150px) {
        .customAnticorrosiveStageVideoContainer { 
            min-height: 500px;
        }
        .customAnticorrosiveStageTitle{
            line-height: 1.15;
            align-self: center;
            font-size: 45px;
            top:4%;
            right:4%;
            width:80%;
        }
        .customAnticorrosiveInnerDescription1{
            padding-left: 9.2%;
            padding-right: 9.2%;
            font-size: 22px;
        }
        .customAnticorrosiveInnerDescription2{
            padding-left: 16%;
            padding-right: 16%;
            font-size: 16px;
        }
        .customAnticorrosiveDescription{
            padding: 0px 0px 15px 0px;
            background: linear-gradient(to top, #000000 80%, #00000000 100%);
        }
        .customAnticorrosiveOrderServiceButton{
            margin-top: 15px;
        }
    }

    @media (max-width: 720px) {
        .customAnticorrosiveDescription{
            padding-top: 1.5em;
        }
    }

    @media (max-width: 600px) {
        .customAnticorrosiveStageTitle{
            font-size: 36px;
        }
    }


    /* ---mobile phones portrait--- */
    @media (max-width: 500px) {
        .customAnticorrosiveStageVideoContainer { 
            min-height: 690px;
        }

        .customAnticorrosiveStageTitle{
            font-size: 20px;
            top:4%;
            right:4%;
            width:70%;
        }

        .customAnticorrosiveStageVideoElement {
            height: auto;
            width: auto;
        }
    }
    `;

    return style;
}

window.addEventListener('scroll', function (e) {
    const orderServiceButton = document.querySelector(ORDER_SERVICE_BUTTON_ABSOLUTE);
    const orderServiceButtonHeight = orderServiceButton.getBoundingClientRect().top;

    const carsFloor = document.querySelector(CARS_FLOOR);
    const carsFloorHeight = carsFloor.getBoundingClientRect().top;

    if (orderServiceButtonHeight < carsFloorHeight) {

        orderServiceButton.classList.remove("orderServiceButtonHidden");
    }
    else {
        orderServiceButton.classList.add("orderServiceButtonHidden");
    }
});

(function changeAnticorrosiveHeaderInitial() {
    if (IS_ANTICORROSIVE_PAGE) {
        document.querySelector(OLD_STAGE).style.display = 'none';

        const style = anticorrosiveHeaderStyleGet();
        let styleSheet = document.createElement("style");
        styleSheet.innerText = style;
        document.head.appendChild(styleSheet);

        const orderServiceButton = document.querySelector(ORDER_SERVICE_BUTTON);
        orderServiceButton.classList.add('customAnticorrosiveOrderServiceButton');

        const stageContainer = document.querySelector(STAGE_CONTAINER);

        const bgVideoLayer = document.createElement("div");
        bgVideoLayer.classList.add('customAnticorrosiveBgLayer');

        const videoContainer = document.createElement("div");
        videoContainer.classList.add('customAnticorrosiveStageVideoContainer');

        const videoTemplate = document.createElement('template');
        videoTemplate.innerHTML = VIDEO_TEMPLATE;
        const video = videoTemplate.content.firstChild;

        const title = document.createElement("div");
        title.innerText = "Антикоррозийная обработка уникальным составом";
        title.classList.add('customAnticorrosiveStageTitle');

        const descriptionContainer = document.createElement("div");
        descriptionContainer.classList.add('customAnticorrosiveDescription');

        const description1 = document.createElement("div");
        description1.innerText = DESCRIPTION_1;
        description1.classList.add('customAnticorrosiveInnerDescription1');

        const description2 = document.createElement("div");
        description2.innerText = DESCRIPTION_2;
        description2.classList.add('customAnticorrosiveInnerDescription2');

        descriptionContainer.appendChild(description1);
        descriptionContainer.appendChild(description2);

        videoContainer.appendChild(bgVideoLayer);
        videoContainer.appendChild(video);
        videoContainer.appendChild(title);
        videoContainer.appendChild(descriptionContainer);
        stageContainer.appendChild(videoContainer);
    }
})()