# Seznam standardních komponent

seznam aktuálních komponent vyvoláte přímo v IDE: _Help/Component list_.
Pokud budete mít oveřený projekt sffwexamples, budou tam i komponenty z sffw.

#### Button

Clickable button with text specified in Caption property.

#### CustomHtml

Component with custom HTML entered in plain text. There can be used
knockout binding to current data via data-bind attribute. You can also
add &lt;script&gt; elements to this component, but think about using
OnInit event instead of this. You can use paste command on the form to
paste current HMTL in the clipboard as CustomHtml component, highly
usable specially from Word or Excel.

#### DataColumn

Definition of columns used in DataTable.

#### DataTable

Simple HTML table with rows repeated for each row in input collection.
Use Columns collection to specify vertical columns and drop components
to each column.

#### DatePicker

Editor for entering date from calendar.

#### EnumCombo

Combobox / dropdown for editing enum value.

#### EnumRadioGroup

Radiobuttons editor of enum value.

#### ErrorPanel

Panel displaying all validation errors on the form. Usable for showing
validations hidden from user (collapsed areas, tabs, etc.).

#### Form

Object representing form, i.e navigable part of your ui.

#### FormPlaceholder

Place for holding another forms, which are changed by navigation

#### GroupBox

Boxed group of another components with optional caption.

#### HyperLink

Clickable text usable for navigation in the application or out of it.

#### CheckBox

Clickable box for editing bool attribute.

#### Image

Component showing image from any url. Url can be static or bound from
data.

#### Label

Component displaying text for any purposes.

#### Panel

Basic layouting container allowing to stack components from left to
right or from top to bottom and set their size properties.

#### ReferenceCombo

Combobox/dropdown allowing user to pick object from list, which is
provided from given Reference list provider. Value is written to
reference attribute.

#### Repeater

Container component repeating it's content for each item in bound
collection.

#### TextBox

Text editor for entering any string values. Can be used for numbers,
strings, passwords and multiline strings.

[HOME](/index.md)
