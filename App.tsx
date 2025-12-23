
import React, { useState, useRef, useEffect } from 'react';
import { OccurrenceData } from './types';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { Download, ShieldCheck, Image as ImageIcon } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<OccurrenceData>(() => {
    // Tenta carregar a logomarca salva anteriormente
    const savedLogo = localStorage.getItem('pmba_saved_logo');
    
    return {
      mainTitle: '',
      subTitle: '',
      unidade: '',
      mainPhoto: null,
      mainPhotoScale: 1,
      mainPhotoRotate: 0,
      mainPhotoTranslateX: 0,
      mainPhotoTranslateY: 0,
      bottomPhoto: null,
      bottomPhotoScale: 1,
      bottomPhotoRotate: 0,
      bottomPhotoTranslateX: 0,
      bottomPhotoTranslateY: 0,
      logoStripPhoto: savedLogo || null,
      useSamePhoto: true,
      titleFontSize: 46,
      subTitleFontSize: 24,
    };
  });

  const previewRef = useRef<HTMLDivElement>(null);

  // Efeito para salvar a logomarca automaticamente quando alterada
  useEffect(() => {
    if (data.logoStripPhoto) {
      localStorage.setItem('pmba_saved_logo', data.logoStripPhoto);
    } else {
      localStorage.removeItem('pmba_saved_logo');
    }
  }, [data.logoStripPhoto]);

  const handleDownload = () => {
    if (!previewRef.current) return;
    alert('Pronto! Use a função de Captura de Tela ou Print para salvar a imagem final.');
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center p-4 md:p-8">
      {/* Cabeçalho */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-[#1a171b] p-3 rounded-2xl shadow-lg border-2 border-slate-700">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">GERADOR DE OCORRÊNCIAS</h1>
            <div className="flex items-center gap-2">
               <span className="h-1 w-1 bg-red-600 rounded-full animate-pulse"></span>
               <p className="text-[10px] text-slate-500 font-black tracking-[3px] uppercase">Template Oficial PMBA</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleDownload}
            className="group flex items-center gap-3 bg-[#736d66] hover:bg-[#5a5550] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl hover:shadow-[#736d66]/20 active:scale-95"
          >
            <Download size={18} />
            Salvar Arte Final
          </button>
        </div>
      </header>

      {/* Área Principal */}
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Painel de Controle */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <Editor data={data} onChange={setData} />
        </div>

        {/* Pré-visualização */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
          <div className="w-full max-w-[580px] sticky top-8">
            <div className="mb-4 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Preview</h2>
              </div>
              {!data.logoStripPhoto && (
                 <span className="text-[9px] bg-red-100 text-red-600 px-3 py-1 rounded-full font-black uppercase tracking-tighter">Falta Logomarca</span>
              )}
            </div>
            
            <div ref={previewRef} className="shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden bg-white border border-slate-200">
              <Preview data={data} />
            </div>

            <div className="mt-8 flex gap-4 p-5 bg-white rounded-3xl border border-slate-200 shadow-sm items-center">
               <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                  <ImageIcon size={24} />
               </div>
               <div>
                  <h4 className="font-black text-slate-800 text-xs uppercase tracking-wide">Instruções de Uso</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    1. Envie a <b>logomarca</b> (ela ficará salva no seu navegador).<br/>
                    2. Envie as <b>fotos</b> e use os controles para <b>posicionar, dar zoom e girar</b>.<br/>
                    3. Clique em <b>Salvar Arte Final</b>.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-20 text-slate-400 text-[10px] font-black uppercase tracking-[5px] pb-10 flex flex-col items-center gap-2">
        <div className="h-[1px] w-20 bg-slate-300 mb-2"></div>
        SEGURANÇA PÚBLICA • BAHIA
      </footer>
    </div>
  );
};

export default App;
