
let init = false;

function initShallowCopy(){
    if(init){
        return;
    }

    init = true;

    Object.defineProperty(Object, 'shallowCopy', {
        value : function shallowCopy(){
    
            var targetVal, //拷贝的目标值
            copyVal, //被拷贝的值
            len, //arguments.length
            i, //对应当前正在拷贝的copyVal处于len中的位置
            keys, //当前正在拷贝的copyVal的属性集合
            j,//遍历keys用来记录当前key的位置
            keysLength,//keys.length
            key,//遍历copyVal时用来临时存储属性名
            value;//遍历copyVal时用来临时存储属性值

            //获取第一项参数
            targetVal = arguments[0];
            //获取参数集合的长度
            len = arguments.length;
            //copyVal从第二项开始 0第一项 1第二项
            i = 1;
            
            //第一项参数为undefined或null
            if(isEmpty(targetVal)){
                throw TypeError('Cannot convert undefined or null to object');
            }
            
            //当只有一个参数时
            if(len === 1){
                //copyVal从第一项开始 0第一项 1第二项
                i = 0;
                //当唯一的一个参数类型为Array时 注意现在的targetVal为第一个参数
                if(isArr(targetVal)){
                    targetVal = [];
                }else if(isMap(targetVal)){
                    targetVal = new Map();
                }else if(isSet(targetVal)){
                    targetVal = new Set();
                }else if(isObj(targetVal)){
                    targetVal = {};
                }else{
                    //当唯一的一个参数类型为基础类型时 使用Object包装并直接返回
                    return Object(targetVal);
                }
            }
            
            //当第一个参数类型为基础类型时 使用Object包装
            if(!isObj(targetVal)){
                targetVal =  Object(targetVal);
            }
            
            //从第i项遍历arguments
            while(i < len){

                copyVal = arguments[i++];
                
                //当被拷贝的值为undefined或者null时 直接跳过这一次循环
                if(isEmpty(copyVal)){
                    continue;
                }
                
                //当被拷贝的值为基础类型string时 将其转换为字符数组
                if(typeof copyVal === 'string'){
                    copyVal = changeStringtoArray(copyVal);
                }
        
                //Array Map Set也属于Object
                //类似
                //let arr = [];
                //arr.key = 'value';
                //在这一步进行拷贝
                if(isObj(copyVal)){
                    //获取对象中所有的可遍历属性和Symbol属性
                    keys = getObjKeys(copyVal);
                    for(j = 0, keysLength = keys.length; j < keysLength; j++){
                        key = keys[j];
                        targetVal[key] = copyVal[key];
                    }
                }
        
                //当拷贝的目标值和被拷贝的值都是Map时 需要使用for...of...遍历拷贝
                if(isMap(copyVal) && isMap(targetVal)){
                    for([key, value] of copyVal){
                        targetVal.set(key, value);
                    }
                }
        
                //同上
                if(isSet(copyVal) && isSet(targetVal)){
                    for(value of copyVal){
                        targetVal.add(value);
                    }
                }
                
                //当被拷贝值为Array时 使用for循环将属性拷贝到目标值
                if(isArr(copyVal)){
                    for(j = 0, keysLength = copyVal.length; j < keysLength; j++){
                        targetVal[j] = copyVal[j];
                    }
                }
            }
            return targetVal;
        },
        writable: true,
        configurable: true,
        enumerable: false
    })
}

function isObj(val){
    return (typeof val === 'object' && null !== val) || typeof val === 'function';
}

function isArr(val){
    return Array.isArray ? Array.isArray(val) : val instanceof Array;
}

function isMap(val){
    return Map && val instanceof Map;
}

function isSet(val){
    return Set && val instanceof Set;
}

function isEmpty(val){
    return null === val || typeof val === 'undefined';
}

function getObjKeys(val){
    var symbols, keys;
    if(!isObj(val)){
        return [];
    }
    keys = [];
    symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(val) : [];
    if(Object.keys){
        keys = Object.keys(val);
    }else{
        for(var key in val){
            keys.push(key);
        }
    }
    return Array.prototype.concat.call(keys, symbols);
}

function changeStringtoArray(val){
    let length = val.length || 0;
    let charArr = new Array(length);
    for(let j = 0; j < length; j++){
        charArr[j] = val[j];
    }
    return charArr;
}
module.exports = {
    initShallowCopy : initShallowCopy
}
