import Toast from './src/Main'

function createToast (Vue, { message, duration = 3000, enableHTML, closeBtnText, position, onClose, className }) {
    const Constructor = Vue.extend(Toast)
    const toast = new Constructor({
        propsData: {
            enableHTML,
            duration,
            closeBtnText,
            position,
            className
        }
    })
    toast.$slots.default = message
    toast.$on('close', () => {
        if (onClose) onClose(toast)
    })
    toast.$mount()
    document.body.appendChild(toast.$el)
    return toast
}

export default {
    install (Vue) {
        Vue.prototype.$toast = function (obj) {
            createToast(Vue, obj)
        }
    }
}
