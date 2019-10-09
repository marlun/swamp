export default assert

class AssertionError extends Error {}
AssertionError.prototype.name = 'AssertionError'

/**
 * Minimal assert function
 * @param  {any} v Value to check if falsy
 * @param  {string=} msg Optional assertion error message
 * @throws {AssertionError}
 */
function assert (v, m) {
  if (!v) {
    var err = new AssertionError(m)
    if (Error.captureStackTrace) Error.captureStackTrace(err, assert)
    throw err
  }
}
