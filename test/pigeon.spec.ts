import * as chai from 'chai';

export const expect = chai.expect;

import pigeon from './../index.ts';
import PigeonChannel from './../lib/channel.ts';

describe('pigeon.ts', () => {

  describe('Create new empty channel and removes it', () => {

    let name = 'test-channel';
    it(`create new channel ${name}`, () => {
      pigeon.channel(name);
      expect(pigeon.channels[name]).to.be.an.instanceof(PigeonChannel);
    });

    it(`pigeon has the new channel named ${name}`, () => {
      expect(pigeon.has(name));
    });

    it(`channel ${name} has no subscribers`, () => {
      expect(pigeon.channel(name).subscribers).to.be.empty;
    });

    it(`remove channel ${name}`, () => {
      pigeon.remove(name);
      expect(pigeon.channels[name]).to.be.undefined;
    });

    it(`pigeon does not have the channel named ${name} anymore`, () => {
      expect(pigeon.has(name)).to.be.false;
    });

  });

});
