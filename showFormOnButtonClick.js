const SERVICE_FORM_FLOOR_SELECTOR = '#serviceFormFloor';
const SERVICE_FORM_FLOOR_HIDE_SELECTOR = 'serviceFormFloorHide';
const SERVICE_FORM_APPEARANCE_BUTTON_SELECTOR = '#formAppearanceButtonFloor a';
const SERVICE_FORM_APPEARANCE_BUTTON_PARENT_SELECTOR = 'formAppearanceButtonParent';

function appearanceButtonClickHandler(e) {
    e.preventDefault();

    let serviceFormFloor = document.querySelector(SERVICE_FORM_FLOOR_SELECTOR);
    const isServiceFloorShown = !serviceFormFloor.classList.contains(SERVICE_FORM_FLOOR_HIDE_SELECTOR);

    if (isServiceFloorShown)
        serviceFormFloor.classList.add(SERVICE_FORM_FLOOR_HIDE_SELECTOR);
    else
        serviceFormFloor.classList.remove(SERVICE_FORM_FLOOR_HIDE_SELECTOR);
}

(function mainFormAppearance() {
    let styles = `
        .${SERVICE_FORM_FLOOR_HIDE_SELECTOR}{
            display: none;
        }
        .${SERVICE_FORM_APPEARANCE_BUTTON_PARENT_SELECTOR}{
            justify-content: center !important;
        }
    `;

    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    let serviceFormFloor = document.querySelector(SERVICE_FORM_FLOOR_SELECTOR);
    serviceFormFloor.classList.add(SERVICE_FORM_FLOOR_HIDE_SELECTOR);

    let appearanceButton = document.querySelector(SERVICE_FORM_APPEARANCE_BUTTON_SELECTOR);
    appearanceButton.addEventListener('click', appearanceButtonClickHandler);

    let appearanceButtonParent = appearanceButton.parentElement;
    appearanceButtonParent.classList.add(SERVICE_FORM_APPEARANCE_BUTTON_PARENT_SELECTOR);
})()