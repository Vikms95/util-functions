/**
 * Returns a curried function that takes in the values of the second parameter scope. 
 * If more parameters than the expected ones are passed in, returns a new function with the new argument length.
 * To provide args to the curried function, call it like so: curriedFn(fn)(args).
 *  */ 
const currierArgs = function(fn) {
  // Returns a function with the specified args
  return function curried(...args) {
    // If more args are passed in than the ones
    // expected by the curried function
    if(fn.length !== args.length) {
      // Return a new function to be 
      // assigned with all the args merged
      return curried.bind(null, ...args) 
    }
    // Return fn return value 
    // with all the args passed in
    return fn(...args)
  }
}

const currierSplit = function(fn) {
  // Get the arguments from the one located on index 1
  // so we avoid getting the function to curry
  const args = Array.prototype.slice.call(arguments, 1)

  return function() {
    //! Figure out what the this means here
    console.log(this)

    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments, 0)))
  }
}

const func = function(hello, world) {
  return hello.concat(' ').concat(world) 
}

const x = currierArgs(func)('hello', 'world')
const y = currierSplit(func, 'hello', 'world')
// console.log(x('world'))
console.log(y('world'))



const gt = currierArgs((a,b) => a > b)
const lt = currierArgs((a,b) => a < b)
const gte = currierArgs((a,b) => a >= b)
const lte = currierArgs((a,b) => a <= b)
const eq = currierArgs((a,b) => a === b)


const hasTruthy = (arr) => arr.some((el) => Boolean(el))
const hasFalsy = (arr) => arr.some((el) => !el)

const isArray = currierArgs((val) => (
  val !== null &&
  Object.prototype.toString.call(val) === '[object Array]'
))

const isObject = currierArgs((val) => Object.prototype.toString.call(val) === '[object Object]')
