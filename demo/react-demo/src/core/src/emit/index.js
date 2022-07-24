const queue = []

/**
 * push monitor data into queue
 * @param {*} data a object with name, type, duration at least
 */
function push(data) {
  data.time = Date.now()
  queue.push(data)
}

/**
 * 
 */