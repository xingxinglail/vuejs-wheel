import Toast from './src/Main'

let currentToast = null

function createToast (Vue, { message, duration = 3000, enableHTML, closeBtnText, position, onClose }) {
    const Constructor = Vue.extend(Toast)
    const toast = new Constructor({
        propsData: {
            enableHTML,
            duration,
            closeBtnText,
            position
        }
    })
    toast.$slots.default = message
    toast.$on('close', () => {
        currentToast = null
        if (onClose) onClose(toast)
    })
    toast.$mount()
    document.body.appendChild(toast.$el)
    return toast
}

export default {
    install (Vue) {
        Vue.prototype.$toast = function (obj) {
            if (currentToast) {
                currentToast.close()
            }
            currentToast = createToast(Vue, obj)
        }
    }
}
