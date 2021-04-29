var assert = require('assert');
var deepCopy = require('../deepCopy');

deepCopy.initDeepCopy();

var data,obj,arr,list;
data = {name : '111'};
obj = {
    name : 'Object'
};
arr = [];
list = [1,2,3,4,5,6];

describe('Object', function () {
    describe('#deepCopy()', function () {
        it("1", function () {
            Object.deepCopy(data,obj);
            assert.deepStrictEqual(obj, data);
        });

        it("2", function () {
            data.name = 'Data';
            assert.notDeepStrictEqual(obj, data);
        });

        it("3", function () {
            Object.deepCopy(arr,list);
            assert.deepStrictEqual(arr, list);
        });

        it("4", function () {
            list[5] = 11;
            assert.notDeepStrictEqual(arr, list);
        });
    });
});
