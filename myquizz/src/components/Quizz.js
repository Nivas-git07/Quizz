import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const rounds = ["Round 1", "Round 2", "Round 3", "Round 4"];
const questionBank = {
  // questionBank.js
  HTML: [
    // Round 1
    [
      {
        question: "What does HTML stand for?",
        options: [
          "HyperText Markup Language",
          "HighText Machine Language",
          "Hyperlink and Text Markup Language",
          "Hyperlinking Text Mark Language",
        ],
        answer: "HyperText Markup Language",
      },
      {
        question: "Which tag is used for the largest heading?",
        options: ["<h1>", "<h6>", "<head>", "<heading>"],
        answer: "<h1>",
      },
      {
        question: "Which tag inserts an image?",
        options: ["<img>", "<image>", "<pic>", "<src>"],
        answer: "<img>",
      },
      {
        question: "Which attribute specifies the URL of an image?",
        options: ["src", "link", "href", "url"],
        answer: "src",
      },
      {
        question: "Which tag is used to define an unordered list?",
        options: ["<ol>", "<ul>", "<li>", "<list>"],
        answer: "<ul>",
      },
      {
        question: "How do you create a hyperlink?",
        options: [
          '<a href="url">text</a>',
          "<link>text</link>",
          "<nav>url</nav>",
          "<ul>text</ul>",
        ],
        answer: '<a href="url">text</a>',
      },
      {
        question: "Which tag defines a table row?",
        options: ["<td>", "<tr>", "<th>", "<row>"],
        answer: "<tr>",
      },
      {
        question: "Which doctype is correct for HTML5?",
        options: [
          "<!DOCTYPE html>",
          "<!DOCTYPE HTML5>",
          "<!DOCTYPE html5>",
          "<!DOCTYPE>",
        ],
        answer: "<!DOCTYPE html>",
      },
      {
        question: "How do you create a checkbox input field?",
        options: [
          '<input type="checkbox">',
          "<checkbox>",
          '<input type="check">',
          "<check>",
        ],
        answer: '<input type="checkbox">',
      },
      {
        question: "Which tag is used to define emphasized text?",
        options: ["<i>", "<em>", "<strong>", "<bold>"],
        answer: "<em>",
      },
    ],

    // Round 2
    [
      {
        question: "Which tag defines the metadata about HTML document?",
        options: ["<meta>", "<head>", "<header>", "<info>"],
        answer: "<meta>",
      },
      {
        question: "Which tag is used to define an ordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ol>",
      },
      {
        question: "How can you open a link in a new tab?",
        options: ['target="_blank"', 'target="new"', "newtab", 'blank="_new"'],
        answer: 'target="_blank"',
      },
      {
        question: "Which element is used for styling?",
        options: ["<css>", "<style>", "<script>", "<design>"],
        answer: "<style>",
      },
      {
        question: "Which input type is for dates?",
        options: ["date", "datetime", "date-input", "calendar"],
        answer: "date",
      },
      {
        question: "Which tag defines a description list?",
        options: ["<dl>", "<list>", "<ul>", "<ol>"],
        answer: "<dl>",
      },
      {
        question: "What is the correct HTML for inserting a line break?",
        options: ["<br>", "<break>", "<lb>", "</br>"],
        answer: "<br>",
      },
      {
        question: "Which input type allows selecting multiple options?",
        options: ["text", "checkbox", "radio", "select"],
        answer: "checkbox",
      },
      {
        question: "How do you comment in HTML?",
        options: [
          "<!-- comment -->",
          "// comment",
          "/* comment */",
          "<comment>",
        ],
        answer: "<!-- comment -->",
      },
      {
        question: "Which tag defines a table header cell?",
        options: ["<td>", "<th>", "<tc>", "<header>"],
        answer: "<th>",
      },
    ],

    // Round 3
    [
      {
        question: "Which tag is used to group table data?",
        options: ["<tbody>", "<tfoot>", "<thead>", "<group>"],
        answer: "<tbody>",
      },
      {
        question: "Which attribute makes input required?",
        options: ["required", "validate", "mandatory", "must"],
        answer: "required",
      },
      {
        question: "What element is used to embed external JavaScript?",
        options: ["<script>", "<js>", "<code>", "<external>"],
        answer: "<script>",
      },
      {
        question: "Which tag is used to define inline CSS?",
        options: ["<style>", "<css>", "<span>", "<inline>"],
        answer: "<style>",
      },
      {
        question: "Which tag is used for subscript text?",
        options: ["<sub>", "<sup>", "<small>", "<subscript>"],
        answer: "<sub>",
      },
      {
        question: "Which HTML tag is used for video?",
        options: ["<video>", "<media>", "<movie>", "<clip>"],
        answer: "<video>",
      },
      {
        question: "Which attribute indicates alternative text for images?",
        options: ["alt", "title", "descr", "longdesc"],
        answer: "alt",
      },
      {
        question: "Which element is used for embedding audio?",
        options: ["<audio>", "<snd>", "<music>", "<mp3>"],
        answer: "<audio>",
      },
      {
        question: "Which attribute is used to define inline styles?",
        options: ["style", "class", "css", "inline"],
        answer: "style",
      },
      {
        question: "Which tag defines a footer in a document?",
        options: ["<footer>", "<bottom>", "<section>", "<foot>"],
        answer: "<footer>",
      },
    ],

    // Round 4
    [
      {
        question: "Which HTML element defines navigation links?",
        options: ["<nav>", "<navigation>", "<menu>", "<links>"],
        answer: "<nav>",
      },
      {
        question: "Which tag defines an article?",
        options: ["<article>", "<post>", "<section>", "<div>"],
        answer: "<article>",
      },
      {
        question: "Which tag styles the text as bold?",
        options: ["<b>", "<bold>", "<strong>", "<em>"],
        answer: "<strong>",
      },
      {
        question: "Which attribute is used to group radio buttons?",
        options: ["name", "group", "id", "value"],
        answer: "name",
      },
      {
        question: "Which HTML element is used for marking text?",
        options: ["<mark>", "<highlight>", "<em>", "<tag>"],
        answer: "<mark>",
      },
      {
        question: "Which tag is used to define a main content area?",
        options: ["<main>", "<center>", "<body>", "<content>"],
        answer: "<main>",
      },
      {
        question: "Which attribute is used to specify multiple file upload?",
        options: ["multiple", "files", "upload", "multi"],
        answer: "multiple",
      },
      {
        question: "Which HTML tag represents a section?",
        options: ["<section>", "<div>", "<seg>", "<article>"],
        answer: "<section>",
      },
      {
        question: "Which tag is used to embed SVG graphics?",
        options: ["<svg>", "<vector>", "<graphic>", "<img>"],
        answer: "<svg>",
      },
      {
        question: "Which tag is used to define a details disclosure widget?",
        options: ["<details>", "<info>", "<more>", "<summary>"],
        answer: "<details>",
      },
    ],
  ],
  // questionBank.js
  CSS: [
    // Round 1 – Basics
    [
      {
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Computer Style Sheets",
          "Colorful Style Sheets",
        ],
        answer: "Cascading Style Sheets",
      },
      {
        question: "Which HTML tag is used to link CSS?",
        options: ["<style>", "<css>", "<link>", "<script>"],
        answer: "<link>",
      },
      {
        question: "Which property changes text color?",
        options: ["color", "font-color", "text-color", "fg-color"],
        answer: "color",
      },
      {
        question: "How do you make text bold in CSS?",
        options: [
          "font-weight: bold;",
          "text-style: bold;",
          "font-style: bold;",
          "text-weight: bold;",
        ],
        answer: "font-weight: bold;",
      },
      {
        question: "Which property sets background color?",
        options: ["background-color", "bgcolor", "color", "background-style"],
        answer: "background-color",
      },
      {
        question: "Which unit is relative to the font-size?",
        options: ["em", "px", "%", "cm"],
        answer: "em",
      },
      {
        question: 'How to select an element with id "header"?',
        options: ["#header", ".header", "header", "*header"],
        answer: "#header",
      },
      {
        question: "What property is used for spacing between letters?",
        options: [
          "letter-spacing",
          "text-spacing",
          "spacing-letter",
          "letter-space",
        ],
        answer: "letter-spacing",
      },
      {
        question: "Which property makes text uppercase?",
        options: [
          "text-transform: uppercase;",
          "text-style: uppercase;",
          "font-transform: uppercase;",
          "text-case: uppercase;",
        ],
        answer: "text-transform: uppercase;",
      },
      {
        question: "How do you add shadow to text?",
        options: [
          "text-shadow",
          "font-shadow",
          "shadow-text",
          "text-box-shadow",
        ],
        answer: "text-shadow",
      },
    ],

    // Round 2 – Layout & Display
    [
      {
        question: "Which property makes an element a flex container?",
        options: [
          "display: flex;",
          "layout: flex;",
          "box: flex;",
          "container: flex;",
        ],
        answer: "display: flex;",
      },
      {
        question: "How do you center items horizontally in flex?",
        options: [
          "justify-content: center;",
          "align-items: center;",
          "text-align: center;",
          "content-align: center;",
        ],
        answer: "justify-content: center;",
      },
      {
        question: "Which property controls the size of an element?",
        options: ["width", "size", "element-size", "dimension"],
        answer: "width",
      },
      {
        question: "How to hide an element but keep its space?",
        options: [
          "visibility: hidden;",
          "display: none;",
          "opacity: 0;",
          "hidden: true;",
        ],
        answer: "visibility: hidden;",
      },
      {
        question: "Which property adds space inside an element?",
        options: ["padding", "margin", "spacing", "indent"],
        answer: "padding",
      },
      {
        question: "Which property adds space outside an element?",
        options: ["margin", "padding", "space", "outside-space"],
        answer: "margin",
      },
      {
        question: "How do you apply rounded corners?",
        options: [
          "border-radius: 10px;",
          "border-corner: round;",
          "corner-radius: 10px;",
          "round-border: true;",
        ],
        answer: "border-radius: 10px;",
      },
      {
        question: "Which property controls overlap order?",
        options: ["z-index", "stack-order", "layer", "order"],
        answer: "z-index",
      },
      {
        question: "What display value makes element inline-block?",
        options: ["inline-block", "inline", "block-inline", "block"],
        answer: "inline-block",
      },
      {
        question: "Which property shifts an element position relative?",
        options: [
          "position: relative;",
          "position: fixed;",
          "position: absolute;",
          "position: sticky;",
        ],
        answer: "position: relative;",
      },
    ],

    // Round 3 – Advanced Styling
    [
      {
        question: "Which property sets an element’s opacity?",
        options: ["opacity", "visibility", "alpha", "transparency"],
        answer: "opacity",
      },
      {
        question: "How do you make a gradient background?",
        options: [
          "background: linear-gradient(...)",
          "gradient: linear(...)",
          "bg-gradient: true",
          "gradient-bg: linear(...)",
        ],
        answer: "background: linear-gradient(...)",
      },
      {
        question: "Which property adds space between words?",
        options: [
          "word-spacing",
          "letter-spacing",
          "text-spacing",
          "space-between",
        ],
        answer: "word-spacing",
      },
      {
        question: "How do you apply a drop shadow box effect?",
        options: ["box-shadow", "text-shadow", "shadow-box", "box-effect"],
        answer: "box-shadow",
      },
      {
        question: "Which unit is relative to the root font-size?",
        options: ["rem", "em", "pt", "px"],
        answer: "rem",
      },
      {
        question: "How to specify a custom font?",
        options: ["@font-face", "@font-custom", "@font-import", "@import-font"],
        answer: "@font-face",
      },
      {
        question: "Which pseudo-class applies on hover?",
        options: [":hover", ":focus", ":active", ":visited"],
        answer: ":hover",
      },
      {
        question: "How do you hide overflow with scroll?",
        options: [
          "overflow: auto;",
          "overflow: hide;",
          "overflow: scroll;",
          "overflow: none;",
        ],
        answer: "overflow: auto;",
      },
      {
        question: "Which property defines element height?",
        options: ["height", "size", "max-height", "min-height"],
        answer: "height",
      },
      {
        question: "Which property specifies font size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        answer: "font-size",
      },
    ],

    // Round 4 – Positioning & Responsive
    [
      {
        question: "Which property makes an element fixed to viewport?",
        options: [
          "position: fixed;",
          "position: absolute;",
          "position: sticky;",
          "position: static;",
        ],
        answer: "position: fixed;",
      },
      {
        question: "Which property changes flex direction?",
        options: ["flex-direction", "flex-flow", "flex-order", "direction"],
        answer: "flex-direction",
      },
      {
        question: "Which media query targets mobile screens?",
        options: [
          "@media (max-width: 600px)",
          "@media (min-width: 600px)",
          "@media (width: 600px)",
          "@media mobile;",
        ],
        answer: "@media (max-width: 600px)",
      },
      {
        question: "How do you align items vertically in flex?",
        options: [
          "align-items: center;",
          "justify-content: center;",
          "align-content: center;",
          "vertical-align: center;",
        ],
        answer: "align-items: center;",
      },
      {
        question: "Which property changes the cursor on hover?",
        options: ["cursor", "pointer-style", "mouse", "hover-cursor"],
        answer: "cursor",
      },
      {
        question: "How to clear floats?",
        options: [
          "clear: both;",
          "float: none;",
          "overflow: hidden;",
          "clear: float;",
        ],
        answer: "clear: both;",
      },
      {
        question: "Which display makes element a grid container?",
        options: [
          "display: grid;",
          "grid: true;",
          "layout: grid;",
          "container: grid;",
        ],
        answer: "display: grid;",
      },
      {
        question: "What unit is viewport height?",
        options: ["vh", "vw", "px", "%"],
        answer: "vh",
      },
      {
        question: "How do you make an area sticky?",
        options: [
          "position: sticky;",
          "position: fixed;",
          "position: absolute;",
          "position: relative;",
        ],
        answer: "position: sticky;",
      },
      {
        question: "Which property controls grid columns?",
        options: [
          "grid-template-columns",
          "grid-columns",
          "grid-cols",
          "columns",
        ],
        answer: "grid-template-columns",
      },
    ],

    // Bonus Round – Advanced Concepts
    [
      {
        question: "Which pseudo-element represents the first line?",
        options: ["::first-line", "::first", ":first-line", ":first"],
        answer: "::first-line",
      },
      {
        question: "Which property sets transition effects?",
        options: ["transition", "animation", "transform", "effect"],
        answer: "transition",
      },
      {
        question: 'What does "fr" unit in grid mean?',
        options: ["fraction", "frame", "font-relative", "fast-responsive"],
        answer: "fraction",
      },
      {
        question: "Which function gives circle corners?",
        options: [
          "border-radius",
          "circle()",
          "corner-circle",
          "radius-border",
        ],
        answer: "border-radius",
      },
      {
        question: "Which property rotates elements?",
        options: [
          "transform: rotate(45deg);",
          "rotate: 45;",
          "transform: degree(45);",
          "rotate-element: true;",
        ],
        answer: "transform: rotate(45deg);",
      },
      {
        question: "Which shorthand sets padding all sides?",
        options: [
          "padding: 10px;",
          "padding-all: 10px;",
          "p: 10px;",
          "all-padding: 10px;",
        ],
        answer: "padding: 10px;",
      },
      {
        question: "Which property sets both rows and columns gap?",
        options: ["gap", "grid-gap", "space", "grid-space"],
        answer: "gap",
      },
      {
        question: "How to add a background image?",
        options: [
          "background-image: url();",
          "bg-img: url();",
          "image-bg: url();",
          "img-url: url();",
        ],
        answer: "background-image: url();",
      },
      {
        question: "Which @ rule for custom scrollbars?",
        options: [
          "::-webkit-scrollbar",
          "::-scrollbar",
          "@scrollbar",
          "::scrollbar",
        ],
        answer: "::-webkit-scrollbar",
      },
      {
        question: "Which property sets object-fit behavior?",
        options: ["object-fit", "fit-mode", "object-mode", "img-fit"],
        answer: "object-fit",
      },
    ],
  ],

  JavaScript: [
    // Round 1 – Basics
    [
      {
        question: "Which symbol denotes comments in JavaScript?",
        options: ["//", "/*", "#", "<!--"],
        answer: "//",
      },
      {
        question: "How do you declare a variable?",
        options: ["var x;", "variable x;", "v x;", "declare x;"],
        answer: "var x;",
      },
      {
        question: "Which operator is used for equality (value only)?",
        options: ["==", "===", "=", "!="],
        answer: "==",
      },
      {
        question: "Which method writes to the browser console?",
        options: ["console.log()", "alert()", "print()", "log.console()"],
        answer: "console.log()",
      },
      {
        question: "How do you create a function?",
        options: [
          "function myFunc() {}",
          "func myFunc()",
          "def myFunc()",
          "create function()",
        ],
        answer: "function myFunc() {}",
      },
      {
        question: "Which keyword declares a constant?",
        options: ["const", "let", "var", "constant"],
        answer: "const",
      },
      {
        question: "Which loop iterates when condition is true?",
        options: ["while", "do-while", "forEach", "until"],
        answer: "while",
      },
      {
        question: "Which data type is NOT primitive?",
        options: ["Object", "String", "Number", "Boolean"],
        answer: "Object",
      },
      {
        question: "How to parse string to integer?",
        options: ["parseInt()", "toString()", "Number()", "int()"],
        answer: "parseInt()",
      },
      {
        question: "Which keyword exits a loop?",
        options: ["break", "stop", "exit", "return"],
        answer: "break",
      },
    ],

    // Round 2 – Intermediate
    [
      {
        question: "Which method adds an element at the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()",
      },
      {
        question: "Which method creates a new array from function result?",
        options: ["map()", "filter()", "reduce()", "forEach()"],
        answer: "map()",
      },
      {
        question: "How to check strict equality?",
        options: ["===", "==", "=", "!="],
        answer: "===",
      },
      {
        question: "Which keyword sets timeout?",
        options: ["setTimeout()", "delay()", "wait()", "sleep()"],
        answer: "setTimeout()",
      },
      {
        question: "Which function converts JSON to object?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.toObject()",
          "parseJSON()",
        ],
        answer: "JSON.parse()",
      },
      {
        question: "Which keyword handles errors?",
        options: ["catch", "error", "handle", "except"],
        answer: "catch",
      },
      {
        question: "Which operator adds default if nullish?",
        options: ["??", "||", "&&", "?:"],
        answer: "??",
      },
      {
        question: "Which method clones arrays shallowly?",
        options: ["slice()", "splice()", "copy()", "clone()"],
        answer: "slice()",
      },
      {
        question: "Which defines async functions?",
        options: [
          "async function",
          "await function",
          "defer function",
          "promise function",
        ],
        answer: "async function",
      },
      {
        question: "How to write a template literal?",
        options: [
          "`Hello ${name}`",
          '"Hello ${name}"',
          "'Hello ' + name",
          '"Hello " + name',
        ],
        answer: "`Hello ${name}`",
      },
    ],

    // Round 3 – Advanced
    [
      {
        question: "Which keyword defines class in JS?",
        options: ["class", "def", "object", "struct"],
        answer: "class",
      },
      {
        question: "Which method catches all promise errors?",
        options: [".catch()", ".then()", ".finally()", ".error()"],
        answer: ".catch()",
      },
      {
        question: "Which operator creates arrays from values?",
        options: ["[...array]", "[array]", "array()", "...array"],
        answer: "[...array]",
      },
      {
        question: "Which property gets length of array?",
        options: ["length", "size", "count", "len"],
        answer: "length",
      },
      {
        question: "Which function delays execution?",
        options: ["setTimeout()", "setInterval()", "delay()", "sleep()"],
        answer: "setTimeout()",
      },
      {
        question: "Which checks if value is NaN?",
        options: ["isNaN()", "Number.isNaN()", "isNumber()", "isNotANumber()"],
        answer: "isNaN()",
      },
      {
        question: "Which keyword prevents default event?",
        options: [
          "event.preventDefault()",
          "event.stop()",
          "event.block()",
          "event.prevent()",
        ],
        answer: "event.preventDefault()",
      },
      {
        question: "Which method serializes object to JSON?",
        options: ["JSON.stringify()", "JSON.parse()", "toJSON()", "jsonify()"],
        answer: "JSON.stringify()",
      },
      {
        question: "Which adds element to start of array?",
        options: ["unshift()", "push()", "pop()", "shift()"],
        answer: "unshift()",
      },
      {
        question: "Which defines arrow function?",
        options: ["()=>{}", "function(){}", "def()=>{}", "()function"],
        answer: "()=>{}",
      },
    ],

    // Round 4 – Expert
    [
      {
        question: "Which API fetches HTTP resources?",
        options: ["fetch()", "axios()", "http()", "request()"],
        answer: "fetch()",
      },
      {
        question: "How to await promise result?",
        options: ["await promise", ".then()", ".catch()", ".finally()"],
        answer: "await promise",
      },
      {
        question: "Which creates a new promise?",
        options: [
          "new Promise()",
          "Promise.create()",
          "Promise()",
          "create Promise",
        ],
        answer: "new Promise()",
      },
      {
        question: "Which catches all errors in async?",
        options: ["try/catch", ".catch()", "error()", "handle()"],
        answer: "try/catch",
      },
      {
        question: "Which method flattens nested arrays?",
        options: ["flat()", "flatten()", "deepMerge()", "concat()"],
        answer: "flat()",
      },
      {
        question: "Which checks array inclusion?",
        options: ["includes()", "contains()", "has()", "indexOf()"],
        answer: "includes()",
      },
      {
        question: "Which builds string from array?",
        options: ["join()", "concat()", "toString()", "map()"],
        answer: "join()",
      },
      {
        question: "Which operator tests type?",
        options: ["typeof", "instanceof", "type", "is"],
        answer: "typeof",
      },
      {
        question: "Which clones objects shallowly?",
        options: ["Object.assign()", "clone()", "copy()", "spread"],
        answer: "Object.assign()",
      },
      {
        question: "Which defines async arrow function?",
        options: [
          "async ()=>{}",
          "async function()",
          "()=>async{}",
          "function async()",
        ],
        answer: "async ()=>{}",
      },
    ],
  ],

  "React JS": [
    // Round 1 – Basics
    [
      {
        question: "What is JSX?",
        options: [
          "A JavaScript syntax extension",
          "A type of JSON",
          "A CSS library",
          "A state management tool",
        ],
        answer: "A JavaScript syntax extension",
      },
      {
        question: "How do you create a component in React?",
        options: [
          "function MyComponent() {}",
          "component MyComponent() {}",
          "createComponent()",
          "new Component()",
        ],
        answer: "function MyComponent() {}",
      },
      {
        question: "What hook is used for state?",
        options: ["useState()", "useEffect()", "useContext()", "useReducer()"],
        answer: "useState()",
      },
      {
        question: "How do you call a prop named title?",
        options: ["props.title", "this.title", "state.title", "title"],
        answer: "props.title",
      },
      {
        question: "Which hook is used for side-effects?",
        options: ["useEffect()", "useState()", "useContext()", "useReducer()"],
        answer: "useEffect()",
      },
      {
        question: "How do you render a list?",
        options: ["array.map()", "array.foreach()", "for()", "list.render()"],
        answer: "array.map()",
      },
      {
        question: "How to pass data from parent to child?",
        options: ["props", "state", "context", "redux"],
        answer: "props",
      },
      {
        question: "Which keyword prevents default event?",
        options: ["e.preventDefault()", "e.block()", "e.stop()", "prevent()"],
        answer: "e.preventDefault()",
      },
      {
        question: "What is a key in list rendering?",
        options: [
          "Unique identifier for each item",
          "CSS style",
          "Event handler",
          "Function argument",
        ],
        answer: "Unique identifier for each item",
      },
      {
        question: "What does “lift state up” mean?",
        options: [
          "Move state to shared ancestor",
          "Raise state to window",
          "Convert state to prop",
          "Store state in localStorage",
        ],
        answer: "Move state to shared ancestor",
      },
    ],

    // Round 2 – Intermediate
    [
      {
        question: "What does useContext do?",
        options: [
          "Access context value",
          "Create a component",
          "Handle state",
          "Perform side-effects",
        ],
        answer: "Access context value",
      },
      {
        question: "What is React Router used for?",
        options: [
          "Client-side routing",
          "State management",
          "Styling components",
          "Animations",
        ],
        answer: "Client-side routing",
      },
      {
        question: "Which hook manages complex state logic?",
        options: ["useReducer()", "useCallback()", "useState()", "useMemo()"],
        answer: "useReducer()",
      },
      {
        question: "How do you memoize a value?",
        options: ["useMemo()", "useCallback()", "useRef()", "useEffect()"],
        answer: "useMemo()",
      },
      {
        question: "Which hook returns a mutable ref?",
        options: ["useRef()", "useState()", "useContext()", "useReducer()"],
        answer: "useRef()",
      },
      {
        question: "What does prop drilling mean?",
        options: [
          "Passing props through many levels",
          "Drilling component props",
          "Invalid props",
          "Using prop-types",
        ],
        answer: "Passing props through many levels",
      },
      {
        question: "Which hook caches functions?",
        options: ["useCallback()", "useMemo()", "useState()", "useEffect()"],
        answer: "useCallback()",
      },
      {
        question: "Which method updates state object safely?",
        options: [
          "setState(prev => ...)",
          "setState(object)",
          "state = newState",
          "updateState()",
        ],
        answer: "setState(prev => ...)",
      },
      {
        question: "Which lifecycle hook runs on unmount?",
        options: [
          "cleanup in useEffect",
          "componentDidUpdate",
          "componentDidMount",
          "useLayoutEffect",
        ],
        answer: "cleanup in useEffect",
      },
      {
        question: "What type of component is React.memo used for?",
        options: ["Functional components", "Class components", "Both", "None"],
        answer: "Functional components",
      },
    ],

    // Round 3 – Advanced
    [
      {
        question: "What is Context used for?",
        options: [
          "Passing data without props",
          "Performing state updates",
          "Creating refs",
          "Accessing lifecycle",
        ],
        answer: "Passing data without props",
      },
      {
        question: "What does Suspense handle?",
        options: [
          "Lazy loading",
          "Error boundaries",
          "Form validation",
          "CSS animations",
        ],
        answer: "Lazy loading",
      },
      {
        question: "Which tool is used to manage global state?",
        options: ["Redux", "CSS", "Node", "Router"],
        answer: "Redux",
      },
      {
        question: "What does useCallback prevent?",
        options: [
          "Function recreation",
          "State mutation",
          "Context update",
          "Prop drilling",
        ],
        answer: "Function recreation",
      },
      {
        question: "Which hook returns previous props?",
        options: ["usePrevious", "useRef", "useCallback", "useMemo"],
        answer: "useRef",
      },
      {
        question: "What does Reconciliation in React do?",
        options: [
          "DOM updates efficiently",
          "Handles routing",
          "State logic",
          "CSS rendering",
        ],
        answer: "DOM updates efficiently",
      },
      {
        question: "What does useLayoutEffect do?",
        options: [
          "Run before painting",
          "Run after layout",
          "Run after paint",
          "Run on unmount",
        ],
        answer: "Run before painting",
      },
      {
        question: "Which library fetches data in React?",
        options: ["React Query", "Jest", "Enzyme", "Redux"],
        answer: "React Query",
      },
      {
        question: "What is an Error Boundary?",
        options: [
          "Component catching JavaScript errors",
          "Component laying out forms",
          "CSS handler",
          "Network failure handler",
        ],
        answer: "Component catching JavaScript errors",
      },
      {
        question: "Which hook is for deferred value?",
        options: [
          "useDeferredValue()",
          "useTransition()",
          "useMemo()",
          "useReducer()",
        ],
        answer: "useDeferredValue()",
      },
    ],

    // Round 4 – Expert
    [
      {
        question: "What is React Fiber?",
        options: [
          "Reconciliation engine",
          "CSS library",
          "State manager",
          "HTTP client",
        ],
        answer: "Reconciliation engine",
      },
      {
        question: "Which hook starts a transition?",
        options: [
          "useTransition()",
          "useDeferredValue()",
          "useEffect()",
          "useCallback()",
        ],
        answer: "useTransition()",
      },
      {
        question: "What is Server Components?",
        options: [
          "Components rendered on server",
          "Client-side class components",
          "Next.js only feature",
          "React 17 only",
        ],
        answer: "Components rendered on server",
      },
      {
        question: "What is Concurrent Mode?",
        options: [
          "Concurrent rendering for performance",
          "Server-side rendering",
          "Error handling mode",
          "CSS optimization",
        ],
        answer: "Concurrent rendering for performance",
      },
      {
        question: "What does useSyncExternalStore do?",
        options: [
          "Subscribe to external stores",
          "Manage refs",
          "Run effects",
          "Optimize rendering",
        ],
        answer: "Subscribe to external stores",
      },
      {
        question: "What is Strict Mode for?",
        options: [
          "Highlighting potential issues",
          "Rendering CSS",
          "Debugging network",
          "Optimizing images",
        ],
        answer: "Highlighting potential issues",
      },
      {
        question: "Which hook loads data on mount with suspense?",
        options: ["use(some custom hook)", "useEffect", "useState", "useQuery"],
        answer: "use(some custom hook)",
      },
      {
        question: "Which API is for routing?",
        options: ["React Router API", "Redux API", "Context API", "Fetch API"],
        answer: "React Router API",
      },
      {
        question: "What does React.lazy do?",
        options: [
          "Allows lazy loading of components",
          "Delays rendering",
          "Handles error",
          "Optimizes CSS",
        ],
        answer: "Allows lazy loading of components",
      },
      {
        question: "What is Suspense for data fetching?",
        options: [
          "Wait rendering until data ready",
          "Cache CSS",
          "Optimize images",
          "Run tests",
        ],
        answer: "Wait rendering until data ready",
      },
    ],
  ],
  Flutter: [
    // Round 1 – Basics
    [
      {
        question: "What is Flutter?",
        options: [
          "An open-source UI toolkit by Google",
          "A JavaScript library",
          "A backend framework",
          "A database engine",
        ],
        answer: "An open-source UI toolkit by Google",
      },
      {
        question: "Which language is used to develop Flutter apps?",
        options: ["Java", "Kotlin", "Dart", "Swift"],
        answer: "Dart",
      },
      {
        question: "Which widget is used for unchanging content?",
        options: [
          "StatelessWidget",
          "StatefulWidget",
          "StreamBuilder",
          "ChangeNotifier",
        ],
        answer: "StatelessWidget",
      },
      {
        question: "Which method builds the UI in Flutter?",
        options: ["build()", "create()", "render()", "draw()"],
        answer: "build()",
      },
      {
        question: "Which widget arranges its children vertically?",
        options: ["Column", "Row", "Stack", "ListView"],
        answer: "Column",
      },
      {
        question: "Which is the entry point of every Flutter app?",
        options: ["main()", "init()", "start()", "launch()"],
        answer: "main()",
      },
      {
        question: "What is the root widget of a Flutter app?",
        options: ["MaterialApp", "Scaffold", "App", "Container"],
        answer: "MaterialApp",
      },
      {
        question: "What does “hot reload” do?",
        options: [
          "Updates UI instantly without losing state",
          "Rebuilds entire app",
          "Restarts emulator",
          "Cleans cache",
        ],
        answer: "Updates UI instantly without losing state",
      },
      {
        question: "Which layout widget allows flexible size?",
        options: ["Expanded", "Fixed", "Align", "SizedBox"],
        answer: "Expanded",
      },
      {
        question: "How do you specify padding in Flutter?",
        options: [
          "Padding widget",
          "Margin property",
          "Align widget",
          "Size widget",
        ],
        answer: "Padding widget",
      },
    ],

    // Round 2 – Intermediate
    [
      {
        question: "Which widget displays a button with material design?",
        options: ["ElevatedButton", "RaisedButton", "Text", "GestureDetector"],
        answer: "ElevatedButton",
      },
      {
        question: "Which widget allows user input?",
        options: ["TextField", "Text", "Label", "Container"],
        answer: "TextField",
      },
      {
        question: "What is the use of setState()?",
        options: [
          "To update UI state",
          "To declare a widget",
          "To start animation",
          "To initialize app",
        ],
        answer: "To update UI state",
      },
      {
        question: "What is the purpose of the Scaffold widget?",
        options: [
          "Provides layout for material design components",
          "Defines app routes",
          "Handles gestures",
          "Manages state",
        ],
        answer: "Provides layout for material design components",
      },
      {
        question: "Which widget is used to stack widgets on top of each other?",
        options: ["Stack", "Row", "Column", "Box"],
        answer: "Stack",
      },
      {
        question: "What is a Future in Dart?",
        options: [
          "Represents a value that might be available later",
          "A data structure",
          "A synchronous function",
          "A widget lifecycle method",
        ],
        answer: "Represents a value that might be available later",
      },
      {
        question: "Which keyword is used to await a Future?",
        options: ["await", "wait", "async", "pause"],
        answer: "await",
      },
      {
        question: "Which widget provides scrollable list items?",
        options: ["ListView", "Row", "Column", "ScrollView"],
        answer: "ListView",
      },
      {
        question: "Which widget listens to user interaction?",
        options: ["GestureDetector", "Text", "Row", "Padding"],
        answer: "GestureDetector",
      },
      {
        question: "Which method is called only once during widget lifecycle?",
        options: ["initState()", "build()", "setState()", "dispose()"],
        answer: "initState()",
      },
    ],

    // Round 3 – Advanced
    [
      {
        question: "What is a Navigator in Flutter?",
        options: [
          "Widget that manages routes",
          "Database tool",
          "Gesture detector",
          "Theme manager",
        ],
        answer: "Widget that manages routes",
      },
      {
        question: "Which widget makes another widget scrollable?",
        options: [
          "SingleChildScrollView",
          "ScrollWidget",
          "ListView",
          "Scrollable",
        ],
        answer: "SingleChildScrollView",
      },
      {
        question: "Which class is used for animations?",
        options: [
          "AnimationController",
          "Animator",
          "AnimBuilder",
          "StateAnimator",
        ],
        answer: "AnimationController",
      },
      {
        question: "What is the use of keys in Flutter widgets?",
        options: [
          "Preserve widget state across rebuilds",
          "Handle routes",
          "Detect gestures",
          "Create layouts",
        ],
        answer: "Preserve widget state across rebuilds",
      },
      {
        question: "What is InheritedWidget used for?",
        options: [
          "Share data across widgets",
          "Build widgets",
          "Layout design",
          "Add animations",
        ],
        answer: "Share data across widgets",
      },
      {
        question: "Which lifecycle method is used to free resources?",
        options: ["dispose()", "initState()", "build()", "deactivate()"],
        answer: "dispose()",
      },
      {
        question: "What is a stateful widget?",
        options: [
          "A widget that can change its state",
          "A static widget",
          "A layout manager",
          "A type of animation",
        ],
        answer: "A widget that can change its state",
      },
      {
        question: "What is Provider in Flutter?",
        options: [
          "State management package",
          "Layout tool",
          "Animation tool",
          "Build system",
        ],
        answer: "State management package",
      },
      {
        question: "What does pubspec.yaml do?",
        options: [
          "Manages app dependencies and assets",
          "Compiles widgets",
          "Creates layouts",
          "Handles gestures",
        ],
        answer: "Manages app dependencies and assets",
      },
      {
        question: "What is a MaterialApp?",
        options: [
          "Main structure of a Flutter app",
          "A package manager",
          "Theme builder",
          "State management library",
        ],
        answer: "Main structure of a Flutter app",
      },
    ],

    // Round 4 – Expert
    [
      {
        question: "What is BuildContext in Flutter?",
        options: [
          "Reference to location of widget in tree",
          "A design pattern",
          "Widget state",
          "Widget theme",
        ],
        answer: "Reference to location of widget in tree",
      },
      {
        question: "What is the purpose of async/await?",
        options: [
          "Handle asynchronous operations",
          "Create routes",
          "Manage layout",
          "Listen to events",
        ],
        answer: "Handle asynchronous operations",
      },
      {
        question: "What is the default theme in Flutter?",
        options: ["Material Design", "Cupertino", "iOS UI", "Neumorphism"],
        answer: "Material Design",
      },
      {
        question: "Which widget is used for conditional rendering?",
        options: [
          "if/else in build()",
          "StateWidget",
          "SwitchWidget",
          "Conditional",
        ],
        answer: "if/else in build()",
      },
      {
        question: "Which method is used to rebuild only part of widget?",
        options: ["setState()", "rebuild()", "refresh()", "reset()"],
        answer: "setState()",
      },
      {
        question: "Which of the following is NOT a layout widget?",
        options: ["Scaffold", "Row", "Column", "Stack"],
        answer: "Scaffold",
      },
      {
        question: "What does MediaQuery do?",
        options: [
          "Gets device screen information",
          "Creates animations",
          "Manages routing",
          "Provides gestures",
        ],
        answer: "Gets device screen information",
      },
      {
        question: "What is CupertinoApp used for?",
        options: [
          "iOS-style app structure",
          "Web development",
          "Backend code",
          "Android-only apps",
        ],
        answer: "iOS-style app structure",
      },
      {
        question: "What is Flutter SDK?",
        options: [
          "Software development kit to build Flutter apps",
          "JavaScript engine",
          "IDE extension",
          "Database engine",
        ],
        answer: "Software development kit to build Flutter apps",
      },
      {
        question: "What command runs Flutter app in debug mode?",
        options: [
          "flutter run",
          "flutter build",
          "flutter test",
          "flutter deploy",
        ],
        answer: "flutter run",
      },
    ],
  ],
};

export default function Quiz() {
  const { techName } = useParams();
  const decoded = decodeURIComponent(techName);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(150); // Timer state
  const [currentRound, setCurrentRound] = useState(1); // Round state
  const [isFailed, setIsFailed] = useState(false);

  const [round, setRound] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [animDirection, setAnimDirection] = useState("left");

  // ✅ Shuffle function
  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  // ✅ Load & shuffle questions for current round
  useEffect(() => {
    const roundQuestions = questionBank[decoded]?.[round];
    if (roundQuestions) {
      setQuestions(shuffleArray(roundQuestions));
    } else {
      setQuestions([]);
    }
  }, [decoded, round]);

  const currQ = questions[qIndex];
  useEffect(() => {
    if (timeLeft === 0) {
      setIsFailed(true); // Show fail message
      alert("❌ Time's up! restart the quizz..");
      setCurrentRound(1);      // Reset to round 1
      setRound(0);             // Reset round index for questionBank
      setQIndex(0);            // Reset question index
      setScore(0);             // Reset score
      setTimeLeft(150);        // Reset timer
      setIsFailed(false);      // Remove fail message after reset
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Stop previous timer
  }, [timeLeft]);

  const handleNextRound = () => {
    if (currentRound < 4) {
      setCurrentRound(currentRound + 1);
      setTimeLeft(150); // reset timer for next round
    } else {
      alert("Quiz Completed!");
    }
  };

  // ✅ Toast after completing a round
  useEffect(() => {
    if (qIndex === 0 && round > 0) {
      toast.success(
        <div>
          ✅ <strong>{rounds[round - 1]} completed!</strong>
          <br />
          <span className="animated-score-text">
            🎯 Your current score is: <b>{score}</b>
          </span>
        </div>,
        { position: "top-center", autoClose: 3000 }
      );
    }
  }, [round]);

  const handleSelect = async (opt) => {
    const correct = opt === currQ.answer;
    if (correct) setScore((s) => s + 1);

    if (qIndex < questions.length - 1) {
      setAnimDirection("left");
      setQIndex((i) => i + 1);
    } else if (round < rounds.length - 1) {
      setAnimDirection("right");
      setRound((r) => r + 1);
      setQIndex(0);
    } else {

      const finalScore = score + (correct ? 1 : 0);
      let token = localStorage.getItem("token"); // get JWT from localStorage


      try {

        const res = await fetch("http://localhost:5000/update-score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // send JWT
          },
          body: JSON.stringify({ tech: decoded, score: finalScore })
        });
        const data = await res.json();


        navigate(`/technology/${encodeURIComponent(decoded)}/result/${finalScore}`);
      }

      catch (error) {
      };
    }
  }

  if (!currQ) {
    return (
      <div style={styles.page}>
        <p style={styles.title}>No Questions Available for {decoded}</p>
        <motion.button
          style={styles.backBtn}
          onClick={() => navigate(-1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ⬅ Back to Technology
        </motion.button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <ToastContainer />
      <AnimatePresence mode="wait">
        <motion.div
          key={`${round}-${qIndex}`}
          initial={{ opacity: 0, x: animDirection === "left" ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: animDirection === "left" ? -100 : 100 }}
          transition={{ duration: 0.4 }}
          style={styles.card}
        >
          {/* ✅ Progress Bar */}
          <div style={styles.progressBarWrapper}>
            <div
              style={{
                ...styles.progressSlider,
                width: `${((round + (qIndex + 1) / questions.length) / rounds.length) *
                  100
                  }%`,
              }}
            />
            <div style={styles.roundLabels}>
              {rounds.map((r, i) => (
                <div
                  key={r}
                  style={{
                    ...styles.roundLabel,
                    color: i === round ? "#fff" : "#aaa",
                    fontWeight: i === round ? "700" : "400",
                  }}
                >
                  {r}
                </div>
              ))}
            </div>
          </div>

          <h2 style={styles.title}>
            {decoded} Quiz - {rounds[round]}
          </h2>
          <p style={styles.question}>{currQ.question}</p>

          {/* ✅ Options */}
          <div style={styles.options}>
            {currQ.options.map((o) => (
              <motion.button
                key={o}
                onClick={() => handleSelect(o)}
                style={styles.optBtn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {o}
              </motion.button>
            ))}
          </div>

          <p style={styles.progressText}>
            Question {qIndex + 1} / {questions.length} | Score: {score}
          </p>
          {isFailed ? (
            <div style={styles.failMessage}>❌ Time's up! Quiz restarting...</div>
          ) : (
            <div style={styles.timer}>⏳ Time Left: {timeLeft}s</div>
          )}


        </motion.div>
      </AnimatePresence>
      {/* Back button outside the card but inside the page */}
      <button
        style={styles.backButton}
        onClick={() => navigate("/technology")}
      >
        ← Back to Technology
      </button>
    </div>
  );
}

// ✅ Styles
const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('https://i.pinimg.com/originals/a1/10/4d/a1104d22b1c8fa11fc572487cc93f302.jpg')", // Solid background (removed animation)
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    overflow: "hidden",
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(255, 165, 0, 0.2)",
    textAlign: "center",
    color: "#fff",
    width: "100%",
    maxWidth: "600px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#FFA500",
    letterSpacing: "0.5px",
  },
  question: {
    fontSize: "20px",
    margin: "20px 0",
    color: "#f5f5f5",
  },
  options: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    marginBottom: "30px",
  },
  optBtn: {
    padding: "14px 18px",
    backgroundColor: "#FFA500",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    color: "#1e1e1e",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(255, 165, 0, 0.3)",
  },
  backBtn: {
    padding: "12px 18px",
    backgroundColor: "#333",
    color: "#FFA500",
    border: "2px solid #FFA500",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "20px",
    display: "inline-block",
    transition: "all 0.3s ease",
  },
  progressBarWrapper: {
    position: "relative",
    height: "40px",
    marginBottom: "30px",
    userSelect: "none",
  },
  progressSlider: {
    position: "absolute",
    height: "6px",
    backgroundColor: "#FFA500",
    borderRadius: "4px",
    top: "20px",
    left: 0,
    transition: "width 0.5s ease-in-out",
    zIndex: 1,
    boxShadow: "0 0 12px rgba(255,165,0,0.5)",
  },
  roundLabels: {
    display: "flex",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 2,
  },
  roundLabel: {
    fontSize: "15px",
    color: "#888",
    fontWeight: "500",
  },
  progressText: {
    fontSize: "15px",
    color: "#ccc",
    marginTop: "12px",
    fontStyle: "italic",
  },
  backButton: {
  position: "fixed",
  bottom: "20px",
  left: "20px",
  backgroundColor: "#000000", // Black color
  color: "#fff",              // White text for contrast
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  transition: "all 0.3s ease",
},
}

