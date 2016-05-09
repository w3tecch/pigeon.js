/**
 * @name PigeonChannel
 * @description
 * TODO
 */
class PigeonChannel implements pigeon.IChannel {

  public static ERR_MSG_NOT_ACTIVATED: string = 'Channel is currently not activated';

  public activated: boolean = true;
  public name: string;

  private callbacks: pigeon.IEventCallbacks = {};

  constructor(name?: string) {
    this.name = name;
  }

  public get subscribers(): pigeon.IEventCallbacks {
    return this.callbacks;
  }

  public subscribe(item: string): (callback: pigeon.IEventCallback) => () => boolean {
    return (callback: pigeon.IEventCallback) => {
      if (this.activated) {
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
      } else {
        throw new Error(PigeonChannel.ERR_MSG_NOT_ACTIVATED);
      }
    };
  }

  public publish(item: string): (...args) => boolean {
    return (...args) => {
      if (this.activated) {
        let callbacks = this.callbacks[item] || [];
        let size = callbacks.length;
        callbacks.forEach(cb => cb(...args));
        return size < callbacks.length;
      } else {
        throw new Error(PigeonChannel.ERR_MSG_NOT_ACTIVATED);
      }
    };
  }
}

export default PigeonChannel;
