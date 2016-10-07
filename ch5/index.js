const COMMA = Symbol('COMMA');
const LBRACK = Symbol('LBRACK');
const RBRACK = Symbol('RBRACK');
const NAME = Symbol('NAME');
const EOF = Symbol('EOF');
class Token{
    constructor(type,text){
        this.type = type;
        this.text = text;
    }
    toString(){
        return `<${this.type},${this.text}>`;
    }
}
class Lexer{
    constructor(input){
        this.input = input.split('');
    }
    consume(){
        this.c = this.input.shift();
    }
    nextToken(){
        this.consume();
        while(this.c!=null){
            while(/\s/.test(this.c)) this.consume();
            if(this.c == null) break;
            switch (this.c){
                case ',': this.consume();return new Token(COMMA,',');
                case '[': this.consume(); return new Token(LBRACK,'[');
                case ']': this.consume(); return new Token(RBRACK,']');
                default: {
                    if (/[a-zA-Z]/.test(this.c)) {
                        let name  = '';
                        while(/a-zA-Z/.test(this.c)){
                            name += this.c;
                            this.consume()
                        }
                        return new Token(NAME,name);
                    }
                    throw new TypeError('Invalid Characters:', this.c);
                }
            }
        }
        return new Token(EOF,'<EOF>');
    }
}
class Parser{
    constructor(input){
        this.input = input;
    }
    getTokens(){
        let lexer = new Lexer(this.input);
        let token = lexer.nextToken();
        let tokens = [];
        while(token.type != EOF){
            tokens.push(token);
            token = lexer.nextToken();
        }
        return tokens;
    }
}
let parser = new Parser('[ a , b ]');
let tokens = parser.getTokens();
console.log('tokens:',tokens);