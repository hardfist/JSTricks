var expect = require('chai').expect;
var util = require('./index');
describe('文件IO', function () {
    it('#readFile1', function () {
        var p1 = util.readFile1('./input.txt')
            .then(data => {
                expect(data).to.eql('This is a test')
            });
        var p2 = util.readFile1('nonexist')
            .then(data => {
                expect(true).to.be.false;
            }).catch(err => {
                expect(true).to.be.true;
            });
        return Promise.all([p1, p2]);

    });
    it('#readFile2', function () {
        var p1 = util.readFile2('./input.txt')
            .then(data => {
                expect(data).to.eql('This is a test')
            });
        var p2 = util.readFile1('nonexist')
            .then(data => {
                expect(true).to.be.false;
            }).catch(err => {
                expect(true).to.be.true;
            });
        return Promise.all([p1, p2]);

    });
});