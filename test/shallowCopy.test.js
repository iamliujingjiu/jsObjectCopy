var assert = require('assert');
let shallowCopy = require('../shallowCopy');

shallowCopy.initShallowCopy();


describe('#shallowCopy.js', () => {

    describe('#undefined', () => {
        it('第一个参数为undefined时报类型错误', () => {
            assert.throws(() => Object.shallowCopy(undefined), TypeError);
        });
        it('第二个参数为undefined时被过滤', () => {
            let obj = {
                key : 'value'
            }
            let data = {
                key : 'value'
            } 
            assert.deepStrictEqual(Object.shallowCopy(obj, undefined), data);
        });
    })

    describe('#null', () => {
        it('第一个参数为null时报类型错误', () => {
            assert.throws(() => Object.shallowCopy(null), TypeError);
        });
        it('第二个参数为null时被过滤', () => {
            let obj = {
                key : 'value'
            }
            let data = {
                key : 'value'
            } 
            assert.deepStrictEqual(Object.shallowCopy(obj, undefined), data);
        });
    })

    describe('#number', () => {
   
        it('单独拷贝number类型的数值时返回它的包装类', () => {
            var val = 0;
            assert.deepStrictEqual(Object.shallowCopy(val), new Number(val));
            val = 1;
            assert.deepStrictEqual(Object.shallowCopy(val), new Number(val));
            val = NaN;
            assert.deepStrictEqual(Object.shallowCopy(val), new Number(val));
            assert.ok(isNaN(Object.shallowCopy(val)));
            val = Infinity;
            assert.deepStrictEqual(Object.shallowCopy(val), new Number(val));
        });


        it('将Object对象拷贝到number类型的数值时，会将对象属性值添加到number类型数值的包装类', () => {
            let num = 1;
            let obj = {
                key : 'value'
            }
            let data = new Number(num);
            data.key = 'value'; 
            assert.deepStrictEqual(Object.shallowCopy(num, obj), data);
        });
    })

    describe('#boolean', () => {

        it('单独拷贝boolean类型的数值时返回它的包装类', () => {
            var val = true;
            assert.deepStrictEqual(Object.shallowCopy(val), new Boolean(val));
            val = false;
            assert.deepStrictEqual(Object.shallowCopy(val), new Boolean(val));
        });

        it('将Object对象拷贝到number类型的数值时，会将对象属性值添加到number类型数值的包装类', () => {
            let b = true;
            let obj = {
                key : 'value'
            }
            let data = new Boolean(b);
            data.key = 'value'; 
            assert.deepStrictEqual(Object.shallowCopy(b, obj), data);
        });
    })

    //bigint跟symbol有点特殊
    describe('#bigint', () => {

        it('单独拷贝bigint类型的数值时返回的值的原始值与拷贝值一致', () => {
            var val = 1n;
            assert.strictEqual(Object.shallowCopy(val).valueOf(), val);
            val = BigInt(2);
            assert.strictEqual(Object.shallowCopy(val).valueOf(), val);
        });
       
    })

    describe('#symbol', () => {
        it('单独拷贝symbol类型的数值时返回的值的原始值与拷贝值一致', () => {
            var val = Symbol();
            assert.strictEqual(Object.shallowCopy(val).valueOf(), val);
            val = Symbol('test');
            assert.strictEqual(Object.shallowCopy(val).valueOf(), val);
        });
    })

    describe('#string', () => {
        it('单独拷贝string类型的数值时返回的值的原始值与拷贝值一致', () => {
            let str = 'test';
            assert.strictEqual(Object.shallowCopy(str).valueOf(), str);
            assert.deepStrictEqual(Object.shallowCopy(str), new String(str));
        });

        it('x', () => {
            let str = 'test';
            let str2 = 'hello world';
            let str3 = new String(str2);
            assert.strictEqual(Object.shallowCopy(str, str2).valueOf(), str2);
            assert.deepStrictEqual(Object.shallowCopy(str, str2), str3);
        });

        it('x', () => {
            let str = 'hello world';
            let str2 = 'test';
            let str3 = 'testo world';
            let str4 = new String(str3);
            assert.strictEqual(Object.shallowCopy(str, str2).valueOf(), str3);
            assert.deepStrictEqual(Object.shallowCopy(str, str2), str4);
        });

        it('x', () => {
            let str = 'hello world';
            let arr = [1, 2, 3, 4, 5];
            let str3 = '12345 world';
            let str4 = new String(str3);
            assert.strictEqual(Object.shallowCopy(str, arr).valueOf(), str3);
            assert.deepStrictEqual(Object.shallowCopy(str, arr), str4);
        });

        it('x', () => {
            let str = 'hello world';
            let arr = [{name : 'OBj_1'}, {name : 'OBj_2'}, {name : 'OBj_3'}, {name : 'OBj_4'}, {name : 'OBj_5'}];
            let str3 = '12345 world';
            let str4 = new String(str3);
            assert.strictEqual(Object.shallowCopy(str, arr).valueOf(), str3);
            assert.deepStrictEqual(Object.shallowCopy(str, arr), str4);
        });


        it('', () => {
            let str = 'test';
            let obj = {
                key : 'value'
            }
            let data = new String(str);
            data.key = 'value'; 
            assert.deepStrictEqual(Object.shallowCopy(str, obj), data);
        });
    })

    describe('#object', () => {

        it('', () => {
            let param = {};
            param.key = 'value';
            assert.deepStrictEqual(Object.shallowCopy(param), param);
            assert.notStrictEqual(Object.shallowCopy(param), param);
        });

        it('', () => {
            let param = {
                key : 'value'
            }
            let param2 = {
                key2 : 'value2'
            }
            let param3 = {
                key : 'value',
                key2 : 'value2'
            }
            Object.shallowCopy(param, param2);
            assert.deepStrictEqual(param, param3);
            assert.notStrictEqual(param, param3);
        });

        it('', () => {
            let param = {
                key : 'value'
            }
            let param2 = {
                key2 : 'value2'
            }
            let param3 = {
                key3 : 'value3'
            }
            let param4 = {
                key : 'value',
                key2 : 'value2',
                key3 : 'value3'
            }
            Object.shallowCopy(param, param2, param3);
            assert.deepStrictEqual(param, param4);
            assert.notStrictEqual(param, param4);
        });
    })


    //function是用来复用的，拥有同样的参数、方法体、返回值、属性、属性值的两个function是没有意义的
    //所以拷贝function时直接将属性和属性值拷贝到一个新的对象上即可
    describe('#function', () => {

        // 这里的逻辑是将同一个function拷贝两次，再比较两个拷贝的目标值
        it('', () => {
            let fn = function fn(){};
            fn.key = 'fn';

            let obj1 = Object.shallowCopy(fn);
            let obj2 = Object.shallowCopy(fn);
            assert.deepStrictEqual(obj1, obj2);
            assert.notStrictEqual(obj1, obj2);
        });
    })

    describe('#array', () => {

        it('', () => {
            let arr = [1, 2, 3];
            let arr2 = Object.shallowCopy(arr);
            assert.deepStrictEqual(arr2, arr);
            assert.notStrictEqual(arr2, arr);
        });


        it('', () => {
            let arr = [1, 2, 3];
            let arr2 = [4, 5, 6, 7];
            Object.shallowCopy(arr, arr2);
            assert.deepStrictEqual(arr, arr2);
            assert.notStrictEqual(arr, arr2);
        });

        it('', () => {
            let arr = [1, 2, 3, 4];
            let arr2 = [5, 6, 7];
            let arr3 = [8, 9];
            let arr4 = [8, 9, 7, 4];
            Object.shallowCopy(arr, arr2 , arr3);
            assert.deepStrictEqual(arr, arr4);
            assert.notStrictEqual(arr, arr4);
        });

        it('', () => {
            let arr = [1, 2, 3, 4];
            let str = 'test';
            let arr2 = ['t', 'e', 's', 't'];
            Object.shallowCopy(arr, str);
            assert.deepStrictEqual(arr, arr2);
            assert.notStrictEqual(arr, arr2);
        });

        it('', () => {
            let arr = [1, 2, 3, 4];
            let param = {
                key : 'value'
            }
            let str = 'test';
            let arr2 = ['t', 'e', 's', 't'];
            arr2.key = 'value';
            Object.shallowCopy(arr, str, param);
            assert.deepStrictEqual(arr, arr2);
            assert.notStrictEqual(arr, arr2);
        });
    })

    describe('#map', () => {

        it('', () => {
            let map = new Map();
            map.set('key', 'value');
            let map2 = Object.shallowCopy(map);
            assert.deepStrictEqual(map2, map);
            assert.notStrictEqual(map2, map);
        });

        it('', () => {
            let map = new Map();
            map.set('key', 'value');
            let param = {
                key : 'value'
            }
            let str = 'test';
            let map2 = Object.shallowCopy(map, param, str);

            let map3 = new Map();
            map3.set('key', 'value');
            map3.key = 'value';
            map3['0'] = 't';
            map3['1'] = 'e';
            map3['2'] = 's';
            map3['3'] = 't';

            assert.deepStrictEqual(map2, map3);
            assert.notStrictEqual(map2, map3);
        });

    })

    describe('#set', () => {

        it('', () => {
            let set = new Set();
            set.add('value');
            let set2 = Object.shallowCopy(set);
            assert.deepStrictEqual(set2, set);
            assert.notStrictEqual(set2, set);
        });


        it('', () => {
            let set = new Set();
            set.add('value');
            let param = {
                key : 'value'
            }
            let str = 'test';

            let set2 = Object.shallowCopy(set, param, str);

            let set3 = new Set();
            set3.add('value');
            set3.key = 'value';
            set3['0'] = 't';
            set3['1'] = 'e';
            set3['2'] = 's';
            set3['3'] = 't';

            assert.deepStrictEqual(set2, set3);
            assert.notStrictEqual(set2, set3);
        });
    })

})