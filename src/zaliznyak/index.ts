/**
 * Объектная репрезентация индекса Зализняка для существительных
 */
export class ZaliznyakIndex {
  /**
   * Род
   *
   * - `'m'` - му­ж­с­кой ро­д
   * - `'f'` - женский ро­д
   * - `'n'` - средний ро­д
   */
  gender?: 'm' | 'f' | 'n';

  /**
   * Одушевлённость
   *
   * - `'a'` - одушевлённое
   * - `'ina'` - неодушевлённое
   */
  animacy?: 'a' | 'ina';

  /**
   * Цифра индекса - тип склонения
   *
   * - `0` - слово неизменяемо
   * - `1` - основа на твёрдую согласную (топор, комод, балда, кобра, олово, пекло)
   * - `2` - основа на мягкую согласную (тюлень, искатель, дядя, цапля, Дуня, горе, поле)
   * - `3` - основа на г, к или х (петух, сапог, неряха, коряга, золотко)
   * - `4` - основа на ж, ш, ч, щ (калач, лаваш, галоша, святоша, жилище, вече)
   * - `5` - основа на ц (немец, конец, девица, деревце)
   * - `6` - основа на гласную (кроме и) или й/j (бой, край, шея, здоровье)
   * - `7` - основа на и (полоний, сложение, мания, удостоверение)
   * - `8` - традиционное "3-е склонение" (боль, тетрадь, зыбь)
   */
  type?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  /**
   * Зве­з­до­ч­ка при ци­ф­ре `*` - чередование в основе беглой гласной с нулём (платок/платков, кошка/кошек, сердце/сердец)
   */
  mobileVowel?: boolean;

  /**
   * Кружочек при ци­ф­ре `°` - особое чередование в основе слова (крестьянин/крестьяне, мышонок/мышата, время/времена)
   */
  alternations?: boolean;

  /**
   * Буква индекса - схема ударения
   *
   * Основные схемы:
   *
   * - `a` - ударение всегда на основу (парад, спонсор, мама, солнце, платёжный)
   * - `b` - ударение всегда вне основы, кро­ме слу­ча­ев, ко­г­да око­н­ча­ние не со­де­р­жит гла­с­ной (топор, похвала, вещество, родной)
   * - `c` - ударение на основу в ед. ч. и вне основы во мн. ч. (дар, место, поле)
   * - `d` - ударение на окончание в ед. ч. и на основу во мн. ч. (беда́/бе́ды)
   * - `e` - ударение на основу в ед. ч. и им. п. мн. ч., вне основы в остальных падежах мн. ч. (до́ля/до́ли/доля́ми)
   * - `f` - ударение на основу в им. п. мн. ч. и вне основы в остальных случаях (слеза́/слёзы/слеза́ми)
   *
   * Второстепенные схемы:
   *
   * - `b'` - от­ли­ча­е­т­ся от `b` то­ль­ко тем, что в Т. п. ед. ч. уда­ре­ние на ос­но­ве (ед. ч. вошь, вши, во­́­шью; мн. ч. вши, вшей, вшам, вша­́­ми, о вшах)
   * - `d'` - от­ли­ча­е­т­ся от `d` то­ль­ко тем, что в В. п. ед. ч. уда­ре­ние на ос­но­ве (ед. ч. спи­на́, спи­ны́, спи­не́, спи­́­ну, спи­но́й, о спи­не́; мн. ч. спи­́­ны, спин, спи­́­нам, спи­́­на­ми, о спи­́­нах)
   * - `f'` - от­ли­ча­е­т­ся от `f` то­ль­ко тем, что в В. п. ед. ч. уда­ре­ние на ос­но­ве (ед. ч. ру­ка́, ру­ки́, ру­ке́, ру­́­ку, ру­ко́й, о ру­ке́; мн. ч. ру­́­ки, рук, ру­ка́м, ру­ка­́­ми, о ру­ка́х)
   * - `f"` - от­ли­ча­е­т­ся от `f` то­ль­ко тем, что в Т. п. ед. ч. уда­ре­ние на ос­но­ве (ед. ч. грудь, гру­ди́, гру­́­дью; мн. ч. гру­́­ди, гру­де́й, гру­дя́м, гру­дя­́­ми, о гру­дя́х)
   */
  stress?: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | "b'" | "d'" | "f'" | 'f"';

  /**
   * Ци­ф­ра в кру­ж­ке (①, ② или ③) - ча­с­то встре­ча­ю­ще­е­ся от­к­ло­не­ние от ста­н­да­р­т­но­го скло­не­ния
   *
   * - `1` - от­но­си­т­ся к фо­р­ме И. п. мн. ч.
   *   - для м. р. окончание становится -а/-я
   *   - для с. р. окончание становится -ы/-и
   * - `2` - от­но­си­т­ся к фо­р­ме Р. п. мн. ч.:
   *   - для м. р. окончание становится нулевым или -ь
   *   - для с. р. окончание становится -ов/-ев(безуд.)/-ёв(уд.)
   *   - для ж. р. окончание становится -ей
   * - `12` - `1` и `2` вместе
   * - `3` - от­но­си­т­ся к фо­р­ме П. п. ед. ч. (всех родов) и Д. п. ед. ч. м. р:
   *   - на­ря­ду с ре­гу­ля­р­ным око­н­ча­ни­ем -и счи­та­е­т­ся до­пу­с­ти­мым та­к­же око­н­ча­ние -е
   */
  deviation?: '1' | '2' | '12' | '3';

  /**
   * Знак "ё" в индексе - в ос­но­ве сло­ва про­и­с­хо­дит че­ре­до­ва­ние ё/е (ёж/ежа, жена/жёны)
   */
  ioAlternation?: boolean;

  constructor({
    gender,
    animacy,
    type,
    mobileVowel,
    alternations,
    stress,
    deviation,
  }: ZaliznyakIndex) {
    this.gender = gender;
    this.animacy = animacy;
    this.type = type;
    this.mobileVowel = mobileVowel;
    this.alternations = alternations;
    this.stress = stress;
    this.deviation = deviation;
  }
}
