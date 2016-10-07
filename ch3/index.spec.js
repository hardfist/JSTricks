var expect = require('chai').expect;
var util = require('./index');
describe('字符串处理',function(){
    it('#mySplit',function(){
        var str = 'ab;cd|efg|hi,jlk';
        var ds = ':,;|\t';
        expect(util.mySplit(str,ds)).to.eql(['ab','cd','efg','hi','jlk'])
    });
    it('#startsWith',function(){
        expect('hello'.startsWith('hel')).to.be.true;
    });
    it('#endsWith',function(){
        expect('hello'.endsWith('llo')).to.be.true;
    });
    it('#convertDate',function(){
        expect(util.convertDate('2010-05-12')).to.eql('05/12/2010')
    });
    it('#padding_left',function(){
        expect(util.padding_left('hello',10,'-')).to.eql('-----hello')
    });
    it('#padding_right',function(){
        expect(util.padding_right('hello',10,'*')).to.eql('hello*****')
    });
    it('#pretty_print',function() {
        expect(util.pretty_print(['a', 'bb', 'ccc'])).to.eql(['  a', ' bb', 'ccc'].join('\n'));
    });
    it('#removechar',function(){
        expect(util.remove_char('hello;world;nice',';')).to.eql('helloworldnice')
    })
});