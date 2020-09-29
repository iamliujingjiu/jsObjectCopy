
var init = false,
_isArray = Array.isArray,
_ownKeys = Reflect && Reflect.ownKeys,
_getOwnPropertySymbols = Object.getOwnPropertySymbols,
// _getOwnPropertyNames = Object.getOwnPropertyNames,
_keys = Object.keys,

_hasOwnProperty = Object.prototype.hasOwnProperty,
_defineProperty = Object.defineProperty,
_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

function initDeepCopy(){
    if(init){
        return;
    }
    init = true;

    _defineProperty(Object,'deepCopy',{
        value : function deepCopy(){
            var target,i = 1,length = arguments.length,
            copy,j = 0,n = 0,keysLen,key,copyLen,copykeys;

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
                        copykeys = _getCopykeys(_ownKeys,copy);
                    }else if(_getOwnPropertySymbols){
                        copykeys = _getCopykeys(_getOwnPropertySymbols,copy);
                        copykeys = copykeys.concat(_keys(copy));
                    }else if(_keys){
                        copykeys = _keys(copy);
                    }else{
                        for(key in copy){
                            if(_hasOwnProperty.call(copy,key)){
                                copyData(target,copy,key);
                            }
                        }
                        continue;
                    }

                    for(j = 0,keysLen = copykeys.length;j<keysLen;j++){
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
    var copyValue;
    if(_hasOwnProperty.call(copy,key)){
        copyValue = copy[key];
        if(copyValue === target){
            return;
        }
        if(isObj(copyValue) && !_isArray(copyValue)){
            target[key] = {};
            Object.deepCopy(target[key],copyValue);
        }else if(_isArray(copyValue)){
            target[key] = [];
            Object.deepCopy(target[key],copyValue);
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

function _getCopykeys(func,obj){
    return func(obj).filter(function(value){
        return _getOwnPropertyDescriptor(obj,value).enumerable;
    });
}

module.exports = {
    initDeepCopy : initDeepCopy
}

