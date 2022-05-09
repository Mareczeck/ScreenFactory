# Projekt a balíčky

Projekt se skládá z balíčků (Packages). Každý projekt obsahuje alespoň
jeden balíček. Balíčky umožňují sdílení kódu mezi více projekty, balíčky
mohou používat jiné balíčky bez omezení (včetně kruhových závislostí).
Balíčky jsou také způsob, jakým rozšířit projekt o nové komponenty (viz
Vlastní komponenty, Vlastní api objekty). Samotný projekt kromě balíčků
obsahuje pouze globální nastavení (Project options), případně
uživatelské nastavení (User options). Celý projekt (resp. některý jeho
Package) musí obsahovat alespoň jeden formulář.

Projekt a jeho balíčky se ukládají do XML souborů, a to buď jednotlivě
(projekt zvlášť, package zvlášť, každý artefakt zvlášť) nebo
komprimovaně (jeden soubor obsahující stejnou strukturu, ale v ZIP).
Jsou možné i kombinace (zipovaný package použitý z normálního projektu,
apod.). Projektový soubor má příponu _sfproj_, zipovaný pak _sfprojx_.
Package se většinou ukládají do vlastních podadresářů a mají příponu
_package_ nebo _packagex_.

Soubory je možné sdílet, případně uchovávat ve verzovacím systému (pak
je doporučen nekomprimovaný formát).

_Pozn.: Přímá podpora verzovacího systému v IDE není._

S projektem se také ukládá nastavení rozmístění oken a otevřených
záložek (soubor s příponou _sfprojlayout_) a uživatelské nastavení
(.sfuser). Tyto soubory není vhodné sdílet mezi vývojáři, nedávejte je
do verzovacího systému. V případě GITu doporučujeme přidat tyto přípony
do .gitignore.

## Projekt – build a deployment

Pro testování a deployment celého projektu je potřeba provést sestavení
(menu _Project – Build and run_ nebo _Project_ _– Build_). V nastavení
_User options_ je možné specifikovat výstupní adresář, kam se výsledný
projekt nakopíruje a odkud se případně otevírá z prohlížeče.

Složitějších deployment scénářů lze dosáhnout pomocí [PostBuildCommand](/cs/resources/PostBuildCommand.md)

### sfcmd.exe – ovládání z příkazové řádky

Součástí SF IDE je i utilita sfcmd.exe pro spouštění některých operací
z příkazové řádky. Umožnuje provést build a spustit testy. Nápovědu
vyvoláte spuštěním bez parametrů nebo s parametrem /?.
 
## Package

Do packages lze přidávat jednotlivé artefakty (_Form_, _Data entity_, …)
a libovolně je strukturovat do adresářů (_Folder_). Lze použít
doporučenou strukturu (_Add New Item – Standard folders_). Package
obsahuje svůj název a interní identifikátor, kterým je jednoznačně
určen. Ve vlastnosti package lze změnit alias, což je jméno, pod kterým
bude tento package vystupovat pro tento projekt.

Packages obsahují verzi. Každý projekt se ukládá s číslem verze a při
načítání projektu se zobrazuje varování, pokud package na disku
neodpovídá verzi, se kterou byl projekt uložen.

[HOME](/index.md)
