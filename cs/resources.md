# Resources

Do projektu lze přidávat další soubory (_Resource_), které mohou sloužit
k různým účelům. Resources mají tři důležité vlastnosti:

- Zdroj
  - přímo v projektu (pak se ukládá jako soubor). Při
    vytáření lze do projektu zkopírovat již existující soubor.
- Způsob výstupu (_Action_)
  - Zda a kam se má resource nakopírovat v cílové aplikaci
    - _None_ – většinou pomocné soubory, která nemají být ve
      výsledné aplikaci (např. generátory komponent, konfigurační
      soubory pro IDE, apod.)
    - _CopyToResources_ – soubor se zkopíruje do výstupu
    - _PostBuildCommand_ – soubor je typu command batch a spustí se po každém buildu
- _Output name_ -  specifikuje, jak se bude soubor jmenovat (bude ve výstupu uložen v adresáři resources)
- Způsob vazby v aplikaci (_Linker Action_)
  - Dle přípony se automaticky vybere, lze toto lze změnit
    - **None** – nic, soubor není z aplikace nijak odkazován
    - **Css style** – odkaz na soubor se přidá do výstupu jako další CSS stylesheet (pomocí `<link href=…>`)
    - **Javascript** – odkaz na soubor se přidá do výstupu jako javascript (jako `<script src=…>`)
    - **Favicon** – ikona, která se bude zobrazovat v browseru
    - *Pozn.: ostatní možnosti nejsou implementovány*

Resources lze také použít pro uložení textových (txt, md, json, xml,
atd…) souborů v projektu, jejichž zpracování není potřeba (jde o
dokumentaci), nebo je jinak obsaženo v aplikaci.

IDE umí upravovat některé typy textových souborů (txt, md, js, json,
xml) a zobrazovat obrázky s běžnými příponami (png, jpg), resources však
mohou být jakéhokoliv typu.

Do projektu lze přidat resources se speciálním významem:

- Textový soubor defaults.ini – v tomto souboru lze definovat výchozí
  hodnoty vlastností každé komponenty, které se použijí při jejím
  vytváření. Lze vyvolat přes kontextové menu na _Package - add more…
  Default property values_.
- Podobných .ini souborů je více (např. pro import MTS, nastavení překladače, apod.), více se dozvíte u jednotlivých funkcionalit.
- [postbuildcommand](/cs/resources/PostBuildCommand) – příkazy pro windows shell, které se provedou po
  každém buildu

Většina resources není načítána do paměti IDE s projektem, ale až při
potřebě jejich použití. To umožňuje měnit resources přímo na disku bez
potřeby přenačtení projektu v IDE. Pokud dojde ke konfliktu (změna v IDE
i na disku), zobrazí se při ukládání dialog, kde lze problémy ručně
vyřešit.

[HOME](/index.md)
