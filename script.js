//initial data
let speed = 10;
let X = 0;
let Y = 0;
let obj = document.querySelector('.obj');
let item = {x: 50, y: 50}
let count = 0;
let array = [];
let keyPress, keyBlock;

//events
document.addEventListener('keydown', move);

//functions
function move(e){
	switch(e.key){
		case 'w':
			if(keyBlock !== 's'){
				clearInterval(keyPress);
				keyBlock = 'w';
				keyPress = setInterval(() => {
					setY(-speed);
				}, 50);
			}
			break;
		case 's':
			if(keyBlock !== 'w'){
				clearInterval(keyPress);
				keyBlock = 's'
				keyPress = setInterval(() => {
					setY(speed);
				}, 50);
			}
			break;
		case 'a':
			if(keyBlock !== 'd'){
				clearInterval(keyPress);
				keyBlock = 'a';
				keyPress = setInterval(() => {
					setX(-speed);
				}, 50);
			}
			break;
		case 'd':
			if(keyBlock !== 'a'){
				clearInterval(keyPress);
				keyBlock = 'd';
				keyPress = setInterval(() => {
					setX(speed);
				}, 50);
			}
			break;
	}		
}
function setY(value){
	Y = parseInt(window.getComputedStyle(obj).getPropertyValue('top'));
	if(Y < 0 || Y > 590){
		GameOver();
	}else{
		if(count > 0){
			setBody();
		}
		Y += value;
		obj.style.top = `${Y}px`;
		if(Y === item.y && X === item.x){
			itemRamdom(item);
		}
	}
	headInBody();
}
function setX(value){
	X = parseInt(window.getComputedStyle(obj).getPropertyValue('left'));
	if(X < 0 || X > 590){
		GameOver();
	}else{
		if(count > 0){
			setBody();
		}
		X += value;
		obj.style.left = `${X}px`;
		if(Y === item.y && X === item.x){
			itemRamdom(item);
		}
	}
	headInBody();
}
function setBody(){
	let p = {};
	p.x = X;
	p.y = Y;
	array.unshift(p);
	if(array.length > count){
		array.splice(count,1)
	}
	chase();
}
function chase(){
	document.querySelectorAll('.container .item2').forEach((item)=>{
		let index = item.getAttribute('data-item')
		item.style.left = `${array[parseInt(index)-1].x}px`;
		item.style.top = `${array[parseInt(index)-1].y}px`;
	})
}
function itemRamdom(item){
	count++;
	let x = (Math.floor(Math.random() * (57-1)) + 1)*10;
	let y = (Math.floor(Math.random() * (57-1)) + 1)*10;
	item.x = x;
	item.y = y;
	document.querySelector('.item').style.top = `${item.y}px`;
	document.querySelector('.item').style.left = `${item.x}px`;
	score(count);
}
function score(count){
	document.querySelector('.score span').innerText = count;
	updateBody()
}
function updateBody(){
	obj2 = document.querySelector('.item2').cloneNode(true);

	obj2.setAttribute('data-item',`${count}`);
	obj2.style.display = 'block'
	document.querySelector('.container').appendChild(obj2);
}
function headInBody(){
	let i;
	for(i = 1; i < array.length; i++){
		if(array[i].x === X && array[i].y ===Y){
			GameOver();
		}
	}
}
function GameOver(){
	let gameOver = document.querySelector('.gameOver');
	gameOver.style.display = 'block';
	document.querySelector('.container').innerHTML = '';
	document.querySelector('.container').appendChild(gameOver);
}
