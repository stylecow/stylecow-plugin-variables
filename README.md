stylecow plugin variables
=========================

Stylecow plugin to work with variables using standard var() function, (more info: http://dev.w3.org/csswg/css-variables/). For global variables (available in all properties), you have to define them in the selectors :root or html. Use nested rules to create scoped variables.

Sintax:
```
var(varname [, default])
```

You write:

```css
:root {
    --mycolor: red;
}

.foo {
    color: var(--mycolor);
}

.foo h2 {
    --mycolor: blue;

    color: var(--mycolor);
    font-size: var(--mySize, 24px);
}
```

And stylecow converts to:

```css
.foo {
    color: red;
}

.foo h2 {
    color: blue;
    font-size: 24px;
}
```
