declare namespace pigeon {

  /**
   * Callback of the subscriber.
   */
  interface IEventCallback {
    (...args): void;
  }

  /**
   * Collection of all the subscribe callbacks.
   */
  interface IEventCallbacks {
    [item: string]: pigeon.IEventCallback[]
  }

  /**
   * This is the collection of the channels, which will be
   * stored in the pigeon object.
   */
  interface IChannelList {
    [channel: string]: pigeon.IChannel
  }

  interface IPigeon {
    /**
     * Stores all registered channels.
     */
    channels: pigeon.IChannelList;
    /**
     * Create a new channel and returns it.
     *
     * @param name
     */
    channel(name?: string): pigeon.IChannel;
    /**
     * Tells you if this channel is active and exists.
     *
     * @param channelName
     */
    has(channelName: string): boolean;
    /**
     * Deletes a channel. So if will use it again
     * the subscriber are still available form the last time.
     *
     * @param channelName
     */
    remove(channelName: string): void;
  }

  interface IChannel {
    /**
     * Returns the name of the created channel
     */
    name: string;
    /**
     * Returns all registered callback events
     */
    subscribers: IEventCallbacks;
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
