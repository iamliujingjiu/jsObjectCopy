
let init = false;

function initShallowCopy(){
    if(init){
        return;
    }

    init = true;

    Object.defineProperty(Object, 'shallowCopy', {
        value : function shallowCopy(){
    
            let target = arguments[0];
    
            let i = 1;
    
            let length = arguments.length;
    
           
            if(typeof target === 'undefined' || (!target && typeof target === 'object')){
                throw Error('Cannot convert undefined or null to object');
            }

            if(length === 1){
                i = 0;
    
                if(Array.isArray(target)){
                    target = [];
                }else if(target instanceof Map){
                    target = new Map();
                }else if(target instanceof Set){
                    target = new Set();
                }else if((typeof target === 'object' && null !== target) || typeof target === 'function'){
                    target = {};
                }else{
                    return Object(target);
                }
            }

            if(typeof target !== 'object' && typeof target !== 'function'){
                target =  Object(target);
            }
         
            while(i < length){
                
                let copy = arguments[i++];
    
                if(typeof copy === 'undefined' || (!copy && typeof copy === 'object')){
                    continue;
                }
                if(typeof copy === 'string'){
                    copy = changeStringtoArray(copy);
                }
    
                //array map set也属于object
                if((typeof target === 'object' && null !== target) || typeof target === 'function'){
                    let keys = traverseObj(copy);
                    for(let j = 0, len = keys.length; j < len; j++){
                        let key = keys[j];
                        target[key] = copy[key];
                    }
                }
    
                // 1.两个都是map
                if(copy instanceof Map && target instanceof Map){
                    for(let [key, value] of copy){
                        target.set(key, value);
                    }
                }
    
                // 2.两个都是set
                if(copy instanceof Set && target instanceof Set){
                    for(let value of copy){
                        target.add(value);
                    }
                }
    
                if(Array.isArray(copy)){
                    for(let j = 0, len = copy.length; j < len; j++){
                        target[j] = copy[j];
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

function traverseObj(val){
    let symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(val) : [];
    let keys = Object.keys ? Object.keys(val) : [];
    return Array.prototype.concat.call(keys, symbols);
}

function changeStringtoArray(str){
    let length = str.length || 0;
    let strArr = new Array(length);
    for(let j = 0; j < length; j++){
        strArr[j] = str[j];
    }
    return strArr;
}

module.exports = {
    initShallowCopy : initShallowCopy
}
