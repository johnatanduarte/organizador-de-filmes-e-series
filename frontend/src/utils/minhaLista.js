const CHAVE_STORAGE = "minhaLista";

export function obterLista() {
  return JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
}

export function estaNaLista(id) {
  const lista = obterLista();
  return lista.some((filme) => filme.id === id);
}

export function adicionarNaLista(filmeData) {
  const lista = obterLista();

  const filmeExiste = lista.some((filme) => filme.id === filmeData.id);

  if (filmeExiste) {
    alert("Esse filme já está na sua lista!");
    return false;
  }

  lista.push(filmeData);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  alert("Filme adicionado!");
  return true;
}

export function removerDaLista(id) {
  const lista = obterLista();
  const novaLista = lista.filter((filme) => filme.id !== id);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
}