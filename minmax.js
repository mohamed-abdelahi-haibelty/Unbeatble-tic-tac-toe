function minmax(depth,isMaximizing){
    if(checkWinner() !== 1){
        return result = checkWinner();
    }
    if(isMaximizing){
        let finalScore = -10;
        squarePosition.forEach((el,index)=>{
            if(el === 0){
                sequares[index].innerHTML = imgs.yellowO;
                squarePosition[index] = 2;
                let score = minmax(depth-1,false);
                squares[index].innerHTML = "";
                squarePosition[index] = 0;
                if(score > finalScore){
                    finalScore = score;
                }
            }
        })
        return finalScore;
    }
    else{
        let finalScore = 10;
        squarePosition.forEach((el,index)=>{
            if(el === 0){
                squares[index].innerHTML = imgs.blueX;
                squarePosition[index] = -2;
                let score = minmax(depth-1,true);
                squares[index].innerHTML = "";
                squarePosition[index] = 0;
                if(score < finalScore){
                    finalScore = score;
                }
            }
        })
        return finalScore;
    }
}