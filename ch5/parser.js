const LITERA = Symbol('LITERA');
const EXPON = Symbol('EXPON');
const SIGN = Symbol('SIGN');
const INT = Symbol('INT');
function leftmost(str){
    let stk = [];
    stk.push(LITERA);
    let i=0;
    while(stk.length > 0 && i<str.length){
        let top = stk.pop();
        //nontermina
        if(typeof  top == 'symbol'){
            switch (top){
                case LITERA:
                    stk.push(...[SIGN,INT,'.',INT,EXPON].reverse());
                    break;
                case EXPON:
                    if(str[i] == 'e'){
                        stk.push(...['e',SIGN,INT].reverse());
                    }
                    break;
                case SIGN:
                    if(str[i] == '+'){
                        stk.push('+');
                    }
                    else if(str[i] == '-'){
                        stk.push('-')
                    }
                    break;
                case INT:
                    stk.push(str[i]);
            }
        }else{
            if(str[i] != top){
                throw new TypeError(`expected ${str[i]} but got ${top}`);
            }else{
                console.log('consume:',top);
                i++;
            }
        }
    }
    return i == str.length;
}
let str = '-1.0e5';
console.log(leftmost(str));