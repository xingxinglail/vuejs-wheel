import Toast from './src/Main'

export default {
    install (Vue) {
        Vue.prototype.$toast = function ({ message, duration = 3000, enableHTML, closeBtnText, position, onClose }) {
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
                if (onClose) onClose(toast)
            })
            toast.$mount()
            document.body.appendChild(toast.$el)
        }
    }
}
