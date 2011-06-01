underscore.inspector -- A javascript object/value inspector mixin for underscore.js
===

A few utility functions that deal with javascript types, mainly meant for debugging.  It is written in coffeescript but like all coffeescript code it is compiled into, and used as, javascript.

Exported functions ...
---
*xTypeof* - `xTypeof(value)`
A function that returns the name of the type of a javascript value.  It replaces the javascript operator `typeof` with a more detailed classification.  It recognizes these types ...
- undefined
- null
- boolean
- number
- nan
- string
- array
- function
- regexp
- arguments
- object

xTypeof mostly uses underscore functions like `isUndefined`.

*inspect* - `inspect(value)`   
A function that returns a textual represention of the value given. It recurses to show the full object structure as an indented list, much like util.inspect in nodejs.  No object is diplayed more than once, with an id assigned so you can see the exact occurances of an object and find the full listing for the object when you only see the stub.  This also solves the recursion problem.

*firstType* -  `firstType(list, type)` - A one-line function   
Given a list and a name of a type (see xTypeof above), firstType will return the first item in the list that has that type. If none found, then null is returned.

Status ...
---

underscore.inspector is intended for debugging usage so it has no tests and is considered ready for general usage.  It has been used heavily for about two weeks during the devlopment of atbar.


License ...
---
See MIT_LICENSE file.

