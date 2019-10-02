export function getPosition (el) {
    if (!el) return { top: 0, left: 0 }
    let parent = el.offsetParent
    let left = el.offsetLeft
    let top = el.offsetTop
    while (parent) {
        left += parent.offsetLeft
        top += parent.offsetTop
        parent = parent.offsetParent
    }
    return {
        top,
        left
    }
}
