(function mainAddSocialButtonsToNews() {
    const NEWS_PATH = 'all-news';
    const BUTTONS_CONTAINER_SELECTOR = 'socialButtonsContainer';
    const pathnameElements = window.location.pathname.split('/');
    const pathnameElementsFiltered = pathnameElements.filter(e => e !== "");

    if (pathnameElementsFiltered[0] === NEWS_PATH) {
        let articleContainer = document.querySelector('main');
        let socialButtonsContainer = document.createElement('div');
        socialButtonsContainer.id = BUTTONS_CONTAINER_SELECTOR;

        const styleString = `
            #${BUTTONS_CONTAINER_SELECTOR}{
                display: flex;
                flex-direction: column;
                align-items: center; 
            }

            #${BUTTONS_CONTAINER_SELECTOR} h2{
                font-weight: 300;
                font-family: BMWType,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
            }
        `;
        const styleElement = document.createElement('style');
        styleElement.textContent = styleString;
        document.head.append(styleElement);


        let title = document.createElement('h2');
        title.innerHTML = 'Поделиться';


        let scriptContainer = document.createElement('div');
        scriptContainer.classList.add("ya-share2");
        scriptContainer.setAttribute('data-curtain', true);
        scriptContainer.setAttribute('data-services', 'vkontakte,facebook,odnoklassniki,telegram,twitter,viber,whatsapp,moimir,pocket');

        socialButtonsContainer.appendChild(title);
        socialButtonsContainer.appendChild(scriptContainer);
        articleContainer.appendChild(socialButtonsContainer);
    }
})()
