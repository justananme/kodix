(function mainHideAvnElements() {
    const XMAVN_SELECTOR = '#avnXMseriesFloor .component-root div[data-filter] > div:last-child > div:first-child';
    const XMAVN_PARTS_HIDE_SELECTOR = 'xmavnPartsHide';

    let styles = `
        .${XMAVN_PARTS_HIDE_SELECTOR}{
            display: none !important;
        }
    `;

    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const xmavn = document.querySelector(XMAVN_SELECTOR).childNodes;

    const leftFilter = xmavn[0];
    leftFilter.classList.add(XMAVN_PARTS_HIDE_SELECTOR);

    const topFilter = xmavn[1].querySelector('div:first-child');
    topFilter.classList.add(XMAVN_PARTS_HIDE_SELECTOR);
})()