# Expressions (počítané výrazy)

Expression je způsob, jak zapsat nějaký výpočet, používá se na
počítaných atributech, validátorech a v akcích. Zapisují se v jazyce
zvaným ActionLang, který je podobný basicu nebo pascalu (s objektovým
přístupem k datům), např. _trim(adresa.ulice) + " " +
adresa.cisloPopisne_.

Expressions obsahují aritmetiku práce s NULL hodnotami. Jazyk je typový,
nekompatibilní typy je nutné konvertovat voláním _ToString(), ToBool(),
apod._ Textový editor obsahuje našeptávač (lze vyvolat _CTRL+mezera_),
je tedy snadné zjistit, jaké objekty je možné v aktuálním kontextu
použít.

Aby se zamezilo nutnosti zpracovávat chybové stavy, nepoužívá jazyk
výjimky, ani chybové stavy. Všechny operace mají definovaný výsledek za
všech podmínek, metody se chovají stejně, nebo obsahují parametr
s hodnotou, jakou mají vrátit, pokud nelze funkci provést (např. dělení
nulou).

## Konstantní hodnoty

- řetězec (String) – zapisuje se mezi znaky _"_ a _"_, speciální znaky
  lze escapovat lomítkem _\\n_, _\\t_, _\\r_, _\\\\_, _\\"_
- celé číslo (Integer) – číslice, případné mínus před
- desetinné číslo (Decimal) – číslice, případně desetinná tečka a
  exponent s postfixem d (1.0e10d)
- datum, datum a čas (Date, DateTime)
  - je-li třeba zapsat konstantu do kódu, zapisuje se ve formátu
    _'DyyyyMMdd'_ a _'DyyyyMMdd HHmmss'_
- boolean – konstanty _true_ a _false_
- null hodnota zapsat nejde, místo ní se používá test _HasValue_ nebo
  _Defaultxxx_

Jazyk podporuje závorkování a prioritu operátorů. Komentáře lze zapsat
mezi znaky _/\*_ a _\*/_, nebo uvést znaky _//_ (pak platí do konce řádky).

## Relační operace = &lt;&gt; &lt; &gt; &gt;= &lt;= in

Operace porovnávají hodnoty, porovnání je i včetně null hodnoty, tedy
platí null=null je true a null&lt;&gt;null je false. V ostatních
případech vrací null v případě že jedna strana je null.

Pozn.: Protože tento „ANSI“ přístup k null hodnotám znepřehledňuje kód,
jsou k dispozici funkce _isTrue, isFalse, isTrueOrDefault,
isFalseOrDefault_, které vždy vrací true/false.

**in** je test na „je hodnota obsažena v množině“, např. _value in
\["1","2"\]_

Pokud je hodnota null a ve vyjmenovaných hodnotách je obsaženo i null,
vrací true, jinak false.

## Ternární operátor condition ? ifTrue : ifFalse

Testuje podmínku (condition), je-li její hodnota true, vrací první část
(ifTrue). Je-li výsledek vyhodnocení podmínky false nebo null, vrací
druhou část (ifFalse).

## Logické operace or, and, not

Logické operace lze použít pouze na bool výrazy. Viz tabulka

| X and Y | Vrací null, pokud je X nebo Y null. Jinak vrací false, pokud je X nebo Y false |
| ------- | ------------------------------------------------------------------------------ |
| X or Y  | Vrací null, pokud je X nebo Y null. Jinak vrací true, pokud je X nebo Y true   |
| not X   | Vrací null, pokud X je null, jinak true, pokud je X false                      |

## Aritmetické operace + - \*

Klasické operace proveditelné nad Integer nebo Decimal. Vrátí součet,
rozdíl, součin dvou operandů. Je-li kterýkoliv z nich null, vrací null.
Dělení se provádí pomocí metod _divide_, _divInt_, _mod_. Celočíselní
dělení (a zbytek) nemá jednoznačně definovány výsledky pro záporná
čísla, proto vrací fallback (viz wiki).

## Přístup k datům

Data jsou dána kontextem vyhodnocení expression, k dalším datům se
přistupuje jménem (jmény) nadřízených struktur oddělených tečkou, např.
_name_, _this.name_, _zastupce.adresa.ulice_, více viz [Struktura
objektů](#datové-kontexty). Typicky je v kontextech nějaký aktuální kontext, který se
používá přímo (např. atributy entity). Další kontexty jsou dostupné přes
„klíčová slova“ _form_, _globals_, _packages_.

Aby mohl být generovaný kód co nejpodobnější tomu, co uživatel vytváří
při návrhu, je v IDE zakázáno používat některá klíčová slova, která by
byla v konfliktu s použitými technologiemi. Takovým identifikátorům je
automaticky přidáno podtržítko na začátek a týká se to většiny
artefaktů, které mají property Name. Jde o klíčová slova z jazyka
javascript[1], actionLang[2] a navíc _attr_, _collection_, _enums_,
_functions_, _globals_, _metadata_, _this_, _packages_.

## Metody

Z jazyka lze volat definované metody (někdy také zvané funkce). Metody
jsou globální, pak se volají přímo, např. _length(s)_, nebo na
objektech, např. _adresy.count()_. V závorkách se uvádí hodnoty
parametrů.

Metody lze rozšířit o vlastní přidáním _Custom function_ do projektu.
Funkce se píše v javascriptu, deklarují se typy a názvy vstupních
parametrů a výsledný typ. Definovaná funkce se poté použije v expression
jako _functions.myFn(..parametry),_ případně
_myPackage.functions.myFn(…)_, pokud je z jiné package. Více viz
Struktura objektů.

Mělo by se jednat o
[https://en.wikipedia.org/wiki/Pure\_function](pure function), čili měla
by být **statická**, **deterministická** a **neměnit** žádný stav.

## Datové kontexty

Data, které je možná ve výrazech použít se liší kontextem, kde je daný
výraz definován. Jiná data jsou přístupná při psaní validátoru, jiná při
psaní pravé strany přiřazení v akci. V následující tabulce je uveden
jejich přehled a význam.

| název                                                           | typ               | popis                                                                                                              |
| --------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| this                                                            |                   | Odkaz na aktuální kontext, liší se dle použití výrazu. Kontextové metody je možné volat pouze přes this.<metoda>() |
| attr                                                            | dle typu atributu | Odkaz na aktuální atribut. Přístupné pouze ve validátorech.                                                        |
| **packages.<balíček>**                                          |                   | Práce s metadaty package                                                                                           |
| > .functions.<funkce>                                           | dle funkce        | Volání funkce definované v javascriptu.                                                                            |
| > .metadata.<entita>                                            |                   |                                                                                                                    |
| > .<jméno>                                                      | podstruktura      | Pomocí tečkové notace se lze dostat na metadata konkrétní struktury (kolekce, atributu)                            |
| > .caption()                                                    | string            | Hodnota popisku (Caption) uvedená v definici                                                                       |
| > .isRequired()                                                 | bool              | Hodnota povinnosti (IsRequired)                                                                                    |
| > .enums.<jméno>                                                |                   |                                                                                                                    |
| > .<jméno hodnoty>                                              |                   | Metadata položky výčtu                                                                                             |
| > .enumCaption()                                                | string            | Popisek                                                                                                            |
| > .enumValue()                                                  | string            | Hodnota, která bude uložena v datech                                                                               |
| > .globals.<jméno>                                              | Jako struktura    | Hodnota globálních proměnných                                                                                      |
| <jméno>                                                         |                   |                                                                                                                    |
| Další vlastnosti a metody se mohou lišit dle aktuální struktury |                   |                                                                                                                    |
| > .<jméno>                                                      |                   | Pomocí teček se lze navigovat na další položky struktury. U atributu také vrací jeho hodnotu.                      |
| > .owner()                                                      |                   | Nadřízená struktura                                                                                                |
| > .hasValue()                                                   | bool              | True, pokud atribut není NULL, nebo pokud jakýkoliv podřízený atribut není NULL                                    |
| > .isValid()                                                    | bool              | True, pokud jsou všechny položky validní a všechny validátory vrací IsValid=true.                                  |
| > .validationErrorsCount()                                      | integer           | Počet validačních chyb na kontejneru a podřízených datových objektech                                              |
| > .enumCaption()                                                | string            | Popisek aktuální hodnoty typu výčet (platí pouze pro enum atributy)                                                |
| > .enumValue()                                                  | string            | Datová hodnota typu výčet (platí pouze pro enum atributy)                                                          |
| > .count()                                                      | integer           | Počet položek v kolekci                                                                                            |
| > .collection()                                                 | kolekce           | Kolekce vlastnící prvek kolekce                                                                                    |

## Lambda metody

Na kolekcích a mezivýsledcích typu kolekce jsou k dispozici metody,
kterým říkáme lambda metody. Jako parametr používají tzv. lambda výrazy,
které používají „current“ jako řídící proměnnou, jejíž typ je položka
kolekce. Řídící proměnou lze přejmenovat použitím konstrukce var x =&gt;
výraz. Zajímavé je, stále platí, že tyto metody nemění stav, jsou ted
použitelné v bindingu a notifikaci změn. Pokud tedy nadefinujete
počítaný atribut, který vrací např. počet položek, které uživatel právě
přidal (tj. mají atribut IsNew nastaven na true), pak v místě, kde
položky přidáváte stačí pouze nastavit IsNew=true a počítaný atribut se
sám přepočítá a správně zobrazí počet přidaných položek.

| .count()                                                                              | integer                                  | Vrací počet prvků                                                                                                       |
| ------------------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| .count(lambdaPodmínka)                                                                | integer                                  | Vrací počet prvků splňující danou podmínku                                                                              |
| .any()                                                                                | bool                                     | True, pokud existuje alespoň jeden prvek v kolekci nebo mezivýsledku                                                    |
| .exists(lambdaPodmínka)                                                               | bool                                     | True, pokud existuje alespoň jeden prvek splňující danou podmínku                                                       |
| .selectFirst()                                                                        | položka                                  | Vrací první položku. Výsledek je dobré si předem otestovat pomocí exists().                                             |
| .selectFirst(lambdaPodmínka)                                                          | položka                                  | Vrací první položku kolekce splňující danou podmínku, nebo null. Výsledek je dobré si předem otestovat pomocí exists(). |
| .where(lambdaPodmínka)                                                                | mezivýsledek                             | Vrací mezivýsledek obsahující položky, které vyhovují dané podmínce                                                     |
| .orderBy(lambdaSelector, asc)                                                         | mezivýsledek                             | Vrací mezivýsledek s položkami seřazenými dle zadaného výrazu (asc = true řadí vzestupně)                               |
| .clear(lambdaPodmínka)                                                                | integer                                  | Volatelné pouze z akcí. Odstraní z kolekce položky vyhovující podmínce a vrátí jejich počet.                            |
| **Agregační metody**                                                                  |                                          | Vrací agregaci z hodnot vybraných z každé položky pomocí selectoru                                                      |
| .max(lambdaSelector)                                                                  | decimal, integer, string, date, dateTime | Maximum                                                                                                                 |
| .min(lambdaSelector)                                                                  | decimal, integer, string, date, dateTime | Minimum                                                                                                                 |
| .sum(lambdaSelector)                                                                  | decimal, integer                         | Součet                                                                                                                  |

Lambda podmínky vrací boolean.
Lambda selektory vrací nějakou hodnotu.

Metody, které vrací „mezivýsledek“ lze řetězit, např.

```
form.collection
.where(current.index() > 2)
.where(current.Mass > 1000)
.sum(var x => x.Netto)
```

## Standardní metody

Viz nápověda v aplikaci.

Za zmínku stojí zmínit tyto metody:

- hasValue – vrací, zda je hodnota nenulová
- isTrue, isFalse, isTrueOrDefault, isFalseOrDefault – testuje hodnotu
  na true, false, true nebo NULL , false nebo NULL, v opačném případě
  vrací false (tedy nikoliv NULL jako při klasickém porovnání)
- toString – převádí hodnoty na řetězec/z řetězce
- toDate, toDateTime, toBoolean, toDecimal, toInt, … – převádí řetězec
  na danou hodnotu, jako druhý parametr se zadává hodnota, pokud nelze
  převod provést
- getDate, getDateTime – vrací aktuální datum, resp. datum a čas
- defaultBool, defaultInt, … defaultFromValue – vrací NULL hodnotu
  daného typu
- stopDebugger – zastaví prohlížeč s otevřenými tools v debuggeru

## Akční metody

Tyto metody jsou přístupné pouze z akcí, v *Expressions* je nelze
použít.

| .clear()                    | -      | Vymaže atribut / strukturu / kolekci.                                                                                                                         |
| --------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .isTouched()                | bool   | Vrací interní stav (zda byl editor daného atributu „navštíven“ uživatelem).                                                                                   |
| .setTouched(isTouched:bool) | -      | Nastaví atributu (případně rekurzivně celou strukturu/kolekci) interní stav na „touched“, tedy jako by uživatel navštívil/nenavštívil editor daného atributu. |
| **Kolekce a struktury**     |        |                                                                                                                                                               |
| .fromJson(json:string)      | bool   | Načte obsah struktury nebo kolekce z JSON řetězce. Vrací false, pokud se nepodařilo zparsovat.                                                                |
| .toJson()                   | string |                                                                                                                                                               |
| .toJson(ignoreUnderscored)  | string | Vrací obsah struktury jako JSON řetězec, případně ignoruje atributy a struktury začínající podtržítkem                                                        |
| **Kolekce**                 |        |                                                                                                                                                               |
| .addItem()                  | Prvek  | Přidá prvek do kolekce a vrátí ho.                                                                                                                            |
| .removeItem(index:integer)  |        | Odstraní prvek na pozici index                                                                                                                                |
| Prvek kolekce               |        |                                                                                                                                                               |
| .removeMe()                 |        | Odstraní prvek z kolekce                                                                                                                                      |

[1] Viz např.
[hmathiasbynens.be/notes/reserved-keywords](http://mathiasbynens.be/notes/reserved-keywords.md)

[2] Klíčová slova actionLang: var, and, or, not, in, true, false

[HOME](/index.md)
