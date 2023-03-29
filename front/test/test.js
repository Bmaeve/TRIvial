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
            let table_name = "bati_indiferrencie";
            return fetch(host + 'data/' + table_name + '/selectData', {
                method: 'get'
            })
                //.then(res => res.json())
                .then(data => {
                    console.log(data);
                    assert.equal([1, 2, 3].indexOf(4), -1);
                })
                .catch(err => {
                    console.log(err);
                });
        })
    });
});

/*
// testing API
describe('API', function () {
    describe('#test', function () {
        it('should return a geojson array', function () {
            let table_name = "bati_indiferrencie";
            let parameters = { "hauteur": { "min": 0, "max": 100 }, "origin_bat": { "values": ["Autre"] } }

            return fetch(host + 'data/' + table_name + '/selectData', {
                body: JSON.stringify(parameters),
                headers: { 'Content-Type': 'application/json' },
                method: 'post'
            })
                //.then(res => res.json())
                .then(data => {
                    console.log(data);
                    assert.equal([1, 2, 3].indexOf(4), -1);
                })
                .catch(err => {
                    console.log(err);
                });
        })
    });
});
*/