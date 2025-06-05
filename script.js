var canvas=document.querySelector('canvas');
var c=canvas.getContext('2d');
const rows=6;
const columns=7;
const gridwidth=canvas.width/columns;
const gridheight=canvas.height/rows;
let board=Array.from({length: rows},() => Array(columns).fill(null));
let gamefinish=false;
let currentplayer='red';
let blockedcolumn=null;
function drawdisc(row,col,color){
        const x=col*gridwidth+gridwidth/2;
        const y=row*gridheight+gridheight/2;
        c.beginPath();
        c.arc(x,y,Math.min(gridwidth,gridheight)/2-10,0,Math.PI*2);
        c.fillStyle=color;
        c.fill();
    }
function grid(){
    c.clearRect(0,0,canvas.width,canvas.height);
    c.strokeStyle='black';
    c.linewidth=1;
    for (let i=0; i<=rows; i++){
        c.beginPath();
        c.moveTo(0,i*gridheight);
        c.lineTo(canvas.width,i*gridheight);
        c.stroke();
    }
    for (let j=0; j<=columns;j++){
        c.beginPath();
        c.moveTo(j*gridwidth,0);
        c.lineTo(j*gridwidth,canvas.height);
        c.stroke();
    }
    for (let r = 0; r < rows; r++) {
    for (let col = 0; col < columns; col++) {
      if (board[r][col]) {
        drawdisc(r, col, board[r][col]);
      }
    }
  }
    if(blockedcolumn!==null){
        c.fillStyle='#00000033';
        c.fillRect(blockedcolumn*gridwidth,0,gridwidth,canvas.height);
    }
}

function dropdisc(col){
    if (blockedcolumn===col || gamefinish) return false;
    for (let r= rows-1; r>=0;r--){
        if(!board[r][col]){
            board[r][col]=currentplayer;
            return {row:r,col:col};
        }
    }
    return null;
}
function column(x){
    return Math.floor(x/gridwidth);
}
canvas.addEventListener('click',function(e){
    const col=column(e.offsetX);
    if(blockedcolumn===col){
        alert(`column ${col +1} is blocked, choose any other`);
        return;
    }
    const success=dropdisc(col);
    if (success) {
      currentplayer=currentplayer==='red' ? 'yellow' : 'red';
      blockedcolumn = Math.floor(Math.random() * columns);
      grid();
    }else{
        alert('column is fully filled');

    }
    
  });
grid();
