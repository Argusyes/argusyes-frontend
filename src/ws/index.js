import _ from 'lodash'
const URL = 'ws://localhost:9097/monitor'

export const socket = new WebSocket(URL)

class CallbacksCollection {
  static callbacks = new Map()
  static INSTANCE = null

  constructor() {
    //
  }

  static getInstance() {
    if (CallbacksCollection.INSTANCE === null)
      CallbacksCollection.INSTANCE = new CallbacksCollection()

    return CallbacksCollection.INSTANCE
  }

  on(name, cbf) {
    if (typeof cbf === 'function')
      CallbacksCollection.callbacks.set(name, cbf)
  }

  off(name) {
    CallbacksCollection.callbacks.delete(name)
  }

  clear() {
    CallbacksCollection.callbacks.clear()
  }

  run(name, ...params) {
    if (CallbacksCollection.callbacks.has(name))
      CallbacksCollection.callbacks.get(name)(...params)
  }
}
const callbacksCollection = CallbacksCollection.getInstance()

// events
socket.onmessage = function (event) {
  if (event.data) {
    const data = JSON.parse(event.data)

    if (data.id !== null)
      callbacksCollection.run(data.id, event)

    if (data?.method === 'ssh.notification') {
      const eventName = data?.params?.[0]?.event
      switch (eventName) {
        case 'rough':
          console.log('rough', data)
          break
        case 'temp':
          console.log('temp', data)
          break
        case 'cpuInfo':
          console.log('cpuInfo', data)
          break
        case 'cpuPerformance':
          console.log('cpuPerformance', data)
          break
        case 'uptime':
          console.log('uptime', data)
          break
        case 'loadavg':
          console.log('loadavg', data)
          break
        case 'memoryPerformance':
          console.log('memoryPerformance', data)
          break
        case 'netStat':
          console.log('netStat', data)
          break
        case 'netDev':
          console.log('netDev', data)
          break
        case 'disk':
          console.log('disk', data)
          break
        default:
          console.error(eventName)
      }
    }
  }
}
socket.onopen = function (event) {
  console.log('onopen', event)
}
socket.onclose = function (event) {
  console.log('onclose', event)
}

function send(requestParam) {
  socket.send(JSON.stringify(requestParam))
}

function sendWithId(method, params, cbf) {
  const id = _.uniqueId('id_')
  if (typeof cbf === 'function')
    callbacksCollection.on(id, cbf)

  send({ id, method, params })

  return id
}

export const ws = {
  socket,
  callbacksCollection,
  // apis
  api: {
    startMonitor(params, cbf) {
      return sendWithId(
        'ssh.startMonitor',
        params,
        cbf,
      )
    },
    startRoughMonitor(params, cbf) {
      return sendWithId(
        'ssh.startRoughMonitor',
        params,
        cbf,
      )
    },
  },
}
