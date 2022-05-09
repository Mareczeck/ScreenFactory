[HOME](/index)

# FilteredCodelist

Tento API objekt umožňuje filtrovat číselník v paměti (např. Codelist nebo jiný FilteredCodelist). Filtrovat lze pozitivním či negativním výčtem (metody `includeItemsBy...` nebo `excludeItemsBy...`).

Při kombinaci filtrů se nejprve uplatní všechny exclude filtery (spojené operátorem OR) a poté všechny include filtery (opět spojené OR). Mezi include a exclude filtery je operátor AND.

Po nastavení filtru je třeba zavolat `commit()`. Filter lze vymazat metodou `reset()`.