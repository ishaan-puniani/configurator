interface IBetLine {
  idx: number;
  line: Array<number>;
  number: number;
}
interface IReelSet {
  fakereels: Array<Array<string>>;
  initial: Array<Array<string>>;
  reels: Array<Array<string>>;
}

interface IPayout {
  freespins: number;
  multiplier: number;
  number: number;
  type: string;
}

export interface IConfiguration {
  clientId: string; // 'goldcolossals';
  name: string; //'Gold Colossals Basic Game';
  numberOfReels: number; // 5
  symbolsPerReel: number; // 3
  symbols: Array<string>;
  gameModes: Array<string>; //['basic', 'respin', 'freespin'];

  connectedReels: Array<number>;

  dynamicReelLinking: boolean;

  availableLinkableReels: Array<Array<number>>;

  /// Tab 2 reelstes
  availableReelsets: Map<String, IReelSet>;

  /// Tab 3 Game Mode and Reel Set Mapping
  defaultReelset: string;
  reelsetMapping: Map<string, Array<string>>;

  /// Tab 4 Bet lines

  wincalculator: string; // 'betways'| 'betlines';
  betLines: Array<IBetLine>;

  /// Tab 5: Special symbols and features
  wildsymbols: Array<string>; // ['sym1'];
  scattersymbols: Array<string>; // ['sym0'];

  specialFeatures: Array<string>; //

  /// Tab 6 Paytable
  paytable: Map<string, Array<IPayout>>;

  /// Tab 7 special features configuration

  /// Tab 8 publish
  remark: string; //'5x3 slot machine';
}
