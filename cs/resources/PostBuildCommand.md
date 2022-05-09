# PostBuildCommand

Při složitějších scénářích deployementu (např. kopírování na více míst,
dodatečná manipulace s výsledkem apod.) je možné do projektu přidat
resources typu cmd batch (přípona cmd) a nastavit Action na
_PostBuildCommand_. Takový resource se spustí po každém buildu. Dávka je
spuštěna s následujícími parametry:

_{dávka} {Target folder} {Project name} {ProjectFile}
{Build_output_file}_

Zároveň se nastaví některé systémové proměnné (SF_xxx), které jsou pro
další použití čitelnější. Pro kompletní výpis proměnných si vytvořte
nový projekt, přidejte výchozí postBuildCommand. Výsledek si zobrazíte
v okně Output/Build

| Jméno              | Popis                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| SF_BUILDMODE       | DEBUG nebo RELEASE                                                                                              |
| SF_NODE            | Cesta k node.exe. Ve spojení s SF_TEMPPATH lze použít pro spuštění složitějšího prográmku v javascriptu         |
| SF_OUTPUT          | Výsledný soubor aplikace (index.html)                                                                           |
| SF_OUTPUTPATH      | Cesta k výsledku buildu                                                                                         |
| SF_PACKAGE_xxx_VER | Verze package xxx, každý package vytvoří novou proměnnou, např. SF_PACKAGE_main_VER                             |
| SF_PROJECTFILE     | Soubor s projektem (sfproj nebo sfprojx)                                                                        |
| SF_PROJECTNAME     | Jméno projektu                                                                                                  |
| SF_TEMPPATH        | Dočasná cesta, kam se kopírují mezivýsledky sloužící pro build. Zde lze nalézt všechny resources a dále použít. |

Jako šablonu lze použít pravý klik na _Package –_ _Add -_ _New Item_ _–
Other – Post build command_.

[HOME](/index.md)