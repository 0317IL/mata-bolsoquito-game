var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var createBolsoquitoTime = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')
/* Dependendo do nível escolhido pelo usuário vai ter uma variação de tempo, 
dificultando ou facilitando. */
if(nivel === 'normal'){
	createBolsoquitoTime = 1500
}else if(nivel === 'dificil'){
	createBolsoquitoTime = 1000
}else if(nivel === 'chuckNorris'){
	createBolsoquitoTime = 750
} 

//A função serve para se adaptar ao tamanho do browser
function adjustSize(){
	altura = window.innerHeight
	largura = window.innerWidth
}

adjustSize()

/* A função serve para calcular uma posição aleatória para cada Bolsoquito,
excluindo o Bolsoquito(anterior se existir) */

function CalculatePosition(){
	//Remover o bolsoquito anteioro(Se existir)
	if(document.getElementById('bolsoquito')){
		document.getElementById('bolsoquito').remove()

		//Calcula o número de vidas
		if(vidas > 3){
			window.location.href = '../GameOver/index.html'
			
		}else{
			//Modifica a imagem do coração quando uma vida for perdida
			document.getElementById('v' + vidas).src= '../../assets/coracao_vazio.png'
			vidas++
		}

	}

	//Calculo das posições
	var positionX = Math.floor(Math.random() * largura) - 90
	var positionY = Math.floor(Math.random() * altura) - 90

	//Controle de  valores negativos das variáveis
	positionX = positionX < 0 ? 0 : positionX
	positionY = positionY < 0 ? 0 : positionY

	//Modificações dos elementos HTML
	var bolsoquisto = document.createElement('img') //Cria um elemento img
	bolsoquisto.src = '../../assets/bolsoquito.png' //Define o src da imagem
	bolsoquisto.className = randomSize() + ' ' + randomSide() //Aceita o tamanho randomizado para a imagem e a direção
	bolsoquisto.style.left = positionX + 'px' //Recebe a distância da margem esquerda
	bolsoquisto.style.top = positionY + 'px' //Recebe a distância da margem do topo
	bolsoquisto.style.position = 'absolute' //Define a posição do elemento
	bolsoquisto.id = 'bolsoquito' //Define o id do elemento
	bolsoquisto.onclick = function(){ //A função serve para excluir o elemento quando for clicado
		this.remove()
	}

	document.body.appendChild(bolsoquisto) //Adiciona o elemento no HTML
}

//Função para randomizar os tamanhos da imagem
function randomSize(){
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe){
		case 0:
			return 'bolsoquisto'

		case 1:
			return 'bolsoquisto2'

		case 2:
			return 'bolsoquisto3'
	}
}

//A função serve para randomizar a direção da imagem
function randomSide(){
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe){
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'
	}
}

//Serve para cronometrar o tempo do jogo a cada 1000 milissegundos ou 1 segundo
var cronometro = setInterval(function(){
	tempo--

	if(tempo < 0){
		clearInterval(cronometro)
		clearInterval(createBolsoquito)
		window.location.href = '../Winner/index.html' /* Quando o tempo termina o usuário é redirecionado
														para a página informando a vitória. */
	}else
		document.getElementById('cronometro').innerHTML = tempo
}, 1000)


