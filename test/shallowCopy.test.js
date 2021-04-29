var assert = require('assert');
let shallowCopy = require('../shallowCopy');

shallowCopy.initShallowCopy();


describe('#shallowCopy.js', () => {

    describe('#undefined', () => {
        it('', () => {
            assert.throws(() => Object.shallowCopy(undefined), Error);
        });
    })

    describe('#null', () => {
        it('', () => {
            assert.throws(() => Object.shallowCopy(null), Error);
        });
    })

    describe('#number', () => {
        it('', () => {
            assert.strictEqual(Object.shallowCopy(0).valueOf(), 0);
        });

        it('', () => {
            assert.strictEqual(Object.shallowCopy(1).valueOf(), 1);
        });

        it('', () => {
            assert.ok(isNaN(Object.shallowCopy(NaN)));
        });

        it('', () => {
            assert.strictEqual(Object.shallowCopy(Infinity).valueOf(), Infinity);
        });


        it('', () => {
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
        it('', () => {
            assert.strictEqual(Object.shallowCopy(true).valueOf(), true);
        });

        it('', () => {
            assert.strictEqual(Object.shallowCopy(false).valueOf(), false);
        });

        it('', () => {
            let b = true;
            let obj = {
                key : 'value'
            }
            let data = new Boolean(b);
            data.key = 'value'; 
            assert.deepStrictEqual(Object.shallowCopy(b, obj), data);
        });
    })

    describe('#bigint', () => {
        it('', () => {
            assert.strictEqual(Object.shallowCopy(1n).valueOf(), 1n);
        });

        it('', () => {
            assert.strictEqual(Object.shallowCopy(BigInt(2n)).valueOf(), 2n);
        });

        it('', () => {
            let bigint = 1n;
            let obj = {
                key : 'value'
            }
            let data = Object(bigint);
            data.key = 'value'; 
            assert.deepStrictEqual(Object.shallowCopy(bigint, obj), data);
        });
    })

    describe('#symbol', () => {
        it('', () => {
            let symbol = Symbol();
            assert.strictEqual(Object.shallowCopy(symbol).valueOf(), symbol);
        });

        
        it('', () => {
            let symbol = Symbol();
            let obj = {
                key : 'value'
            }
            let data = Object(symbol);
            data.key = 'value'; 
            assert.deepStrictEqual(Object.shallowCopy(symbol, obj), data);
        });
    })

    describe('#string', () => {
        it('', () => {
            let str = 'test';
            assert.strictEqual(Object.shallowCopy(str).valueOf(), str);
        });

        it('', () => {
            let str = 'test';
            assert.deepStrictEqual(Object.shallowCopy(str), new String(str));
        });

        it('', () => {
            let str = 'test';
            let str2 = 'code';
            console.log(Object.shallowCopy(str, str2));
            assert.deepStrictEqual(Object.shallowCopy(str, str2), new String(str));
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
            let data = {
                key : 'value',
                key2 : 'value2'
            }
            Object.shallowCopy(param, param2);
            assert.deepStrictEqual(param, data);
            assert.notStrictEqual(param, data);
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
            let data = {
                key : 'value',
                key2 : 'value2',
                key3 : 'value3'
            }
            Object.shallowCopy(param, param2, param3);
            assert.deepStrictEqual(param, data);
            assert.notStrictEqual(param, data);
        });
    })


    describe('#function', () => {

        it('', () => {
            let fn = function fn(){};
            fn.key = 'fn';
            let obj = Object.shallowCopy(fn);
            assert.strictEqual(obj.key, fn.key);
            assert.notStrictEqual(obj, fn);
            assert.ok(typeof obj === 'object');
        });
    })

    describe('#arrray', () => {

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