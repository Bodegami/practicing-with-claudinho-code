# No terminal

- **claude** = Abre o janela do claude code

- **/model** = Lista os modelos disponiveis do claude 

- **/config** = Lista as configurações disponiveis

- **/config/thinking mode = true** = Thinking mode True utiliza uma parte de sua janela de contexto que fica responsavel por revisar o que foi solicitado. Basicamente, o agente não sai executando a solicitação do usuário diretamente, primeiro ele executa a ação, depois revisa e for fim devolve a resposta para o usuário.
Obs: Isso impacta num consumo maior da janela de contexto e também no aumento no tempo de resposta.

- **Repositorio** = Sempre que na IDE acessamos um diretorio especifico e abrimos o claude code, ele cria uma sessao desse repositorio que armazena todo historico de interações, consumo de tokens e etc.
Isso também implica no armazenamento de estado da janela de contexto.

- **/clear** = Limpa a janela de contexto.

- **/resume** = Traz um resumo de todas as sessões do projeto.

- **CTRL + R** = Depois de usar o /resume e visualizar a lista de sessões, você pode renomear uma sessão usando o CTRL + R

- **/init** = Cria um arquivo de instruções CLAUDE.md

- **/init <DESCRIPTION>** = Cria um arquivo de instruções CLAUDE.md com as instruções ou descrições que foram enviadas.

- **SHIFT + TAB (no terminal)** = Alterna entre o modo de edição e o mode de planejamento.
O mode edição o Claude code vai apenas te solicitando as permissões para executar os comandos e o modo de planejamento permite que ele crie um plano de ação que você possa revisar/alterar antes da sua execução.
OBS: Quando passamos uma instrução com o "PLAN MODE ON", o Claude delega a execução para um SubAgente, que quebra em três etapas: EXPLORE, PLAN e TASK OUTPUT.
Esse SubAgente tem a sua propria janela de contexto, ou seja, quando esse sub agente faz a varredura no código para propor as alterações, ele está consumindo a sua própria janela de contexto, de forma que não comprometa a janela de contexto do Claude Code que usamos inicialmente.
Dessa forma é como se o Claude Code que passamos as instruções iniciais, delegasse para um outro agente o entendimento e a execução.
Obs2: Mesmo que o modelo definido seja o Haiku, quando estamos com o PLAN MODE ON, o Claude tem autonomia para usar outro modelo que tenha uma melhor capacidade de planejamento, geralmente do Sonnet para cima.

- **CTRL + B (no terminal)** = Após o Claude Code gerar um plan no terminal, é possível acessar e editar o mesmo com CTRL+B, ou CTRL + click do mouse em cima do nome do arquivo descrito no terminal.
Dessa forma podemos revisar e ajustar o plano antes da execução.

- **Após gerar o Plan** = Logo após gerar o Plan, o Claude code nos dá algumas opções.
A primiera "Yes, clear context and auto-accept edits (shift + tab)", indica que eu aceito o plano de ação criado e que o sub agente pode limpar sua própria janela de contexto.
A segunda "Yes, auto-accept edits", indica que eu aceito o plano de ação e que eu quero manter a janela de contexto do sub agente como está.
Geralmente, usamos a primeira opção para tarefas simples, ou quando estamos 100% de acordo com o plan. Caso fosse necessário explorar um pouco mais, ou ajustar algum ponto ou outro, a segunda opção seria mais interessante, pois ele manteria seu contexto e suas analises previas.
É importante ter em mente que caso tenha explorado o Claude com uma serie de perguntas antes de gerar o plan, talvez seja interessante limpar a janela de contexto para evitar o risco de ambiguidades e alucionamentos.

- **/context** = Traz todas informações referentes a sua janela de contexto.
Desde o percentual de consumo de tokens, system prompts, system tools, skills, mcp e etc.
Note que mesmo sem usar MCPs e Skills, há um pequeno consumo de memória, isso ocorre porque o Claude precisa conhecer e identificar essas funcionalidades, e com isso ele ocupa um pouco da sua memória da janela de contexto.
O Autocompact, tem como finalidade identificar quando a janela de contexto está ficando cheia. Quando isso ocorre, para não perder mensagens ou histórico, o claude faz um resumo e limpa sua janela de contexto. O problema é que com isso ele acaba perdendo informação.

- **/rewind** = Permite voltar a uma interação anterior. 
Digamos que no primeiro prompt eu pedi a criação de uma página e ela foi criada com sucesso.
Depois eu mando um prompt pedindo para alterar o titulo e o mesmo é alterado.
Caso eu me arrependa e queira voltar essa ação, eu posso usar o rewind para voltar ao ponto anterior da conversa, ou voltar ao ponto anterior da conversa e do codigo, apenas restaurar o codigo ou gerar um resumo do que foi feito até aquele ponto.
Obs: Caso já tenha sido feito o git commit ou algo do tipo, o claude code não consegue alterar mais esse arquivo.

- **/fork <NAME>** = Cria uma ramificação a partir de uma sessão.
Assim como o git, o fork permite que, dado que eu estou numa sessão, eu crie uma "branch" dessa minha sessão.
Com isso eu posso trabalhar em cima do meu fork, que qualquer problema, eu volto para sessão original sem alterar nada.
Veja que essa funcionalidade é diferente do Rewind. O Rewind volta a um ponto anterior na sessão em que você estava. O fork cria um clone da sua sessão e permite que você trabalhe em cima dela sem afetar a sessão original.

- **paste** = O terminal do claude code aceita arquivos, para isso basta colar o arquivo no terminal.

**/chrome** = O claude pode trabalhar com o com Chrome através de extensões disponibilizadas pela própria Anthropic. 
Essa funcionalidade nos permite executar testes, validar as informações do console e etc, utilizando o claude code.
Isso é excelente para testes de frontend ou E2E.