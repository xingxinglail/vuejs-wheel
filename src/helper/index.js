export function deepClone (source) {
    const cache = []

    const clone = data => {
        if (data instanceof Object) {
            const cachedDist = findCache(cache, data) // 是否循环引用
            if (cachedDist) return cachedDist
            let dist
            const type = Object.prototype.toString.call(data)
            switch (type) {
                case '[object Object]':
                    dist = Object.create(null)
                    break
                case '[object Array]':
                    dist = []
                    break
                case '[object Function]':
                    dist = function (...args) {
                        return data.apply(this, args)
                    }
                    break
                case '[object Date]':
                    dist = new Date(data)
                    break
                case '[object RegExp]':
                    dist = new RegExp(data.source, data.flags)
                    break
                case '[object String]':
                case '[object Number]':
                case '[object Boolean]':
                    const Ctor = data.constructor
                    return new Ctor(data)
                case '[object Map]':
                    dist = new Map()
                    data.forEach((val, key) => {
                        if (typeof val === 'object') {
                            dist.set(key, clone(val))
                        } else {
                            dist.set(key, val)
                        }
                    })
                    break
                case '[object Set]':
                    dist = new Set()
                    data.forEach(val => {
                        if (typeof val === 'object') {
                            dist.add(clone(val))
                        } else {
                            dist.add(val)
                        }
                    })
                    break
                default:
                    dist = Object.create(null)
                    break
            }
            cache.push([data, dist])
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    const val = data[key]
                    if (typeof val === 'object') {
                        dist[key] = clone(val)
                    } else {
                        dist[key] = val
                    }
                }
            }
            return dist
        } else {
            if (isCurrentType(data, 'Symbol')) {
                return Object(Symbol.prototype.valueOf.call(data))
            }
            return data
        }
    }
    return clone(source)
}

function isCurrentType (val, type) {
    return Object.prototype.toString.call(val) === `[object ${type}]`
}

function findCache (cache, data) {
    for (let i = 0; i < cache.length; i++) {
        if (cache[i][0] === data) {
            return cache[i][1]
        }
    }
    return undefined
}
