# Growth - ES6 Coding Style


## Use **soft tabs** with **4 spaces**
```js
// Okay
function useSoftTabsPlease () {
  // 2 spaces
}

// Better
function useSoftTabsPlease () {
    // better with 4 spaces
}
```


## Don't use **var** statement
```js
// Meh
var hello = 'world'

// Best
const hello = 'world'
```


## Don't use semicolons
```js
// Okay
const hello = 'world';

// Best
const hello = 'world'
```


## Prefer **const** rather than **let**
```js
// Okay
let player = {life: 100}

// Best
const player = {life: 100}
player.life -= 10

// const don't mean immutable: this will work
player.life -= 10

// it means it can't be reassigned: this will not work
player = {life: 90}
```


## Use single quotes
```js
// Meh
const hello = "world"

// Best
const hello = 'world'
```


## Add a space before parens in function declaration
```js

// Meh
function useSpacePlease(firstArg, secondArg) {

}

// Best
function useSpacePlease (firstArg, secondArg) {

}
```
