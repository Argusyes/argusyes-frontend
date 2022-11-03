import _ from 'lodash'
import { useStore } from '@/store'

const URL = 'ws://localhost:9097/monitor'
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

export const ws = {
  socket: null,
  callbacksCollection,
  createSocket(url = URL) {
    if (!ws.socket)
      ws.socket = new WebSocket(url)

    return ws.socket
  },
  send(requestParam) {
    ws.socket?.send(JSON.stringify(requestParam))
  },
  sendWithId(method, params, cbf) {
    const id = _.uniqueId('id_')
    if (typeof cbf === 'function')
      callbacksCollection.on(id, cbf)

    ws.send({ id, method, params })

    return id
  },
  setup: {
    setHandler(eventName, handleFunc) {
      switch (eventName) {
        case 'onmessage':
        case 'onopen':
        case 'onclose':
          ws.socket[eventName] = handleFunc
          break
        default:
          break
      }
    },
  },
  // apis
  api: {
    startMonitor(params, cbf) {
      return ws.sendWithId(
        'ssh.startMonitor',
        params,
        cbf,
      )
    },
    stopMonitor(params, cbf) {
      return ws.sendWithId(
        'ssh.stopMonitor',
        params,
        cbf,
      )
    },
    startRoughMonitor(params, cbf) {
      return ws.sendWithId(
        'ssh.startRoughMonitor',
        params,
        cbf,
      )
    },
    stopRoughMonitor(params, cbf) {
      return ws.sendWithId(
        'ssh.stopRoughMonitor',
        params,
        cbf,
      )
    },
  },
}

export const wsHandler = {
  handleRough(data) {
    console.log('--- rough ---', data)
    const store = useStore()
    const {
      params: [{ message }],
    } = data
    const {
      CPU: cpu,
      Disk: disk,
      Loadavg: loadavg,
      Memory: memory,
      Net: net,
      Temp: temp,
      host,
      port,
      user,
    } = message
    const id = `${user}@${host}:${port}`
    store.rough[id] = { cpu, disk, loadavg, memory, net, temp }
    // store.rough = message
  },
  handleTemp() {
    //
  },
  handleCPUInfo() {
    //
  },
  handleCPUPerformance() {
    //
  },
  handleUptime() {
    //
  },
  handleLoadavg() {
    //
  },
  handleMemoryPerformance() {
    //
  },
  handleNetStat() {
    //
  },
  handleNetDev() {
    //
  },
  handleDisk() {
    //
  },
}
