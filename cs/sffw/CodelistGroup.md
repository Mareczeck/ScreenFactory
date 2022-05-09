[HOME](/index)
# CodelistGroup

CodelistGroup slouží pro načtení více číselníků najednou. Využívá pro to [OData Batch Processing](https://www.odata.org/documentation/odata-version-3-0/batch-processing/). Načtení tak proběhne jednou request/response výměnou narozdíl od scénáře, kdy by se Codelisty načítaly jeden po druhém samostatnými requesty. CodelistGroup tak má při načtení dat lepší performance a může vést i k lepší přehlednosti kódu.

Číselníky lze načíst dvěma způsoby, synchronně a asynchronně. Metoda `loadDataAsync(date)` pozastaví běh akce (podobně jak tatáž metoda na Codelist) a akce pokračuje až poté, co jsou data číselníku načtena (nebo načtení selže). Druhým způsobem načtení dat je metoda `startBackgroundLoading(date)`, která začne data načítat, ale ihned pokračuje na další příkazy akce. O tom, že se číselníky načetly na pozadí se lze dozvědět buď pomocí události `OnBackgroundLoadingFinished`, nebo lze na už probíhající načtení počkat pomocí metody `finishBackgroundLoadingAsync()`. Parametr `date` v obou těchto metodách pro načtení typu DateTime a může obsahovat časový okamžik, ke kterému mají být číselníkové hodnoty načteny. Toto se však stále řídí vlastností `FilterByDate` na objektech Codelist a pokud tato vlastnost není true, datum se nepoužije.

Načtení číselníků se může podařit i jen částečně, čili některé číselníky se načtou, některé ne.

Metody loadDataAsync a finishBackgroundLoadingAsync vrací objekt s následujícími metodami:

- isError() vrací true, pokud proběhlo vše v pořádku a false, pokud se nepovedlo načíst některé číselníky nebo načítání selhalo úplně
- getErrorMessage() vrací anglicky chybovou zprávu, která je buď obecná, nebo vyjmenuje číselníky, které se nepovedlo načíst

Událost OnBackgroundLoadingAsync v této chvíli tento objekt jako parametr nést neumí, je ale možné jako workaround použít finishBackgroundLoadingAsync, který vrátí výsledek posledního načítání i přes to, že už doběhlo.