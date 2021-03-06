# FAQ – ČKD (často kladené otázky)

**Q: Jak na tisky?**
A: v současnosti není tisk nijak podporován, je nutné provádět na
serveru, typicky vytvořením PDF souboru. Zvažujeme možnost vytisknout
formulář, vývojář by si tak vytvořil formulář pro účely tisku a voláním
nějaké funkce by jej uživatel mohl vytisknout.

**Q: Proč mi aplikace nechce komunikovat s mým serverem?**
A: zkontrolujte si, zda máte na serveru implementované tzv. CORS – jde
o ochranu serveru proti používání z aplikací, které nepochází ze stejné
domény.

**Q: Lze aplikaci vystavit přes https?**
A: Ano a je to i doporučovaný postup. Pokud ale aplikace přistupuje ke
zdrojům, které nejsou https, mohou některé prohlížeče takové zdroje
blokovat.

**Q: jak obarvím komponentu XXX?**
A: Jak psát samotný css soubor je mimo rámec této dokumentace, zkuste
pomocí vývojových nástrojů prohlížeče nastavit barvy a poté z toho
odvodit, jak by měla css třída vypadat.

**Q: Lze aplikaci krokovat?**
A: Snažili jsme se, aby generovaný kód byl čitelný, krokovat tedy lze
pomocí nástrojů prohlížeče. Zkuste jeho dokumentaci. V případě Chrome
lze použít plugin pro ladění knihovny knockoutjs. Nicméně vzhledem
k deklarativnímu přístupu nemá aplikace žadný „začátek“ a „konec“.

**Q: Jak lze obarvit řádek dat podle stavu záznamu?**
A: Použijte Css class, do kterých přidáte tolik možností, kolik máte
stavů. Podmínku každé css class nabindujte na počítanou property, která
porovnává aktuální stav s hodnotou (nebo hodnotami), pro kterou je css
určeno.

**Q: Jak nasadím aplikaci na IIS s NTLM ověřováním uživatelů?**
A: Aplikaci lze nasadit jako statické soubory na jakýkoliv webový
server. Je nutné zvážit kešovací strategii, pokud si browser zapamatuje,
že daný soubor lze kešovat, již se serveru nezeptá a neexistuje způsob,
jak o tom browser přesvědčit. Výsledná aplikace je vysoce optimalizovaná
a obsahuje minimum souborů, lze tedy použít kešování na souboru, resp.
přístup GET (If modified since)-302(Not modified). Ověřování NTLM
uživatelů se děje na serveru, klient tedy musí udělat nějaký dotaz na
server (ideálně ve stejné doméně jako klient), tento dotaz se ověří a
vrátí např. formou REST služby vlastnosti uživatele. Pozor, Internet
Explorer NTLM posílá pouze do „Intranet zóny“, do které je nutné server
ručně přidat, nebo název nesmí obsahovat tečky (tedy mujtest je
vpořádku, ale mujtest.internal nebo 10.20.30.40 už ne).

**Q: Co je vlastně obsahem výstupního adresáře?**
A: index.html, sf.js, atd.

**Q: Jak řešit uživatelská práva?**
A: práva nejsou v SF implementována, nicméně lze např. použít 
globální objektu uživatel, který bude obsahovat atributy (lze i
počítané), zda je uživatel v té které roli (např. IsReader, IsAdmin,
IsWriter). Na základě těchto atributů lze zakazovat (bindingem na
IsVisible, popř. IsEnabled) jednotlivé funkce (resp. UI prvky).

**Pozor!** *Z principu věci je naprosto nutné práva vždy řešit na serveru
(to že něco nelze udělat pomocí klienta neznamená, že útočník data
nepodstrčí jinou cestou, většinou na to stačí nástroje prohlížeče –
F12), kontroly a omezení na klientovi mohou být stejná, ale často
postačí „menší“, než na serveru.*


**Q: Kde jsou komponenty Menu, Tab, DataGrid, ScrollBar, ListBox,
ProgressBar, a další?**
A: Zkuste sffw, ostatní prostě nejsou. Některé nejsou na webu až zas tak časté, jiné
by se stejně lišily při každém použití. Nové komponenty budou postupně
vznikat dle potřeb a budou postupně integrovány do nových verzí
aplikace. Některé komponenty naleznete v balíku sffw (není součástí
distribuce SF).


[HOME](/index.md)
