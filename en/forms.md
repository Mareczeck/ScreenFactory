# Form

Form is basic building block of UI. It is possible to add it in Project
window into some package. Form will be opened either if it is an startup
form of the application or if navigation is called from the action.
Startup form may be set in properties of the project (window _Project_,
choose root item and in _Properties_ set property _Startup form_). It is
as well possible to set other properties here.

## Master page

One of the forms may be "master page", that is container for other
forms. It is used for example to always show some header or footer on
all "pages". Master page is form as others but it contains component
_FormPlaceholder_. To use master page form, set it as Startup form of
the project and then set the default form on _FormPlaceholder_
component.

NOTE: At the moment we support only one master page and one placeholder.

For list of components see [List of standard
components](standard-components.md).

## Containers

- **Panel** – basic layouting component
- **DataTable**, **Repeater** – these containers are bound to
  DataCollection and for each item rendering either row (in case of
  DataTable) or repeating defined component (or multiple if you wrap
  them in some container)

## Editors

- **TextBox**, **DatePicker**, **CheckBox** – editors for attributes
  of basic data types
- **EnumRadioGroup**, **EnumCombo** – allows editing of enum
  attributes
- **ReferenceCombo** – editor for data reference

## Other components

- **Button**, **HyperLink**, **Image**, **Label** – traditional
  components with click event
- **ErrorPanel** – simple component for showing all validation errors
  on the form
- **CustomHtml** – special component that allows you to enter HTML and
  use simple knockout binding for it. This component should be used
  only in rare scenarios because IDE does not analyze the script
  inside. If some renaming happens, it may break this component. It is
  as well important to be very careful not to introduce any security
  vulnerability this way. In most cases, this component serves only as
  temporary workaround.

Size and alignment is not a feature of the components themselves, but
rather combination of them and the components they are contained in. It
is set in the component properties.

If the component is in the Panel, it gets width and height properties.
Based on panel Orientation, Vertical alignment property may be available
as well.

### New table

| Value / Property | Width                                                                 | Height                             |
| ---------------- | --------------------------------------------------------------------- | ---------------------------------- |
| px, %            | Sets width and adds Horizontal alignment property (left,center,right) | Sets height                        |
| Auto fit         | \*Width is set based on its content                                   | Height is set based on its content |
| Fill             | Fills all available width                                             | \*fills all available height       |

\* properties marked with the star are can be set only in text form,
they cannot be chosen from the menu and they are not available in all
situations. They generate validation warning F9999.

Other components are available in [sffw](sffw.md) project that is not part
of standard IDE.

## Custom components

Developers with knowledge of javascript may extend the application of
new components. These components are contained in packages so for other
developers it just mean to add certain package to be able to use it in
their project.

## Component styling – CssClass

Most components have "Css Class" property. This can be used to add css
class (with the help of ![test](../media/image19.png "Test")
button). There may be more than one class and they may be individually
turned on and off and even bound dynamically. That way it is for example
possible to change colours based on data.

By default every component gets automatically class _{theme
name}-{component name_, ie. _m8-button_. Name of the theme may be set in
menu _Project/Project options/Theme name_. It is possible to turn this
"theme" class off and that way to have only the basic minimum of styles
for given component and to customise it.

Custom css classes may be created by adding new resource of type css
class (window _Project - Add Resource_ and choosing name and css
extension). File is standard css stylesheet, class has to start with the
dot. If needed, it is possible to use comments to specify dialog
behaviour for choosing the css class on the component

Css file example

    /* ide-component: button, hyperlink */
    .myGreatButton {
        background-color: green;
        font-size: 200%;
    }

### Comments syntax

    /* class will display only for given components */
    /* ide-component: komponenta1[,komponenta2 …] */

    /* class will not display in the dialog at all */
    /* ide-ignore */

    /* class will display in given groups (for visual separation) */
    /* ide-group: group[,group2…] */


    /* all classes are added to the group which name will be put in the group which name is taken from the name before dash (either from right or left), ie. class size-bigbutton will be added to group size. */
    /* ide-autogroup: true|right */

- Commands may have parameters after colon, parameters may be
  separated by comma
- Multiple commands may be separated by semicolon
- Commands are tied to the nearest class (unless specified otherwise)

## Button icons

Common way how to add icons on the web is with the help of icon fonts.
One such font is integrated in ScreenFactory and may be added through
following way. Another option is to use FontAwesome from [sffw](sffw.md) or
anything else through custom resources.

The way that is built in SF is implemented through css classes. First,
you add the font as a resource in _Project – Add – New Item… - Icons_.
After this, you will have new css classes available on buttons and by
adding such class you get the icon on the button (either from right or
left and possibly together with your caption).

You may notice that web fonts are added in multiple formats, that is
because various browsers use different ones.

At the moment these classes are implemented only for buttons but as you
can see from the css file it should be possible to adapt it to other
components as well.

## Component events

Components may have events in their property window, ie. OnClick. You
may react to these events by attaching action or handler to them. There
are two main differences here between actions and handlers. Actions have
a name and may be used from multiple places. But for the same reason,
they cannot get event specific data (as different events have different
parameters but action always have the same parameters no matter where it
is called from). Handlers on the other hand cannot be used elsewhere but
they do get all the parameters given event is providing. It is of course
possible to get the benefits of both by combinding them, that is by
attaching handlers to events and in them calling some action while
normalizing its input parameters.

### Events and their parameters

| Event          | Component                              | Parameters                                               | Comment                                                                                                         |
| -------------- | -------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| OnActivate     | Form                                   | Params.data : BindingContext, i.e. Form variables        | Occurs when form is activated, i.e. when creating new form, navigating back, or overlayed modal form is closed. |
| OnClick        | Panel, Image, Label, HyperLink, Button | Params.data : BindingContext                             | Occurs when user clicks this component                                                                          |
| OnCreate       | Form                                   | Params.data : BindingContext, i.e. Form variables        | Occurs when form is created, i.e. only when creating new form. See also OnCreate on DataContext.                |
| OnEnterPressed | TextBox                                | Params.data : BindingContext                             | Occurs when user pressed Enter.                                                                                 |
| OnInit         | CustomHtml                             | Params.data : BindingContext                             | Occurs only once per form, when this component is initialized.                                                  |
| OnKeyDown      | DatePicker, TextBox                    | Params.data : BindingContext<br>params.keyCode : Integer | Occurs when user presses some key on keyboard. Underlaying data attribute is not updated till focus is lost     |
| OnRowActivate  | DataTable                              | Params.data : BindingContext                             | Occurs when user clicks to any data row                                                                         |

## Binding

Some component properties allow Binding. It is a connection between a
property and some data element. It is a basic principle of MVVM pattern.
While in other approaches the data is sent to the components and in
reaction to some event (change of text, button click) the data are read
back and perhaps new data and properties are set to components, in MVVM
all these changes are done in the data layer (which is more of a model
of view and thus "ViewModel") and these changes are automatically and
declaratively propagated to the properties of the components (View). In
runtime it is not possible to change the properties of the components
directly, only through changing the viewmodel.

Important feature is that part of data may be automatically computed.
Computed attribute is not a "storage" for some literal value as standard
attributes but instead it has an expression that is recalculated every
time inputs change and result of this computation is the value of the
attribute. (see [Expressions](Expressions.md), Computed attribute). In case
the computed attributes are not sufficient it is possible to use
standard attribute a do the calculation in an action.

Some properties may have binding mandatory (ie. data for _Repeater_).
While typical binding is "two-way", that is bidirectional, some binding
may be "one-way", ie. _IsEnabled_.

If the user sets a binding on a component for its main property (ie.
Text for TextBox), IDE will automatically set the binding for some other
properties as well (ie. Caption and IsRequiredMarkVisible). That way
these properties are shared between all editors for given attribute and
it is pulled from metadata. Such properties may be changed manually
though (ie. attribute Name for generic subject may be changed to "Name
and surname" if we know the editor is used only to edit data about
people).

Binding is set in text format (after clicking the binding icon),
potentially with the help of autocomplete. It is possible to use names
of data elements (ie. _address.name_), its special properties (ie.
_address.name.isValid()_) and it is possible to change context. At the
beginning of the expression it is possible to use negation with keyword
_not_ (ie. _not IsDirty_). Binding is using small subset of language
that is available in [expressions](expressions.md). Detail explanation can
be found there.

Special properties and methods

- _data.caption()_ – caption of the attribute
- _attribute.isRequired()_ – whether the attribute is mandatory;
  available only for attributes
- _data.hasValue()_ – indicator whether attribute or structure has a
  value or it is empty
- _data.isValid()_ – indicator whether all validation rules on the
  attribute or met or not
- _parentContext()_ – transition to previous context, in repeater it
  will be the data that holds the collection; this is not the same as
  owner()
- _form_ – switch to root form data; it allows you to for example use
  form.isEditable from anywhere in the component hierarchy no matter
  how deeply nested

Binding is by default two-way and it is doing data conversion as needed
(ie. attribute of type _date_ may be bound to _TextBox_ text and it will
show the value as a text and even allow the change that will be
converted back to _date_ type if possible).

At the moment, it is not possible to use even basic expressions in
binding (with exception of negation). If that is needed, it is possible
to use computed attribute for that.

[HOME](1index.md)
