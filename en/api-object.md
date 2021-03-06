# API object

API objects provide access to additional functionality for actions and
components. Typical example communication with REST server through JSON
format, saving data to local storage, access to GPS location etc. Most
API objects may be put either on the form or they may be global and they
may have some properties. Some may be limited to only local or only
global use while some special ones cannot be used this way at all are
are used internally, ie. for navigation. Properties are saved in
apiConfig.js file and unlike most of other javascripts during
deployment, this file is not bundled and minified, so it allows easy
change (ie. to have different url to server on each environment).

API objects provide functionality in two different ways

- **Contract** – API object declares that it implements certain
  contract, ie. "IDataSource". Such API object may later be used for
  setting property of other component that requires the same contract.
  How does such contract look like should be documented as either part
  of the API object or the component itself. Usually it means some
  public javascript methods. ScreenFactory developer usually does not
  need to know that, for him the important thing is that this
  component and this API object are ready to work together.
- **Methods** – API provides new methods that may be called from
  actions and handlers by describing the interface of these methods in
  its manifest and providing javascript implementation.

Most API objects are external and contained in project [sffw](sffw.md). But
is worth mentioning internal API object ConfigValue.

## ConfigValue

This API object holds a value and provides access to it for the actions.
Because of the way the properties are stored in apiConfig.js file, it is
suitable to hold some data that should be configurable after build, ie.
during deployment to various environments.

[HOME](1index.md)
