[HOME](/index.md)

# ComplexEditor

ComplexEditor umožňuje editovat datovou strukturu, která není předem známá a vznikne až v runtime. Vznikl pro editor číselníků pro Černou horu a Srbsko. Server poskytuje ke každému číselníku metadata na základě kterých ComplexEditor vykreslí formulář pro jejich editaci.

## Properties

| Property   | Význam |
| - | - |
| Definition | JSON, který obsahuje definici struktury a nepovinně i výchozí hodnoty |
| Data json  | Tato property poskytuje uživatelem zadané hodnoty struktury v JSON formátu |
| Is data valid | Boolean hodnota zda hodnoty struktury splňují validační pravidla daná metadaty |

Příklad definice:

```json
    {
        "metadata": [
            {
                "Name": "str",
                "Caption": "String with caption",
                "DataType": "string",
                "IsRequired": true
            },
            {
                "Name": "intg",
                "DataType": "integer",
                "Disabled": true
            },
            {
                "Name": "dec",
                "DataType": "decimal"
            },
            {
                "Name": "dt",
                "DataType": "date"
            },
            {
                "Name": "tm",
                "DataType": "dateTime"
            },
            {
                "Name": "bool",
                "DataType": "bool"
            }
        ],
        "initialData": {
            "str": "x",
            "intg": 423,
            "dec": "3.5",
            "dt": "2022-03-10",
            "tm": "2022-03-05T12:00:00.000",
            "bool": true
        }
    }
```

Metadata jsou JSON pole objektů. Tyto objekty by měly odpovídat této typescript definici (viz [ComplexEditorModel.ts](https://tfsecs.solitea.cz/D1SourceCode/_git/sffw?path=%2Fsrc%2FComplexEditor%2FComplexEditorModel.ts)):

```typescript
    interface IAttMetadata {
        Name: string;
        DataType: 'string'|'integer'|'decimal'|'date'|'dateTime'|'bool';
        Caption?: string;
        IsRequired?: boolean;
        MaxLength?: number; /* only for string */
        Precision?: number; /* only for decimal */
        Disabled?: true;
        Hidden?: true;
    }
```