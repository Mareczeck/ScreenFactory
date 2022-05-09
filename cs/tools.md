# Nástroje

## CaptionsForSummary

Generuje csv, která lze použít jako vstup pro generování struktury pro [ErrorPointerMap](sffw/ErrorPointerMap.md). Vstupem je zdrojový kód projektu (resp. package), jak si ho ukládá ScreenFactory a výstupem csv soubor pro každou entitu v package. V tomto výstupu jsou zohledněny includy jiných entit a odkazy do lokalizací.

Zdrojový kód je součástí sffw repository, build jednotlivých verzí je k dispozici v adresáři \\vm-syfy\Tools\CaptionsForSummary.

Tool je třeba spustit s parametrem *packageName*, který obsahuje jméno package, ve kterém jsou umístěny lokalizace. Dalšími dvěma nepovinnými parametry je vstupní a výstupní adresář. Pokud nejsou použity, vstupem bude adresář, kde nástroj leží a výstup je generován do podadresáře _validationCSVs.