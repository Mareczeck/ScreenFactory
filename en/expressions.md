# Expressions

Expression is a way how to define some calculation. We use expressions
in computed attributes, validators and actions. We define them in
[ActionLang](actionlang.md).

Expressions contain arithmetics for NULL values. ActionLang is
type-based, incompatible types have to be explicitly converted (by
functions like _ToString_, _ToBool_ etc.). Editor for expressions and
actions has autocomplete (it may be explicitly called with
_CTRL+space_), so it is relativelly easy to find out which objects are
available in current context.

For simplicity, we don't use exceptions or error codes. All operations
have defined result under all circumstances and in cases where some
function cannot return standard result (ie. division by zero), they
demand fallback value as a parameter.

## Literals

- string – can be entered enclosed in double quotes; if you want to
  actually have a quote inside the literal, you can use backslash to
  escape - _\\"_. For this reason, you have to escape the backslash
  itself as well _\\\\_. You may escape other characters too, like
  _\\t_ but be mindful that the result is going to be generated to
  javascript where such characters may break the resulting script.
  This is true especially for \\n and \\r.
- integer - number optionally preceded with minus (ie. 5, -5)
- decimal - number optionally including dot and exponent (ie. 3, 3.5,
  1.0e10d)
- date, datetime
  - if it is needed to enter the constant in the code, enter it in
    format _'DyyyyMMdd'_ and _'DyyyyMMdd HHmmss'_
- boolean - constants _true_ and _false_
- null - in ActionLang, even null needs to have type. To test if
  something is null, you can use methods like _HasValue_ or _IsEmpty_.
  To create null literal in the code, you can use methods starting
  with _Default_ for each type.

ActionLang supports operator priority and changing this priority with
parenthesis. Comments may be written between \*/\*_ a _\*_/ or be started
with _//\* (these later ones are automatically ended by the end of the
line).

## Relational operators = &lt;&gt; &lt; &gt; &gt;= &lt;= in

Operations are comparing values. For null values we are trying to keep
the rule that whenever some operation involves null value, result is
going to be null as well. The exception is null=null returns true and
null&lt;&gt;null returns false.

Because this "ANSI" approach to null values can make the comparison
clumsy and hard to read, we have functions available that improves this
a bit - _isTrue_, _isFalse_, _isTrueOrDefault_ and _isFalseOrDefault_.
These never return true, always it is either true or false.

Operator **in** tests whether value is contained in a set, ie. _value in
\["1","2"\]_. If value is null and there is null value in the set as
well, it returns true, otherwise false.

## Ternary operator

Ternary operator has syntax

    condition ? expressionIfConditionIsTrue : expressionIfConditionIsFalseOrNull

It tests whether condition is true and if so, the result is the first
part after the questionmark otherwise it is the second part (the one
after colon).

## Logical operators or, and and not

These operators can be used only for bool expressions.

| X and Y | Returns null, if X or Y is null. Otherwise it returns false, if X or Y is false |
| ------- | ------------------------------------------------------------------------------- |
| X or Y  | Returns null, if X or Y is null. Otherwise it returns true, if X or Y is true   |
| not X   | Returns null, if X is null; true if X is false or false if X is true            |

## Arithmetic operators + - \*

These are traditional operators for numbers (integer or decimal). They
provide sum, difference and multiplication of two operands. If any
operand is null, result is null. Division is done through functions
_divide_, _divInt_, _mod_. There is no clear agreement on the result of
integer division for negative numbers, so in such case, fallback is
returned instead.

## Access to data

Data are available in certain contexts. They are access by their names
and potentially names of parent structures. These parts are separated by
dot. Examples are _name_, _this.name_, _subject.address.street_. Current
context name may be omitted while other contexts are available through
their names, ie. _form_, _globals_, _packages_.

To keep generated code as close as designed application, some keywords
that would class with used technologies are forbidden. For most
artefacts that have Name property, if you would enter such keyword, IDE
will automatically change it by adding underscore at the beginning.
Other than that, the keywords of javascript are forbidden in naming
things (see
[http:%%//%%mathiasbynens.be/notes/reserved-keywords](http:%%//%%mathiasbynens.be/notes/reserved-keywords)),
keywords of actionLang (var, and, or, not, in, true, false) and context
names (_attr_, _collection_, _enums_, _functions_, _globals_,
_metadata_, _this_, _packages_).

## Methods

It is possible to call synchronous methods (sometimes called as well
functions) in expressions. If they are global, you call them directly by
name (ie. _length(s)_) and pass parameters in parentheses. Parentheses
are mandatory even if there is no parameter (in such case they are
empty). If you are calling method on an object, you start with the name
of that object instance, ie. _addresses.count()_.

### Custom functions

It is possible to define custom functions for the project. Function is
defined in javascript and it declarase types and names of its parameters
and result type. To use such function later in actionLang, you can find
it on context _functions_, ie. _functions.myFn(73)_ or
_myPackage.functions.myFn(73)_ if it is in different pacakge.

Such function should be [pure
function](https://en.wikipedia.org/wiki/Pure_function), it should be
**static**, **deterministic** and it should not have side effect.

## Data contexts

Data are available in various contexts, and their availability is based
on where is the expression used. Expressions in data validator will have
different context than expression that is written on the right side of
assignment in action. Following table gives you general overview of
these contexts and their purpose.

| name                                                                 | type              | description                                                                                                                   |
| -------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| _this_                                                               |                   | Reference to current context, it varies based on the type of expression. Context methods can be called as this.<methodName>() |
| _attr_                                                               | attribute type    | Link to current attribute. Available only in data validators.                                                                 |
| _packages_.<packageName>                                             |                   | Access to package metadata                                                                                                    |
| > _.functions._<functionName>                                        | based on function | Custom function call                                                                                                          |
| > .metadata.<entityName>                                             |                   |                                                                                                                               |
| > .<name>                                                            | childStructure    | Through dot notation it is possible to access metadata of given data element                                                  |
| > .caption()                                                         | string            | Caption of given data element (metadata value)                                                                                |
| > .isRequired()                                                      | bool              | IsRequired of given data element (metadata value)                                                                             |
| > _.enums._<name>                                                    |                   |                                                                                                                               |
| > .<value name>                                                      |                   | Metadata of enum value                                                                                                        |
| > .enumCaption()                                                     | string            | Caption                                                                                                                       |
| > .enumValue()                                                       | string            | Enum value that is stored in data attribute                                                                                   |
| > _.globals._<jméno>                                                 | As a structure    | Global attribute                                                                                                              |
| <name>                                                               |                   |                                                                                                                               |
| Following properties and methods may vary based on current structure |                   |                                                                                                                               |
| > .<name>                                                            |                   | Dot notation allows you to get to the content of the structure; for data attribute it will return its value                   |
| > .owner()                                                           |                   | Parent structure                                                                                                              |
| > .hasValue()                                                        | bool              | True if attribute is not null or for if any inner attribute is not null                                                       |
| > .isValid()                                                         | bool              | True, if all potential inner attributes are valid and all validators are valid.                                               |
| > .validationErrorsCount()                                           | integer           | Number of validation errors on the conteiner and inner data elements                                                          |
| > .enumCaption()                                                     | string            | Caption of current enum value (available only for attributes of enum type)                                                    |
| > .enumValue()                                                       | string            | Value of current enum attribute (available only for those)                                                                    |
| > .count()                                                           | integer           | Number of items in the collection                                                                                             |
| > .collection()                                                      | kolekce           | Parent collection for given data element                                                                                      |

## Lambda methods

Special type of methods can be called on collections or collection-like
results. These methods are using parameter called lambda expression and
are using _current_. This parameter will have the type of the item of
given collection. It can be as well be renamed if you use syntax

    var x => expression

These methods do not change the collection in any way, always returning
new collection-like object (sometimes we refer them as enumerables).
These methods can be used in binding.

### New table 2

| .count()                      | integer                                  | Returns number of items                                                                                                                                  |
| ----------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .count(lambdaCondition)       | integer                                  | Returns number of items for which the condition is true                                                                                                  |
| .any()                        | bool                                     | True, if there is at least one item                                                                                                                      |
| .exists(lambdaCondition)      | bool                                     | True, if there is at least one item for which the condition is true                                                                                      |
| .selectFirst()                | item                                     | Returns first item; you should not call this unless you are sure there is at least one such item.                                                        |
| .selectFirst(lambdaCondition) | item                                     | Returns first item that fits the condition. You should only call this if you are sure there is such item, otherwise you should test it first with exists |
| .where(lambdaCondition)       | enumerable                               | Returns subset of items that fits the condition.                                                                                                         |
| .orderBy(lambdaSelector, asc) | enumerable                               | Returns the items ordered by given criteria either ascending or descending                                                                               |
| .clear(lambdaCondition)       | integer                                  | This can be called only from actions. It removes items that fit the criteria and returns their count.                                                    |
| .max(lambdaSelector)          | decimal, integer, string, date, dateTime | Maximum                                                                                                                                                  |
| .min(lambdaSelector)          | decimal, integer, string, date, dateTime | Minimum                                                                                                                                                  |
| .sum(lambdaSelector)          | decimal, integer                         | Sum                                                                                                                                                      |

Lambda conditions have to return boolean. Lambda selectors return some
value.

Methods that return enumerable can be chained, ie.

    form.collection
      .where(current.index() > 2)
      .where(current.Mass > 1000)
      .sum(var x => x.Netto)

## Standard methods

Lets mention few standard methods that are worth noticing. For complete
list check list of standard methods.

- hasValue/isEmpty – check whether some data element is null or not
- isTrue, isFalse, isTrueOrDefault, isFalseOrDefault – test value for
  true, false, true or null, false or null etc. They always return
  true or false, never null (unlike comparison operators).
- toString – converts value to string
- toDate, toDateTime, toBoolean, toDecimal, toInt, ... – convert value
  to given type; second parameter is fallback value if the conversion
  cannot be done
- getDate, getDateTime – return current date or datetime
- defaultBool, defaultInt, ... defaultFromValue – return null value of
  given type
- stopDebugger – generate instruction for browser console to stop
  debugging at given point

## Action methods

Following methods are only available in actions, not in expressions.

### New Table 3

| .clear()                        | -      | Sets attribute or inner attributes to null. For collection it removes all items instead.                            |
| ------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| .isTouched()                    | bool   | Checks whether the data element was changed by user since form start (or since it was reseted by setTouched method) |
| .setTouched(isTouched:bool)     | -      | Marks attribute as changed by user (see isTouched). Works recursivelly.                                             |
| Collections and structures only |        |                                                                                                                     |
| .fromJson(json:string)          | bool   | Fills the structure or collection from JSON string. Returns false if the parameter did not contain valid json.      |
| .toJson()                       | string | Converts the content to JSON string.                                                                                |
| .toJson(ignoreUnderscored)      | string | Converts the content to JSON string, optionally ignoring attributes which names start with underscore.              |
| Collections only                |        |                                                                                                                     |
| .addItem()                      | Item   | Adds empty item to collection and returns it.                                                                       |
| .removeItem(index:integer)      |        | Removes item from the collection on given index.                                                                    |
| Collection item only            |        |                                                                                                                     |
| .removeMe()                     |        | Removes item from collection.                                                                                       |

[HOME](1index.md)
