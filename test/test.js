/**
 * 测试性能
 */
var _ownKeys = Reflect && Reflect.ownKeys,
_getOwnPropertySymbols = Object.getOwnPropertySymbols,
_getOwnPropertyNames = Object.getOwnPropertyNames,
_hasOwnProperty = Object.prototype.hasOwnProperty;

// 目前测试量不多 但是按照目前结论
// 无论什么情况  4的性能是比3要好的多的 而且4没有兼容问题
// 当全部是Symbol数据 1性能最好 5其次 2最差
// 当Symbol占一半时 5性能最好 1其次  2最差
// 结论:没有必要用Object.getOwnPropertyNames


// var obj = {};
// for(var i = 0,length = 1000000;i<length;i++){
//     obj['name' + i] = i;
// }
// //这4个耗时出乎我意料之外
// // 4 是最稳定的最快的
// // 1 3 差不多
// // 2 是最慢的
// // 可以用5取代1 2?
// it("1", function () {
//     var keys = _ownKeys(obj);
// });


// it("2", function () {
//     var keys = _getOwnPropertySymbols(obj).concat(_getOwnPropertyNames(obj));
// });


// it("3", function () {
//     var keys = _getOwnPropertyNames(obj);
// });


// it("4", function () {
//     var keys = [];
//     for(var key in obj){
//         keys.push(key);
//     }
// });

// it("5", function () {
//     var keys = _getOwnPropertySymbols(obj);
//     for(var key in obj){
//         keys.push(key);
//     }
// });


// var obj = {};
// for(var i = 0,length = 1000000;i<length;i++){
//     obj[Symbol(i)] = i;
// }
// //这4个耗时出乎我意料之外
// // 4 是最稳定的最快的
// // 1 3 差不多
// // 2 是最慢的
// // 可以用5取代1 2?
// it("1", function () {
//     var keys = _ownKeys(obj);
// });


// it("2", function () {
//     var keys = _getOwnPropertySymbols(obj).concat(_getOwnPropertyNames(obj));
// });


// it("3", function () {
//     var keys = _getOwnPropertyNames(obj);
// });


// it("4", function () {
//     var keys = [];
//     for(var key in obj){
//         keys.push(key);
//     }
// });

// it("5", function () {
//     var keys = _getOwnPropertySymbols(obj);
//     for(var key in obj){
//         keys.push(key);
//     }
// });




var obj = {};
for(var i = 0,length = 500000;i<length;i++){
    obj[Symbol(i)] = i;
}

for(var j = 0,length = 500000;j<length;j++){
    obj['name' + j] = j;
}
//这4个耗时出乎我意料之外
// 4 是最稳定的最快的
// 1 3 差不多
// 2 是最慢的
// 可以用5取代1 2?
it("1", function () {
    var keys = _ownKeys(obj);
});


it("2", function () {
    var keys = _getOwnPropertySymbols(obj).concat(_getOwnPropertyNames(obj));
});


it("3", function () {
    var keys = _getOwnPropertyNames(obj);
});


it("4", function () {
    var keys = [];
    for(var key in obj){
        keys.push(key);
    }
});

it("5", function () {
    var keys = _getOwnPropertySymbols(obj);
    for(var key in obj){
        keys.push(key);
    }
});