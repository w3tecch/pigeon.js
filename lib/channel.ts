/**
 * @name PigeonChannel
 * @description
 * TODO
 */
class PigeonChannel implements pigeon.IChannel {

  private name: string = '';
  private callbacks: pigeon.IEventCallbacks = {};

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getList(): pigeon.IEventCallbacks {
    return this.callbacks;
  }

  public publish(channel: string): (...args) => boolean {
    return (...args) => {
      let callbacks = this.callbacks[channel] || [];
      let size = callbacks.length;
      callbacks.forEach(cb => cb(...args));
      return size < callbacks.length;
    };
  }

  public subscribe(channel: string): (callback: pigeon.IEventCallback) => () => boolean {
    return (callback: pigeon.IEventCallback) => {
      let callbacks = this.callbacks[channel] || (this.callbacks[channel] = []);
      callbacks.push(callback);

      // destroy function
      return () => {
        let idx = callbacks.indexOf(callback);
        if (idx >= 0) {
          callbacks.splice(idx, 1);
        }

        if (callbacks.length === 0) {
          delete this.callbacks[channel];
        }

        return idx >= 0;
      };
    };
  }
}

export default PigeonChannel;
