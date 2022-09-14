const xCounter = document.getElementById("x-counter");
const tiedCounter = document.getElementById("tied-counter");
const oCounter = document.getElementById("o-counter");
export default  function playerResult(){
                    if(!(sessionStorage.xCounter && sessionStorage.tiedCounter && sessionStorage.oCounter)){
                        sessionStorage.setItem("xCounter", 0);
                        sessionStorage.setItem("tiedCounter", 0);
                        sessionStorage.setItem("oCounter", 0);
                    }
                    xCounter.innerHTML = sessionStorage.xCounter;
                    tiedCounter.innerHTML = sessionStorage.tiedCounter;
                    oCounter.innerHTML = sessionStorage.oCounter;
                }