
var _isArray = Array.isArray,
_ownKeys = Reflect && Reflect.ownKeys,
_getOwnPropertySymbols = Object.getOwnPropertySymbols,
_getOwnPropertyNames = Object.getOwnPropertyNames,
_hasOwnProperty = Object.prototype.hasOwnProperty,
_defineProperty = Object.defineProperty;

var init = false;
function initDeepCopy(){
    if(init){
        return;
    }
    init = true;
    
    _defineProperty(Object,'deepCopy',{
        value : function deepCopy(){
            var target,i = 1,length = arguments.length,
            copy,j = 0,n = 0,keysLen,key,copyLen,copykeys,copyValue;

            target = arguments[0];
            if(!isObj(target)){
                return {};
            }
            
            while(i < length){
                copy = arguments[i++];
                
                if(_isArray(copy)){
                    copykeys = new Array(copyLen = copy.length);
                    for(j = 0;j<copyLen;j++){
                        copyData(target,copy,j);
                    }
                }else{
                    if(_ownKeys){
                        copykeys = _ownKeys(copy);
                    }else if(_getOwnPropertySymbols){
                        copykeys = _getOwnPropertySymbols(copy).concat(_getOwnPropertyNames(copy));
                    }else if(_getOwnPropertyNames){
                        copykeys = _getOwnPropertyNames(copy);
                    }else{
                        for(key in copy){
                            copyData(target,copy,key);
                        }
                        continue;
                    }
                    console.log('copykeys : ' + JSON.stringify(copykeys));
                    for(n = 0,keysLen = copykeys.length;n<keysLen;n++){
                        key = copykeys[n];
                        copyData(target,copy,key);
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

function copyData(target,copy,key){
    if(_hasOwnProperty.call(copy,key)){
        copyValue = copy[key];
        if(isObj(copyValue) && !_isArray(copyValue)){
            target[key] = {};
            deepCopy(target[key],copyValue);
        }else if(_isArray(copyValue)){
            target[key] = [];
            deepCopy(target[key],copyValue);
        }else{
            target[key] = copyValue;
        }
    }
}

function isObj(data){
    if(typeof data === 'object' && !!data){
        return true;
    }
    return false;
}

module.exports = {
    initDeepCopy : initDeepCopy
}

