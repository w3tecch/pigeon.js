/**
 * @name PigeonChannel
 * @description
 * TODO
 */
class PigeonChannel implements pigeonjs.IChannel {
  private callbacks: pigeonjs.IEventCallbacks = {};

  constructor(public name?: string) { }

  public get subscribers(): pigeonjs.IEventCallbacks {
    return this.callbacks;
  }

  public subscribe(item: string): (callback: pigeonjs.IEventCallback) => () => boolean {
    return (callback: pigeonjs.IEventCallback) => {
      let callbacks = this.callbacks[item] || (this.callbacks[item] = []);
      callbacks.push(callback);

      // Disposer function
      return () => {
        let idx = callbacks.indexOf(callback);
        if (idx >= 0) {
          callbacks.splice(idx, 1);
        }

        if (callbacks.length === 0) {
          delete this.callbacks[item];
        }

        return idx >= 0;
      };
    };
  }

  public publish(item: string): (...args) => boolean {
    return (...args) => {
      let callbacks = this.callbacks[item] || [];
      let size = callbacks.length;
      callbacks.forEach(cb => cb(...args));
      return size < callbacks.length;
    };
  }
}

export default PigeonChannel;
