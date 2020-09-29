var assert = require('assert');
var shallowCopy = require('../shallowCopy');
var _defineProperty = Object.defineProperty;

shallowCopy.initShallowCopy();

/**
 * 前面4个不能用strictEqual 输出的是包装类（除了Symbol）
 */
describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy(true,false) === Object.assign(true,false)", function () {
            assert.equal(Object.shallowCopy(true,false), Object.assign(true,false));
        });

        it("Object.shallowCopy(1,2) === Object.assign(1,2)", function () {
            assert.equal(Object.shallowCopy(1,2), Object.assign(1,2));
        });

        it("Object.shallowCopy(1n,2n) === Object.assign(1n,2n)", function () {
            assert.equal(Object.shallowCopy(1n,2n), Object.assign(1n,2n));
        });

        it("Object.shallowCopy(leftVal,rightVal) === Object.assign(leftVal,rightVal)", function () {
            var leftVal = Symbol(1),rightVal = Symbol(2);
            assert.equal(Object.shallowCopy(leftVal,rightVal), Object.assign(leftVal,rightVal));
        });
        
        it("Object.shallowCopy([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99]) === Object.assign([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99])", function () {
            assert.deepStrictEqual(Object.shallowCopy([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99]), Object.assign([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99]));
        });

        it("Object.shallowCopy({name:'test1'},{name:'test2'}) === Object.assign({name:'test1'},{name:'test2'})", function () {
            assert.deepStrictEqual(Object.shallowCopy({name:'test1'},{name:'test2'}), Object.assign({name:'test1'},{name:'test2'}));
        });

        it("Object.shallowCopy({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99]) === Object.assign({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99])", function () {
            assert.deepStrictEqual(Object.shallowCopy({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99]), Object.assign({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99]));
        });

        it("Object.shallowCopy({name:'test1'},{name:'test2'},null,'111111111') === Object.assign({name:'test1'},{name:'test2'},null,'111111111')", function () {
            assert.deepStrictEqual(Object.shallowCopy({name:'test1'},{name:'test2'},null,'111111111'), Object.assign({name:'test1'},{name:'test2'},null,'111111111'));
        });

        it("Object.shallowCopy({name:leftVal},{name:rightVal}) === Object.assign({name:leftVal},{name:rightVal})", function () {
            var leftVal = Symbol(1),rightVal = Symbol(2);
            assert.deepStrictEqual(Object.shallowCopy({name:leftVal},{name:rightVal}), Object.assign({name:leftVal},{name:rightVal}));
        });

        it("Object.shallowCopy([leftVal],[rightVal]) === Object.assign[leftVal],[rightVal]", function () {
            var leftVal = Symbol(1),rightVal = Symbol(2);
            assert.deepStrictEqual(Object.shallowCopy([leftVal],[rightVal]), Object.assign([leftVal],[rightVal]));
        });

        it("Object.shallowCopy({},new Map().set('key','value')) === Object.assign({},new Map().set('key','value'))", function () {
            assert.deepStrictEqual(Object.shallowCopy({},new Map().set('key','value')), Object.assign({},new Map().set('key','value')));
        });

        it("Object.shallowCopy({},new Set().add(1)) === Object.assign({},new Set().add(1))", function () {
            assert.deepStrictEqual(Object.shallowCopy({},new Set().add(1)), Object.assign({},new Set().add(1)));
        });

        it("Object.shallowCopy({},func) === Object.assign({},func)", function () {
            function func(){
                return 0;
            }
            func.name = 'func';
            assert.deepStrictEqual(Object.shallowCopy({},func), Object.assign({},func));
        });


        it("Object.shallowCopy({},obj) === Object.assign({},obj)", function () {
            let obj = {};
            obj['name'] = 'obj';
            obj[Symbol('name')] = 'Symbol';
            _defineProperty(obj,'_name',{
                value : '_obj',
                enumerable : false,
                writable : true,
                configurable : true
            })
            _defineProperty(obj,Symbol('_name'),{
                value : '_Symbol',
                enumerable : false,
                writable : true,
                configurable : true
            })
            assert.deepStrictEqual(Object.shallowCopy({},obj), Object.assign({},obj));
        });
    });
});


