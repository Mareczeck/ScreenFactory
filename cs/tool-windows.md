## Pomocná okna

### Project – práce se strukturou projektu

Zobrazuje strukturu projektu, tedy jeho kořenový uzel, moduly (Package)
a další artefakty, které mohou být organizované do složek (Folder). Na
kořenovém uzlu lze přidat existující package, nebo vytvořit nový. Uvnitř
package lze pak přidávat další artefakty v podmenu „_Add_“. Zvolením
_Add – New Item…_ lze přidávat i složitější objekty vytvořené
z šablon[1]. Jednotlivé artefakty lze přesouvat myší. Package
s komponentami se automaticky dávají do adresáře components a řadí se
podle abecedy.

### Najít a nahradit

Umožňuje najít objekty dle zadaných kritérií, nebo nahradit vlastnosti
nalezených objektů.

![test](../media/image6.png "Test")

Funkci lze vyvolat z menu _Edit_ _– Find, Find_ _all text, Find
references, Search and replace_, nebo přímo z okna Properties pravým
tlačítkem nad názvem vlastnosti.

Nahrazování lze použít také pro hromadné nastavení hodnoty nějaké
vlastnosti nezávisle na její původní hodnotě.

![test](../media/image7.png "Test")

**Find text / Find references / Find links / Replace** – přepíná mezi
možnostmi dialogu

- Find text, Replace – vyhledá či nahradí text nebo jinou hodnotu, viz
  dále
- Find references – vyhledá odkazy na právě vybraný objekt (musí být
  nějaký vybraný)
- Find links – vyhledá odkazy z vybraného objektu pryč (NENÍ
  IMPLEMENTOVÁNO)

**Find what** – co se bude hledat

- lze zadat text, v něm použít \* jako zástupný znak za cokoliv, nebo
  zaškrtnout "Use regex" a pak lze použít regulární výrazy
- standardně je hledání case-insensitive, lze změnit pomocí "Match
  case"
- pokud chcete hledat řetězec na přesnou shodu, zaškrtněte "Use regex"
  a zapište jako ^retezec$ (^ znamená začátek, $ konec)
- pokud není vyplněno (a je zadána jiná podmínka), umí vyhledat např.
  všechny objekty nebo objekty se zadanou property

**Replace with** – čím nahradit

- v případě "Replace" řetězec, kterým se má nahradit nalezený text -
  např. lze nahradit "helo" za "hello" a to i uprostřed textu
- zaškrtnutím "Use regex substitution" zapnete možnost použití tzv.
  substitucí v regulárních výrazech - např. \$+ je nalezený řetězec.
- Lze pak např. hledat \\d+ (několik číslic za sebou) a nahradit je za
  "číslo:\$+", tedy např. aaa123bbb bude nahrazeno za aaačíslo:123bbb
- v případě použití prázdného řetězce pro vyhledání lze toto použít
  jako hromadné nastavení hodnot
- u property jiného typu, než string je hodnotu třeba uvést ve
  správném formátu – nejjednodušší je vyplnit jí v okně Properties a
  pak kliknout pravým tlačítkem a zvolit "Replace property value" - to
  sem vyplní správný text
- lze také použít speciální hodnoty
  - CLEAR – smaže property
  - EMPTY – nastaví prázdnou hodnotu
  - DEFAULT – nastaví výchozí hodnotu
  - BINDING:xxx – nastaví binding na xxx

**Look in** – kde se bude vyhledávat

- Curent form / Current package / All packages – aktuální formulář,
  aktuální package / všechny package
- Skip component packages – nevyhledává v packages, které jsou
  označeny jako komponenty

**Objects to search**

- omezení, které objekty (resp. jejich třídy) mají být ve výsledku
  zahrnuty
- jednotlivé třídy se oddělují čárkou a vyhledává se i v jejich
  potomcích (např. DataEntity, VisualControl, TextBox)
- Pokud není zadáno nic, lze zaškrtnout
  - Include test data – vyhledává i v testovacích datech formulářů
  - Include resources – vyhledává i v obsahu resources (NENÍ
    IMPLEMENTOVÁNO)

**Properties to search**

- omezení na property, ve kterých se text bude hledat, jednotlivé
  názvy jsou odděleny čárkou, název může obsahovat hvězdičku jako
  zástupný znak

### Properties – nastavení vlastností vybraných objektů

Po výběru objektu (např. komponenty, datového prvku, apod.) lze
v podokně Properties nastavovat jeho vlastnosti. Ve vlastnostech lze
vyhledávat, v některých případech lze nastavovat vlastnosti více
vybraným objektům. Některé typy mají speciální editory, které umožňují
další možnosti, např. pomocí menu. Je-li v hodnotě nějaký problém,
zobrazí se vedle názvu červený vykřičník. Červenou tečkou jsou označeny
vlastnosti, jejichž hodnota se liší od výchozí hodnoty.

Některé vlastnosti komponent umožňuji propojování s daty (viz Binding) a
jsou označeny ikonou ![image.png](/.attachments/image-8393e9fc-4653-41f4-8528-f1b69ebf711b.png).
Napojená („nabindovaná“) vlastnost se zobrazuje s oranžovou ikonou
řetězu ![image.png](/.attachments/image-accdc94e-d093-4842-8345-ca932e24e90d.png).
Kliknutím do ikony se přepíná nabindování vlastnosti či zadání hodnoty
ručně (pokud je to umožňeno).

Událostem (ikona ![image.png](/.attachments/image-09248a2e-ef5b-43c6-a5be-323dc1e8def2.png)) se z menu přiřadí již hotové akce, nebo vytvoří nové.

Najetím myši na název vlastnosti se zobrazí nápověda k této vlastnosti.
Kliknutím do názvu komponenty hned pod ikonou s ozubeným kolem
zkopírujete text do schránky. Kliknutím na pravé tlačítko myši nad
názvem vlastnosti vyvoláte hledání nebo nahrazení (viz Hledání a
Nahrazení).

### Toolbox – vytváření komponent a dalších objektů

Toolbox obsahuje zásobník připravených objektů, které se přetahují na
aktuálně vytvářený artefakt (např. nové komponenty na formulář, nové
datové prvky na entitu). Při delší práci je vhodné si toolbox
„zaparkovat“, aby nebylo nutné čekat na jeho „vyjetí“.

### Actions – akce a události

Seznam existujících akcí na formuláři (nebo globálních). Dvojklikem na
akci se otevře její editor v záložce. Kontextové menu přidává novou
akci, nebo javascriptovou akci. Pravým tlačítkem na prázdném místě lze
zapnout zobrazení událostí (_Show events_). Pomocí vlastnosti Category
lze nastavit kategorii, při přepnutí Project options – Enable new
actions tree se poté akce zobrazují seskupené podle kategorií. Ve
vlastnostech lze také nastavit vlastnost Is disabled, čímž se vypne
vykonávání akce (zavolání takové akce způsobí chybu při kompilaci).

### Api objects – seznam api objektů

Seznam existujících api objektů na formuláři (nebo globálních).
Kliknutím lze v „Properties“ nastavovat jejich vlastnosti.

### Variables – aktuální datová struktura

V tomto podokně se definuje datová struktura akce, formuláře, nebo
globální. Okno zároveň slouží pro jejich zobrazování po provedení
_Include_ (přepnutím přepínače _FinalEdit_). Přepnutím přepínače
(přepínač _\#ON/\#OFF)_ lze dosáhnout zobrazení systémových dat.
V režimu edit je možné datovou strukturu modifikovat, dokonce i
(virtuálně) přidávat nová data do již existujících struktur (viz
Variables).

Přetažením z variables na formulář lze docílit automatického
vygenerování formuláře (viz [Data-to-Form](main-window.md#Data-to-form)).
V kontextové menu lze do variables přidávat nové hodnoty, validátory a
události (a to v různé hloubce stromu). Pomocí „Copy as binding path“
lze do schránky vložit cestu použitelnou v bindingu.

### Error list – seznam validačních chyb a varování

Seznam obsahuje seznam validačních chyb a kontrol. Pokud nemáte zapnuto
jinak (viz Preferences), nelze projekt spustit, pokud obsahuje validační
chyby. Kontroly lze filtrovat na různá kritéria, případně spustit
překontrolování (_Validate_). Standardně se kontroly provádí po načtení
projektu a při generování výstupu aplikace (viz User options).
Dvojklikem lze zobrazit místo, kde byla validační chyba objevena.

### Outputs – výstupy z generátoru, logování

Okna s ladícími výpisy a výstupy generátoru. Slouží pro vývojářské
účely.

[1] Rozšiřování šablon uživatelem není zatím podporováno.

[HOME](/index.md)
