declare namespace pigeon {

  interface IEventCallback {
    (...args): void;
  }

  interface IEventCallbacks {
    [item: string]: pigeon.IEventCallback[]
  }

  interface IPigeon {
    /**
     * Create a new channel and returns it
     *
     * @param name
     */
    channel(name?: string): IChannel;
  }

  interface IChannel {
    /**
     * Returns the name of the created channel
     */
    getName(): string;
    /**
     * Returns all registered callback events
     */
    getList(): IEventCallbacks;
    /**
     * Fires a new event on the given item
     *
     * @param item This is used as a key for the events
     */
    publish(item: string): (...args) => boolean;
    /**
     * Listens to the given item
     *
     * @param item This is used as a key for the events
     */
    subscribe(item: string): (callback: pigeon.IEventCallback) => () => boolean;
  }


}
