### Testy akcí

Pro každou akci, která není handlerem události lze vytvořit sadu testů.
Testy se vytváří na záložce test a je vhodné je logicky členit na částí
Act – Arrange – Assert.

Samotné testy nejsou nic jiného než opět akce, které se zapisují pomocí
actionlangu (případně javascriptu). Jedinou věcí navíc je možnost volání metod
_Assert.IsTrue(podmínka)_ a _Assert.IsEqual(hodnota1, hodnota2)_. Metoda
IsTrue vyhodnotí, zda je podmínka true. Metoda IsEqual vyhodnotí, zda se
dvě hodnoty rovnají. Pokud podmínka nebo rovnost neplatí, je výsledek
testu označen jako ERROR.

Testy lze spouštět v režimu "všechny testy pro akci“, nebo "všechny
testy v projektu“

Během spouštění testů API objekty neexistují. Pokud je třeba testovat
akci, která obsahuje api objekty, je třeba je mockovat.

[HOME](/index.md)
