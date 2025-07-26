import { Character } from '@/types/disney';
import { CharacterTypeFilter } from '@/types/filters';

// キーワードベースの分類システム
const CLASSIFICATION_KEYWORDS = {
  princess: [
    'princess', 'queen', 'belle', 'cinderella', 'ariel', 'snow white', 'aurora', 'sleeping beauty',
    'jasmine', 'pocahontas', 'mulan', 'tiana', 'rapunzel', 'merida', 'moana', 'elsa', 'anna', 'raya'
  ],
  villain: [
    'jafar', 'maleficent', 'ursula', 'scar', 'captain hook', 'evil queen', 'cruella', 'hades',
    'frollo', 'gaston', 'dr. facilier', 'mother gothel', 'hans', 'tamatoa', 'lotso', 'emperor zurg',
    'syndrome', 'auto', 'clayton', 'shan yu', 'ratigan', 'bill sykes', 'mcleach'
  ],
  animal: [
    'simba', 'nala', 'timon', 'pumbaa', 'zazu', 'rafiki', 'mufasa', 'shenzi', 'banzai', 'ed',
    'bambi', 'thumper', 'flower', 'faline', 'great prince', 'lady', 'tramp', 'jock', 'trusty',
    'pongo', 'perdita', 'patch', 'rolly', 'lucky', 'penny', 'bolt', 'mittens', 'rhino',
    'duchess', 'thomas', 'marie', 'berlioz', 'toulouse', 'baloo', 'bagheera', 'king louie',
    'kaa', 'shere khan', 'rabbit', 'owl', 'piglet', 'tigger', 'eeyore', 'kanga', 'roo',
    'sebastian', 'flounder', 'scuttle', 'max', 'pascal', 'maximus', 'flynn', 'abu', 'rajah',
    'meeko', 'percy', 'flit', 'grandmother willow', 'mushu', 'cri-kee', 'khan', 'little brother',
    'ray', 'louis', 'stella', 'sven', 'olaf', 'marshmallow', 'sitka', 'denahi', 'kenai',
    'koda', 'rutt', 'tuke', 'tanana', 'copper', 'todd', 'chief', 'amos slade', 'widow tweed',
    'dinah', 'figaro', 'cleo', 'jiminy cricket', 'blue fairy'
  ],
  sidekick: [
    'abu', 'genie', 'carpet', 'iago', 'sebastian', 'flounder', 'scuttle', 'lumiere', 'cogsworth',
    'mrs. potts', 'chip', 'featherduster', 'wardrobe', 'footstool', 'timon', 'pumbaa', 'zazu',
    'rafiki', 'mushu', 'cri-kee', 'meeko', 'percy', 'flit', 'grandmother willow', 'louis', 'ray',
    'olaf', 'sven', 'kristoff', 'pascal', 'maximus', 'jiminy cricket', 'blue fairy', 'fairy godmother',
    'flora', 'fauna', 'merryweather', 'archimedes', 'mad hatter', 'march hare', 'cheshire cat',
    'white rabbit', 'caterpillar', 'tweedledee', 'tweedledum', 'dodo', 'doorknob'
  ]
};

const MAIN_CHARACTER_KEYWORDS = [
  'mickey', 'minnie', 'donald', 'goofy', 'pluto', 'chip', 'dale', 'scrooge', 'huey', 'dewey', 'louie',
  'aladdin', 'jasmine', 'beast', 'belle', 'ariel', 'eric', 'simba', 'woody', 'buzz', 'andy',
  'sulley', 'mike', 'boo', 'nemo', 'marlin', 'dory', 'lightning mcqueen', 'mater', 'sally',
  'wall-e', 'eve', 'carl', 'russell', 'ellie', 'dug', 'alpha', 'beta', 'gamma', 'muntz',
  'rapunzel', 'flynn', 'mother gothel', 'merida', 'queen elinor', 'king fergus', 'joy', 'sadness',
  'anger', 'fear', 'disgust', 'bing bong', 'judy hopps', 'nick wilde', 'chief bogo', 'bellwether',
  'moana', 'maui', 'gramma tala', 'chief tui', 'sina', 'hei hei', 'pua', 'tamatoa', 'te fiti', 'te ka'
];

export function classifyCharacter(character: Character): CharacterTypeFilter[] {
  const name = character.name.toLowerCase();
  const types: CharacterTypeFilter[] = [];

  // プリンセス判定
  if (CLASSIFICATION_KEYWORDS.princess.some(keyword => name.includes(keyword))) {
    types.push('princess');
  }

  // ヴィラン判定
  if (CLASSIFICATION_KEYWORDS.villain.some(keyword => name.includes(keyword))) {
    types.push('villain');
  }

  // 動物キャラクター判定
  if (CLASSIFICATION_KEYWORDS.animal.some(keyword => name.includes(keyword))) {
    types.push('animal');
  }

  // サイドキャラクター判定
  if (CLASSIFICATION_KEYWORDS.sidekick.some(keyword => name.includes(keyword))) {
    types.push('sidekick');
  }

  // メインキャラクター判定
  if (MAIN_CHARACTER_KEYWORDS.some(keyword => name.includes(keyword))) {
    types.push('main');
  }

  // 何も該当しない場合は'other'
  if (types.length === 0) {
    types.push('other');
  }

  return types;
}

export function getCharacterYearRange(character: Character): number | null {
  // 作品から推定年代を取得（実際のAPIデータに年代情報がある場合はそれを使用）
  // ここでは代表的な作品の年代を基に推定
  const MOVIE_YEARS: Record<string, number> = {
    'snow white and the seven dwarfs': 1937,
    'pinocchio': 1940,
    'fantasia': 1940,
    'dumbo': 1941,
    'bambi': 1942,
    'cinderella': 1950,
    'alice in wonderland': 1951,
    'peter pan': 1953,
    'lady and the tramp': 1955,
    'sleeping beauty': 1959,
    'one hundred and one dalmatians': 1961,
    'the jungle book': 1967,
    'the aristocats': 1970,
    'robin hood': 1973,
    'the many adventures of winnie the pooh': 1977,
    'the rescuers': 1977,
    'the fox and the hound': 1981,
    'the black cauldron': 1985,
    'the great mouse detective': 1986,
    'oliver & company': 1988,
    'the little mermaid': 1989,
    'beauty and the beast': 1991,
    'aladdin': 1992,
    'the lion king': 1994,
    'pocahontas': 1995,
    'the hunchback of notre dame': 1996,
    'hercules': 1997,
    'mulan': 1998,
    'tarzan': 1999,
    'fantasia 2000': 2000,
    'dinosaur': 2000,
    'the emperor\'s new groove': 2000,
    'atlantis: the lost empire': 2001,
    'lilo & stitch': 2002,
    'treasure planet': 2002,
    'brother bear': 2003,
    'home on the range': 2004,
    'chicken little': 2005,
    'meet the robinsons': 2007,
    'bolt': 2008,
    'the princess and the frog': 2009,
    'tangled': 2010,
    'winnie the pooh': 2011,
    'wreck-it ralph': 2012,
    'frozen': 2013,
    'big hero 6': 2014,
    'zootopia': 2016,
    'moana': 2016,
    'ralph breaks the internet': 2018,
    'frozen ii': 2019,
    'raya and the last dragon': 2021,
    'encanto': 2021,
    'turning red': 2022,
    'lightyear': 2022,
    'strange world': 2022,
    'elemental': 2023,
    'wish': 2023
  };

  // 最初に見つかった作品の年代を返す
  for (const film of character.films || []) {
    const filmLower = film.toLowerCase();
    const year = MOVIE_YEARS[filmLower];
    if (year) {
      return year;
    }
  }

  return null;
}

export function getFilteredCharacters(
  characters: Character[],
  filters: {
    mediaTypes?: string[];
    characterTypes?: string[];
    yearRange?: { min?: number; max?: number };
    alphabetRange?: { start?: string; end?: string };
  }
): Character[] {
  return characters.filter(character => {
    // メディアタイプフィルター
    if (filters.mediaTypes && filters.mediaTypes.length > 0) {
      const hasMedia = filters.mediaTypes.some(mediaType => {
        switch (mediaType) {
          case 'films':
            return character.films && character.films.length > 0;
          case 'tvShows':
            return character.tvShows && character.tvShows.length > 0;
          case 'shortFilms':
            return character.shortFilms && character.shortFilms.length > 0;
          case 'videoGames':
            return character.videoGames && character.videoGames.length > 0;
          case 'parkAttractions':
            return character.parkAttractions && character.parkAttractions.length > 0;
          default:
            return false;
        }
      });
      if (!hasMedia) return false;
    }

    // キャラクタータイプフィルター
    if (filters.characterTypes && filters.characterTypes.length > 0) {
      const characterTypes = classifyCharacter(character);
      const hasType = filters.characterTypes.some(type => 
        characterTypes.includes(type as CharacterTypeFilter)
      );
      if (!hasType) return false;
    }

    // 年代フィルター
    if (filters.yearRange && (filters.yearRange.min || filters.yearRange.max)) {
      const year = getCharacterYearRange(character);
      if (year !== null) {
        if (filters.yearRange.min && year < filters.yearRange.min) return false;
        if (filters.yearRange.max && year > filters.yearRange.max) return false;
      }
    }

    // アルファベット範囲フィルター
    if (filters.alphabetRange && (filters.alphabetRange.start || filters.alphabetRange.end)) {
      const firstLetter = character.name.charAt(0).toLowerCase();
      if (filters.alphabetRange.start && firstLetter < filters.alphabetRange.start.toLowerCase()) return false;
      if (filters.alphabetRange.end && firstLetter > filters.alphabetRange.end.toLowerCase()) return false;
    }

    return true;
  });
}