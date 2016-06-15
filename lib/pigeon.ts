/**
 * @name Pigeon
 * @description
 * TODO
 */
import PigeonChannel from './channel.ts';

class Pigeon implements pigeon.IPigeon {

  public channels: pigeon.IChannelList = {};

  public has(channelName: string): boolean {
    return !!this.channels[channelName];
  }

  public channel(name: string): pigeon.IChannel {
    return !this.has(name) && (this.channels[name] = new PigeonChannel(name)) && this.channels[name]  || this.channels[name];
  }

  public remove(channelName: string): void {
    delete this.channels[channelName];
  }

}

export default Pigeon;
