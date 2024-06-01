int px = 200; //jiki x zahyou
int py = 345; //jiki y zahyou
int pw = 40; //jiki width
int ph = 15; //jiki hight

int ow = 30; //object width
int oh = 30; //object hight

int[] oy = new int[10]; //10ko no hairetsu
int[] oColor = new int[10]; //2 pattern
int[] oWait = new int[10]; //timing

int score;
int timeLimit = 40; //new 40 byou
int countDown; //new
int gseq; //game over 

PImage Back;
PImage Angels;
PImage Demons;

void setup(){
frameRate(40);
size(400,400);
Back = loadImage("back.png");
Angels = loadImage("angels.png");
Angels.resize(ow, oh);
Demons = loadImage("demons.png");
Demons.resize(ow, oh);
for(int i=0; i<10; i++){
oy[i] = 40;
oColor[i] = int(random(2)); //2 pattern
oWait[i] = int(random(60,240));
score = 0;
gseq = 0; // play now
}
}
void draw(){
image(Back,0,0); //haikei
if( gseq == 0 ){
gamePlay(); // play now
} else if( gseq == 1){
gameOver(); // after game over
}
}
void playerDisp(){
fill(36,122,211); //jiki color
rect(px,py,pw,ph,10); //10=kado no marusa
noStroke();
}
void playerMove(){
px = mouseX; // mouse cursor x zahyou get → ugoku!!
if( (px+pw) > width ){
px = width - pw; // migi ni hamidenai
}
}
void objDisp(){
for(int i=0; i<10; i++){
if( oColor[i] == 0 ){
image(Demons, i*40+5, oy[i]);
} else {
image(Angels, i*40+5, oy[i]);
}
}
}
void objMove(){
for(int i=0; i<10; i++){
if( oWait[i] > 0 ){ // 0 yori big no toki jikkou suru
oWait[i]--;
} else {
oy[i] +=2; // 0 no toki jikkou suru
}
if(oy[i] > height){ // window height get
oy[i] = 40;
oColor[i] = int(random(2));
oWait[i] = int(random(30,240)); //30 kara 240 hassei saseru kazu
}
}
}
void hitCheck(){ // atari hantei
int ox;
for (int i=0; i<10; i++){
ox = i*40+5;
if( (px < (ox+ow)) && ((px+pw) > ox)
&& (py < (oy[i]+oh)) && ((py+ph) > oy[i]) ){ // 4 jouken sorottatoki
if( oColor[i] == 1 ){
score +=1; // score 1 hueru angels
} else {
score -=1; // score 1 heru demon
}
oy[i] = 40;
oColor[i] = int(random(2));
oWait[i] = int(random(60,240));
}
}
}
void timeDisp(){ //new
int ms = millis()/1000;
println(ms);
countDown = timeLimit - ms;
if(countDown > 0){
if(countDown <= 10){
}
textSize(25);
fill(0,80,100);
text("COUNT : "+countDown, 280, 25); //280,25 zahyou
} else {
textSize(50);
fill(255,3,3);
text("TIME UP !!", 75, 200);
return;
}
}

void scoreDisp(){
textSize(23);
fill(0,80,100);
text("score:"+score,1,25);
}
void gamePlay(){
playerMove();
playerDisp();
objMove();
objDisp();
hitCheck();
scoreDisp();
timeDisp(); //new
if(countDown < 0){
gseq = 1; // konotoki game over
}
}
void gameOver(){
objDisp();
playerDisp();
scoreDisp();
timeDisp();
}