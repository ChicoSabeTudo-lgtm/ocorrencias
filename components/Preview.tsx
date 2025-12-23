
import React from 'react';
import { OccurrenceData } from '../types';

interface PreviewProps {
  data: OccurrenceData;
}

const Preview: React.FC<PreviewProps> = ({ data }) => {
  const bPhoto = data.useSamePhoto ? data.mainPhoto : data.bottomPhoto;
  
  const mainTransform = `scale(${data.mainPhotoScale}) rotate(${data.mainPhotoRotate}deg) translate(${data.mainPhotoTranslateX}%, ${data.mainPhotoTranslateY}%)`;
  
  const bottomTransform = data.useSamePhoto 
    ? `scale(${data.mainPhotoScale}) rotate(${data.mainPhotoRotate}deg) translate(${data.mainPhotoTranslateX}%, ${data.mainPhotoTranslateY}%)`
    : `scale(${data.bottomPhotoScale}) rotate(${data.bottomPhotoRotate}deg) translate(${data.bottomPhotoTranslateX}%, ${data.bottomPhotoTranslateY}%)`;

  // Cores extraídas do template oficial
  const grayBandColor = '#736d66';
  const blackBandColor = '#1a171b';

  return (
    <div id="capture-area" className="w-full bg-white relative overflow-hidden" style={{ aspectRatio: '1 / 1.28' }}>
      
      {/* CAMADA 1: FOTOS (Camada de fundo que ocupa 100% da altura total) */}
      <div className="absolute inset-0 z-0 flex flex-col">
        {/* Foto Superior */}
        <div className="flex-[1] w-full overflow-hidden bg-slate-100 border-b border-white/10 relative">
          {data.mainPhoto ? (
            <img 
              src={data.mainPhoto} 
              className="w-full h-full object-cover transition-transform duration-200 ease-out" 
              style={{ transform: mainTransform }}
              alt="Fundo Superior" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300 font-black text-4xl tracking-widest opacity-20 uppercase text-center p-4">FOTO SUPERIOR</div>
          )}
        </div>
        
        {/* Foto Inferior */}
        <div className="flex-[1] w-full overflow-hidden bg-slate-200 relative">
          {bPhoto ? (
            <img 
              src={bPhoto} 
              className="w-full h-full object-cover transition-transform duration-200 ease-out" 
              style={{ transform: bottomTransform }}
              alt="Fundo Inferior" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400 font-black text-4xl tracking-widest opacity-20 uppercase text-center p-4">FOTO INFERIOR</div>
          )}
        </div>
      </div>

      {/* CAMADA 2: TEMPLATE (Elementos de texto e logos sobrepostos) */}
      <div className="relative z-10 h-full w-full flex flex-col">
        
        {/* Espaçador Superior (Área limpa para a foto superior) */}
        <div className="flex-[3] w-full"></div>

        {/* Faixa Cinza - Título */}
        <div 
          style={{ backgroundColor: grayBandColor }} 
          className="py-10 px-8 flex items-center justify-center min-h-[16%] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border-y border-white/10"
        >
          <h2 
            className="text-white font-black text-center leading-[1.05] tracking-tight whitespace-pre-line uppercase drop-shadow-lg" 
            style={{ 
              fontFamily: "'Hind', sans-serif",
              fontSize: `${data.titleFontSize}px`,
            }}
          >
            {data.mainTitle || ""}
          </h2>
        </div>

        {/* Faixa Preta - Descrição */}
        <div 
          style={{ backgroundColor: blackBandColor }} 
          className="py-7 px-12 flex items-center justify-center min-h-[12%] shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
        >
          <p 
            className="text-white font-medium text-center leading-snug tracking-wide drop-shadow-sm" 
            style={{ 
              fontFamily: "'Hind', sans-serif",
              fontSize: `${data.subTitleFontSize}px`
            }}
          >
            {data.subTitle || ""}
          </p>
        </div>

        {/* Área Inferior - Totalmente transparente para mostrar a foto de fundo até o final */}
        <div className="flex-[3] w-full flex flex-col justify-end">
          
          {/* FAIXA DE LOGOMARCAS (No extremo rodapé) */}
          <div className="w-full px-4 h-24 flex items-center justify-center bg-transparent">
            {data.logoStripPhoto ? (
              <img 
                src={data.logoStripPhoto} 
                className="w-full h-full object-contain" 
                alt="Logomarcas Institucionais" 
              />
            ) : (
              <div className="w-full h-full border-2 border-dashed border-white/30 rounded-lg flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm p-2">
                <p className="text-[9px] text-white font-black uppercase tracking-widest text-center drop-shadow-md">
                  ⚠️ Carregue a logomarca no painel lateral
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Preview;
