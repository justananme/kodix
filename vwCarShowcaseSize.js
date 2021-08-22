const PARENT_HOST = (window.location != window.parent.location)
    ? document.referrer
    : document.location.href;

const sendMessage = (payload) => window.parent.postMessage(payload, PARENT_HOST)
const sendResize = (height) => sendMessage({ action: 'resize', height })
const sendLoad = () => sendMessage({ action: 'load' })
const sendScroll = (scroll) => sendMessage({ action: 'scroll', y: scroll })
const getElementYOffset = (element) => {
    const bcr = element.getBoundingClientRect();
    return bcr.top + window.scrollY
}
const wrapper = document.querySelector('.page-wrapper')

/* Патчинг стиля враппера страницы OP для правильной работы автовысоты фрейма*/
if (wrapper) wrapper.style.minHeight = 'initial'

/*При изменениях высоты контента рапортуем об этом наверх*/
const resizeObserver = new ResizeObserver(() => sendResize(wrapper.scrollHeight))
resizeObserver.observe(wrapper)

/*При загрузке страницы (при переходах внутри фрейма) отправляем запрос на отскролл родительской страницы вверх*/
window.addEventListener('load', sendLoad)

/* При клике на кнопку формы АВН отправляем родителю сообщение о необходимости подскролла*/
const formLink = document.querySelector('a[href="#avn_form"]')

if (formLink) {
    formLink.addEventListener('click', () => {
        const target = document.querySelector('#avn_form.fn.f101-00')
        if (target) sendScroll(getElementYOffset(target))
        // Capture для гарантированной обработки события до того как его поймает сервис скролла от OP
    }, { capture: true })
}
