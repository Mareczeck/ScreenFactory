# List of standard functions

## Common functions

method **defaultFromValue**( from : T ) returns T

returns NULL value for argument type

method **hasValue**( Value : T ) returns Bool

Returns false if given parameter is null, true otherwise.

method **stopDebugger**( )

In DEBUG mode, stops browser in debugger.

method **toString**( Value : T ) returns String

Returns string representation of given Value parameter.

## Bool functions

method **defaultBool**( ) returns Bool

returns NULL value for Boolean type

method **defaultFromValue**( from : T ) returns T

returns NULL value for argument type

method **hasValue**( Value : T ) returns Bool

Returns false if given parameter is null, true otherwise.

method **isFalse**( Value : Bool ) returns Bool

Returns true if given argument is false, false otherwise (i.e. argument
is true or null).

method **isFalseOrDefault**( Value : Bool ) returns Bool

Returns true if given argument is false or null, false otherwise (i.e.
argument is true).

method **isTrue**( Value : Bool ) returns Bool

Returns true if given argument is true, false otherwise (i.e. argument
is false or null).

method **isTrueOrDefault**( Value : Bool ) returns Bool

Returns true if given argument is true or null, false otherwise (i.e.
argument is false).

method **toRawString**( Value : Bool ) returns String

Returns locales-invariant string representation of given Value parameter
as "true" or "false".

method **toString**( Value : T ) returns String

Returns string representation of given Value parameter.

## Date functions

method **addDays**( Value : Date , Days : Integer ) returns Date

returns given date Value after adding given Days.

method **addMonths**( Value : Date , Months : Integer ) returns Date

returns given date Value after adding given Months.

method **addYears**( Value : Date , Years : Integer ) returns Date

returns given date Value after adding given Years.

method **day**( Value : Date ) returns Integer

returns day part of given date Value.

method **dayOfWeek**( Value : Date ) returns Integer

returns day of week of given date Value. Zero means first day of week in
current culture

method **daysBetween**( FirstValue : Date , SecondValue : Date ) returns
Integer

returns number of days beween two given dates.

method **defaultDate**( ) returns Date

returns NULL value for Date type

method **defaultFromValue**( from : T ) returns T

returns NULL value for argument type

method **getDate**( ) returns Date

returns current date. Usable only from actions.

method **hasValue**( Value : T ) returns Bool

Returns false if given parameter is null, true otherwise.

method **month**( Value : Date ) returns Integer

returns month part of given date Value.

method **toDateTime**( Value : Date ) returns DateTime

Returns given date Value parameter converted to datetime.

method **toRawString**( Value : Date ) returns String

Returns locales-invariant string representation of given Value parameter
in the form "yyyy-MM-dd".

method **toString**( Value : T ) returns String

Returns string representation of given Value parameter.

method **year**( Value : Date ) returns Integer

returns year part of given date Value.

## DateTime functions

method **addDays**( Value : DateTime , Days : Integer ) returns DateTime

returns given datetime Value after adding given Days.

method **addHours**( Value : DateTime , Hours : Integer ) returns
DateTime

returns given datetime Value after adding given Hours.

method **addMinutes**( Value : DateTime , Minutes : Integer ) returns
DateTime

returns given datetime Value after adding given Minutes.

method **addMonths**( Value : DateTime , Months : Integer ) returns
DateTime

returns given datetime Value after adding given Months.

method **addSeconds**( Value : DateTime , Seconds : Integer ) returns
DateTime

returns given datetime Value after adding given Seconds.

method **addYears**( Value : DateTime , Years : Integer ) returns
DateTime

returns given datetime Value after adding given Years.

method **day**( Value : DateTime ) returns Integer

returns day part of given datetime Value.

method **dayOfWeek**( Value : DateTime ) returns Integer

returns day of week of given datetime Value. Zero means first day of
week in current culture

method **daysBetween**( FirstValue : DateTime , SecondValue : DateTime )
returns Integer

returns number of days beween two given datetimes.

method **defaultDateTime**( ) returns DateTime

returns NULL value for DateTime type

method **defaultFromValue**( from : T ) returns T

returns NULL value for argument type

method **getDateTime**( ) returns DateTime

returns current date and time. Usable only from actions.

method **hasValue**( Value : T ) returns Bool

Returns false if given parameter is null, true otherwise.

method **hour**( Value : DateTime ) returns Integer

returns hour part of given datetime Value.

method **hoursBetween**( FirstValue : DateTime , SecondValue :
DateTime ) returns Integer

returns number of hours beween two given datetimes.

method **minute**( Value : DateTime ) returns Integer

returns minute part of given datetime Value.

method **minutesBetween**( FirstValue : DateTime , SecondValue :
DateTime ) returns Integer

returns number of minutes beween two given datetimes.

method **month**( Value : DateTime ) returns Integer

returns month part of given datetime Value.

method **second**( Value : DateTime ) returns Integer

returns seconds part of given datetime Value.

method **secondsBetween**( FirstValue : DateTime , SecondValue :
DateTime ) returns Integer

returns number of seconds beween two given datetimes.

method **toDate**( Value : DateTime ) returns Date

Returns day part of given datetime Value.

method **toRawString**( Value : DateTime ) returns String

Returns locales-invariant string representation of given Value parameter
in the form "yyyy-MM-dd HH:mm:ss".

method **toString**( Value : T ) returns String

Returns string representation of given Value parameter.

method **year**( Value : DateTime ) returns Integer

returns year part of given datetime Value.

## Decimal functions

method **defaultDecimal**( ) returns Decimal

returns NULL value for Decimal type

method **defaultFromValue**( from : T ) returns T

returns NULL value for argument type

method **divide**( A : Decimal , B : Decimal , Fallback : Decimal )
returns Decimal

returns float division A/B. If B is zero, Fallback is returned.

method **divInt**( A : Decimal , B : Decimal , Fallback : Integer )
returns Integer

returns integer part of division A/B. A must be &gt;=0, B must be &gt;0,
otherwise Fallback is returned.

method **hasValue**( Value : T ) returns Bool

Returns false if given parameter is null, true otherwise.

method **logarithm**( Value : Decimal ) returns Decimal

returns 10-based logarithm of given Value. Value must be greather than
zero, otherwise null is returned.

method **logarithm**( Value : Decimal , Base : Decimal ) returns Decimal

returns logarithm of given Value based on given Base. Value must be
greather than zero, otherwise null is returned.

method **power**( Value : Decimal , Power : Decimal ) returns Decimal

returns given decimal Value powered to specified second parameter.

method **round**( Value : Decimal ) returns Integer

returns integer value of rounded Value parameter.

method **round**( Value : Decimal , Precision : Integer ) returns
Decimal

returns integer value of rounded Value parameter with specified
precision.

method **toInt**( Value : Decimal ) returns Integer

Returns integer part of given Value decimal parameter.

method **toRawString**( Value : Decimal ) returns String

Returns locales-invariant string representation of given Value parameter
in the form "decimals.fractions".

method **toString**( Value : T ) returns String

Returns string representation of given Value parameter.

method **trunc**( Value : Decimal ) returns Integer

returns integer part of given Value parameter.

## Integer functions

method **defaultFromValue**( from : T ) returns T

returns NULL value for argument type

method **defaultInt**( ) returns Integer

returns NULL value for Integer type

method **hasValue**( Value : T ) returns Bool

Returns false if given parameter is null, true otherwise.

method **mod**( A : Integer , B : Integer , Fallback : Integer ) returns
Integer

returns modulus of division A/B. A must be &gt;=0, B must be &gt;0,
otherwise Fallback is returned.

method **toRawString**( Value : Integer ) returns String

Returns locales-invariant string representation of given Value parameter
in the form "digits".

method **toString**( Value : T ) returns String

Returns string representation of given Value parameter.

## String functions

method **defaultFromValue**( from : T ) returns T

returns NULL value for argument type

method **defaultString**( ) returns String

returns NULL value for String type

method **hasValue**( Value : T ) returns Bool

Returns false if given parameter is null, true otherwise.

method **indexOf**( Value : String , Substring : String ) returns
Integer

Returns index (from 1) of first occurence (from left) of Substring in
given Value string. If Value doesn't contains SubString, returns 0. If
Value or Substring is null, function returns null.

method **indexOf**( Value : String , Substring : String , FromIndex :
Integer ) returns Integer

Returns index (from 1) of first occurence (from left) starting at
FromIndex of Substring in given Value string. If Value doesn't contains
SubString, returns 0. If Value or Substring is null, function returns
null.

method **lastIndexOf**( Value : String , Substring : String ) returns
Integer

Returns index (from 1) of last occurence (or first from left) of
Substring in given Value string. If Value doesn't contains SubString,
returns 0. If Value or Substring is null, function returns null.

method **length**( Value : String ) returns Integer

Returns length of given Value string. If it is empty, this function
returns 0.

method **newGuid**( ) returns String

Returns new generated GUID (Unique identifier). It is using random
numbers generator and produces valid UUID by RFC4122.

method **regularExpressionReplaceString**( Value : String , Regex :
String , ReplaceWith : String ) returns String

Returns string with all matches of given Regex regular expression
(javascript notation) replaced to given ReplaceWith. If Value is null,
returns null. If regex is null or invalid, returns null. If ReplaceWith
is null/empty, matches are removed from source string.

method **replaceString**( Value : String , ToReplace :
String , ReplaceWith : String ) returns String

Returns string with all matches of given ToReplace string replaced to
given ReplaceWith. If Value or ToReplace is null, returns null. If
ReplaceWith is null/empty, matches are removed from source string.

method **stringFormat**( Format : String , Params... : String ) returns
String

Returns string with format parameter replaced placeholders like {0} with
corresponding parameter.

method **substring**( Value : String , Index : Integer , Length :
Integer ) returns String

Returns corresponding part of given Value string. It starts at Index
(from 1), and has maximum of Length characters. If any of parameters is
null, function returns null.

method **substring**( Value : String , Index : Integer ) returns String

Returns corresponding part of given Value string from Index (starts at

1. to the end. If any of parameters is null, function returns null.

method **toBoolean**( Value : String , Fallback : Bool ) returns Bool

Returns boolean value of given Value parameter. When input parameter is
not convertible to boolean (i.e. is not "false" or "true" in any
letter-case), returns Fallback value.

method **toDate**( Value : String , Fallback : Date ) returns Date

Returns date value of given Value parameter. When input parameter is not
convertible to date, returns Fallback value.

method **toDateTime**( Value : String , Fallback : DateTime ) returns
DateTime

Returns datetime value of given Value parameter. When input parameter is
not convertible to datetime, returns Fallback value.

method **toDecimal**( Value : String , Fallback : Decimal ) returns
Decimal

Returns decimal value of given Value parameter. When input parameter is
not convertible to decimal, returns Fallback value.

method **toInt**( Value : String , Fallback : Integer ) returns Integer

Returns integer value of given Value parameter. When input parameter is
not convertible to integer, returns Fallback value.

method **toLower**( Value : String ) returns String

Returns string with all characters in lower case.

method **toString**( Value : T ) returns String

Returns string representation of given Value parameter.

method **toUpper**( Value : String ) returns String

Returns string with all characters in upper case.

method **trim**( Value : String ) returns String

Returns given Value string trimmed from both sides of white characters
(spaces, tabs, and special non-visible characters).

method **trimLeft**( Value : String ) returns String

Returns given Value string trimmed from left side of white characters
(spaces, tabs, and special non-visible characters).

method **trimRight**( Value : String ) returns String

Returns given Value string trimmed from right side of white characters
(spaces, tabs, and special non-visible characters).

method **validateAgainstRegularExpression**( Value : String , Regex :
String ) returns Bool

Returns true, if given Value string matches given Regex regular
expression (javascript notation). If any parameter is null, or regex is
not valid, function returns null.

[HOME](1index.md)
