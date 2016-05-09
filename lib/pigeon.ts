/**
 * @name Pigeon
 * @description
 * TODO
 */
import PigeonChannel from './channel.ts';

class Pigeon implements pigeon.IPigeon {

  public channels: pigeon.IChannelList = {};

  public has(channelName: string): boolean {
    return (!!this.channels[channelName] && this.channels[channelName].activated);
  }

  public channel(name: string): pigeon.IChannel {
    if (this.has(name)) {
      this.channels[name].activated = true;
    } else {
      this.channels[name] = new PigeonChannel(name);
    }
    return this.channels[name];
  }

  public remove(channelName: string): void {
    if (this.has(channelName)) {
      this.channels[channelName].activated = false;
    }
  }

  public createCustomChannel(name?: string): pigeon.IChannel {
    return new PigeonChannel(name);
  }

}

export default Pigeon;
