import EventEmitter from 'node:events'

class Event {
  emitter: EventEmitter = new EventEmitter()
  constructor(emitter?: EventEmitter) {
    if (emitter) {
      this.emitter = emitter
    }
  }
  publish (eventName: string, ...args: any[]) {
    this.emitter.emit(eventName, ...args)
  }
  subscribe (eventName: string, callback: (...args: any[]) => void) {
    this.emitter.on(eventName, callback)

    return () => {
      this.remove(eventName, callback)
    }
  }
  remove (eventName: string, callback: (...args: any[]) => void) {
    this.emitter.off(eventName, callback)
  }
}

export default new Event()