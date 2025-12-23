
export interface OccurrenceData {
  mainTitle: string;
  subTitle: string;
  unidade: string;
  mainPhoto: string | null;
  mainPhotoScale: number;
  mainPhotoRotate: number;
  mainPhotoTranslateX: number;
  mainPhotoTranslateY: number;
  bottomPhoto: string | null;
  bottomPhotoScale: number;
  bottomPhotoRotate: number;
  bottomPhotoTranslateX: number;
  bottomPhotoTranslateY: number;
  logoStripPhoto: string | null;
  useSamePhoto: boolean;
  titleFontSize: number;
  subTitleFontSize: number;
}

export interface Logo {
  id: string;
  name: string;
  url: string;
}
