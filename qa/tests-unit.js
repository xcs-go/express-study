/**
 * Created by 1t8l7j2 on 2017/7/5.
 */
const fortune = require('../lib/fortune.js');
const expect = require('chai').expect;
suite('Fortune cookie tests',function () {
    test('getFortune() should return a fortune',function () {
        expect(typeof fortune.getFortune() === 'string');
    });
});