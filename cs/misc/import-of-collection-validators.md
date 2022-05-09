# Import Collection validátorů

Validace na kolekcích se při importování z metasystému vždy importují jako Item validátory a analytik je pak musí odebrat v metasystému z importovaných zpráv, odebrat naimportovaný Item validátor a založit Collection validátor, aby zamezil opětovnému naimportování Item validátorů.

Verze Screen Factory 1.92 a novější umožňuje se těmto krokům vyhnout. Při re-importu zpráv Screen Factory prochází oba seznamy, tj. Collection Validators i Item Validators a pokud najde validaci s příslušným _<MtsImportOptions.MTS.ID>_ a _<MtsImportOptions.MTS.Type>_, tak tuto validaci přeskočí a nebude se pokoušet ji založit jako nový Item validátor.

## Důvod

Při importování podmínek a pravidel z metasystému do Screen Factory se nedokázalo určit, zda se validace váže na prvek kolekce nebo na celou kolekci. Pokud se validace týkala celé kolekce, ztrácelo se spojení mezi validací v metasystému a Screen Factory, tudíž pokud se udála nějaká změna na validace v metasystému, následný re-import změnu nepropsal. Při dodržení postupu níže se uchová spojení mezi validacemi v metasystému a Screen Factory.

## Postup

V XML souboru (export z metasystému) je potřeba dohledat příslušný _<Validator>_ v _<ItemValidators>_, který se má naimportovat jako Collection validátor a celý ho přesunout do _<CollectionValidators>_. Pokud _<CollectionValidators>_ neexistuje, je třeba ho založit na stejné úrovni jako _<ItemValidators>_. Klíčové je přestěhování elementů _<MtsImportOptions.MTS.ID>_ a _<MtsImportOption.MTS.Type>_, podle kterých import dohledává již existující validátory.

Pokud neexistuje žádný jiný validátor a po přesunutí validátoru zůstane _<ItemValidators>_ prázdné, tak je možné ho tak ponechat nebo celý element odebrat.

Po re-importu validace zůstane v Collection Validators a nezaloží se v Item Validators.

