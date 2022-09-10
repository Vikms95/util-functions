/**
 * Returns a curried function that takes in the values of the second parameter scope. 
 * If more parameters than the expected ones are passed in, returns a new function with the new argument length.
 * To provide args to the curried function, call it like so: curriedFn(fn)(arg1,args2...,argn).
 *  */ 
const curry = function(fn) {
  // Returns a function with the specified args
  return function curried(...args) {
    // If more args are passed in than the ones
    // expected by the curried function
    if(fn.length !== args.length) {
      // Return a new function to be 
      // assigned with all the args merged
      // and ready to be called again with extra args
      return curried.bind(null, ...args) 
    }
    // Return fn return value 
    // with all the args passed in
    return fn(...args)
  }
}

/**
 * Returns function within the argument curried.
 * To provide args to the curried function, call it like so: curriedFn(fn,arg1,arg2.., argn)
 */
// const currierArgs = function(fn) {
  // Get the arguments from the one located on index 1
  // so we avoid getting the function to curry
  // const args = Array.prototype.slice.call(arguments, 1)

  // return function() {
    // We apply the scope of this function to the function
    // we will be returning and apssing in the args object
    // second parameter to the apply method
//     return fn.apply(this, args.concat(
//       Array.prototype.slice.call(arguments, 0)))
//   }
// }


/**
 * Compares the passed *val* to the string representation of the Array object
 */
const isArray = curry((val) => (
  val !== null &&
  Object.prototype.toString.call(val) === '[object Array]'
))

/**
 * Compares the passed *val* to the string representation of the Object object
 */
const isObject = curry((val) => Object.prototype.toString.call(val) === '[object Object]')

/**
 * fn = function that will be applied to each element of the object or array
 * functor = object or array where the the fn will be applied to map it
 */
const map = curry((fn, functor) => {
  let result
  // Check the value of the functor to see how to proceed
  switch(Object.prototype.toString.call(functor)) {
    case '[object Array]':
      result = []
      // Apply the function to each index
      for (const item of functor) {
        result.push(fn(item))
      }
      return result
      case '[object Object]':
        result = {}
        // Apply the function to each index
      for (const prop of Object.keys(functor)) {
        result[prop] = fn(functor[prop])
      }
      return result
  }
})

const pipe = (...functions) =>  
  (value) => functions.reduce((acc,fn) => fn(acc), value)


const decrement = curry((val) => (isArray(val) || isObject(val))
  ? map((n) => (typeof n === 'number') ? n - 1: n, val)
  : val -1
)

const increment = curry((val) => (isArray(val) || isObject(val))
  ? map((n) => (typeof n === 'number') ? n - 1: n, val)
  : val -1
)

const gt = curry((a,b) => a > b)
const lt = curry((a,b) => a < b)
const gte = curry((a,b) => a >= b)
const lte = curry((a,b) => a <= b)
const eq = curry((a,b) => a === b)


const hasTruthy = (arr) => arr.some((el) => Boolean(el))
const hasFalsy = (arr) => arr.some((el) => !el)


const decrementEach = map(decrement)
const incrementEach = map(increment)