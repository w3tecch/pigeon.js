import * as chai from 'chai';
import * as sinon from 'sinon';

export const expect = chai.expect;
// export const should = chai.should();

import {pigeon} from './../index.ts';

describe('channel.ts', () => {

  let channelOne, channelTwo;
  before(() => {
    channelOne = pigeon.channel('one');
    channelTwo = pigeon.channel('two');
  });

  describe('#getName()', () => {
    it('channel have to given names', () => {
      channelOne.getName().should.equal('one');
      channelTwo.getName().should.equal('two');
    });
  });

  describe('#getList()', () => {
    it('channel one has a empty list', () => {
      expect(channelOne.getList()).to.be.empty;
    });
  });

  describe('#subscribe()', () => {

    it('open new event bus on the channel', () => {
      let cb = sinon.spy();
      console.log(cb);
      // channelOne.subscribe('item:test', callback);
      // expect(channelOne.getList()).to.be.not.empty;
      //assert(callback.called);
    });

  });

});
