import { useState } from "react";
import "./App.css";

const jogadoresIniciais = [
  { id: 1, nome: "Vinícius Júnior", time: "Real Madrid", posicao: "Atacante", votos: 0 },
  { id: 2, nome: "Erling Haaland", time: "Manchester City", posicao: "Centroavante", votos: 0 },
  { id: 3, nome: "Lionel Messi", time: "Inter Miami", posicao: "Meia atacante", votos: 0 },
  { id: 4, nome: "Kylian Mbappé", time: "Real Madrid", posicao: "Atacante", votos: 0 },
  { id: 5, nome: "Lamine Yamal", time: "Barcelona", posicao: "Ponta direita", votos: 0 },
  { id: 6, nome: "Jude Bellingham", time: "Real Madrid", posicao: "Meio-campista", votos: 0 }
];

function App() {
  const [jogadores, setJogadores] = useState(jogadoresIniciais);
  const [ordenar, setOrdenar] = useState(false);

  function alterarVoto(id, delta) {
    setJogadores((atuais) =>
      atuais.map((jogador) =>
        jogador.id === id
          ? { ...jogador, votos: Math.max(0, jogador.votos + delta) }
          : jogador
      )
    );
  }

  function zerarVotacao() {
    setJogadores(jogadoresIniciais);
  }

  const totalVotos = jogadores.reduce((soma, j) => soma + j.votos, 0);
  const maiorVoto = Math.max(...jogadores.map((j) => j.votos));
  const lider = jogadores.find((j) => j.votos === maiorVoto && j.votos > 0);

  const listaExibida = ordenar
    ? [...jogadores].sort((a, b) => b.votos - a.votos)
    : jogadores;

  return (
    <div className="app-shell">
      <header className="cabecalho">
        <p className="eyebrow">⚽ Craque da Rodada</p>
        <h1>Quem foi o melhor em campo?</h1>
        <p className="subtitulo">
          Escolha o jogador que mais brilhou na rodada e acompanhe o ranking em tempo real.
        </p>
      </header>

      <div className="painel-estatisticas">
        <div className="estatistica">
          <span className="label">Total de votos</span>
          <strong>{totalVotos}</strong>
        </div>
        <div className="estatistica">
          <span className="label">Craque da rodada</span>
          <strong>{lider ? lider.nome : "Sem votos"}</strong>
        </div>
      </div>

      <div className="acoes">
        <button className="botao-secundario" onClick={() => setOrdenar(!ordenar)}>
          {ordenar ? "Ordem original" : "Ordenar por votos"}
        </button>
        <button
          className="botao-secundario perigo"
          onClick={zerarVotacao}
          disabled={totalVotos === 0}
        >
          Zerar votação
        </button>
      </div>

      <ul className="lista-jogadores">
        {listaExibida.map((jogador) => {
          const estaEmLideranca = jogador.votos === maiorVoto && jogador.votos > 0;
          const porcentagem = totalVotos
            ? Math.round((jogador.votos / totalVotos) * 100)
            : 0;

          return (
            <li
              key={jogador.id}
              className={`jogador-item ${estaEmLideranca ? "lider" : ""}`}
            >
              <div className="jogador-header">
                <span className="time-badge">{jogador.time}</span>
                {estaEmLideranca && <span className="status-lider">🏆 Craque</span>}
              </div>

              <div className="jogador-main">
                <div className="jogador-info">
                  <span className="numero-jogador">#{jogador.id}</span>
                  <h2>{jogador.nome}</h2>
                  <p>{jogador.posicao}</p>
                </div>

                <div className="jogador-votos">
                  <span className="valor-votos">{jogador.votos}</span>
                  <small>votos · {porcentagem}%</small>
                </div>
              </div>

              <div className="barra">
                <div className="barra-preenchida" style={{ width: `${porcentagem}%` }} />
              </div>

              <div className="botoes-voto">
                <button className="botao-votar" onClick={() => alterarVoto(jogador.id, 1)}>
                  Votar
                </button>
                <button
                  className="botao-remover"
                  onClick={() => alterarVoto(jogador.id, -1)}
                  disabled={jogador.votos === 0}
                  aria-label={`Remover um voto de ${jogador.nome}`}
                >
                  −1
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <footer className="rodape">
        <p>Votação interativa · Atualizada em tempo real</p>
      </footer>
    </div>
  );
}

export default App;
