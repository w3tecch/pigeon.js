import * as chai from 'chai';
export const expect = chai.expect;
export const should = chai.should();

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


});
