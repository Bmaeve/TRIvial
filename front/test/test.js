var assert = require('assert');
const host = 'http://localhost:3000/'

// testing test framework
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});

// testing API
describe('API', function () {
    describe('#test', function () {
        it('should return a geojson array', function () {
            fetch('http://localhost:3000/', {
                method: 'get'
            })
                .then(res => { res.json() })
                .then(data => {
                    console.log(data);
                })
        })
        assert.equal([1, 2, 3].indexOf(4), -1);
    });
});

