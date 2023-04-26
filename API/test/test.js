//API testing

var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('../app');
let should = chai.should();

let test_table_name = "bati_indiferrencie"

describe('API', () => {
    describe('/GET /dbInfo/getTables', () => {
        it('it should return an array with the table name', (done) => {
            chai.request(server)
                .get('/dbInfo/getTables')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.contain(test_table_name);
                    done();
                });
        });
    });

    describe('/GET /dbInfo/{table}', () => {
        it('it should return an array with the table name', (done) => {
            chai.request(server)
                .get('/dbInfo/' + test_table_name)
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.name, test_table_name);
                    assert.equal(res.body.columns.length, 7);
                    done();
                });
        });
    });

    describe('/GET /dbInfo/{table}/{column}/getMinMax', () => {
        it('it should return the min and max', (done) => {
            chai.request(server)
                .get('/dbInfo/' + test_table_name + '/hauteur/getMinMax')
                .end((err, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.minimum, 31);
                    assert.equal(res.body.maximum, 38);
                    done();
                });
        });
    });

    describe('/GET /dbInfo/{table}/{column}/getDistinctValues', () => {
        it('it should return an array with the distinct values, here Autre', (done) => {
            chai.request(server)
                .get('/dbInfo/' + test_table_name + '/origin_bat/getDistinctValues')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.contain('Autre');
                    res.body.should.contain('BDTopo');
                    done();
                });
        });
    });

    describe('/GET /data/' + test_table_name + '/selectData', () => {
        it('it should fetch the data', (done) => {
            chai.request(server)
                .get('/data/' + test_table_name + '/selectData')
                .end((err, res) => {
                    res.should.have.status(200);
                    Object.keys(res.body).should.include('type');
                    Object.keys(res.body).should.include('crs');
                    Object.keys(res.body).should.include('features');
                    assert.equal(res.body.features.length, 2);
                    done();
                });
        });
    });

    describe('/POST /data/' + test_table_name + '/selectData', () => {
        it('it should fetch the data with filters', (done) => {
            chai.request(server)
                .post('/data/' + test_table_name + '/selectData')
                .set('content-type', 'application/json')
                .send({ filters: ["Autre"], columnFiltered: "origin_bat" })
                .end((err, res) => {
                    res.should.have.status(200);
                    Object.keys(res.body).should.include('type');
                    Object.keys(res.body).should.include('crs');
                    Object.keys(res.body).should.include('features');
                    assert.equal(res.body.features.length, 1);
                    done();
                });
        });
    });
});
