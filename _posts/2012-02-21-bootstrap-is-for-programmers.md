---
layout: post
title: Bootstrap is for programmers
introduction: Though it's not exactly aimed designers like me, Bootstrap has still much appeal.
category: UI
---

I am no programmer.

My work as a web designer consisted of graphic design and HTML / CSS templates. I never used any framework or IDE: I wrote every line using Notepad++. This light setup forced me to be very efficient in my HTML markup and CSS syntax.

In HTML, I used the fewest tags possible, or should I say, *necessary*. Classes were used with parcimony, but provided enough flexibility for the programmer who would use my code. Names used for classes described the content, not the style applied.

I was committed to follow the golden rule:

* HTML is for content
* CSS is for layout

Frameworks such as [Bootstrap](http://twitter.github.com/bootstrap/) fail at keeping this dichotomy clear. Some examples:

* `.span4` and `.offset4` to define column widths and column margins
* `.navbar-fixed-top` to apply an alternate style for the top bar
* `.table-bordered` for a table with borders
* `.form-horizontal` for a float left with right-alined labels
* `.tabs-left` `.tabs-right` `.tabs-below` classes

All Bootstrap's classes aren't weighted with style instead of content description. Buttons are quite well implemented. Variations use function, not color:
`.btn-primary` `.btn-info` `.btn-warning`.

Anyway, let's not overlook the purpose of Bootstrap: quickly build a website, through HTML blocks and classes, *without* having to write one line of CSS. **Everything** is defined in the HTML. If you think about it, programmers merely generate HTML code, and never touch the CSS file. So providing full control, from content to style, through HTML *only*, seems evident.

If I had to launch a website rapidly, I could set it up quite quickly. But I'd still have to take some layout decisions: font, color, positioning, spacing, dimensions... And though I've done it more than a hundred times, it wouldn't be straightforward.

So I'd set aside my wish to keep content apart from layout and use Bootstrap, because it's incredibly well designed.
