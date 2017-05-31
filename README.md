# basic-dom
A minimal JS view library for dynamic pages

Where [tinyDOM](https://github.com/commander-lol/tinyDOM) aimed to be a slim version of jQuery, basic-dom is targetting the JS view library market. basic-dom lets you
safely create dynamic html content from arbitrary input in a similar way to React and Vue, but does so in a much more straight forward way

## Installation

`bower install basic-dom`

## Usage

Add the following into your html page to add a button that logs 'hello' when pressed

```html
<script src="path/to/bower_components/basic-dom/basicdom.js"></script>
<script>
  var myButton = el(
    'button', 
    { onClick: function(){ console.log('hello') } }, 
    ['Click me!']
  )
  document.body.appendChild(foo)
</script>
```

## Interface

`basic-dom` adds the following to the window object:

- `$(selector: string): HTMLElement`
  - Grabs a single element that matches the given selector
- `$$(selector: string): Array<HTMLElement>`
  - Grabs an array of HTML elements based on the given selector
- `el(tagName: string, attributes: ?object, children?: Array<string | HTMLElement>): HTMLElement`
  - Construct the element specified by `tagName`
  - Attach any attributes passed to `attributes`
    - camelCased values are turned into kebab-cased values (caveat: `myAttr` becomes `my-attr` but `myATTR` stays as `myATTR`)
    - any `on{event}` values are registered as event listeners for `{event}`
    - passing a `style` property will merge the given styles into the `element#style` property instead of setting the `style` attribute
  - Append all children passed to `children` either directly, in the case of `HTMLElement`s or after turning them into `TextNode`s 
    in the case of strings
    
- `bdom`
  - An object containing the following utility methods included with `basic-dom`
- `bdom#resolve(el: string | HTMLElement): HTMLElement`
  - Resolve `el` to an element using `$` if it is a string
- `bdom#empty(el: string | HTMLElement): void`
  - `resolve`s `el`
  - removes all child elements from `el`
- `bdom#fill(el: string | HTMLElement, children: Array<string | HTMLElement>)`
  - `resolve`s `el`
  - Empties `el`
  - Appends all elements of children to `el`, either as is (HTMLElement) or as a `TextNode` (string)
