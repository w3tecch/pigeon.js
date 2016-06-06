import * as chai from 'chai';
import * as sinon from 'sinon';

export const expect = chai.expect;

import * as pigeon from './../index.ts';

describe('channel', () => {

  let channelOne, channelEmpty;
  before(() => {
    channelOne = pigeon.channel('one');
    channelEmpty = pigeon.channel('empty');
    let cb = sinon.spy();
    channelOne.subscribe('test')(cb);
  });

  describe('#getName()', () => {
    it('channels have the given names', () => {
      channelOne.name.should.equal('one');
      channelEmpty.name.should.equal('empty');
    });
  });

  describe('#subscribers()', () => {
    it('channel one has a subscriber', () => {
      expect(channelOne.subscribers).to.be.not.empty;
    });

    it('channel empty has a empty list', () => {
      expect(channelEmpty.subscribers).to.be.empty;
    });
  });

  describe('#subscribe()', () => {

    it('adds a new entry in the channels list', () => {
      let channel = pigeon.channel('three');
      expect(channel.subscribers).to.be.empty;
      let cb = sinon.spy();
      channel.subscribe('test')(cb);
      expect(channel.subscribers).to.be.not.empty;
      let list = channel.subscribers;
      expect(list).to.include.keys('test');
    });

    it('returns a disposal function', () => {
      let channel = pigeon.channel('four');
      let cb = sinon.spy();
      let disposal = channel.subscribe('test')(cb);
      expect(disposal).should.not.be.undefined;
      expect(disposal).to.be.an.instanceof(Function);
    });

    it('the disposal removes the entry in the list', () => {
      let channel = pigeon.channel('five');
      let cb = sinon.spy();
      let disposal = channel.subscribe('test')(cb);
      expect(channel.subscribers).to.be.not.empty;
      disposal();
      expect(channel.subscribers).to.be.empty;
    });

  });

  describe('#publish()', () => {

    let channel, channelB, cb;
    beforeEach('setup', () => {
      channel = pigeon.channel('a');
      channelB = pigeon.channel('b');
      cb = sinon.spy();
    });

    it('cb function is called once', () => {
      channel.subscribe('test')(cb);
      channel.publish('test')();
      expect(cb.calledOnce);
    });

    it('disposal removes event from list an cb will not be called again', () => {
      let disposal = channel.subscribe('test')(cb);
      disposal();
      channel.publish('test')();
      expect(cb.called).to.be.false;
    });

    it('two subscriber triggers the same callback twice', () => {
      channel.subscribe('test')(cb);
      channelB.subscribe('test')(cb);
      channel.publish('test')();
      channelB.publish('test')();
      expect(cb.calledTwice);
    });

    it('publish data and the subscriber gets it', () => {
      let message = 'an example message';
      channel.subscribe('test')(cb);
      channel.publish('test')(message);
      expect(cb.calledWith(message));
    });

  });

});
