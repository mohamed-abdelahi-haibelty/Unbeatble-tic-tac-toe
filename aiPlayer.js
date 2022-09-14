let squarePosition = [0,0,0,0,0,0,0,0,0];
function aiTurn(){
    let finalScore = -10;
    let bestMove;
    squarePosition.forEach((el,index)=>{
        if(el === 0){
            sequares[index].innerHTML = imgs.yellowO;
            squarePosition[index] = 2;
            let score = minmax(10,false);
            squares[index].innerHTML = "";
            squarePosition[index] = 0;
            if(score > finalScore){
                finalScore = score;
                bestMove = index;
            }
        }
    })
    squares[bestMove].innerHTML = imgs.yellowO;
    squarePosition[bestMove] = 2;
}