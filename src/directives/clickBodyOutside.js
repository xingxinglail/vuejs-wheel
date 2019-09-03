const bindDomList = []

const clickHandle = ({ target }) => {
    bindDomList.forEach(({ el, cb }) => {
        if (!el.contains(target) && typeof cb === 'function') {
            cb()
        }
    })
}

document.addEventListener('click', clickHandle)

export default {
    bind (el, binding) {
        bindDomList.push({
            el,
            cb: binding.value
        })
    },
    unbind (el) {
        const index = bindDomList.findIndex(c => c.el === el)
        if (index >= 0) bindDomList.splice(index, 1)
    }
}
