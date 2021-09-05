//initial data
let pixel = 10;
let speed = 50;
let X = 0;
let Y = 0;
let obj = document.querySelector('.obj');
let item = {x: 50, y: 50}
let count = 0;
let array = [];
let keyPress, keyBlock;

//events
document.addEventListener('keydown', move);
document.querySelectorAll('.button').forEach((btn)=>{
	btn.addEventListener('click', buttonPress);
})
document.querySelectorAll('.direction').forEach((btn)=>{
	btn.addEventListener('click', move);
})

//functions
function move(e){
	let key;
	if(e.key){
		key = e.key.toLowerCase();
	}
	switch(key || e.currentTarget.getAttribute('data')){
		case 'w':
			if(keyBlock !== 's'){
				arrowPress('w');
				clearInterval(keyPress);
				keyBlock = 'w';
				keyPress = setInterval(() => {
					setY(-pixel);
				}, speed);
			}
			break;
		case 's':
			if(keyBlock !== 'w'){
				arrowPress('s');
				clearInterval(keyPress);
				keyBlock = 's'
				keyPress = setInterval(() => {
					setY(pixel);
				}, speed);
			}
			break;
		case 'a':
			if(keyBlock !== 'd'){
				arrowPress('a');
				clearInterval(keyPress);
				keyBlock = 'a';
				keyPress = setInterval(() => {
					setX(-pixel);
				}, speed);
			}
			break;
		case 'd':
			if(keyBlock !== 'a'){
				arrowPress('d');
				clearInterval(keyPress);
				keyBlock = 'd';
				keyPress = setInterval(() => {
					setX(pixel);
				}, speed);
			}
			break;
		case 'arrowup':
			if(keyBlock !== 's'){
				arrowPress('w');
				clearInterval(keyPress);
				keyBlock = 'w';
				keyPress = setInterval(() => {
					setY(-pixel);
				}, speed);
			}
			break;
		case 'arrowdown':
			if(keyBlock !== 'w'){
				arrowPress('s');
				clearInterval(keyPress);
				keyBlock = 's'
				keyPress = setInterval(() => {
					setY(pixel);
				}, speed);
			}
			break;
		case 'arrowleft':
			if(keyBlock !== 'd'){
				arrowPress('a');
				clearInterval(keyPress);
				keyBlock = 'a';
				keyPress = setInterval(() => {
					setX(-pixel);
				}, speed);
			}
			break;
		case 'arrowright':
			if(keyBlock !== 'a'){
				arrowPress('d');
				clearInterval(keyPress);
				keyBlock = 'd';
				keyPress = setInterval(() => {
					setX(pixel);
				}, speed);
			}
			break;
	}		
}
function setY(value){
	Y = parseInt(window.getComputedStyle(obj).getPropertyValue('top'));
	if((Y <= -1 || Y >= 271) || (X <= -1 || X >= 351)){
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
	if((X <= -1 || X >= 351) || (Y <= -1 || Y >= 271)){
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
	document.querySelectorAll('.container .body').forEach((item)=>{
		let index = item.getAttribute('data-item')
		item.style.left = `${array[parseInt(index)-1].x}px`;
		item.style.top = `${array[parseInt(index)-1].y}px`;
	})
}
function itemRamdom(item){
	count++;
	let x = (Math.floor(Math.random() * (35-1)) + 1)*10;
	let y = (Math.floor(Math.random() * (27-1)) + 1)*10;
	item.x = x;
	item.y = y;
	document.querySelector('.item').style.top = `${item.y}px`;
	document.querySelector('.item').style.left = `${item.x}px`;
	//speedUp(2); desativado por enquanto
	score(count);
}
function score(count){
	document.querySelector('.score span').innerText = count;
	updateBody()
}
function updateBody(){
	obj2 = document.querySelector('.body').cloneNode(true);
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
/*almenta a velocidade
function speedUp(spd){
	if(speed >= 35){
		speed -= spd;
		console.log(speed);
	}
}*/
function arrowPress(arrow){
	if(typeof arrow !== 'string'){
		arrow = arrow.currentTarget.getAttribute('data');
	}
	if(document.querySelector('.direction.arrow--press')){
		document.querySelector('.direction.arrow--press').classList.remove('arrow--press');
	}
	switch(arrow){
		case 'w':
			document.querySelector('.direction.top').classList.add('arrow--press');
			document.querySelector('.center').style.borderColor = '#585858' 
			document.querySelector('.center').style.borderTopColor = '#6E6E6E' 
			break;
		case 's':
			document.querySelector('.direction.bottom').classList.add('arrow--press');
			document.querySelector('.center').style.borderColor = '#585858' 
			document.querySelector('.center').style.borderBottomColor = '#6E6E6E' 
			break;
		case 'a':
			document.querySelector('.direction.left').classList.add('arrow--press');
			document.querySelector('.center').style.borderColor = '#585858' 
			document.querySelector('.center').style.borderLeftColor = '#6E6E6E' 
			break;
		case 'd':
			document.querySelector('.direction.right').classList.add('arrow--press');
			document.querySelector('.center').style.borderColor = '#585858' 
			document.querySelector('.center').style.borderRightColor = '#6E6E6E' 
			break;
	}		
}
function buttonPress(e){
	let elem = e.currentTarget;
	if(document.querySelector('.button.press')){
		document.querySelector('.button.press').classList.remove('press')
	}
	elem.classList.add('press');
	switch(elem.innerHTML){
		case 'Y':
			document.querySelector('.obj').style.backgroundColor = '#F7FE2E';
			document.querySelector('.container').style.backgroundColor = '#585858';
			document.querySelector('.container').style.backgroundColor = '#585858';
			document.querySelectorAll('.body').forEach((body)=>{
				body.style.backgroundColor = '#F7FE2E';
			})
			break;
		case 'R':
			document.querySelector('.obj').style.backgroundColor = '#DF0101';
			document.querySelector('.container').style.backgroundColor = '#E6E6E6';
			document.querySelectorAll('.body').forEach((body)=>{
				body.style.backgroundColor = '#DF0101';
			})
			break;
		case 'G':
			document.querySelector('.obj').style.backgroundColor = '#04B404';
			document.querySelector('.container').style.backgroundColor = '#585858';
			document.querySelectorAll('.body').forEach((body)=>{
				body.style.backgroundColor = '#04B404';
			})
			break;
		case 'B':
			document.querySelector('.obj').style.backgroundColor = '#0404B4';
			document.querySelector('.container').style.backgroundColor = '#E6E6E6';
			document.querySelectorAll('.body').forEach((body)=>{
				body.style.backgroundColor = '#0404B4';
			})
			break;
	}
}
