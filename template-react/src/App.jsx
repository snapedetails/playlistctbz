import React, { useState, useEffect } from 'react';
import { Music, User, Plus, Play, ChevronRight, Eye, Shuffle, Trash2, Sparkles, ArrowLeft, Disc } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState('setup'); // 'setup', 'presentation', 'end'
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Ana Silva', song: 'Bohemian Rhapsody', artist: 'Queen' },
    { id: 2, name: 'Carlos Eduardo', song: 'Evidências', artist: 'Chitãozinho & Xororó' },
    { id: 3, name: 'Mariana Costa', song: 'Levitating', artist: 'Dua Lipa' },
  ]);
  
  const [newName, setNewName] = useState('');
  const [newSong, setNewSong] = useState('');
  const [newArtist, setNewArtist] = useState('');
  
  const [presentationList, setPresentationList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Adicionar novo participante
  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (!newName || !newSong || !newArtist) return;
    
    setParticipants([
      ...participants,
      {
        id: Date.now(),
        name: newName,
        song: newSong,
        artist: newArtist
      }
    ]);
    
    setNewName('');
    setNewSong('');
    setNewArtist('');
  };

  // Remover participante
  const handleRemove = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  // Iniciar a dinâmica
  const startDynamic = (shuffle = false) => {
    if (participants.length === 0) {
      alert("Adicione pelo menos uma pessoa para começar!");
      return;
    }
    
    let list = [...participants];
    if (shuffle) {
      list = list.sort(() => Math.random() - 0.5);
    }
    
    setPresentationList(list);
    setCurrentIndex(0);
    setIsRevealed(false);
    setAppState('presentation');
  };

  // Próxima música
  const nextSlide = () => {
    if (currentIndex < presentationList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsRevealed(false);
    } else {
      setAppState('end');
    }
  };

  // Voltar para a configuração
  const resetApp = () => {
    setAppState('setup');
    setCurrentIndex(0);
    setIsRevealed(false);
  };

  // Renderização da Tela de Configuração
  if (appState === 'setup') {
    return (
      <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-800">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-indigo-600 rounded-full mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Quem é o Dono da Música?</h1>
            <p className="text-lg text-slate-600">Prepare sua dinâmica adicionando a equipe e suas músicas favoritas.</p>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Formulário de Adição */}
            <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center text-slate-800">
                <Plus className="w-5 h-5 mr-2 text-indigo-600" />
                Adicionar Pessoa
              </h2>
              <form onSubmit={handleAddParticipant} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Colega</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Ex: João Souza"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Música Favorita</label>
                  <input 
                    type="text" 
                    value={newSong}
                    onChange={(e) => setNewSong(e.target.value)}
                    placeholder="Ex: Tropa de Elite"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Artista / Banda</label>
                  <input 
                    type="text" 
                    value={newArtist}
                    onChange={(e) => setNewArtist(e.target.value)}
                    placeholder="Ex: Tihuana"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={!newName || !newSong || !newArtist}
                  className="w-full bg-indigo-50 text-indigo-700 font-semibold py-2.5 rounded-lg hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Salvar
                </button>
              </form>
            </div>

            {/* Lista de Participantes */}
            <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center text-slate-800">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />
                  Equipe ({participants.length})
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => startDynamic(false)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Iniciar Ordem Normal
                  </button>
                  <button 
                    onClick={() => startDynamic(true)}
                    className="bg-slate-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-900 transition-colors flex items-center"
                    title="Embaralha a ordem para que até o organizador possa tentar adivinhar!"
                  >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Embaralhar & Iniciar
                  </button>
                </div>
              </div>

              {participants.length === 0 ? (
                <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <Disc className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhuma música adicionada ainda.</p>
                  <p className="text-sm">Use o formulário ao lado para começar.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {participants.map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-100 transition-colors group">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{p.name}</span>
                        <span className="text-sm text-slate-500 flex items-center mt-1">
                          <Music className="w-3 h-3 mr-1" /> {p.song} - <span className="italic ml-1">{p.artist}</span>
                        </span>
                      </div>
                      <button 
                        onClick={() => handleRemove(p.id)}
                        className="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remover"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Renderização da Tela de Apresentação (Slides)
  if (appState === 'presentation') {
    const currentItem = presentationList[currentIndex];
    const progress = ((currentIndex + 1) / presentationList.length) * 100;

    return (
      <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-600/20 blur-[120px] pointer-events-none"></div>

        {/* Header/Progress */}
        <div className="p-6 flex justify-between items-center z-10">
          <button 
            onClick={resetApp}
            className="text-slate-400 hover:text-white flex items-center transition-colors px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Sair
          </button>
          <div className="text-slate-400 font-medium">
            Música {currentIndex + 1} de {presentationList.length}
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full h-1 bg-slate-800 z-10">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 z-10">
          <div className="max-w-3xl w-full text-center">
            
            {/* Informação da Música */}
            <div className="mb-12 transform transition-all duration-700 hover:scale-105">
              <div className="inline-flex items-center justify-center p-6 bg-slate-800/50 rounded-full mb-8 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
                <Disc className={`w-16 h-16 text-indigo-400 ${!isRevealed ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
              </div>
              <h2 className="text-2xl md:text-3xl font-medium text-slate-300 mb-4 uppercase tracking-widest">De quem é essa música?</h2>
              <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400 mb-6 drop-shadow-lg">
                "{currentItem.song}"
              </h1>
              <p className="text-2xl md:text-3xl text-slate-400 italic font-light">
                {currentItem.artist}
              </p>
            </div>

            {/* Área de Revelação */}
            <div className="min-h-[150px] flex flex-col items-center justify-center">
              {!isRevealed ? (
                <button 
                  onClick={() => setIsRevealed(true)}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-full shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:scale-105"
                >
                  <Eye className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                  Revelar Dono da Música
                </button>
              ) : (
                <div className="animate-[bounce_0.5s_ease-out_1]">
                  <p className="text-xl text-slate-400 mb-2">A música favorita é de...</p>
                  <div className="flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-2xl shadow-2xl">
                    <Sparkles className="w-8 h-8 text-yellow-400 mr-4" />
                    <span className="text-4xl md:text-5xl font-bold text-white">{currentItem.name}</span>
                    <Sparkles className="w-8 h-8 text-yellow-400 ml-4" />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Footer Controls */}
        <div className="p-8 flex justify-center z-10">
          <button 
            onClick={nextSlide}
            disabled={!isRevealed}
            className={`flex items-center px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
              isRevealed 
                ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-500 hover:scale-105 shadow-[0_0_20px_rgba(192,38,211,0.4)]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {currentIndex < presentationList.length - 1 ? (
              <>Próxima Música <ChevronRight className="w-6 h-6 ml-2" /></>
            ) : (
              <>Ver Resultados <ChevronRight className="w-6 h-6 ml-2" /></>
            )}
          </button>
        </div>
      </div>
    );
  }

  // Tela Final
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center font-sans text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] pointer-events-none"></div>
      
      <div className="text-center z-10 bg-slate-800/80 backdrop-blur-xl p-12 rounded-3xl border border-slate-700 max-w-2xl w-full shadow-2xl">
        <div className="inline-flex items-center justify-center p-6 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-full mb-8 shadow-lg shadow-indigo-500/30">
          <Music className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">
          Dinâmica Concluída!
        </h1>
        <p className="text-xl text-slate-300 mb-10 leading-relaxed">
          Espero que todos tenham se divertido e descoberto um pouco mais sobre os gostos musicais da equipe.
        </p>
        <button 
          onClick={resetApp}
          className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors shadow-xl hover:scale-105 duration-200"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}