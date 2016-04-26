import * as chai from 'chai';
import * as sinon from 'sinon';

export const expect = chai.expect;
// export const should = chai.should();

import {pigeon} from './../index.ts';

describe('channel.ts', () => {

  let channelOne, channelEmpty;
  before(() => {
    channelOne = pigeon.channel('one');
    channelEmpty = pigeon.channel('two');
    let cb = sinon.spy();
    channelOne.subscribe('test')(cb);
  });

  describe('#getName()', () => {
    it('channel have to given names', () => {
      channelOne.getName().should.equal('one');
      channelEmpty.getName().should.equal('two');
    });
  });

  describe('#getList()', () => {
    it('channel one has a subscriber', () => {
      expect(channelOne.getList()).to.be.not.empty;
    });

    it('channel empty has a empty list', () => {
      expect(channelEmpty.getList()).to.be.empty;
    });
  });

  describe('#subscribe()', () => {

    it('adds a new entry in the channels list', () => {
      let channel = pigeon.channel();
      expect(channel.getList()).to.be.empty;
      let cb = sinon.spy();
      channel.subscribe('test')(cb);
      expect(channel.getList()).to.be.not.empty;
      let list = channel.getList();
      expect(list).to.include.keys('test');
    });

    it('returns a disposal function', () => {
      let channel = pigeon.channel();
      let cb = sinon.spy();
      let disposal = channel.subscribe('test')(cb);
      expect(disposal).exist;
    });

    it('the disposal removes the entry in the list', () => {
      let channel = pigeon.channel();
      let cb = sinon.spy();
      let disposal = channel.subscribe('test')(cb);
      expect(channel.getList()).to.be.not.empty;
      disposal();
      expect(channel.getList()).to.be.empty;
    });

  });

  describe('#publish()', () => {

    it('cb function is called once', () => {
      let channel = pigeon.channel();
      let cb = sinon.spy();
      channel.subscribe('test')(cb);
      channel.publish('test')();
      expect(cb.calledOnce);
    });

    it('disposal removes event from list an cb will not be called again', () => {
      let channel = pigeon.channel();
      let cb = sinon.spy();
      let disposal = channel.subscribe('test')(cb);
      disposal();
      channel.publish('test')();
      expect(cb.called).to.be.false;
    });

    it('two subscriber triggers the same callback twice', () => {
      let channelA = pigeon.channel();
      let channelB = pigeon.channel();
      let cb = sinon.spy();
      channelA.subscribe('test')(cb);
      channelB.subscribe('test')(cb);
      channelA.publish('test')();
      channelB.publish('test')();
      expect(cb.calledTwice);
    });

    it('publish data and the subscriber gets it', () => {
      let message = 'an example message';
      let channel = pigeon.channel();
      let cb = sinon.spy();
      channel.subscribe('test')(cb);
      channel.publish('test')(message);
      expect(cb.calledWith(message));
    });

  });

});
