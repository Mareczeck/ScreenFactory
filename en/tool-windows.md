## Tool windows

### Project

This window shows the structure of the project, that is its root node,
packages and other artefacts. They may be organized in folders. In the
context menu of the root node there is a choice to add new artefacts
through submenu "Add". Option "Add - New Item..." allows you to

add even more complex objects with the use of templates. Individual
artefacts can be moved with the mouse.

Packages with components are automatically organized in the folder
components and ordered alphabetically.

### Find and replace

This window allwos you to search for an object based on chosen criteria
or even replace properties of found objects.

![test](../media/image6.png "Test")

This function can be called from the menu Edit -&gt; Find, Find all
text, Find references, Search and replace or directly from the window
Properties in context menu (right mouse button on chosen property).

!\[Search property value option from Properties
window\](assets/IDE-findFromProperties.png "Search property value option
from Properties window")

Replace function can be used for replacement of values of property of
multiple objects

![test](../media/image7.png "Test")

**Find text / Find references / Find links / Replace** - switches
between dialog options

\- Find text, Replace - searches and replaces text or different value,
see further - Find references - searches for links to selected object
(if there is any selected) - Find links - searched for links form chosen
objects away (not implemented yet)

**Find what** - chooses what should be searched for

\- it is possible to enter text and use \* in it as a wildcard character
for anything or check "Use regex" and then enter regular expression - by
default the search is case-insensitive but it is possible to change that
with "Match case" option - if you want to search for example string AbCd
for exact match, check "Use regex" and enter it as "^AbCd$" (^
represents begining and $ the end in regular expressions) - if it is not
filled in and different condition is filled, it can search for example
for all objects or objects with given property

**Replace with** - what to replace it with

\- if you want to replace some string with different one, use this
option; it will work even in the middle of the text - by checking "Use
regex substitution" you can turn on the option to use substitutions in
regular expressions. In such case for example $+ represents searched
string so you can searched for \\d+ (decimal numbers) and replace it
with XYZ:$+. That way for example aaa123bbb will be replaced by
aaaXYZ:123bbb - you may as well leave the searched string empty for
setting some properties - for properties of different type than string
it is necessary to use correct format; easiest way is to fill it in
Properties window and then in context menu (right click) choose "Replace
property value" - it is as well possible to use special values

      - *CLEAR* deletes property
      - *EMPTY* sets empty value
      - *DEFAULT* sets property to its default value
      - *BINDING:xxx* - sets binding to xxx

**Look in** - where it should search

\- \*Current form / Current package / All packages\* - \*Skip component
packages\* avoids searching in packages marked as component packages in
their properties window

**Objects to search**

\- limits which objects (or their types) should be included in the
results - individual classes can be separated by comma; their potential
descendants are going to be searched as well - if it is not filled, it
is possible to check

      - *Include test data* searches in test data as well
      - *Include resources* searches in resources as well (NOT IMPLEMENTED)

**Properties to search**

\- limitation which properties shoud be searched - individual names
should be separated by comma - name can contain asterisk as a substitute
character

### Properties

Properties window displays properties of selected object in dictionary
style (key - value). If properties are editable in curent context, it as
well allows their editing.

It is possible to search in the properties. In some cases it as well
allows multi-edit, that is to change property of multiple objects at the
same time. Some types have special editors that allows more options,
show context menu etc.

If there is a problem in given property, the row shows red exclamation
mark left from the property name. Properties that differ from default
value, are marked with red dot.

Some properties of components allow data binding. These properties are
marked with special icon and bound property is marked with orange chain
icon. Click on these icons switches between binding mode and editing
literal values (if possible).

Some properties may represent events. It is possible to handle them with
already existing action or by creation of new action or handler.

Properties show tooltip on mouse hover. Left click on property name
directly under icon of a cog you can copy text to clipboard. Right click
over property name opens Search and replace dialog.

### Toolbox

Toolbox objects that can be dragged from there directly to currently
focused artefact (ie. components for designing form or data attributes
when designing data entity). For prolonged work it is useful to lock the
window so it does not hide and is visible all the time.

### Actions

Actions window contains local or global actions and possibly handlers.
Doubleclick on action opens its editor. Context menu allows to add new
action. Rightclick in empty space gives and option to show event
handlers.

It is possible to group actions in Categories by setting it Category
property and having it enabled in project options (\*Enable new actions
tree\* setting).

In properties of an action it is as well possible to disable it by
setting \*Is disabled\*. Such action will not be executed.

### Api objects

Window Api objects lists local and global api objects. By selecting
particular api object it is possible to change its properties in
Property window.

### Variables

Window Variables serves for editing data structure of action, form or
global data. Top part of the window allows switching between Final and
Edit representation. The main difference in these modes is that Edit
does explicitly show Includes while in Final mode they are transparently
omitted and data structure is shown in its final form.

It is possible to automatically generate form components by draging and
attribute (even subtree) from variables window on the form (see
[Data-to-Form](main-window.md#Data-to-form)). In context menu it is
possible to add new attributes to variables, validators and events (in
any tree depth). It is possible to copy binding path in the clipboard by
using "Copy as binding path".

### Error list

This window shows a list of validation errors and warnings. By default,
it is not possible to run the project if it contains validation errors.
This can be changed in the Preferences. Validation errors can be
filtered by various criteria or reevaluate them. Checks are by default
done after loading the project and before building the project. This can
be tweaked in User options. Doubleclick on the error may navigate to the
place where error was found.

### Outputs

This window shows log for building and debugging.

[HOME](1index.md)
