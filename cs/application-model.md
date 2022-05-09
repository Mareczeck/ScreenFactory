# Aplikační model

Modelování aplikace ve Screen Factory (SF) je založeno na návrhovém
vzoru [MVVM](https://en.wikipedia.org/wiki/Model–view–viewmodel) – Model
– View – ViewModel. Modelem se rozumí Business model problematiky, někdy
též doménový model, jeho získávání z databáze či jiných zdrojů a o něm
SF primárně není. View je nějaké zobrazení, typicky formulář sloužící
pro interakci uživatele. ViewModel je adaptér mezi modelem a View.
Nedílnou součástí principu je podpora vazby mezi ViewModelem a View,
tzv. Binding. Ten umožňuje provazovat data a jejich změny mezi View a
ViewModelem, tedy např. změna nějakého atributu na ViewModelu je
okamžitě propagována do View (uživatel vidí změnu) a obráceně, pokud
uživatel provede nějakou změnu ve View (napíše text do textboxu), je
změna propagována[1] do ViewModelu.

Aby toto vše mohlo fungovat, je nutné to obalit nějakým Controllerem –
tj. kódem, který řídí tok programu, např. přepíná aktuální view, načítá
a ukládá data, apod.

Tento návrhový vzor je v SF realizován:

**ViewModel:**

- _DataEntity_ – prvek reuse, kořenový kontejner
- _DataCollection_ – opakovač, kolekce
- _DataAttribute_ – nosič hodnoty
- _ComplexAttribute_ – nosič strukturované hodnoty
- _ComputedAttribute_ – vypočtená hodnota
- _MetaTyp_ – reuse DataAttributu
- V runtime je viewmodel reprezentován observable objekty (knihovna
  knockout)
- Na formuláři je ViewModel přístupný jako „Form variables“, případně
  lze stejným způsobem použít „Global variables“.
- Ve ViewModelu na formuláři je typicky pomocí include obsažena nějaký
  reálný business objekt (_DataEntity_) a přidány pomocné vlastnosti
  (např. IsSelected, IsAdressVisible, IsInSpecialGroup, apod.)

**View:**

- _Form_ – formulář, obsahuje jednotlivé komponenty, jejichž
  vlastnosti lze bindovat – tj. propojovat na ViewModel
- _Panel_ – layouting, rozmístění prvků na formuláří
- Editory a další komponenty – zobrazení a editace prvků
- V runtime je View reprezentováno HTML5, CSS a javascriptovým kódem
  jednotlivých komponent

**Model:**

- Není v SF zastoupen ničím – _DataEntity_ je kompromisem mezi Modelem
  a ViewModelem, tedy jak potřeb komunikace se serverem, tak potřeb
  UI. V případě potřeby je nutné mapovat ViewModel na (serverový)
  Model až při komunikaci.

**Controller:**

- _Action_ – obsluha události Formuláře nebo komponenty
- _API object_ – služební objekt, poskytování API pro volání z akcí,
  poskytování API pro propojení s komponentami
- V runtime je Controller reprezentován generovanými js metodami a
  referencovanými skripty

[1] Okamžik propagace změny UI do ViewModelu může být pro různé
komponenty různý. Např. slider reaguje na posun myši okamžitě, data
z textboxu se však přenesou do ViewModelu až po opuštění pole (nebo
stisku Enter)

[HOME](/index.md)
