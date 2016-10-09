function recognize1(s){
    const START = Symbol('START');
    const A = Symbol('A');
    const AA = Symbol('AA');
    const B = Symbol('B');
    const AAB = Symbol('AAB');
    let state = START;
    for(let i=0;i<s.length;i++){
        switch (state){
            case START:
                switch (s[i]){
                    case 'a': state = A;continue;
                    case 'b': continue;
                    default:return false;
                }
            case A:
                switch (s[i]){
                    case 'a': state = AA;continue;
                    case 'b': state = START;continue;
                    default: return false;
                }
            case AA:
                switch (s[i]){
                    case 'a':continue;
                    case 'b':state = AAB;continue;
                    default: return false;
                }
            case AAB:
                switch (s[i]){
                    case 'a': case 'b': continue;
                    default: return false;
                }
        }
    }
    return state === AAB;
}
function recognize2(s){
    const [START,A,AA,AAB] = Array.from({length:4},(_,i) => i);
    const transitions = [
        [A,START],
        [AA,START],
        [AA,AAB],
        [AAB,AAB]
    ];
    let state = START;
    for(let i=0;i<s.length;i++){
        let c;
        switch (s[i]){
            case 'a': c = 0;break;
            case 'b': c = 1;break;
            default : return false;
        }
        state = transitions[state][c]
    }
    return state == AAB;
}
console.log(recognize1('aab'));
console.log(recognize2('aab'));