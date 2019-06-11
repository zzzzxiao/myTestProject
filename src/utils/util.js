/**
 * @desc 封装了一些项目常用方法.
 */

// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number' && !isNaN(obj);
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false;

    if (obj === null || obj === undefined) {    // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        var hasProp = false;
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    }
    return empty;
}
/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}
/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中有空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}
/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}
/**
 * @desc 生成一个随机id
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * @desc 根据对象和传入的对象value属性的值, 查询value对应的name值
 * @param {object} obj 需遍历的对象
 * @param {string} value 需搜索的value属性的值
 * @demo USER = {
 *           A: {
 *               name: '普通会员',
 *               value: 0
 *           },
 *           B: {
 *               name: 'VIP会员',
 *               value: 1
 *           }
 *       }
 */
export function searchNameByVal(obj, value) {
    if (isEmpty(obj) || isEmpty(value)) {
        return '';
    }

    for (let prop in obj) {
        if (obj[prop].value === value) {
            return obj[prop].name;
        }
    }
}

/**
 * @desc 转换json成url上面传参所需格式
 * @param {object} obj 需要转换的json对象
 * @param {Array} keys 需要转换的key的值，不传默认转换所有
 * @param {Boolean} encode 是否用转义序列替换某些特殊字符 默认不用
 * @demo param = { a:'1',b:'2'} => return 'a=1&b=2'
 */
export function encodeHTMLForm(obj, keys = [], encode = false) {
    // 转换数据格式 {a:1,b:2} => return 'a=1&b=2'
    const arrForm = [];
    if (keys.length > 0) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (obj[key] !== undefined && obj[key] !== null) {
                const value = obj[key].toString();
                // encodeURIComponent将某些字符将被十六进制的转义序列进行替换
                arrForm.push(`${key}=${encode ? encodeURIComponent(value) : value}`);
            }
        }
    } else {
        for (const key in obj) {
            if ({}.hasOwnProperty.call(obj, key)) {
                const value = obj[key].toString();
                arrForm.push(`${key}=${encode ? encodeURIComponent(value) : value}`);
            }
        }
    }
    return arrForm.join('&');
}

/*
* 转换千分号和小数点
* */
export function parseNumber(nStr) {
    nStr += '';
    const isFushu = nStr.indexOf('-') !== -1;
    nStr = isFushu ? nStr.replace(/-/g, '') : nStr;
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    let str = (x1 + x2).indexOf('.') !== -1 ? (x1 + x2).substring(0, (x1 + x2).indexOf('.') + 3) : (x1 + x2);
    str = isFushu ? '-' + str : str;
    return str;
}

/*
 * 四舍五入保留2位
 * */
export function parseToFixed(num) {
    return Math.round(num * 100) / 100;
}

export function GetQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if(r !== null){
        return unescape(r[2]);
    } 
    return null;
}

export const routeList = {
    preRoutes: '',
    changePreRoute: (route)=> {
        this.preRoutes = route;
    }
};
/**
 * @desc 对于嵌套层次很深的数据快速取到值
 * @param {Object} source 源数据
 * @param {String} target 具体要取某个值 user.community.uid
 * demo: let test = {
    author: 'Somebody',
    title: 'Title of article',
    category: {
        ngCached: true,
        ngxCachedTime: 1536311340,
        title: 'frontend'
    },
    user: {
        isAuthor: false,
        role: 'guest',
        community: {
            uid: 19499773,
            updateAt: '2018-09-05T02:27:13.630Z'
         }
    }
};
getValueOfObj(test, 'user.community.uid') ———— 19499773
 */
export const getValueOfObj = (source, target) =>{
    return target.split('.').reduce((acc, curValue)=>acc[curValue], source);
}
// 验证函数， 登录登出
export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};