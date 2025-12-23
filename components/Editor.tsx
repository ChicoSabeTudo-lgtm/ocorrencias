
import React from 'react';
import { OccurrenceData } from '../types';
import { Type, Image, Settings, Layers, AlertCircle, Maximize2, RotateCw, Trash2, CheckCircle2, Move } from 'lucide-react';

interface EditorProps {
  data: OccurrenceData;
  onChange: (newData: OccurrenceData) => void;
}

const Editor: React.FC<EditorProps> = ({ data, onChange }) => {
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof OccurrenceData) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm('Deseja remover a logomarca salva?')) {
      onChange({ ...data, logoStripPhoto: null });
    }
  };

  const PhotoControls = ({ 
    zoomField, 
    rotateField,
    xField,
    yField
  }: { 
    zoomField: 'mainPhotoScale' | 'bottomPhotoScale', 
    rotateField: 'mainPhotoRotate' | 'bottomPhotoRotate',
    xField: 'mainPhotoTranslateX' | 'bottomPhotoTranslateX',
    yField: 'mainPhotoTranslateY' | 'bottomPhotoTranslateY'
  }) => (
    <div className="mt-3 p-3 bg-slate-100 rounded-xl space-y-3 shadow-inner">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
              <Maximize2 size={10} /> Zoom
            </label>
            <span className="text-[9px] font-bold text-slate-600">{data[zoomField].toFixed(1)}x</span>
          </div>
          <input 
            type="range" min="1" max="4" step="0.1" 
            value={data[zoomField]} 
            onChange={(e) => onChange({...data, [zoomField]: parseFloat(e.target.value)})}
            className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#736d66]" 
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
              <RotateCw size={10} /> Girar
            </label>
            <span className="text-[9px] font-bold text-slate-600">{data[rotateField]}°</span>
          </div>
          <input 
            type="range" min="0" max="360" step="1" 
            value={data[rotateField]} 
            onChange={(e) => onChange({...data, [rotateField]: parseInt(e.target.value)})}
            className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#736d66]" 
          />
        </div>
      </div>

      <div className="space-y-3 pt-2 border-t border-slate-200">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
              <Move size={10} className="rotate-90" /> Horizontal (Esq/Dir)
            </label>
            <span className="text-[9px] font-bold text-slate-600">{data[xField]}%</span>
          </div>
          <input 
            type="range" min="-100" max="100" step="1" 
            value={data[xField]} 
            onChange={(e) => onChange({...data, [xField]: parseInt(e.target.value)})}
            className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#736d66]" 
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
              <Move size={10} /> Vertical (Sub/Des)
            </label>
            <span className="text-[9px] font-bold text-slate-600">{data[yField]}%</span>
          </div>
          <input 
            type="range" min="-100" max="100" step="1" 
            value={data[yField]} 
            onChange={(e) => onChange({...data, [yField]: parseInt(e.target.value)})}
            className="w-full h-1 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#736d66]" 
          />
        </div>
        <button 
          onClick={() => onChange({...data, [xField]: 0, [yField]: 0, [zoomField]: 1, [rotateField]: 0})}
          className="w-full py-1 text-[8px] font-black text-slate-400 hover:text-slate-600 uppercase transition-colors text-center"
        >
          Resetar Ajustes da Foto
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-6">
      {/* Seção de Logomarca */}
      <section className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-blue-600" />
            <h3 className="font-black text-slate-800 uppercase text-xs tracking-wider">1. Logomarca do Rodapé</h3>
          </div>
          {data.logoStripPhoto ? (
            <div className="flex items-center gap-2">
               <span className="flex items-center gap-1 text-[9px] font-black text-emerald-600 uppercase">
                 <CheckCircle2 size={12} /> Salva
               </span>
               <button 
                 onClick={removeLogo}
                 className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                 title="Remover Logomarca"
               >
                 <Trash2 size={14} />
               </button>
            </div>
          ) : (
             <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 animate-pulse">
               <AlertCircle size={12} /> OBRIGATÓRIO
             </span>
          )}
        </div>
        <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-blue-200 border-dashed rounded-xl cursor-pointer bg-white hover:bg-blue-100 transition-all overflow-hidden relative group">
          {data.logoStripPhoto ? (
            <div className="relative w-full h-full group">
              <img src={data.logoStripPhoto} className="w-full h-full object-contain p-2" alt="Logo Strip" />
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="bg-white text-blue-600 text-[9px] font-black px-3 py-1 rounded-full shadow-lg">CLIQUE PARA TROCAR</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <Image className="w-6 h-6 text-blue-400" />
              <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest">Enviar Imagem da Logomarca</p>
            </div>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'logoStripPhoto')} />
        </label>
      </section>

      {/* Seção de Texto */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Type size={18} className="text-[#736d66]" />
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-wider">2. Textos do Relatório</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1">Título (Faixa Cinza)</label>
            <textarea
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#736d66] outline-none font-black text-slate-700 min-h-[70px] uppercase text-sm"
              value={data.mainTitle}
              onChange={(e) => onChange({ ...data, mainTitle: e.target.value.toUpperCase() })}
              placeholder="EX: RONDESP NORDESTE APREENDE ARMA DE FOGO"
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1">Descrição (Faixa Preta)</label>
            <textarea
              className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#736d66] outline-none text-slate-600 min-h-[90px] text-sm leading-relaxed"
              value={data.subTitle}
              onChange={(e) => onChange({ ...data, subTitle: e.target.value })}
              placeholder="Descreva a ação policial detalhadamente..."
            />
          </div>
        </div>
      </section>

      {/* Seção de Fotos */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Image size={18} className="text-[#736d66]" />
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-wider">3. Fotos de Fundo</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
             <input 
               type="checkbox" 
               id="samePhoto"
               checked={data.useSamePhoto}
               onChange={(e) => onChange({...data, useSamePhoto: e.target.checked})}
               className="w-4 h-4 text-[#736d66] border-slate-300 rounded focus:ring-[#736d66]"
             />
             <label htmlFor="samePhoto" className="text-xs text-slate-500 font-bold uppercase cursor-pointer">
               Uma única foto para o fundo todo
             </label>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1">Foto Superior (Fundo)</label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all overflow-hidden relative group">
                {data.mainPhoto ? (
                  <img src={data.mainPhoto} className="w-full h-full object-cover" alt="Superior" />
                ) : (
                  <div className="text-center p-2">
                    <Image className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Enviar Foto</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'mainPhoto')} />
              </label>
              {data.mainPhoto && <PhotoControls zoomField="mainPhotoScale" rotateField="mainPhotoRotate" xField="mainPhotoTranslateX" yField="mainPhotoTranslateY" />}
            </div>

            {!data.useSamePhoto && (
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1.5 ml-1">Foto Inferior (Fundo)</label>
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all overflow-hidden relative group">
                  {data.bottomPhoto ? (
                    <img src={data.bottomPhoto} className="w-full h-full object-cover" alt="Inferior" />
                  ) : (
                    <div className="text-center p-2">
                      <Image className="w-6 h-6 mx-auto mb-1 text-slate-400" />
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Enviar Foto</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handlePhotoUpload(e, 'bottomPhoto')} />
                </label>
                {data.bottomPhoto && <PhotoControls zoomField="bottomPhotoScale" rotateField="bottomPhotoRotate" xField="bottomPhotoTranslateX" yField="bottomPhotoTranslateY" />}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ajustes de Fontes */}
      <section className="bg-slate-900 p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={18} className="text-slate-400" />
          <h3 className="font-black text-white uppercase text-xs tracking-wider">Tamanhos de Fonte</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[9px] font-black text-slate-500 uppercase">Título</label>
              <span className="text-[10px] font-black text-white">{data.titleFontSize}px</span>
            </div>
            <input type="range" min="20" max="80" value={data.titleFontSize} onChange={(e) => onChange({...data, titleFontSize: parseInt(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-[9px] font-black text-slate-500 uppercase">Descrição</label>
              <span className="text-[10px] font-black text-white">{data.subTitleFontSize}px</span>
            </div>
            <input type="range" min="12" max="48" value={data.subTitleFontSize} onChange={(e) => onChange({...data, subTitleFontSize: parseInt(e.target.value)})} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-white" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Editor;
