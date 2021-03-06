# API object – přístup k další funkcionalitě

API objekty slouží k zpřístupnění další funkcionality komponentám nebo
akcím. Typickým příkladem je komunikace s REST serverem s využitím JSON
formátu, ukládání lokálních dat, čtení GPS polohy, apod. API objekty
mohou být na formuláři, nebo globální a mohou obsahovat nastavitelné
vlastnosti. Vlastnosti se navíc ukládají do souboru apiConfig.js, který
narozdíl od většiny ostatních javascriptů není spojen do jednoho bundlu
ani minifikován a je tedy možné v něm snadno změnit konfiguraci (např.
mít diky tomu různá url na server na různých prostředích).

API objekty svou funkcionalitu zpřístupňují dvěma způsoby

- **Kontraktem** – tj. API objekt o sobě prohlásí, že implementuje
  nějaký kontrakt, např. „IDataSource“. Takový API objekt lze poté
  použít na komponentě, která v nějaké své vlastnosti tvrdí, že tato
  vlastnost musí být API objekt s nějakým kontraktem (v tomto případě
  „IDataSource“). Jak takový kontrakt implementačně vypadá, musí
  dokumentovat požadující komponenta, nebo vystavující API objekt.
  Typicky jde o nějaké veřejné API v javascriptu. Vývojář ve
  ScreenFactory to naštěstí většinou nepotřebuje vědět, pro něj je
  důležité, že daný API objekt a daná komponenta jsou ochotny
  spolupracovat.
- **Metodami** – tj. API objekt umožňuje z akcí zavolat metody, které
  něco dělají. Co dělají a jaké mají parametry je popsáno v tzv.
  manifestu (viz vlastní api objekty).

Některé API objekty lze dávat pouze na formulář, některé pouze jako
globální. Některé jsou speciální a nelze je vytvářet vůbec.

Většina API objektů je externí a je obsažena v projektu [sffw](sffw.md). Za
zmínku však stojí interní API objekt ConfigValue.

## ConfigValue

API objekt, který má konfigurovatelnou hodnotu "Value". Tato hodnota je
poté přístupná z akcí a javascriptu. Účelem tohoto objektu je právě to,
aby bylo možné tuto hodnotu změnit později např. v rámci nasazení na
prostředí.

[HOME](/index.md)
