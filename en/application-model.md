# Application model

Building application in ScreenFactory is based on design pattern
[MVVM](https://en.wikipedia.org/wiki/Model–view–viewmodel) (Model - View

- ViewModel). Model is the business model, sometimes called domain model
  as well. View is the UI the user sees and interacts with. ViewModel is
  an adapter between the model and the View. Important part of the pattern
  is Binding that connects ViewModel and View. Binding is a mechanism that
  is synchronizing these two parts and that is propagating any changes in
  one of them to the other. Any change in ViewModel (data) is that way
  immediatelly reflected in UI and any change in UI (typically by user
  interaction) is propagated back to ViewModel. Some components may not
  propagate the changes immediately (ie. TextBox binding is not by default
  changing the attribute with every keystroke but instead sends the change
  when user focus leaves the component or hits ENTER).

While not part of the pattern name, the controller is still present as
in similar patterns and it is responsible for directing the program
flow, ie. switch current view, load and save data etc.

This pattern is implemented in ScreenFactory in following way:

**ViewModel:**

- _DataEntity_ – mechanism for reusing data structure definition
- _DataCollection_ – data type holding multiple records of the same
  structure; it is similar to arrays or lists in other languages but
  it allows to dynamically add and remove its items
- _DataAttribute_ – holder of data value
- _ComplexAttribute_ – data type able to hold inside multiple
  DataAttributes
- _ComputedAttribute_ – atribute that is not holding a value but
  instead it has an expression that is dynamically computed (and
  recomputed) based on its inputs
- _MetaTyp_ – mechanism for reusing data atribute definition and
  defining enum type attributes
- These data elements are implemented in runtime with help of
  knockout.js library and its observables
- On the form the ViewModel is represented as "Form variables" or in
  similar manner as "Global variables"
- ViewModel is often composed partially by include of entity (possibly
  imported from MTS) that is same or similar to part of the model and
  enriched by attributes that control the view state, ie. IsSelected,
  IsAddressVisible, IsInSpecialGroup.

**View:**

- _Form_ – main part of UI; either whole "web page" or at least main
  part of it in case master page is used as well. Master page itself
  is a form as well. Form is composed of components which properties
  may be tied to view model through binding or set to static value
- _Panel_ – main layouting component; while invisible by itself it is
  able to position its content in similar way as CSS flex or WPF Stack
- Editors and other components - displaying and editing data
- In runtime the View is represented by HTML page, CSS and javascript
  code

**Model:**

- It is not represented in ScreenFactory in any way. The data
  structure of the model may be defined or imported as _DataEntity_
  and included in ViewModel (most common use).

**Controller:**

- _Action and handler_ – scripts that are run in response to events on
  the form and its components
- _API object_ – invisible component that may be placed on the form or
  globally in application. Its main purpose is to enrich scripts in
  the actions with new functionality.
- In runtime the controller is represented by javascript functions and
  referenced scripts

[HOME](1index.md)
