# Project options

Některé možnosti se nastavují kliknutím do kořene projektového stromu
(SF Project), některé v menu volbou _Project-Project options_.
Existuje ještě uživatelské nastavení [_Edit-Preferences_](/cs/ide#preferences-%E2%80%93-nastaven%C3%AD-ide).

Ve vlastnostech projektu se nastavuje jeho jméno, popis, velikost okna
aplikace, výchozí formulář (_Startup form_), lokalizace (viz
Lokalizace).
![image.png](/.attachments/image-1ebc98be-96be-48c4-9a47-64f73e6b32be.png =250x)

V nastavení projektu (volba _Project-Project options_) je několik
záložek, kterými lze řídit detailní nastavení projektu.

**Project**
nastavení sdílené v rámci projektu, povolení lokalizace, některé experimentální nastavení, parametry generování testovacích dat.
Default decimal serialization - viz [Decimal a přesnost](/cs/data.md#decimal-a-velká-přesnost)
![image.png](/.attachments/image-f442a535-669c-4630-9d64-387c84777176.png =400x)

**Visual settings**
barvy, fonty, rozměry a další nastavení použité pro komponenty. Z některých parametrů se generuje projektový styl v CSS (cascading style sheets).
![image.png](/.attachments/image-63df8a50-548e-4e08-88b9-f6e512070acb.png =300x)


**Default Data-to-form settings**
výchozí nastavení pro převvod dat na komponenty (viz Data-to-form).<br>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         **User options**
nastavení, které je platné pouze pro aktuálního vývojáře. Ukládá se do samostatného souboru s příponou sfuser a není určeno pro sdílení v projektu/verzovacím systému. Lze zde nastavit.
 - Deployment path – cesta, kam se projekt zkopíruje po zbuildění. Může být prázdná, pak se používá TEMP. V Deployment path cleanup lze zaškrtnout, že obsah adresáře se vždy smaže (pozor, může obsahovat např. konfigurační soubory pro webový server apod.).
 - Project start url – url, které se otevře v browseru po zbuildění pomocí build&run. Pokud není zadáno, otevírá se výsledek buildu jako soubor.
 - Local server port - v některých speciálních případech je potřeba aplikaci hostovat na http, nestačí protokol file://. V tom případě zadejte buď specifický port, nebo 0 a aplikace nějaký volný vybere, zbuilděná aplikace pak bude k dispozici na http protokolu
 - Další vlastnosti jsou určeny pro zvýšení rychlosti práce v IDE na úkor nějakých funkcí apod.
 
![image.png](/.attachments/image-098bfd07-1dea-42c3-9c37-70d23d3ef40b.png "User options" =350x)

