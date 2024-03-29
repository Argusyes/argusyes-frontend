/* eslint-disable @typescript-eslint/no-use-before-define */
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
    // if (!ws.socket)
    ws.socket = new WebSocket(url)

    return ws.socket
  },
  send(requestParam) {
    ws.socket?.send(JSON.stringify(requestParam))
    console.log('send', requestParam)
  },
  sendWithId(method, params, cbf) {
    const id = _.uniqueId('id_')
    if (typeof cbf === 'function')
      callbacksCollection.on(id, cbf)

    ws.send({ id, method, params })

    return id
  },
  setup: {
    setupBasic() {
      ['onmessage', 'onopen', 'onclose'].forEach((eventName) => {
        ws.setup.setHandler(eventName)
      })

      ws.setup.setHandler(
        'onmessage',
        (event) => {
          if (event.data) {
            const data = JSON.parse(event.data)

            if (data.id !== null)
              ws.callbacksCollection.run(data.id, event, data)

            if (data?.method === 'ssh.notification') {
              const eventName = data?.params?.[0]?.event
              wsHandler[eventName](data)
            }
          }
        },
      )
    },
    setHandler(eventName, handleFunc = () => {}) {
      switch (eventName) {
        case 'onmessage':
          ws.socket[eventName] = handleFunc
          break
        case 'onopen':
          ws.socket[eventName] = (event) => {
            console.log('open', event)
            handleFunc(event)
            const store = useStore()
            store.wsConnection = true
          }
          break
        case 'onclose':
          ws.socket[eventName] = (event) => {
            console.log('close', event)
            handleFunc(event)
            const store = useStore()
            store.clearRough()
            store.clearDetails()
            store.wsConnection = false
            ws.socket = null
          }
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
  rough: function handleRough(data) {
    const {
      params: [{ message }],
    } = data
    // console.log('--- rough ---', message)
    const store = useStore()
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
    console.log('@@@', data)
  },
  temp: function handleTemp(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          tempMap,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- temp ---', tempMap, hostInfo)
  },
  cpuInfo: function handleCPUInfo(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          cpuInfo,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- cpu info ---', cpuInfo, hostInfo)
    store.cpu.cpuInfo = cpuInfo
  },
  cpuPerformance: function handleCPUPerformance(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          cpuPerformance,
          total,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- cpu performance ---', cpuPerformance, total, hostInfo)
    store.cpu.cpuPerformance = cpuPerformance
    store.cpu.total = total
  },
  uptime: function handleUptime(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          uptime,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- uptime ---', uptime, hostInfo)
  },
  loadavg: function handleLoadavg(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          loadavg,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- loadavg ---', loadavg, hostInfo)
    store.cpu.loadavg = loadavg
  },
  memoryPerformance: function handleMemoryPerformance(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          memory,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- memory performance ---', memory, hostInfo)
    store.mem.memory = memory
  },
  netStat: function handleNetStat(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          netTCP,
          netUDP,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- net stat ---', netTCP, netUDP, hostInfo)
    store.net.netTCP = netTCP
    store.net.netUDP = netUDP
  },
  netDev: function handleNetDev(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          netDevTotal,
          netDev,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- net dev ---', netDevTotal, netDev, hostInfo)
    store.net.netDevTotal = netDevTotal
    store.net.netDev = netDev
  },
  disk: function handleDisk(data) {
    const store = useStore()
    const {
      params: [{
        // message: {
        //   diskMap,
        //   read,
        //   readUnit,
        //   readRate,
        //   readRateUnit,
        //   write,
        //   writeUnit,
        //   writeRate,
        //   writeRateUnit,
        //   ...hostInfo
        // },
        message,
      }],
    } = data
    // console.log('--- disk ---', diskMap, read, readUnit, readRate, readRateUnit, write, writeUnit, writeRate, writeRateUnit, hostInfo)
    store.disk = message
  },
  process: function handleProcess(data) {
    const store = useStore()
    const {
      params: [{
        message: {
          process,
          ...hostInfo
        },
      }],
    } = data
    // console.log('--- process ---', process, hostInfo)
    store.process.process = process
  },
}
