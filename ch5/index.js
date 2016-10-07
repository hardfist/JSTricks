class Token{
    constructor(type,text){
        this.type = type;
        this.text = text;
    }
    toString(){
        return `<${String(this.type)},${this.text}>`;
    }
}
class Lexer{
    constructor(input){
        this.input = input.split('');
        this.consume();//初始化
    }
    consume(){
        this.c = this.input.shift();
    }
    match(x){
        if(this.c == x) this.consume();
        throw new TypeError(`expecting ${x} but found ${this.c}`);
    }
    getTokens(){
        let token = this.nextToken();
        let tokens = [];
        while(token != null){
            tokens.push(token);
            token = this.nextToken();
        }
        return tokens;
    }
}
class ListLexer extends Lexer{
    nextToken(){
        while(this.c!=null){
            if(/s/.test(this.c)){
                while(/s/.test(this.c)){
                    this.consume()
                }
                continue;
            }
            switch (this.c){
                case ',': this.consume();return new Token(ListLexer.COMMA,',');
                case '[': this.consume(); return new Token(ListLexer.LBRACK,'[');
                case ']': this.consume(); return new Token(ListLexer.RBRACK,']');
                default: {
                    if (/[a-zA-Z]/.test(this.c)) {
                        let name  = '';
                        while(/[a-zA-Z]/.test(this.c)){
                            name += this.c;
                            this.consume()
                        }
                        return new Token(ListLexer.NAME,name);
                    }
                    throw new TypeError('Invalid Characters:', this.c);
                }
            }
        }
        return null;
    }
}
ListLexer.COMMA = Symbol('COMMA');
ListLexer.LBRACK = Symbol('LBRACK');
ListLexer.RBRACK = Symbol('RBRACK');
ListLexer.NAME = Symbol('NAME');
ListLexer.EOF = Symbol('EOF');

class Parser{
    constructor(tokens){
        this.input = tokens;
        this.consume()
    }
    match(type){
        if(this.token.type === type) this.consume();
        else{
           throw new TypeError(`expect ${String(type)} but get ${String(this.token.type)}`);
        }
    }
    consume(){
        this.token = this.input.shift();
    }
}
class ListParser extends Parser{
    constructor(input){
        super(input);
    }
    list(){
        this.match(ListLexer.LBRACK);
        this.elements();
        this.match(ListLexer.RBRACK);
    }
    elements(){
        this.element();
        while(this.token.type === ListLexer.COMMA){
            this.match(ListLexer.COMMA);
            this.element()
        }
    }
    element(){
        if(this.token.type === ListLexer.NAME) this.match(ListLexer.NAME);
        else if(this.token.type === ListLexer.LBRACK) this.list();
        else throw new TypeError(`expecting name or list: found ${this.token}`);
    }
}
module.exports={
    Lexer,
    ListLexer,
    Parser,
    ListParser
};