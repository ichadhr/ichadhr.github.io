---
layout: post
title: SVG and CSS rem for responsiveness
introduction: Let's use the tools browsers provide us.
category: Code
---

I've redesigned this blog 9 times since I launched it in 2012. The latest version is focused on **simplicity**, both visually and content-wise. I've dropped the portfolio, the music section, the colophon, the "small talk", and the filter labels. And I've divided my posts by season (I'll explain why in another post).

The fact that I've been using [Sketch](http://bohemiancoding.com/sketch/) for 2 weeks now has quite affected both my design process and the final result.

## Images: SVG instead of Retina

Sketch makes it *very* easy to export assets. It can automatically trim transparent pixels, provide a Retina version, and export all slices at once.

I actually started going the "Retina" road, by exporting @2x versions of each image and implementing the [retina.js](http://retinajs.com/) script. But color profile and pixel-rendering issues led me to choose **SVGs** instead.

SVGs are:

* **lighter**: it's just code
* infinitally **scalable**: they keep their sharpness at any size
* **reliable**: no color rendering issues
* **imperishable**: I don't have to export them again if I want to change their display size

### Logos

For example, my logo is really simple: a circle with some overlapping rectangles.

<figure>
  <img alt="JT logo" src="/images/logo.svg" style="height: 150px;"><br>
  <figcaption>Scaled at 150*150px</figcaption>
</figure>

It's the perfect opportunity to try out SVG instead of PNG, especially considering Sketch makes it just as easy to export in that format.

Other images used in this design overhaul include client (Microsoft, Sony...) and technology (HTML 5, jQuery...) logos, for which a SVG version was easy to find (I'd like to thank **Wikipedia** for providing most of them).

## Fonts and Icons

Considering that fonts are made of **Bézier curves**, they are infinitally scalable as well. They're usually the only elements of a webpage that keep their sharpness when increasing the browser's zoom.

**Icon fonts** combine the benefits of vector assets and CSS font properties, especially size and color.

Being concerned about loading efficiency, I built my own icon font with the very useful [Fontello](http://fontello.com/).

<figure>
  <img alt="Custom icon font with Fontello" src="/images/custom-icon-font.png"><br>
  <figcaption>Custom icon font built with Fontello</figcaption>
</figure>

## CSS rem: responsiveness with font-size

CSS 3 has introduced a new unit: **rem** (which stands for `root em`). Jonathan Snook [wrote about it](http://snook.ca/archives/html_and_css/font-size-with-rem):

> The `em` unit is relative to the font-size of the parent, which causes the compounding issue. The `rem` unit is relative to the **root**-or the html—element. That means that we can define a **single font size** on the html element and define **all** rem units to be a percentage of that.

I've used `em` for a long time, especially for margins and paddings. Spacing elements *relatively* to their font-size helps readibility and maintenance. I also use unit-less `line-height` values (like "1.5") which are relative as well.

As Snook's article explains, the problem with `em` is that it's **cascading**. Having for example `1.5em` on both `<ul>` and `<li>` will cause the latter to be 36px instead of 24px. 

In the end, it's hard to keep track of what the rendered font-size actually is.

### rem for height / width / margin / padding

`em` can be used for CSS box properties as well, but considering its unreliability, `rem` is a better option.

How it works is:

* You **define** a `font-size` value on the root element `html`
* You **refer** to this value when defining height, width, margin and padding
* You can then **modify** the root value and **resize** your whole layout instantly

So instead of having `width: 960px` you would write `width: 60rem`, or `margin-top: 2rem` instead of `margin-top: 32px`.

### Elastic grid system

I came up with a simple **grid** system where each column would be `3rem` and each gutter `2rem`, resulting in a `58rem` container width.

It's called "**Elastic**" because it's relative to the font-size (the term apparently comes from [Dreamweaver](http://www.thesitewizard.com/webdesign/liquid-elastic-fixed-relative-layout.shtml)).

## Media queries

My default `rem` value is set to `20px`. Considering my `body` full width is `58rem`, it equals to **1160px**.

As a result, I added a responsive breakpoint where I **only** redefine my `rem` value:

{% highlight css %}
@media (max-width: 1159px) {
  html{ font-size: 16px;}
}
{% endhighlight %}

And that's all there is to it. All heights, widths, margins, paddings, font sizes, and especially **SVG** images (whose heights are set in `rem` as well) adjust themselves to this new value. It's basically like setting your **browser's zoom** at 80%.

For this responsive breakpoint, I went from about 25 lines of code to only 1.

### Mobile layout

I only have a second breakpoint at **929px** which basically triggers a mobile-friendly layout. Although less relevant, `rem` values still come into play.

The main benefit here comes from the **SVGs**, who render very sharply on my phone. And I don't have to worry about Retina and non-Retina screens.

As for all versions of my blog, the code is available in my [GitHub repository](https://github.com/jgthms/jgthms.github.io).