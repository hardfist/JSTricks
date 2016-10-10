/**
 * implementing DFA
 * @param s
 * @returns {boolean}
 */
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
/**
 * implementing DFA using table-driven method
 * @param s
 * @returns {boolean}
 */
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
/**
 * implementing recognize using NFA with bitvector
 */
function recognize3(s){
    const [A,B,C,D,E,NUM_STATES] = Array.from({length:7},(_,i) => i);
    const closures = [
        1<<A,1<<B,1<<C,1<<D,1<<E
    ];
    const FINAL_STATES = 1<<E;
    const transitions = [
        [1<<B|1<<C,1<<D],
        [0,1<<A],
        [1<<C,1<<D],
        [1<<D,1<<E],
        [0,0]
    ];
    let states = closures[A];
    for(let i=0;i<s.length;i++){
        let newStates = 0;
        switch(s[i]){
            case '0': c = 0;break;
            case '1': c = 1;break;
            default: return false;
        }
        for(let p=A;p<=NUM_STATES;p++){
            if(states & 1<<p){
                newStates |= transitions[p][c];
            }
        }
        for(let p=A;p<=NUM_STATES;p++){
            if(newStates & 1<<p){
                newStates |= closures[p];
            }
        }
        states = newStates;
    }
    return (states & FINAL_STATES) != 0;
}
module.exports ={
    recognize1,
    recognize2,
    recognize3
};
