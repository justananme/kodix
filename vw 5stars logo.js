(function () {
    const urlLogo = '/upload/dealer/5stars_simplified.png';
    const currentPath = window.location.pathname;
    const logoSelector = 'fiveStarsLogo';
    const pageWrapperSelector = 'page-wrapper'

    let titleText = document.querySelector('#page-wrapper > div:first-child > div:first-child > div:first-child');

    const logoLeftPosition = currentPath === '/models/' ? '0' : 'auto';
    const pageWrapperPosition = currentPath === '/models/' ? 'relative' : 'unset';

    const styleString = `
            #${pageWrapperSelector}{
                position: ${pageWrapperPosition};
            }
            #${logoSelector}{
                height: 80px;
                width: auto;
                margin-left: 8px;
                font-size: 1.6rem;
                position: absolute;
                top: 2px;
                left:${logoLeftPosition};
            }
            .${titleText.className}{
                min-height: 74px;
            }

            @media (max-width: 64em) {
                #${logoSelector}{
                    display:none;
                }
            }
        `;

    let styleElement = document.createElement('style');
    styleElement.textContent = styleString;
    document.head.append(styleElement);

    if (titleText) {
        let injectingLogo = document.createElement('img');
        injectingLogo.id = logoSelector;
        injectingLogo.src = urlLogo;
        titleText.after(injectingLogo);
    }
})()