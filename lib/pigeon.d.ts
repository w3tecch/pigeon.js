declare namespace pigeonjs {

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
    [item: string]: pigeonjs.IEventCallback[]
  }

  /**
   * This is the collection of the channels, which will be
   * stored in the pigeon object.
   */
  interface IChannelList {
    [channel: string]: pigeonjs.IChannel;
  }

  interface IPigeon {
    /**
     * Stores all registered channels.
     */
    channels: pigeonjs.IChannelList;
    /**
     * Create a new channel and returns it.
     *
     * @param name
     */
    channel(name?: string): pigeonjs.IChannel;
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
    subscribe(item: string): (callback: pigeonjs.IEventCallback) => () => boolean;
  }


}

declare var Pigeonjs: pigeonjs.IPigeon;

declare module "pigeonjs" {
    export default Pigeonjs;
}
