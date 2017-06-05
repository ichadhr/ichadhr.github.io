---
layout: post
title: 'In CSS: use pixels, not em'
introduction: Precision over elegance
category: Code
recommended: true
---

CSS provides several [size units](http://marksheet.io/css-size-units.html):

* `px` pixels
* `%` percentages
* `em` relative to the font size
* `rem` relative to the _root_ font size
* even unitless values (for `line-height`)

The most natural unit to use is **pixels**, especially for defining `height` and `width`, as it's an **absolute** unit.

But **relative** units, like `em`, have their benefits as well.

## How em works

`em` is relative to the _current_ `font-size` value. So if your element has `font-size: 12px`, `1em` equals `12px`.

By defining your `font-size`, you can use `em` to define _relative_ values for _other_ properties:

* `margin`
* `padding`
* `height`
* `width`
* etc.

`rem` acts exactly like `em`. The only difference is that while `em` refers to the _element_'s `font-size` value, `rem` refers to the _root_'s `font-size`, which is the `<html>` element.
{: .note}

By updating a _single_ `font-size` value, you can **update** other properties:

{% highlight css %}
.button {
  font-size: 16px;
  padding: 0.75em 1em;
}
{% endhighlight %}

<figure>
  <img alt="CSS em size button" src="/images/em-size-button.gif">
  <br>
  <figcaption>Changing font-size resizes the button proportionally</figcaption>
</figure>

So you can simply define different button sizes by only altering the `font-size`:

{% highlight css %}
.button--small {
  font-size: 12px;
}

.button--large {
  font-size: 20px;
}
{% endhighlight %}

## Why you should use px, not em

Using `em` is a very **elegant** way to define both your text size and your layout. It keeps every element balanced and easily sizable. I've [used it before](/svg-and-css-rem-for-responsiveness.html). It's a pain.

### Fonts need precision to look sharp

Let's say your default font-size is set to `16px`. You have **titles** at `2rem` and **subtitles** at `1.5rem`. Fabulous! Your semantic hierarchy matches your visual one. If you were to change your default text size to `15px`, you'd maintain that hierarchy.

But **not all font sizes are equal**... Considering the text of this website:

<figure>
  <img alt="CSS fuzzy text" src="/images/em-fuzzy-text.png">
  <br>
  <figcaption>1.25rem is easy to set but imperfect</figcaption>
</figure>

Even with bigger text, the problem is present:

<figure>
  <img alt="CSS fuzzy title" src="/images/em-fuzzy-title.png">
  <br>
  <figcaption>Even a 1px difference is noticeable</figcaption>
</figure>

### Every font needs its own specific size

Another problem with `em` arises when you want to change the **font family**, because every font renders differently at each size:

<figure>
  <img alt="CSS Cabin font" src="/images/em-cabin-font.png">
  <br>
  <figcaption>12px is easy to calculate but 13px looks better</figcaption>
</figure>

### Images need pixels

An image's **dimensions** are set in pixels. If you want to _vertically_ align its surrounding text precisely, you need to use a `padding-top` and a `line-height` in pixels:

<figure>
  <img alt="CSS image alignment" src="/images/em-image-alignment.png">
  <br>
  <figcaption>This would require tricky calculations with em or rem</figcaption>
</figure>

(My logo isn't an image but it used to be, and they usually are anyway).

### Borders need pixels

Let's say you want your buttons and inputs to be `38px` high. Having both equally sized allows to put them next to each other, like in [Bootstrap 4](http://v4-alpha.getbootstrap.com/components/input-group/):

<figure>
  <img alt="em input button" src="/images/em-input-button.png">
  <br>
  <figcaption>Nicely grouped and aligned</figcaption>
</figure>

How do you that with `rem`?

{% highlight css %}
.form-control {
  border: .0625rem solid #ccc;
  border-radius: .25rem;
  font-size: 1rem;
  padding: .375rem .75rem;
}
{% endhighlight %}

All these calculations are based upon a font size of `16px`. Now let's say you have to change that value, like `15px`, what happens?

<figure>
  <img alt="em input button border gone" src="/images/em-input-button-border-gone.png">
  <br>
  <figcaption>Where's my border??</figcaption>
</figure>

Yep. The border is now set at `0.9375px`, and just disappears, rightfully so.

You would think: _"Why not use an inset box-shadow?"_? Well `box-shadow` is not the solution:

* every time you want to add a shadow, you need to redefine _all_ other values
* the shadow is not part of the box model
* it can only be a single colour
* you need 4 shadows if you want 4 different "border" colours

### Vectors need pixels

Vector elements, like **icon fonts** need precise pixel values to render correctly.

The default font size for [Font Awesome](http://fortawesome.github.io/Font-Awesome/) is `28px`. If you need smaller icons, stick to `14px`. Any other value would look terrible:

<figure>
  <img alt="em Font Awesome" src="/images/em-font-awesome.png">
  <br>
  <figcaption>Only multiples of 7 please</figcaption>
</figure>

### Browsers zoom properly now

Browsers used to zoom in a page by simply **increasing the font size**, making the text bigger but keeping the layout set in pixels at its initial size. To prevent users from breaking the page when zooming in, you had to define a **fluid** layout, using `em` or `rem`.

But nowadays, browsers can simply zoom _any_ layout proportionally. No need for `em` anymore.

## Just use pixels

If you want sharp precise interfaces, stick to `px`:

* you'll avoid any cumbersome **calculations** that involve 4 decimals
* just by looking at a CSS rule, you'll know exactly how it will look like because there's no **dependency**
* **preprocessors** like Sass allow easy maintenance anyway: you can have global variables for sizes, or use mixins to define variations for your elements
* you'll be able to **align** different _types_ of elements that each require their _own_ `font-size`

You can still use `em` for things like letter-spacing, some margins, or any property that can be applied on different font-size values. But any reason to apply `em` _everywhere_ is either outdated or futile.
