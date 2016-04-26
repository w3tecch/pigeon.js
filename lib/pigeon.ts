/**
 * @name Pigeon
 * @description
 * TODO
 */
import PigeonChannel from './channel.ts';

class Pigeon {

  public static channel(name?: string): pigeon.IChannel {
    return new PigeonChannel(name);
  }

}

export default Pigeon;
