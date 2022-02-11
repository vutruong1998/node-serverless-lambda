module.exports = (opts = {}) => {
  const customMiddlewareBefore = async (request) => {
    console.log(request)
    console.log('before', opts)
  }
  const customMiddlewareAfter = async (request) => {
    console.log('after')
  }
  const customMiddlewareOnError = async (request) => {
    console.log('error')
  }

  return {
    // Having descriptive function names will allow for easier tracking of performance bottlenecks using @middy/core/profiler
    before: customMiddlewareBefore,
    after: customMiddlewareAfter,
    onError: customMiddlewareOnError
  }
}