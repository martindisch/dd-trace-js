'use strict'

const WAFContextWrapper = require('../../../src/appsec/waf/waf_context_wrapper')
const addresses = require('../../../src/appsec/addresses')

describe('WAFContextWrapper', () => {
  it('Should send HTTP_INCOMING_QUERY only once', () => {
    const ddwafContext = {
      run: sinon.stub()
    }
    const wafContextWrapper = new WAFContextWrapper(ddwafContext, 1000, '1.14.0', '1.8.0')

    const payload = {
      [addresses.HTTP_INCOMING_QUERY]: { key: 'value' }
    }

    wafContextWrapper.run(payload)
    wafContextWrapper.run(payload)

    expect(ddwafContext.run).to.have.been.calledOnceWithExactly(payload, 1000)
  })
})
