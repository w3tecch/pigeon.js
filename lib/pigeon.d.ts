declare namespace pigeon {

  interface IPigeonEventCallback {
    (...args): void;
  }

  interface Pigeon {
    /**
     * Returns all registered callback events
     */
    list(): IPigeonEventCallback[];
    /**
     * Fires a new event on the given channel
     *
     * @param channel This is used as a key for the events
     */
    publish(channel: string): (...args) => boolean;
    /**
     * Listens to the given channel
     *
     * @param channel This is used as a key for the events
     */
    subscribe(channel: string): (callback: pigeon.IPigeonEventCallback) => () => boolean;
  }


}
