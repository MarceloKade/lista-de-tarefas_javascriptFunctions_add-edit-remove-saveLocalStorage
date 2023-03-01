// Array com as tarefas
let listaTarefas = [];

// Seleciona o elemento ul da lista de tarefas
const listaTarefasElement = document.querySelector('#lista-de-tarefas');

// Adiciona um evento de clique ao botão adicionar
document.querySelector('#botao-adicionar').addEventListener('click', adicionarTarefa);

// Adiciona um evento de tecla pressionada ao campo de texto
document.querySelector('#nova-tarefa').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

// Adiciona a tarefa à lista
function adicionarTarefa() {
    const inputTarefa = document.querySelector('#nova-tarefa');
    const tarefa = inputTarefa.value.trim();

    if (tarefa !== '') {
        listaTarefas.push(tarefa);
        atualizarLista();
        inputTarefa.value = '';
    }
}

// Remove a tarefa da lista
function removerTarefa(index) {
    listaTarefas.splice(index, 1); // Remove a tarefa do array
    atualizarLista(); // Atualiza a lista de tarefas
}

// Edita a tarefa da lista
function editarTarefa(index) {
    const itemLista = listaTarefasElement.children[index];
    const tarefa = listaTarefas[index];

    itemLista.innerHTML = `
        <input type="text" class="form-control mr-2" value="${tarefa}" id="editar-tarefa-${index}">
        <button class="btn btn-sm btn-outline-success" onclick="salvarTarefa(${index})"><img src="img/salvar.svg" alt="Salvar" /></button>
        <button class="btn btn-sm btn-outline-secondary" onclick="atualizarLista()"><img src="img/cancelar.svg" alt="Cancelar" /></button>
    `;
}

// Salva a tarefa editada
function salvarTarefa(index) {
    const inputEditarTarefa = document.querySelector(`#editar-tarefa-${index}`);
    const tarefa = inputEditarTarefa.value.trim();

    if (tarefa !== '') {
        listaTarefas[index] = tarefa;
        atualizarLista();
    }
}

// Atualiza a lista de tarefas
function atualizarLista() {
    listaTarefasElement.innerHTML = '';

    listaTarefas.forEach((tarefa, index) => {
        const itemLista = document.createElement('li');
        itemLista.className = 'list-group-item d-flex justify-content-between align-items-center';
        itemLista.innerHTML = `${tarefa}
            <div>
                <button class="btn btn-sm btn-outline-primary mr-2" onclick="editarTarefa(${index})"><img src="img/editar.svg" alt="editar" /></button>
                <button class="btn btn-sm btn-outline-danger" onclick="removerTarefa(${index})"><img src="img/remover.svg" alt="remover" /></button>
            </div>`;
        listaTarefasElement.appendChild(itemLista);
    });
}