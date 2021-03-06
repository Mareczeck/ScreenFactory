# Resources

It is possible to add files to the project as _Resources_. These may be
used for various purposes. Resources have three important properties:

- Source
  - directly in the project; in such case it is saved as a file.
    When you are creating the resource it is as well possible to
    copy already existing file to project.
- Action
  - If and where should the resource be copied to
    - _None_ – this option is for the files that should not be
      part of generated output, ie. component generators, config
      files for IDE etc.
    - _CopyToResources_ – resource will be copied as part of
      generated output; based on its type it may later be bundled
      together with other files as a performance optimization
    - _PostBuildCommand_ – file is command batch and will be run
      after each build
  - _Output name_ specifies the name of the file in generated
    output; it will be placed in resources directory (unless it is
    bundled with other files for performance purposes)
- Linker Action
  - This is chosen automatically based on extension but it may be
    changed later
  - **None** – file will not be linked during generation in any way
  - **Css style** – link to the stylesheet will be added to
    generated html as _&lt;link href=…&gt;_
  - **Javascript** – link to this script will be added to generated
    html as _&lt;script src=…&gt;_
  - **Favicon** – icon that will be used in the browser for the page
  - _Note: other options are not implemented_

Resources may as well be used for adding text files (txt, md, json, xml,
etc.) to the project, which further processing is not needed (ie. it may
be documentation) or are part of the application in some other way.

IDE is able to edit some text file directly (txt, md, js, json, xml) and
display images of common extensions (png, jpg). But resources may be of
any type.

There are resources that have special purpose:

- Text file defaults.ini - it is possible to define default property
  values to this file and they will be used everytime new component of
  that type is created. It is possible to add this file through
  context menu on _Package - add more... - Default property values_.
- postbuildcommand - commands for windows shell that will be run after
  every build

Most resources are not loaded in the IDE memory with the project until
they are needed. That allows to change the resource directly on the disk
without reloading the project in IDE. If there is conflict detected
(resource changes both in IDE and on the disk), dialog is shown that
offers option to resolve this conflict.

[HOME](1index.md)
