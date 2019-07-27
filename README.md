# fa-custom-scrollbar
A really light custom scrollbar made in Vanilla Javascript

## Install

Install with [npm](https://www.npmjs.com/package/fa-custom-scrollbar):

```sh
$ npm i fa-custom-scrollbar
```

## Why is this needed?

Make a custom scrollbar that works in all browser isn't easy because every browser need different CSS code to customize it.
I found some libraries but they include to rows of code so I decided to implement a personal version of custom scrollbar with vanilla JS using less code possible.

## What include this package?

This package includes 2 files:
- a JS file that implement the logic for the scrollbar
- a CSS file that implement the basic style to hide the default scrollbar and customize the personalized scrollbar

## How it works

Put the class "fa-has-custom-scrollbar" to the component where you want to apply the custom scrollbar.
Then change the property in the class "fa-custom-scrollbar" to customize the scrollbar with color, dimensions, border radius and other.

## Codepen example

Here an example of how to apply the custom scrollbar and how to customize it: https://codepen.io/FAngelo94/pen/jopzKO

## Browsers support

This package is tested and compatible with the last versions of Chrome, Firefox, Safari and Edge.

:white_check_mark: Chrome
<br/>
:white_check_mark: Firefox
<br/>
:white_check_mark: Safari
<br/>
:white_check_mark: Edge

To use it with explorer 11 you need a transpiler because it is written in ES6.
