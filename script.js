let listaTarefas = [];

function adicionarTarefa() {
    const novaTarefaElement = document.getElementById('nova-tarefa');
    const tarefa = novaTarefaElement.value.trim();

    if (tarefa !== '') {
        listaTarefas.push(tarefa);
        salvarListaLocalStorage();
        atualizarLista();
        novaTarefaElement.value = '';
    }
}

function removerTarefa(i) {
    listaTarefas.splice(i, 1);
    salvarListaLocalStorage();
    atualizarLista();
}

function editarTarefa(i) {
    const lista = document.getElementById('lista-de-tarefas');
    const itemLista = lista.children[i];
    const tarefa = listaTarefas[i];

    itemLista.innerHTML = `
    <input type="text" class="form-control mr-2" value="${tarefa}" id="editar-tarefa-${i}">
    <button class="btn btn-sm btn-outline-success" onclick="salvarTarefa(${i})"><img src="img/salvar.svg" alt="Salvar" /></button>
    <button class="btn btn-sm btn-outline-secondary" onclick="atualizarLista()"><img src="img/cancelar.svg" alt="Cancelar" /></button>
  `;
}

function salvarTarefa(i) {
    const inputEditarTarefaElement = document.querySelector(`#editar-tarefa-${i}`);
    const tarefa = inputEditarTarefaElement.value.trim();

    if (tarefa !== '') {
        listaTarefas[i] = tarefa;
        salvarListaLocalStorage();
        atualizarLista();
    }
}

function atualizarLista() {
    const listaElement = document.getElementById('lista-de-tarefas');
    listaElement.innerHTML = '';

    listaTarefas.forEach((tarefa, i) => {
        const itemLista = document.createElement('li');
        itemLista.className = 'list-group-item d-flex justify-content-between align-items-center';
        itemLista.innerHTML = `${tarefa}
      <div>
        <button class="btn btn-sm btn-outline-primary mr-2" onclick="editarTarefa(${i})"><img src="img/editar.svg" alt="editar" /></button>
        <button class="btn btn-sm btn-outline-danger" onclick="removerTarefa(${i})"><img src="img/remover.svg" alt="remover" /></button>
      </div>`;
        listaElement.appendChild(itemLista);
    });
}

function salvarListaLocalStorage() {
    localStorage.setItem('listaTarefas', JSON.stringify(listaTarefas));
}

function carregarListaLocalStorage() {
    const listaLocalStorage = JSON.parse(localStorage.getItem('listaTarefas'));

    if (listaLocalStorage !== null) {
        listaTarefas = listaLocalStorage;
        atualizarLista();
    }
}

carregarListaLocalStorage();

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();
    adicionarTarefa();
});