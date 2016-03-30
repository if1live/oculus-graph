var OculusGraph = require('../lib/oculus');
var expect = require('chai').expect;

describe('OculusGraph', function() {
  var graph = new OculusGraph('Bearer dummy-key');

  describe('createOptions', function() {
    it('no opts', function() {
      var opts = graph.createOptions();
      expect(opts.host).to.equal('graph.oculus.com');
      expect(opts.port).to.equal(443);
      expect(opts.method).to.equal('GET');

      expect(opts.headers['Authorization']).to.equal('Bearer dummy-key');
      expect(opts.headers['x-oculus-store-version']).to.equal('v2');
      expect(opts.headers['User-Agent']).to.equal(OculusGraph.USER_AGENT);
    });

    it('with opts', function() {
      var opts = graph.createOptions({
        path: '/path',
        method: 'POST',
      });

      expect(opts.path).to.equal('/path');
      expect(opts.method).to.equal('POST');
    });
  });
});
