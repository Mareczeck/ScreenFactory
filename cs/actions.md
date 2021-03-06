# Akce

Akce umožňují provádět příkazy na základě nějakých událostí (typicky
vyvolaných komponentou, resp. uživatelem). Akce mohou být na formuláři
(_Form actions_), nebo globální (_Global actions_).

Akce se používají jako obsluha událostí, nebo voláním z jiných akcí. Při
obsluze události na komponentě vyberte komponentu (např. tlačítko),
v properties sekce events vyberte příslušnou událost (např. On click) a
pomocí menu pod šipkou vytvořte novou akci, nebo použijte stávající. Po
navázání akce se zobrazuje Desciption, nebo krátký generovaný popis.
Kliknutím tam nebo do zeleného blesku se dostanete přímo do volané akce.

![image22.png](../media/image22.png "image22.png")

Pozn.: V podokně Actions je také možné vytvářet akce čistě v javascriptu
a ty volat z jiných akcí nebo přímo událostí. Za normálních okolností
doporučujeme se jim vyhýbat, protože ScreenFactory nedokáže
zkontrolovat, jestli jsou napsané správně, nepodporuje jejich
automatickou změnu pokud se např. přejmenuje datový prvek. Javascriptové
akce také vyžadují velmi dobrou znalost ScreenFactory runtime a mohou se
rozbít, pokud se implementace runtime změní. Javascriptové akce jsou
proto podporovány pouze jako dočasné řešení výjimečných situací.

Pozn.: vzhledem k asynchronní implementaci je možné, že některé příkazy
budou provedeny až po jisté době (např. při volání API objektu, které
komunikuje, je časový limit 1 minuta). U dlouhotrvajících akcí (např.
načtení dat ze serveru po stisknutí tlačítka) je dobré si zajistit, aby
uživatel akci nevyvolal znovu (např. tlačítko zakázat).

# Akce zapsané textově pomocí ActionLangu

Akce se zapisují textově a mohou obsahovat příkazy, které jsou uvedené
dále.

## Výrazy použitelné v akcích

Výrazy, které se používají v akcích jsou stejné jako Expressions, navíc
ve výrazech umožňují některé další možnosti:

- mohou se odkazovat na lokální proměnná v akci, řídící proměnné
  z cyklů
- mohou obsahovat volání **synchronních** metod od api objektů, např.
```
form.apiobjects.configValue1.get()
```

## Komentář

zapisuje se pomocí __//__ komentář_ nebo __\/* víceřádkový komentář \*\/__ a
nemá žádný vliv na funkčnost. Při ladění je součástí vygenerovaného kódu
jako javascriptový komentář.

## Větvení programu

### If

Zapisuje se jako

    if podmínka then
      příkazy_true
    endif

nebo

    if podmínka then
      příkazy_true
    else
      příkazy_jinak
    endif

Odsazení není povinné, ale výrazně zpřehledňuje výsledný kód. Pokud je
podmínka splněna (tj. její výsledek je true), vykoná se část za
**_then_**. Pokud není splněna (tj. její výsledek je false nebo null),
vykoná se nepovinná část uvedená za **_else_**. Např.

    if form.isValid() then
      system.console("Data jsou platná")
    else
      system.console("Formulář obsahuje chyby")
    endif

_Pozn: pro unsadnění práce s null hodnotou a zpřehlednění kódu lze
použít funkce isTrue(), isFalse(), isTrueOrDefault()_ _nebo
isFalseOrDefault()._

### Ternární operátor

_Pozn.: variantou k větvení programu je použití ternárního výrazu, např._

    system.console(form.isValid() ? "Data jsou platná" : "Formulář obsahuje chyby")

## Přiřazení

Zapisuje se pomocí

    cíl = výraz

Přiřazení má na levé straně odkaz na proměnnou, a na pravé výraz.
Proměnná může být datový atribut (např. _form.name,_ _globals.userName,
form.data.header.MRN_), lokální proměnná (vytvořená na akci, nebo pomocí
_var_). Přiřazovat nelze do počítaných atributů, ani do výsledků LINQ
metod, které vracejí kolekci. Výraz, který se přiřazuje musí být
stejného nebo kompatibilního typu jako cílová proměnná, jinak je nutné
provést konverzi pomocí systémových metod. Např.

    form.name = "Fantomas"
    globals.userName = "medved009"

## Deklarace proměnné (var)

Zapisuje se jako

    var proměnná = výraz

Deklarace vytvoří novou proměnnou (jméno musí být jedinečné v akci)
stejného typu jako výraz a přiřadí jí výchozí hodnotu.

Na rozdíl od ostatních výrazů a klasického přiřazení, lze zde použít
navíc i proměnnou, která je odkazem na existující strukturu, čehož lze
s výhodou použít na zkracování zápisu, např.

    var h = form.data.header
    h.MRN = "CZ18123412341234"
    h.ID = 42
    h.Title = "titulek"

## Volání metody

Zapisuje se jako

    metoda(parametr1, parametr2, ...)

nebo

    něco.metoda(parametr1, parametr2, ...)

Zavolá metodu dle kontextu a názvu. Metody lze volat např. od datových
struktur nebo API objektů.

    form.kolekce.addItem()
    form.apiObjects.configValue.set("nová hodnota")

## Volání jiných akcí

Volání akcí vypadá podobně jako volání metod. Lokální akce jsou k
dispozici na kontextu _form.actions_, globální na kontextu _actions_.

    form.actions.saveAllData()
    actions.refresh(true)

## Volání metody s parametry, návratová hodnota

Na akci lze definovat parametry. Děje se to tak, že při definici akce se
ve stromě Variables vytvoří proměnné v sekci Action variables daného
typu a označí jako „Is input“ a případně „Is input required“. Podobně
lze jednu variable označit jako „Is result“. Taková proměnná bude
použita jako návratová hodnota. Přiřadit do ní lze buď přímo
(myVariable=true) nebo přes klíčové slovo result (result = true). S
těmito atributy lze pracovat přímo jejich jménem (bez kontextu) nebo s
pomocí kontextu _this_.

U javascriptových akcí lze použít malý trik – pokud jméno akce končí
podtržítkem a číslem, SF požaduje vyplnění tolika parametrů (typy se
nekontrolují), např. akce_s_jednim_1.

Při volání jiné akce postupujeme obdobně jako při volání jiných metod,
použijeme form.actions nebo global.actions, kulaté závorky a případně
parametry. Parametry, které nejsou povinné (a jsou v pořadí uvedeny na
konci) není nutné vyplňovat. Výsledek volání akce (je-li nějaký
definován) lze přiřadit do proměnné, např.

    var isValid = form.actions.validateSubjects(1,"test")

Volání jiné akce je vždy asynchronní.

## Synchronní a asynchronní metody

Volání metod lze zapsat i do výrazů (ale musí něco vracet), dokonce i
volání metod od API objektů (což v expressions nejde). Některé metody
jsou ale označeny jako asynchronní, končí slovem Async a takové metody
lze volat POUZE jako samostatný příkaz nebo výraz obsahující pouze
samotné volání. Volání jiné akce je také vždy asynchronní. Příkazy,
které následují po volání takové akce nebudou vykonány okamžitě, ale až
po dokončení volání. Např.

    // toto je OK, jde o synchronní metodu
    var result2 = form.apiObjects.config1.get() + "/" + form.apiObjects.config2.get()

    // toto je OK, jde o asynchronní metodu, ale je použito jednoduché volání
    var result1 = form.apiObjects.myRest.requestAsync("GET", "/api/country/list")

    // toto není možné, jde o asynchronní volání, které je součástí složitějšího výrazu
    var result3 = "/" + form.apiObjects.myapi.doAsync()

## Iterace

### Foreach

    foreach řídící_proměnná in iterovatelný_výraz do
        příkazy_cyklu
    endfor

Opakovaně provede příkazy*cyklu pro každou hodnotu, kterou vrátil
\_iterovatelný_výraz*. Hodnota je v každém cyklu nastavena do
_řídící_proměnné_. Iterovatelný výraz je takový výraz, který vrátí
seznam objektů, tedy kolekce a metody (typicky lambda) nad kolekcí.
Samotnou řídící proměnnou nelze v cyklu měnit, její další vlastnosti již
ale ano. Např.

    foreach f in form.collection1 do
        f.attribute1 = "a"
    endfor

### While

    while podmínka do
        příkazy_cyklu
    endwhile

Provádí příkazy_cyklu dokud podmínka je true (pozor na null !). Pokud
je při prvním vyhodnocení podmínka false, příkazy uvnitř cyklu se
neprovedou nikdy. Pozor, je-li podmínka stále true, cyklus nikdy
neskončí.

Pozn.: While ještě není v generátoru implementován.

[HOME](/index.md)
