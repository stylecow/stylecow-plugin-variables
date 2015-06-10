stylecow plugin variables
=========================

[![Build Status](https://travis-ci.org/stylecow/stylecow-plugin-variables.svg)](https://travis-ci.org/stylecow/stylecow-plugin-variables)

Stylecow plugin to work with variables using the standard `var()`, [available in CSS Custom Properties for Cascading Variables Module Level 1](http://www.w3.org/TR/css-variables-1/).

For global variables (available in all properties), you have to define them in the selectors `:root` or `html`. Use nested rules to create scoped variables.

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

More demos in [the tests folder](https://github.com/stylecow/stylecow-plugin-variables/tree/master/tests/cases)
