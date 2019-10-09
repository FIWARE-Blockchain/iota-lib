const expect = require('chai').expect
const sinon = require('sinon')
const cp = require('child_process')
const os = require('os')
const leven = require('leven')
const iotaSeed = require('./index')

describe('IOTA seed generator', () => {

  describe('General', () => {
    it.only('should generate a seed', () => {
      const seed = iotaSeed()

      expect(seed).to.be.a('string')
      expect(seed.length).to.equal(81)
      expect(seed).to.match(/^([A-Z]|9){81}$/)
    })

    it('should generate completely different seeds each time', () => {
      const seeds = new Array(20)

      for (var i = 0; i < seeds.length; ++i) {
        seeds[i] = iotaSeed()
      }

      for (var i = 0; i < seeds.length; ++i) {
        for (var j = i + 1; j < seeds.length; ++j) {
          expect(leven(seeds[i], seeds[j])).to.be.at.least(60)
        }
      }
    })
  })

  describe('Different operating systems', () => {

    beforeEach(() => {
      sinon.spy(cp, 'execSync')
      sinon.stub(os, 'platform')
    })

    afterEach(() => {
      os.platform.restore()
      cp.execSync.restore()
    })

    it('should throw an error for Windows operating system', () => {
      os.platform.returns('win32')

      expect(() => iotaSeed()).to.throw()
    })

    it('should use "cat /dev/urandom | LC_ALL=C tr -dc ..." for Mac operating system', () => {
      os.platform.returns('darwin')

      expect(cp.execSync.called).to.be.false

      iotaSeed()

      expect(cp.execSync.args[0][0]).to.equal("cat /dev/urandom | LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1")
    })

    it('should use "cat /dev/urandom | tr -dc A-Z9 | head -c${1:-81}" for Linux operating system', () => {
      os.platform.returns('linux')

      expect(cp.execSync.called).to.be.false

      iotaSeed()

      expect(cp.execSync.args[0][0]).to.equal("cat /dev/urandom | tr -dc A-Z9 | head -c${1:-81}")
    })
  })
})