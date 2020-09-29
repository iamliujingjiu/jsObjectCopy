var init = false, 
_isArray = Array.isArray,
_ownKeys = Reflect && Reflect.ownKeys,
_getOwnPropertySymbols = Object.getOwnPropertySymbols,
// _getOwnPropertyNames = Object.getOwnPropertyNames,
_keys = Object.keys,
_hasOwnProperty = Object.prototype.hasOwnProperty,
_defineProperty = Object.defineProperty,
_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

function initShallowCopy(){
    if(init){
        return;
    }
    init = true;
    _defineProperty(Object,'shallowCopy',{
        value : function shallowCopy(){
            var length = arguments.length,
            target,copy,copykeys,
            i = 1,j,n,keysLen = 0,
            copyLen,key;
        
            target = arguments[0];
        
            if(typeof target === 'undefined' || (!target && typeof target === 'object')){
                throw Error('Cannot convert undefined or null to object');
            }else if(typeof target === 'boolean'){
                return Boolean(target);
            }else if(typeof target === 'number'){
                return Number(target);
            }else if(typeof target === 'bigint'){
                return BigInt(target);
            }else if(typeof target === 'symbol'){
                return target;
            }else if(typeof target === 'string'){
                target = new String(target);
            }
            
            while(i < length){
                copy = arguments[i++];
                if(typeof copy === 'string'){
                    copy = _changeStringtoArray(copy);
                }
                if(typeof copy !== 'object' || !copy){
                    continue;
                }else if(_isArray(copy)){
                    copykeys = new Array(copyLen = copy.length);
                    for(n = 0;n<copyLen;n++){
                        copykeys[n] = n;
                    }
                }else{
                    if(_ownKeys){
                        copykeys = _getCopykeys(_ownKeys,copy);
                    }else if(_getOwnPropertySymbols){
                        copykeys = _getCopykeys(_getOwnPropertySymbols,copy);
                        copykeys = copykeys.concat(_keys(copy));
                    }else if(_keys){
                        copykeys = _keys(copy);
                    }else{
                        for(key in copy){
                            if(_hasOwnProperty.call(copy,key)){
                                target[key] = copy[key];
                            }
                        }
                        continue;
                    }
                }
                for(j = 0,keysLen = copykeys.length;j<keysLen;j++){
                    key = copykeys[j];
                    if(_hasOwnProperty.call(copy,key)){
                        target[key] = copy[key];
                    }
                }
            }
            return target;
        },
        writable: false,
        configurable: false,
        enumerable: false
    })
}

function _changeStringtoArray(str){
    let length = str.length || 0;
    let strArr = new Array(length);
    for(let j = 0;j<length;j++){
        strArr[j] = str[j];
    }
    return strArr;
}

function _getCopykeys(func,obj){
    return func(obj).filter(function(value){
        return _getOwnPropertyDescriptor(obj,value).enumerable;
    });
}

module.exports = {
    initShallowCopy : initShallowCopy
}