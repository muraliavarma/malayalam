export type MalayalamCardType = 'vowel' | 'consonant' | 'chillu'

export interface MalayalamCard {
  key: string
  letter: string
  transliteration: string
  word: string
  wordTransliteration: string
  meaning: string
  hint: string
  type: MalayalamCardType
}

const makeCard = (
  key: string,
  letter: string,
  transliteration: string,
  word: string,
  wordTransliteration: string,
  meaning: string,
  hint: string,
  type: MalayalamCardType,
): MalayalamCard => ({
  key,
  letter,
  transliteration,
  word,
  wordTransliteration,
  meaning,
  hint,
  type,
})

export const malayalamCards: MalayalamCard[] = [
  makeCard('a-amma', 'അ', 'a', 'അമ്മ', 'amma', 'mother', 'Amma cuddling her child', 'vowel'),
  makeCard('aa-aana', 'ആ', 'aa', 'ആന', 'aana', 'elephant', 'Friendly elephant with tusks', 'vowel'),
  makeCard('i-ila', 'ഇ', 'i', 'ഇല', 'ila', 'leaf', 'Fresh green leaf', 'vowel'),
  makeCard('ii-eecha', 'ഈ', 'ii', 'ഈച്ച', 'eecha', 'housefly', 'Little fly sitting on fruit', 'vowel'),
  makeCard('u-urumb', 'ഉ', 'u', 'ഉറുമ്പ്', 'urumb', 'ant', 'Busy red ant carrying crumbs', 'vowel'),
  makeCard('uu-oonjal', 'ഊ', 'uu', 'ഊഞ്ഞാൽ', 'oonjal', 'swing', 'Child on a wooden swing', 'vowel'),
  makeCard('ru-rishi', 'ഋ', 'ru', 'ഋഷി', 'rishi', 'sage', 'Wise rishi with prayer beads', 'vowel'),
  makeCard('e-eli', 'എ', 'e', 'എലി', 'eli', 'mouse', 'Tiny mouse peeking out', 'vowel'),
  makeCard('ee-eeni', 'ഏ', 'ee', 'ഏണി', 'eeni', 'ladder', 'Tall bamboo ladder', 'vowel'),
  makeCard('ai-ainam', 'ഐ', 'ai', 'ഐനം', 'ainam', 'mirror', 'Shiny mirror with a frame', 'vowel'),
  makeCard('o-ottakam', 'ഒ', 'o', 'ഒട്ടകം', 'ottakam', 'camel', 'Desert camel with a hump', 'vowel'),
  makeCard('oo-onthu', 'ഓ', 'oo', 'ഓന്ത്', 'onthu', 'chameleon', 'Colorful garden chameleon', 'vowel'),
  makeCard('au-aushadham', 'ഔ', 'au', 'ഔഷധം', 'aushadham', 'medicine', 'Bottles and herbs from a village healer', 'vowel'),
  makeCard('am-ambujam', 'അം', 'am', 'അംബുജം', 'ambujam', 'lotus', 'Pink lotus flower', 'vowel'),
  makeCard('aha-aham', 'അഃ', 'aha', 'അഹം', 'aham', 'breathy “ah” sound', 'Bright pink letter showing the breathy sound', 'vowel'),
  makeCard('ka-kappal', 'ക', 'ka', 'കപ്പൽ', 'kappal', 'ship', 'Blue ship cutting through waves', 'consonant'),
  makeCard('kha-khadgam', 'ഖ', 'kha', 'ഖഡ്ഗം', 'khadgam', 'sword', 'Gold handled sword', 'consonant'),
  makeCard('ga-gudiya', 'ഗ', 'ga', 'ഗുഡിയ', 'gudiya', 'doll', 'Cute Malayali doll / toddler', 'consonant'),
  makeCard('gha-ghadam', 'ഘ', 'gha', 'ഘടം', 'ghadam', 'clay pot', 'Traditional pot with medicine oils', 'consonant'),
  makeCard('nga-ngaram', 'ങ', 'nga', 'ങാരം', 'ngaaram', 'temple gong', 'Gong that rings “ngaa”', 'consonant'),
  makeCard('cha-chakka', 'ച', 'cha', 'ചക്ക', 'chakka', 'jackfruit', 'Big green jackfruit', 'consonant'),
  makeCard('chha-chhatram', 'ഛ', 'chha', 'ഛത്രം', 'chhatram', 'umbrella', 'Colorful parasol', 'consonant'),
  makeCard('ja-jaalakam', 'ജ', 'ja', 'ജാലകം', 'jaalakam', 'window', 'Wooden window with sun light', 'consonant'),
  makeCard('jha-jhalaram', 'ഝ', 'jha', 'ഝലരം', 'jhalaram', 'hanging bells', 'Pair of golden temple bells', 'consonant'),
  makeCard('nya-njandu', 'ഞ', 'nya', 'ഞണ്ട്', 'njandu', 'crab', 'Friendly seashore crab', 'consonant'),
  makeCard('tta-tyre', 'ട', 'tta', 'ടയർ', 'tyre', 'tyre', 'Black tyre with silver rim', 'consonant'),
  makeCard('ttha-thangakkol', 'ഠ', 'ttha', 'ഠങ്കക്കോൽ', 'thangakkol', 'royal staff', 'Temple procession staffs', 'consonant'),
  makeCard('da-damaru', 'ഡ', 'da', 'ഡമരു', 'damaru', 'double headed drum', 'Hourglass damaru drum', 'consonant'),
  makeCard('dha-dhakki', 'ഢ', 'dha', 'ഢക്ക', 'dhakka', 'temple drum', 'Large drum played with sticks', 'consonant'),
  makeCard('nna-nayam', 'ണ', 'nna', 'ണയം', 'nayam', 'beaded ornament', 'Gold beads used on elephants', 'consonant'),
  makeCard('ta-thavala', 'ത', 'ta', 'തവള', 'thavala', 'frog', 'Green spotted frog', 'consonant'),
  makeCard('tha-thumbi', 'ഥ', 'tha', 'ഥുമ്പി', 'thumbi', 'dragonfly', 'Tiny dragonfly near rice fields', 'consonant'),
  makeCard('da-deepam', 'ദ', 'da', 'ദീപം', 'deepam', 'lamp', 'Twin brass lamps', 'consonant'),
  makeCard('dha-dhanam', 'ധ', 'dha', 'ധനം', 'dhanam', 'money', 'Stack of golden coins', 'consonant'),
  makeCard('na-nakham', 'ന', 'na', 'നഖം', 'nakham', 'fingernail', 'Pink fingernail being trimmed', 'consonant'),
  makeCard('pa-pana', 'പ', 'pa', 'പന', 'pana', 'palmyra palm', 'Tall palm tree', 'consonant'),
  makeCard('pha-phalam', 'ഫ', 'pha', 'ഫലം', 'phalam', 'fruit bowl', 'Basket of tropical fruits', 'consonant'),
  makeCard('ba-ballon', 'ബ', 'ba', 'ബലൂൺ', 'baloon', 'balloon', 'Red balloon ready to float', 'consonant'),
  makeCard('bha-bhatan', 'ഭ', 'bha', 'ഭടൻ', 'bhatan', 'soldier', 'Soldier in uniform', 'consonant'),
  makeCard('ma-muyal', 'മ', 'ma', 'മുയൽ', 'muyal', 'rabbit', 'Soft brown rabbit', 'consonant'),
  makeCard('ya-yantram', 'യ', 'ya', 'യന്ത്രം', 'yantram', 'machine', 'Gears from a simple machine', 'consonant'),
  makeCard('ra-ratham', 'ര', 'ra', 'രഥം', 'ratham', 'chariot', 'Temple chariot', 'consonant'),
  makeCard('la-laam', 'ല', 'la', 'ലാംഗലം', 'laangal', 'plough', 'Farmer’s plough used in fields', 'consonant'),
  makeCard('va-vala', 'വ', 'va', 'വല', 'vala', 'fishing net', 'Large fishing net', 'consonant'),
  makeCard('sha-sharam', 'ശ', 'sha', 'ശരം', 'sharam', 'arrow', 'Arrow ready for a bow', 'consonant'),
  makeCard('ssha-shell', 'ഷ', 'ssha', 'ഷെൽ', 'shel', 'sea shell', 'Conch / seashell', 'consonant'),
  makeCard('sa-sarppam', 'സ', 'sa', 'സർപ്പം', 'sarppam', 'snake', 'Cobra with hood raised', 'consonant'),
  makeCard('ha-haaram', 'ഹ', 'ha', 'ഹാരം', 'haaram', 'necklace', 'Golden necklace', 'consonant'),
  makeCard('lla-llam', 'ള', 'lla', 'ളളി', 'llali', 'anklet', 'Traditional anklets', 'consonant'),
  makeCard('zha-vazhapazham', 'ഴ', 'zha', 'വാഴപ്പഴം', 'vaazhapazham', 'bananas', 'Bunch of bananas', 'consonant'),
  makeCard('ra-car', 'റ', 'ra2', 'കാർ', 'kaar', 'car', 'Red little car', 'consonant'),
  makeCard('ksa-kshetram', 'ക്ഷ', 'ksha', 'ക്ഷേത്രം', 'kshetram', 'temple', 'Temple with lamps', 'consonant'),
]
