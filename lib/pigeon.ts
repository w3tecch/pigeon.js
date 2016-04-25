export class Pigeon {

  private callbacks: { [event: string]: pigeon.IPigeonEventCallback[] };

  constructor() {
    this.callbacks = {};
  }

  public list(): { [event: string]: pigeon.IPigeonEventCallback[] } {
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

  public subscribe(channel: string): (callback: pigeon.IPigeonEventCallback) => () => boolean {
    return (callback: pigeon.IPigeonEventCallback) => {
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

export var pigeon = new Pigeon();
