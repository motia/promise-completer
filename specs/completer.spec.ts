import { expect, assert } from 'chai'
import Completer from '../lib/index'


describe('test Completer', () => {
  it('promise of completer is resolved with same value as its completer', async function () {
    const completer = new Completer<'ok'>()
    let result = 'none'
    const promise = completer.promise
    promise.then(x => result = x)
 
    completer.resolve('ok')
    expect(completer.promise).to.be.equal(promise)

    result = await completer.promise
    expect(result).to.be.equal('ok') 
  })

  it('promise of completer is rejected with same error as its completer', async function () {
    const completer = new Completer<'ok'>()

    let result = 'none'
    const promise = completer.promise
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    promise.then(x => result = x).catch(function () {})

    completer.reject('failure')
    expect(completer.promise).to.be.equal(promise)

    try {
      await completer.promise
      assert.fail('Should not be reachable')
    } catch (e) {
      expect(e).to.be.equal('failure')
    }
    expect(result).to.be.equal('none')
  })
})