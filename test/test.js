var assert = require('assert');
var shallowCopy = require('../shallowCopy');

shallowCopy.initShallowCopy();

describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy(true,false) !== Object.assign(true,false)", function () {
            assert.equal(Object.shallowCopy(true,false), Object.assign(true,false));
        });
    });
});

describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy(1,2) !== Object.assign(1,2)", function () {
            assert.equal(Object.shallowCopy(1,2), Object.assign(1,2));
        });
    });
});


describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy(1n,2n) !== Object.assign(1n,2n)", function () {
            assert.equal(Object.shallowCopy(1n,2n), Object.assign(1n,2n));
        });
    });
});


describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy(leftVal,rightVal) !== Object.assign(leftVal,rightVal)", function () {
            var leftVal = Symbol(1),rightVal = Symbol(2);
            assert.equal(Object.shallowCopy(leftVal,rightVal), Object.assign(leftVal,rightVal));
        });
    });
});

describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99]) !== Object.assign([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99])", function () {
            assert.deepStrictEqual(Object.shallowCopy([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99]), Object.assign([1,2,3,4,5,6],[11,22,33,44,55,66,77,88,99]));
        });
    });
});

describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy({name:'test1'},{name:'test2'}) !== Object.assign({name:'test1'},{name:'test2'})", function () {
            assert.deepStrictEqual(Object.shallowCopy({name:'test1'},{name:'test2'}), Object.assign({name:'test1'},{name:'test2'}));
        });
    });
});


describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("Object.shallowCopy({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99]) !== Object.assign({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99])", function () {
            assert.deepStrictEqual(Object.shallowCopy({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99]), Object.assign({name:'test1'},{name:'test2'},[11,22,33,44,55,66,77,88,99]));
        });
    });
});

describe('Object', function () {
    describe('#shallowCopy()', function () {
        it("(Object.shallowCopy({name:'test1'},{name:'test2'},null,'111111111') !== Object.assign({name:'test1'},{name:'test2'},null,'111111111')", function () {
            assert.deepStrictEqual(Object.shallowCopy({name:'test1'},{name:'test2'},null,'111111111'), Object.assign({name:'test1'},{name:'test2'},null,'111111111'));
        });
    });
});