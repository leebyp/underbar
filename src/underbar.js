/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length){
      return array;
    }
    return n === undefined ? array[array.length-1] : array.slice(Math.max(array.length-n, 0), array.length)
// =======
//     if (n === undefined){
//       return array[array.length-1];
//     }
//     return array.slice(Math.max(0,array.length-n));
// >>>>>>> pair_programming
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }
    else if (typeof(collection) === 'object') {
      for (var x in collection){
        iterator(collection[x], x, collection);
// =======
//     if(Array.isArray(collection)) {
//       for(var i = 0; i < collection.length; i++) {
//         iterator(collection[i], i, collection);
//       }
//     } else {
//       for (var key in collection) {
//         iterator(collection[key], key, collection);
// >>>>>>> pair_programming
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(value) {
      if (test(value)){
        result.push(value);
      }
    });
    return result;
// =======
//     var results = [];
//     _.each(collection, function(value){
//       if (test(value)) {
//         results.push(value);
//       }
//     });
//     return results;
// >>>>>>> pair_programming
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(value){
      return !test(value);
    });

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var obj = {};
    var result = [];
    for (var i=0; i<array.length; i++){
      obj[array[i]] = 0;
    }
    for (var x in obj){
      result.push(x);
    }
    return result;
// =======
//     var results = [];
//     _.each(array, function(value){
//       obj[JSON.stringify(value)] = "wtf";
//     });
//     _.each(obj, function(value, key){
//       results.push(JSON.parse(key));
//     });
//     return results;
// >>>>>>> pair_programming
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    _.each(array, function(value, key, collection){
      array[key] = iterator(value, key, collection);
    })
    return array;
// =======
//     //
//     var results = [];
//     _.each(array, function(value){
//       results.push(iterator(value));
//     });
//     return results;
// >>>>>>> pair_programming
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(value, key, collection){
      if (typeof functionOrKey === 'string'){
        return value[functionOrKey].apply(value, args);
      }
      else {
        return functionOrKey.apply(value, args);
      }
    })
// =======
//     return _.map(collection, function(value) {
//       if(typeof functionOrKey === "function") {
//         return functionOrKey.apply(value, args);
//       } else {
//         return value[functionOrKey]();
//       }
//     });
// >>>>>>> pair_programming
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6

  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined){
      accumulator = _.first(collection);
    }
    _.each(collection, function(value, key, collection){
      accumulator = iterator(accumulator, value);
    })
    return accumulator;
// =======
//     var keys = Object.keys(collection);
//     if(Array.isArray){
//       var previousValue = accumulator === undefined ? collection.shift() : accumulator;
//     } else {
//       var previousValue = accumulator === undefined ? keys.shift() : accumulator;
//       delete collection[keys];
//     }
//     _.each(collection, function(value) {
//       previousValue = iterator(previousValue, value);
//     });
//     return previousValue;
// >>>>>>> pair_programming
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    var iterator = iterator || _.identity;

    // TIP: Try re-using reduce() here.
    return _.reduce(collection, function(allTrue, element){
      if (!allTrue){
        return false;
      }
      return Boolean(iterator ? iterator(element) : element);
// =======
//     return _.reduce(collection, function(previousValue, value){
//       if (previousValue) {
//         if (iterator(value)) {
//           return previousValue = true;
//         }
//       }
//       return false;

// >>>>>>> pair_programming
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    var result = _.every(collection, function(element){
      return !Boolean(iterator ? iterator(element) : element);
    });
    return !result;
// =======
//     var iterator = iterator || _.identity;

//     return !_.every(collection, function(value) {
//         return !iterator(value);
//       });
// >>>>>>> pair_programming
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var i=1; i<arguments.length; i++){
      for (var x in arguments[i]){
        obj[x] = arguments[i][x];
      }
    }
    return obj;
// =======
//     var rest = Array.prototype.slice.call(arguments, 1);

//     return _.reduce(rest, function(previousValue, value){
//       _.each(value, function(value, key){
//         obj[key] = value;
//       });
//       return obj;
//     }, obj);
// >>>>>>> pair_programming
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var i=1; i<arguments.length; i++){
      for (var x in arguments[i]){
        obj[x] = (obj[x] !== undefined ? obj[x] : arguments[i][x]);
      }
    }
    return obj;
// =======
//     var rest = Array.prototype.slice.call(arguments, 1);

//     return _.reduce(rest, function(previousValue, value){
//       _.each(value, function(value, key){
//         obj[key] = obj[key] === undefined ? value : obj[key];
//       });
//       return obj;
//     }, obj);
// >>>>>>> pair_programming
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var results = {};

    return function(arg){
      if (results[arg] === undefined) {
        results[arg] = func.apply(this, arguments);
      }
      return results[arg];
    }
// =======
//     var results = {};
//     var alreadyCalled = {};

//     return function(){
//       var serial = JSON.stringify(Array.prototype.slice.apply(arguments));

//       if (!alreadyCalled[serial]){
//         alreadyCalled[serial] = true;
//         results[serial] = func.apply(null, arguments);
//       }
//       return results[serial];

//     };
// >>>>>>> pair_programming

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    return setTimeout(function(){func.apply(this, args)}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var newarray = array.slice();
    for (var i=0; i<array.length; i++){
      var randomIndex = Math.floor(Math.random()*array.length-i);
      var value = newarray.splice(randomIndex, 1);
      newarray.push(value);
    }
    return newarray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

    function sortNum(a,b){
      return a-b;
    }

    if (typeof iterator === 'string'){
      var sortValue = function(obj){
        return obj[iterator];
      }
    }
    else {
      var sortValue = function(obj){
        return iterator(obj);
      }
    }

    var sortArray = [];
    for (var i=0; i<collection.length; i++){
      sortArray.push(sortValue(collection[i]));
    }

    if (_.some(sortArray, function(element){
      return typeof element === "number";
    })){
      sortArray.sort(sortNum);
    }
    else {
      sortArray.sort();
    }

    var collectionCopy = collection.slice(0);
    sortArray = _.map(sortArray, function(value, key, array){
      for (var i=0; i<collectionCopy.length; i++){
        if (sortValue(collectionCopy[i])===value){
          return collectionCopy.splice(i, 1)[0];
        }
      }
    })

    return sortArray;
  };



  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var longestArrayLength = 0;
    var results = [];
    
    for (var i=0; i<arguments.length; i++){
      if (arguments[i].length > longestArrayLength){
        longestArrayLength = arguments[i].length;
      }
    }

    for (var i=0; i<longestArrayLength; i++){
      var individualArray = [];
      for (var j=0; j<arguments.length; j++){
        individualArray.push(arguments[j][i])
      }
      results.push(individualArray);
    }

    return results;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

    function flattenOnce(array){
      var flattenedArray = [];
      for (var i=0; i<array.length; i++){
        if (Array.isArray(array[i])){
          for (var j=0; j<array[i].length; j++){
            flattenedArray.push(array[i][j]);
          }
        }
        else {
          flattenedArray.push(array[i]);
        }
      }
      return flattenedArray;
    }

    function flatArrayCheck(array){
      for (var i=0; i<array.length; i++){
        if (Array.isArray(array[i])){
          return false;
        }
      }
      return true;
    }

    if (result){
      return flattenOnce(nestedArray);
    }
    else {
      while(!flatArrayCheck(nestedArray)){
        nestedArray = flattenOnce(nestedArray);
      }
      return nestedArray;
    }
  
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var originalArray = arguments[0];
    var checkArrays = Array.prototype.slice.call(arguments, 1);
    var result = [];

    for (var i=0; i<originalArray.length; i++){
      if (_.every(checkArrays, function(individualArray){
        return _.contains(individualArray, originalArray[i]);
      })){
        result.push(originalArray[i]);
      }
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var checkArrays = Array.prototype.slice.call(arguments,1);
    var result = [];

    for (var i=0; i<array.length; i++){
      if (_.every(checkArrays, function(individualArray){
        return !_.contains(individualArray, array[i]);
      })){
        result.push(array[i]);
      }
    }
    return result;
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
    
    var previousTime = new Date().getTime() - wait;             //milliseconds since 1970/01/01
    var result;

    return function(){
      var currentTime = new Date().getTime();
      if ((currentTime-previousTime) >= wait){  
        previousTime = currentTime;
        result = func.apply(this, arguments);
      }
      return result;
    }
// =======
//   _.throttle = function(func, wait){
//     // do something to func
//     var lastTime = 0;
//     var result;

//     return function() {
//       if(Date.now() - lastTime >= wait) {
//         lastTime = Date.now();
//         result = func.apply(this, arguments);
//       }
//       return result;
//     };
// >>>>>>> pair_programming
  };

}).call(this);



















