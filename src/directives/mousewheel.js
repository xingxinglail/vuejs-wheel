import normalizeWheel from 'normalize-wheel'

const isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1

const mousewheel = (element, callback) => {
    if (element && element.addEventListener) {
        element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', e => {
            const normalized = normalizeWheel(e)
            callback && callback.apply(this, [e, normalized])
        })
    }
}

export default {
    bind (el, binding) {
        mousewheel(el, binding.value)
    }
}
