import * as chai from 'chai';

export const expect = chai.expect;

import * as pigeon from './../index.ts';
import PigeonChannel from './../lib/channel.ts';

describe('pigeon.ts', () => {

  describe('Create new empty channel and removes it', () => {

    let name = 'test-001';
    it('create new channel', () => {
      pigeon.channel(name);
      expect(pigeon.channels[name]).to.be.an.instanceof(PigeonChannel);
    });

    it('pigeon has the new channel', () => {
      expect(pigeon.has(name));
    });

    it('channel is activated', () => {
      expect(pigeon.channel(name).activated);
    });

    it('channel has no subscribers', () => {
      expect(pigeon.channel(name).subscribers).to.be.empty;
    });

    it('remove channel deactivates it but not removes is', () => {
      pigeon.remove(name);
      expect(pigeon.channels[name].activated).to.be.false;
    });

    it('pigeon does not have the new channel anymore', () => {
      expect(pigeon.has(name)).to.be.false;
    });

  });

});
