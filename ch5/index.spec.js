var util = require('./index');
var expect = require('chai').expect;
describe('Lexer:',function(){
    it('parse list',function(){
        let lexer = new util.ListLexer('[a,b]');
        let tokens = lexer.getTokens();
        expect(tokens.length).to.be.eql(5);
    });
    it('parser List',function(){
        let lexer = new util.ListLexer('[a,b]');
        let tokens = lexer.getTokens();
        let parser = new util.ListParser(tokens);
        parser.list()
    });
    it('parser List error',function(){
        let lexer = new util.ListLexer('[a,]');
        let tokens = lexer.getTokens();
        let parser = new util.ListParser(tokens);
        let fn = parser.list.bind(parser);
        expect(fn).to.throw();
    })
});