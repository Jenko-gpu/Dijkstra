
var fs = require('fs');
let stack = new Array();

let top = -1;

input = fs.readFileSync("input.txt").toString().replaceAll(' ','');

let output = new Array();
let len = 0;

let operators = new Array();

operators['+'] = 1;
operators['-'] = 1;
operators['*'] = 2;
operators['/'] = 2;
operators['^'] = 3;



let i = 0;



while (i < input.length){
    let c = input.charAt(i);
    let mov = 1;
    if (!isNaN(c)){
        let dot = false;
        while (i+mov < input.length && (!isNaN(input.charAt(i+mov)) || (input.charAt(i+mov)=='.') && dot==false)) {
            if (input.charAt(i+mov)=='.'){
                if (dot == true){
                    throw "Wrong input";
                }
                dot = true;
            } 
            mov++;
        }
        output[len] = Number(input.substring(i,i+mov));
        len += 1;
    } else
    if (c == '(') {
        top++;
        stack[top] = c;
    } else
    if (c == ')') {
        while (top >= 0 && stack[top]!='('){
            output[len] = stack[top];
            len += 1;
            top--;
            
        }
        if (top==-1){
            throw "Wrong input";
        }
        top--;
    } else
    {
        if (c=='-' && (stack[top]=='(' || top == -1)) {
            while (i+mov < input.length && !isNaN(input.charAt(i+mov))) {
                mov++;
            }
            output[len] = Number(input.substring(i,i+mov));
            len += 1;
            i+=mov;
            continue;
        }
        while ( top!=-1 && (operators[stack[top]] >= operators[c])){
            output[len] = stack[top];
            len += 1;
            top--;
        }
        top++;
        stack[top] = c;
        
    }
    i += mov;
}
while (top >= 0 && stack[top] in operators){
    output[len] = stack[top];
    len++;
    top--;
    
}
if (top!=-1) {
    throw "Wrong input";
}

stack = new Array();

i = 0;
while (i<len) {
    if (!isNaN(output[i])){
        top++;
        stack[top] = output[i];
    } else {
        if (top>=1){
            let a = stack[top-1];
            let b = stack[top];
            top--;
            switch (output[i]){
                case '+':
                    stack[top] = a+b;
                    break;
                case '-':
                    stack[top] = a-b;
                    break;
                case '*':
                    stack[top] = a*b;
                    break;
                case '/':
                    stack[top] = a/b;
                    break;
                case '^':
                    stack[top] = Math.pow(a,b);
                    break;
                default:
                    throw "ERROR";
                    break;
                }
            } else {
                throw "ERROR";
            }
    }
    i++;
}
if (top != 0) {
    throw "ERROR";
}

console.log(stack[0]);
