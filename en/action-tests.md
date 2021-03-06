### Action tests

Each action and handler may have a set of tests. Tests are created on
tab test. We recommend to split them into three sections, Arrange, Act,
Assert.

Tests themselves are very similar to actions. They are written in
ActionLang. In comparison to actions and handlers they have two more
methods available, _Assert.isTrue(condition)_ and
_Assert.isEqual(value1, value2)_. IsTrue method changes, whether
condition is true. IsEqual method checks whether both parts are equal.
If condition or equality is not true, result of the test will be marked
as ERROR.

It is possible to run either all the tests for given action or all tests
in the project (from the menu).

When tests are running, API objects do not exist. If it is needed to
test action, that has API objects, it is necessary to mock them.

[HOME](1index.md)
