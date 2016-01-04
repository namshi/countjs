/**
 * Counter object
 *
 * @param {Object} count     the initial state of the counter
 * @param {Object} reference a reference you can match / diff against
 */
function Counter(count, reference) {
  this.count = count || {}

  if (reference) {
    this.reference = new Counter(reference)
  }
}

/**
 * Adds an element to the counter, or increases
 * its quantity if it was already in the counter.
 *
 * Adding might fail if there is a reference that
 * hold a lower count for the given ID. You can
 * specify {force: true} in the options to override
 * this behaviour.
 *
 * @param  {String} id
 * @param  {Object} options  {force: ..., qty: ...}
 * @return {Boolean}         Whether adding has been succesfull or not
 */
Counter.prototype.add = function(id, options){
  options = options || {}

  if (options.qty === undefined) {
    options.qty = 1
  }

  var newQty = (this.count[id] || 0) + options.qty

  if (options.force || !this.reference || (this.reference && newQty <= this.reference.get(id))) {
    this.count[id] = newQty

    return true
  }

  return false
}

/**
 * Gets the state of the counter, or the
 * count for a particular id if an id was
 * given.
 *
 * @param  {String} id
 * @return {Mixed}
 */
Counter.prototype.get = function(id){
  return (id) ? (this.count[id] || 0) : this.count
}

/**
 * Generates a diff between the current counter
 * and a new one, or the reference if the current
 * counter was initialized with a reference.
 *
 * @param  {Counter} counter
 * @return {Object}
 * @throws {Error}
 */
Counter.prototype.diff = function(counter){
  counter = counter || this.reference

  if (!counter) {
    var e = new Error('Unable to generate diff as no counter was passed to the #diff({...}) method')
    e.code = "E_NO_COUNTER"

    throw e
  }

  var diff = {}

  /**
   * For each property we have, if its different
   * from the reference, we're gonna use
   * our value as the diff.
   */
  for (var id in this.count) {
    var other = counter.get(id)
    var mine = this.get(id)

    if (other !== mine) {
      diff[id] = mine
    }
  }

  /**
   * For each property in the reference,
   * if we dont have it, it means it's
   * zero.
   */
  for (var id in counter.get()) {
    var other = counter.get(id)
    var mine = this.get(id)

    if (!mine && other) {
      diff[id] = 0
    }
  }

  return diff
}

module.exports = Counter
