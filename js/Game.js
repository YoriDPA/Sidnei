/**
 * Game.js
 * Este arquivo gerencia todos os componentes do jogo, como o jogador,
 * as cobras controladas por IA e a comida.
 */

class Game {
    constructor(canvasWidth, canvasHeight) {
        // --- CONFIGURAÇÕES DO MAPA ---
        // Aqui você pode alterar o tamanho do mundo do jogo.
        // Aumentei os valores para o dobro do tamanho original.
        this.worldWidth = 8000; // O valor original era provavelmente 4000
        this.worldHeight = 4000; // O valor original era provavelmente 2000

        // Dimensões do canvas (a área visível do jogo)
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // --- COMPONENTES DO JOGO ---
        // Inicializa o jogador. Supondo que a classe 'Snake' aceite
        // a posição inicial, cor e nome.
        this.player = new Snake(this.worldWidth / 2, this.worldHeight / 2, 'blue', 'Player');

        // Listas para guardar as outras cobras e a comida
        this.aiSnakes = [];
        this.foods = [];

        // --- CONFIGURAÇÕES DE JOGO ---
        this.numAiSnakes = 20; // Aumente este número se o mapa parecer vazio
        this.numFoods = 200;   // Aumente este número também para preencher o mapa
    }

    /**
     * Inicia o jogo, criando as cobras de IA e a comida.
     */
    init() {
        // Cria as cobras controladas por IA em posições aleatórias
        for (let i = 0; i < this.numAiSnakes; i++) {
            const randomX = Math.random() * this.worldWidth;
            const randomY = Math.random() * this.worldHeight;
            const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Gera uma cor aleatória
            
            // Supondo que a classe 'SnakeAI' exista no arquivo snakeai.js
            this.aiSnakes.push(new SnakeAI(randomX, randomY, randomColor, `Bot ${i}`));
        }

        // Gera a comida em posições aleatórias
        for (let i = 0; i < this.numFoods; i++) {
            const randomX = Math.random() * this.worldWidth;
            const randomY = Math.random() * this.worldHeight;

            // Supondo que a classe 'Food' exista no arquivo Food.js
            this.foods.push(new Food(randomX, randomY));
        }
    }

    /**
     * Atualiza o estado de todos os elementos do jogo.
     * @param {object} mousePosition - A posição atual do mouse.
     */
    update(mousePosition) {
        // Atualiza a posição do jogador com base no mouse
        this.player.update(mousePosition);

        // Atualiza todas as cobras de IA
        // A lógica de movimento delas estaria dentro da classe SnakeAI
        this.aiSnakes.forEach(snake => {
            // A IA precisa saber onde está a comida para se mover de forma inteligente
            snake.update(this.foods); 
        });

        // Lógica de colisão, crescimento da cobra, etc.
        // (Esta parte precisaria ser implementada)
    }

    /**
     * Desenha todos os elementos do jogo nos seus respectivos canvases.
     * @param {CanvasRenderingContext2D} snakeCtx - Contexto do canvas das cobras.
     * @param {CanvasRenderingContext2D} foodCtx - Contexto do canvas da comida.
     */
    draw(snakeCtx, foodCtx) {
        // Limpa os canvases antes de desenhar
        snakeCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        foodCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        
        // O truque é desenhar tudo relativo à posição do jogador.
        // O jogador sempre fica no centro da tela.
        const offsetX = this.player.x - this.canvasWidth / 2;
        const offsetY = this.player.y - this.canvasHeight / 2;

        // Desenha o jogador
        this.player.draw(snakeCtx, offsetX, offsetY);

        // Desenha as cobras de IA
        this.aiSnakes.forEach(snake => {
            snake.draw(snakeCtx, offsetX, offsetY);
        });

        // Desenha a comida
        this.foods.forEach(food => {
            food.draw(foodCtx, offsetX, offsetY);
        });
    }
}
