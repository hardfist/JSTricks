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
}
Lexer.EOF = Symbol('EOF');
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
        return new Token(ListLexer.EOF,'<EOF>');
    }
    getTokens(){
        let token = this.nextToken();
        let tokens = [];
        while(token.type != Lexer.EOF){
            tokens.push(token);
            token = this.nextToken();
        }
        tokens.push(token);
        return tokens;
    }
}
ListLexer.COMMA = Symbol('COMMA');
ListLexer.LBRACK = Symbol('LBRACK');
ListLexer.RBRACK = Symbol('RBRACK');
ListLexer.NAME = Symbol('NAME');
ListLexer.EQUALS = Symbol('EQUALS');
class Parser{
    constructor(tokens,k=1){
        this.input = tokens;
        this.lookhead = new Array(k);
        this.p = 0;
        this.k = k;
        for(let i=0;i<k;i++){
            this.consume();
        }
    }
    LA(i){
        return this.LT(i).type;
    }
    LT(i){
        //console.log(this.lookhead);
        return this.lookhead[(this.p+i-1)%this.k];
    }
    match(type){
        if(this.LA(1)=== type) this.consume();
        else{
           throw new TypeError(`expect ${String(type)} but get ${String(this.LA(1))}`);
        }
    }
    consume(){
        this.lookhead[this.p] = this.input.shift();
        this.p = (this.p+1)%this.k;
    }
}
class ListParser extends Parser{
    constructor(input){
        super(input,2);
    }
    list(){
        this.match(ListLexer.LBRACK);
        this.elements();
        this.match(ListLexer.RBRACK);
    }
    elements(){
        this.element();
        while(this.LA(1) === ListLexer.COMMA){
            this.match(ListLexer.COMMA);
            this.element()
        }
    }

    element(){
        if(this.LA(1) == ListLexer.NAME && this.LA(2) == ListLexer.EQUALS){
            this.match(ListLexer.NAME);
            this.match(ListLexer.EQUALS);
            this.match(ListLexer.NAME);
        }
        else if(this.LA(1) === ListLexer.NAME) this.match(ListLexer.NAME);
        else if(this.LA(1) === ListLexer.LBRACK) this.list();
        else throw new TypeError(`expecting name or list: found ${String(this.LA(1))}`);
    }
}
class BacktrackParser extends Parser{
    constructor(input,k){
        super(input,k);
        this.markers = [];
    }
    stat(){
        if(this.speculate_stat_alt1()){
            this.list();
            this.match(Lexer.EOF);
        }else if(this.speculate_stat_alt2()){
            this.assign();
            this.match(Lexer.EOF);
        }else{
            throw new TypeError(`expecting stat found ${String(this.LT(1))}`)
        }
    }
    speculate_stat_alt1(){
        let success = true;
        this.mark();
        try{
            this.list();
            this.match(Lexer.EOF);
        }catch(err){
            success = false
        }
        this.release();
        return success;

    }
    speculate_stat_alt2(){
        let success = true;
        this.mark();
        try{
            this.assign();
            this.match(Lexer.EOF);
        }catch(err){
            success = false;
        }
        this.release();
        return true;
    }
    consume(){
        this.p++;
        if(p== this.lookhead.length && !this.isSpeculating()){
            this.p = 0;
        }
        this.sync(1);
    }
    mark(){
        this.markers.push(this.p);
        return this.p;
    }
    release(){
        let marker = this.markers.pop();
        this.seek(marker);
    }
    seek(index){
        this.p = index;
    }
    isSpeculating(){
        return this.markers.length > 0;
    }
}
class AST{
    constructor(token){
        this.token = token;
        this.children = [];
    }
}
class ExprNode extends AST{

}
util = module.exports={
    Lexer,
    ListLexer,
    Parser,
    ListParser
};