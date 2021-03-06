# Form – formulář

Formulář je základním stavebním kamenem. Přidat lze v podokně _Project -
Add new form_. Aplikace formulář otevře, pokud dojde k navigaci (viz
Akce), nebo pokud je formulář výchozí. Výchozí formulář lze nastavit ve
vlastnostech projektu (podokno _Project_ vybrat kořenový projekt,
v podokně _Properties_ změnit vlastnost _Startup form_). Zde lze také
nastavit další vlastnosti související s vlastnostmi celé aplikace
(týkající se výsledného elementu &lt;body&gt;).

## Master page – předpis vzhledu všech stránek

Jeden z formulářů může být tzv. master page, tedy kontejner pro ostatní
formuláře. Používá se k definici menu, patičky apod. Master page je
formulář jako každý jiný, jen se do něj umístí komponenta
_FormPlaceholder_ a na ní se nastaví výchozí formulář. Vlastní
masterPage se pak nastaví jako _Startup form_.

Pozn: V současnosti je povolena pouze jedna master page, a jeden
placeholder, počítáme s možností rozšíření.

Přehled komponent naleznete v [Seznam standardních
komponent](/cs/standard-components.md).

## Kontejnery

- **Panel** – základní layoutovací komponenta
- **DataTable**, **Repeater** – opakuje v HTML tabulce (resp. po
  řádcích) položky z nabindované kolekce

## Editory

- **EnumRadioGroup**, **EnumCombo** – editace výčtových (enum)
  atributů
- **TextBox**, **DatePicker**, **CheckBox** – klasické editory
- **ReferenceCombo** – výběr reference ze seznamu

## Ostatní komponenty

- **Button**, **HyperLink**, **Image**, **Label** – klasické
  komponenty s možností kliknutí
- **ErrorPanel** – zobrazí všechny validace formuláře
- **CustomHtml** – komponenta s ručně zadaným HTML. Lze použít
  knockout binding (viz dokumentace na webu). Tato komponenta vznikne,
  pokud na formuláři provedete vložení ze schránky, která obsahuje
  HTML (z prohlížeče, nebo MS Office).

Velikost a zarovnání není vlastností komponent samotných, ale kombinace
komponenta-kontejner, nastavuje se nicméně jako vlastnost komponenty.
Panel umožňuje nastavit šířku a výšku dle následující tabulky. Dle
nastavení Orientation Panelu je k dispozici ještě vlastnost Vertical
alignment.

| Hodnota / Vlastnost | Width                                                                    | Height                               |
| ------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| px, %               | Nastaví šířku a přidá vlastnost Horizontal alignment (left,center,right) | Nastaví výšku                        |
| Auto fit            | \*šířka je určena šířkou obsahu                                          | Výška je určena výškou obsahu        |
| Fill                | Vyplní šířkou celý dostupný prostor                                      | \*výška vyplní celý dostupný prostor |

\* hvězdičkou označené vlastnosti lze zadat pouze textově (nejdou vybrat
z menu) a nejsou funkční za všech okolností. Generují validační hlášku
F9999.

Další komponenty jsou k dispozici v projektu „sffw“, který není
standardní součástí IDE.

## Vlastní komponenty

Programátoři se zkušenostmi s javascriptem mohou aplikaci rozšířit o
nové komponenty. Ty se pro ostatní vývojáře tváří jako normální
komponenty a mohou je po přidání příslušné komponentové knihovny
(_Package_) vyžívat ve svých projektech.

## Stylování komponent – CssClass

Většina komponent obsahuje kolekci „Css Class“, která slouží pro
přidávání css tříd (pomocí tlačítka ![image.png](/.attachments/image-f7bc9ca4-8cdd-4af3-9d7b-4f8751204ef1.png) ) do
HTML atributu class. Tříd může být více a lze je individuálně
vypínat/zapínat dle potřeby a to i dynamicky (pomocí bindingu), tím lze
dosáhnout např. změny barvy na základě dat.

Standardně se každé komponentě přidá třída _{název tématu}-{název
komponenty}_, např. _m8-button_. Název aktuálního tématu se nastavuje v
menu *Project/Project options/Theme name*. Zakázáním „tématové“ třídy
bude na komponentu aplikováno pouze nezbytné minumum stylů související
s její funkcionalitou a lze si jí tedy jakkoliv přizpůsobit.

Vlastní css třídy lze vytvořit tak, že se do projektu přidá nový
resource typu css class (podokno _Project – Add Resource_ – zvolit název
a příponu css). Soubor je standardní css stylesheet, třída musí začínat
tečkou. Je-li potřeba, lze pomocí komentářů specifikovat chování dialogu
pro výběr css tříd.

Příklad css souboru:
``` css
    /* ide-component: button, hyperlink */
    .myGreatButton {
        background-color: green;
        font-size: 200%;
    }
```

### Možnosti css komentářů
``` css
    /* třída se bude zobrazovat pouze pro zadané komponenty */
    /* ide-component: komponenta1[,komponenta2 …] */

    /* třída se nebude v dialogu zobrazovat */
    /* ide-ignore */

    /* třída se bude zobrazovat v zadaných skupinách (slouží pro vizuální oddělení) */
    /* ide-group: group[,group2…] */

    /* všechny třídy budou přidány do skupiny, která se vezme z názvu třídy oddělením pomlček
       (a to buď zleva nebo zprava), např. třída size-bigbutton bude přidána do skupiny size. */
    /* ide-autogroup: true|right */
```
- Příkaz může mít parametry za dvojtečkou, parametry lze oddělit čárkou ( , )
- Více příkazů lze oddělit středníkem ( ; )
- Příkazy se týkají nejbližší další třídy (není-li specifikováno jinak)

## Ikony na tlačítkách

Ikony jsou na webu často implementovány pomocí fontů. Jeden takový font
je přímo zabudován ve ScreenFactory a může být přidán do projektu
následujícím postupem. Dalšími možnostmi je buď použití FontAwesome z
[sffw](sffw.md) projektu nebo jiných pomocí vlastních resources.

Font, který je zabudován přímo do ScreenFactory lze přidat pomocí
dialogu _Project – Add – New Item… - Icons_. Poté budou na tlačítkách k
dispozici nové css třídy a přidáním takové třídy se na tlačítku objeví
ikona (zleva či zprava a případně i s caption textem).

Pozn.: Webové fonty jsou komplikovaná technologie, která je v různých
prohlížečích implementována různě, proto je nutné je do výsledné
aplikace dávat ve více formátech (WOFF, TTF, EOT, SVG).

Pozn.: Momentálně jsou ikony implementovány pouze pro tlačítka.
Nahlédnutím do css je lze přizpůsobit i pro jiné komponenty.

## Události na komponentách

Komponenty mohou mít v property window i události, např. OnClick. Na
tyto události je možné reagovat napojením akce či handleru. Mezi akcí a
handlerem jsou dva důležité rozdíly. Akce je pojmenovaná a může být
volána z více míst zatímco handler na. Na druhou stranu ze stejného
důvodu nemůže dostávat akce specifické informace z dané události zatímco
handler ano. Různé události by totiž mohly poslat akci různé vstupy
různých typů a akce přitom musí mít vstupy pevně dané.

### Události a jejich parametry

| Event                    | Component                                                                                                   | Parameters                                        | Comment                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| OnActivate               | Form                                                                                                        | Params.data : BindingContext, i.e. Form variables | Occurs when form is activated, i.e. when creating new form, navigating back, or overlayed modal form is closed. |
| OnClick                  | Panel, Image, Label, HyperLink, Button                                                                      | Params.data : BindingContext                      | Occurs when user clicks this component                                                                          |
| OnCreate                 | Form                                                                                                        | Params.data : BindingContext, i.e. Form variables | Occurs when form is created, i.e. only when creating new form. See also OnCreate on DataContext.                |
| OnEnterPressed           | TextBox                                                                                                     | Params.data : BindingContext                      | Occurs when user pressed Enter.                                                                                 |
| OnInit                   | CustomHtml                                                                                                  | Params.data : BindingContext                      | Occurs only once per form, when this component is initialized.                                                  |
| OnKeyDown                | DatePicker, TextBox                                                                                         | Params.data : BindingContext                      |
| Params.keyCode : Integer | Occurs when user presses some key on keyboard. Underlaying data attribute is not updated till focus is lost |
| OnRowActivate            | DataTable                                                                                                   | Params.data : BindingContext                      | Occurs when user clicks to any data row                                                                         |

## Binding

Některé vlastnosti komponent umožňuji tzv. Binding, tedy propojení
vlastnosti komponenty s nějakým datovým prvkem. Jde o základní princip
vývoje aplikace (vzor MVVM) a jeho pochopení je důležité. Zatímco u
jiných přístupů se data nastaví do komponent a na nějakou událost (změna
textu, stisk tlačítka) se data zpátky přečtou z komponent (a případně
komponentám nastaví další vlastnosti), u MVVM se veškeré změny provádí
v datech (která jsou spíše modelem View, proto ViewModel) a tyto změny
jsou automaticky a deklarativně promítány zpět do vlastností komponent
(View). S komponentami tedy nelze pracovat přímo, ale pouze
prostřednictvím vlastností nabindovaných na data. Významnou vlastností
je, že data mohou být i počítaný atribut, tedy atribut, jehož hodnota se
automaticky mění na základě jiných hodnot a příslušného výpočtu (viz
Expression, Computed Attribute). V případě, že počítané atributy
nestačí, lze použít standardní atribut a akci, která jej dopočítá na
základě změny jiných vlastností.

Některé vlastnosti mají binding povinný (např. data pro _Repeater_),
některé jednostranný (např. _IsEnabled_).

Pokud uživatel nastaví binding na komponentě na její hlavní vlastnosti
(např. Text u TextBoxu), nastaví se automaticky také binding na některé
další vlastnosti (např. Caption a IsRequiredMarkVisible). Tím se
dosahuje toho, že název a povinnost atributu se sdílí mezi všemi editory
daného atributu (a bere se z metadat). Takové vlastnosti lze však ručním
zásahem změnit (např. atribut Jméno na obecném subjektu může v případě
fyzické osoby mít popis „Jméno a příjmení“).

Binding se zadává do vlastnosti komponenty (po stisku ikony) textově,
s našeptáváním. Lze použít názvy datových elementů (např.
_address.name_), jejich speciální vlastnosti (např.
_address.name.isValid()_) a přechody mezi kontextem. Na začátku výrazu
lze zapsat negaci, pomocí klíčového slova _not_, např. _not IsDirty_.
Binding je malá podmnožina jazyka, který se používá ve výrazech,
detailní vysvětlení lze nalézt v [Expressions](Expressions.md).

Speciální vlastnosti a metody

- _data.caption()_ – popisek (Caption) z metadat
- _attribute.isRequired()_ – povinnost z metadat, lze použít pouze u
  atributů
- _data.hasValue()_ – příznak, zda atribut nebo struktura nejsou
  prázdné
- _data.isValid()_ – příznak, zda všechny validace atributu nebo
  struktury jsou validní
- _parentContext()_ – přechod na předchozí kontext, v repeateru to
  znamená data, která vlastní kolekci. Pozor není to stejné jako
  owner().
- _form_ – přechod na kořenová data formuláře, s výhodou lze použít
  např. form.isEditable odkudkoliv v celé hierarchii komponent

Pozn.: Binding automaticky provádí obousměrné datové konverze dle typu
cílové vlastnosti na komponentě (např. atribut typu _date_ lze
nabindovat na _TextBox_, ten jej zobrazí textově, umožní změnu a nová
hodnota je zpětně přeložena na typ _date_).

Pozn.: Nyní lze bindovat pouze na existující atribut (nebo strukturu).
Pokud je potřeba s hodnotou provést nějakou, byť triviální operaci, je
vždy nutné vytvořit nový počítaný atribut. Zvažujeme možnost obohatit
jednosměrné bindování o triviální transformace.

[HOME](/index.md)
