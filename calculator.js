let buffer = "0";
let total = 0;
prevOperator = null;

let screen = document.querySelector(".screen");
document.querySelector(".calc-buttons").addEventListener("click",function(event){
    clickButton(event.target.innerText);
});
function clickButton(value) {
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerender();
}
function rerender(){
    screen.innerText = buffer;
}
function handleNumber(value){
    if(buffer === "0"){
        buffer = value;
    }else{
        buffer += value;
    }
}
function handleSymbol(value){
    switch(value){
        case "C":
           buffer = "0";
           prevOperator = null;
           total = 0;
        case "←":
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0,buffer.length - 1);

            }
            break;
        case "=":
            if(prevOperator === null){
                return;
            } 
            flushOperation(parseInt(buffer));          
            prevOperator = null;
            buffer = +total;
            total = 0;
            break;
        default:
            handleMath(value); 
            break;         
    }
}
function handleMath(value){
    if(buffer === "0"){
        //do nothing
        return;
    }
    const intBuffer = parseInt(buffer);
    if(total === 0){
        total = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    prevOperator = value;
    buffer = "0";
}
function flushOperation(intBuffer){
    if(prevOperator === "+"){
        total += intBuffer;
    }else if(prevOperator === "−"){
        total -= intBuffer;
    }else if(prevOperator === "×"){
        total *= intBuffer;
    }else{
        total /= intBuffer;
    }

    
}
