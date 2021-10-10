const customStageDesktopSelector = '#customStageDesktop';
const customStageDesktopSelector2 = '#customStageDesktop > div';
const customStageMobileSelector = '#customStageMobile';
const customStageMobileSelector2 = '#customStageMobile img';

const presentationUrl = 'https://avtoliga-haval.ru/special-offer/prezentatsiya-novogo-haval-jolion/';

const styleString = `
${customStageDesktopSelector2}:hover, ${customStageMobileSelector2}:hover{
    cursor: pointer;
}
${customStageDesktopSelector}{
    display: block;
}
${customStageMobileSelector}{
    display: none;
}

@media (max-width: 896px) {
    ${customStageDesktopSelector}{
        display: none;
    }
    ${customStageMobileSelector}{
        display: block;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styleString;
document.head.append(styleElement);

document.querySelector(customStageDesktopSelector2).onclick = function changeContent() {
    window.open(presentationUrl, '_blank').focus();
}

document.querySelector(customStageMobileSelector2).onclick = function changeContent() {
    window.open(presentationUrl, '_blank').focus();
}