# Main window and tabs

## Form designer

Form layout is composed out of components. Components may encapsulate
other components. It is possible to imagine the structure of the form as
a tree. It is possible to see this structure in IDE in two different
views. One is this logical tree of components. The other is visual view
of the form (designer). It is possible to switch between these views.

Designer is WYSIWYG editor of the form. Form is edited in view that is
very close to what the result will look like to the end user but with
few differences. It is possible to turn on extra margin around the
components for easier orientation and drag&drop operations. It is
possible to show even components that would be hidden at the moment
(IsVisible=false). Components are as well shown based on test data (see
[Test data designer](#Test data designer)). It is possible to change the
visual scale in the top toolbar.

It is possible to add or move the components with the mouse (drag&drop).
Indicator where the component will end up will be shown. New components
are added by dragging them from toolbox window. Other commands are
available from context menu (mouse right button click).

Available commands (not all are available at every time)

- _Copy, Paste, Delete_
- _Go to parent_
- _Clear all bindings_ – removes binding in component and all
  components inside recursively; this may be useful especially after
  copy-paste operation
- _Localize UI component_ – adds text literals to the localization
  table and replaces them with bindings to this table
- _Add to children_ _/ Set content_ – adds chosen component as a child
  of focused component
- _Replace parent_ – replaces nearest parent with chosen component
- _Group into_ – encapsulates chosen component into a container
- _Transform to_ – replaces component with different type and attempts
  to copy all relevant properties

From the component composition point of view, there are three types of
components. Those that may not contain any futher child compoments,
those that may contain up to one and then those that may contain more
than one. This last type, ie. Panel or Table we call containers. Even if
component may contain only one child, it is almost always possible to
use Panel as this child and in it you may stack multiple other
components.

It is possible to set default properties of the components in
defaults.ini (see [Resources](resources.md)).

Most of the time the development of the form involves work with windows
Variables, Properties, Actions and API objects (see [Tool
windows](tool-windows.md)).

![test](../media/image13.png "Test")

### Data-to-form

If you drag data attribute (including complex, collection or reference)
on the form it will try to generate appropriate components for it. We
call this process Data-to-Form. After the drag&drop a dialog is shown
where it is possible to choose which component will be used for which
data type. This setting may be changed only for this event or it may be
saved as default to project settings.

It is possible to disable showing this dialog by holding SHIFT key
during drag&drop or by checking "_Do not show this dialog next time_“.
On the opposite, it is possible to display this dialog by holding ALT
key.

## Data designer

[Data entities](data.md#Data Entity) can be created and edited in data
designer. It is possible to add data attributes, complexes, collections
and references through context menu or by dragging them from toolbox. It
is possible to rearrange them by using mouse and drag&drop.

Data elements have events that may be used to call a handler with your
script when the event happen. While under normal circumstances you do
not need to use these handlers here (it is more common to handle these
events on the form where the data entity is used), there are cases where
you may want to do something when the entity is created (OnCreate event)
or some data is changed (OnChanged).

If clipboard contains text or formatted text with indented attribute
names, it is possible to insert it into the data tree by pressing
CTRL+V. IDE will try to transform it into attributes (including complex
attributes).

If you paste text

    Subjekt
      IČ
      Název
      Adresa
        Ulice
        PSČ
        Město

the data designer will create

![test](../media/image14.png "Test") |

### Action designer

This editor allows you to write [handlers and actions](actions.md). It
allows to write tests for them as well in similar fashion as unit tests
work in other technologies.

## Test data designer

It is important for the [Form designer](#Form designer) to have the
components bound to some test data. Not only it allows the developer to
better imagine how the form is going to look, but when it comes to
components bound to data collections (like Repeater or DataTable),
without some test data these components would look empty and it would be
very hard to design their content.

Test data are generated automatically based on data definition in
Variables window on every form. They are pseudorandom and they are
trying to fit the data definition. If it is needed to change them, it is
possible to do so by using icon ![test](../media/image15.png "Test") in
Variables window.

Data are updated in JSON format. IDE is showing relevant data structure
based on the cursor. If the data are deleted or if they are not valid
JSON, new data will be automatically generated instead.

It is as well possible to regenerate the data by using right click
option _Regenerate test data_. String values respect not only maximum
length of the attribute but there is as well a limit in [Project
options](project-structure.md#Project options) for their length. Default is
60 characters.

[HOME](1index.md)
