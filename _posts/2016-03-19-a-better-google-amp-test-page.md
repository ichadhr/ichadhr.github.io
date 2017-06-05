---
layout: post
title: A better Google AMP test
introduction: Is AMP an alternative to classic optimization techniques?
category : Thoughts
---

<figure>
  <a href="https://www.ampproject.org/"><img alt="Google AMP logo" src="/images/google-amp-logo.png"></a>
  <figcaption>Google AMP project</figcaption>
</figure>

Last week on [Hacker News](https://news.ycombinator.com/item?id=11287540), a developer shared his Google AMP + Jekyll + Medium page that loads in 65 ms, and compared it with both React's and Jekyll's homepages. This seemed somehow irrelevant, considering the major differences between these 3 pages, in terms of design, technology, and purpose.

HN user inian [commented](https://news.ycombinator.com/item?id=11287694):

> I feel a more apt comparison would have be comparing to a purely static page like a blog hosted on Github

Hey! My blog is hosted on Github! And I tested out AMP 2 weeks ago.

Why not try to optimize my homepage: [jgthms.com](http://jgthms.com/)?

<p class="demo"><a href="http://jgthms.com/amp/">View result</a></p>

## AMP in a nutshell

What AMP provides is:

* **loading**: the JS library optimizes the loading of external resources
* **caching**: all valid AMP documents can be cached on a Google CDN (which uses HTTP 2.0)

How do you create a valid AMP page?

1. alter your **HTML** to match the AMP specifications
1. inline your **CSS** in the page's head
1. include the AMP **JS** library

## Optimizing my homepage

Yesterday, my homepage was still non-optimized:

* the whole page was loaded
* the images weren't compressed

My page used to weigh **2.2 MB**. The three main images weighed 1.8 MB. That's **80%** of the total weight. Clearly, there was room for improvement...

### Classic optimization: lazy image loading

I used the powerful [TinyPNG](https://tinypng.com) to compress these images:

<figure>
  <img alt="TinyPNG optimization" src="/images/tinypng-optimization.png">
</figure>

My page went from 2.2 MB to 858 KB.

I then applied **lazy loading**, using the [jquery.lazy](https://github.com/eisbehr-/jquery.lazy) plugin, which allows images to be only fetched when they appear within the viewport.

This allows the last four images (375 KB, **43%** of the page weight) to be ignored during the initial page load.

### AMP optimization

AMP pages require a few alterations:

* use `<html ⚡>`
* add the AMP CSS with `<style amp-boilerplate>`
* add the AMP JS with `<script async src="https://cdn.ampproject.org/v0.js"></script>`
* add your own CSS inlined with `<style amp-custom>`
* `img` become `amp-img` elements
* images require both `width` and `height` attributes (to define the **ratio** only)

{% highlight html %}
<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
<script async src="https://cdn.ampproject.org/v0.js"></script>
<link href="https://fonts.googleapis.com/css?family=Karla:400,400italic,700,700italic" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
<style amp-custom>{# capture include_to_sassify #}{# include amp.sass #}{# endcapture #}
  {# include_to_sassify | sassify #}</style>
{% endhighlight %}

<aside>I had to remove the percentage signs, otherwise Liquid would throw an error.</aside>

## Results

<figure>
  <a href="http://www.webpagetest.org/result/160319_80_PZ9/"><img alt="Chrome console screenshot" src="/images/test-jgthms.png"></a>
  <figcaption>Classic optimization (lazy loading)</figcaption>
</figure>

<figure>
  <a href="http://www.webpagetest.org/result/160319_FD_PZH/"><img alt="Chrome console screenshot" src="/images/test-amp.png"></a>
  <figcaption>AMP optimization</figcaption>
</figure>

<table>
  <thead>
    <tr>
      <th></th>
      <th style="width: 28%;">Non-optimized</th>
      <th style="width: 28%;">Lazy loading</th>
      <th style="width: 28%;">AMP</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Requests</th>
      <td>25</td>
      <td>22</td>
      <td>19</td>
    </tr>
    <tr>
      <th>Size</th>
      <td><span style="color: #ed6c63;">2,200 KB</span></td>
      <td><strong style="color: #97cd76;">312 KB</strong></td>
      <td>664 KB</td>
    </tr>
    <tr>
      <th colspan="4" style="font-size: 20px; text-align: center;">First view</th>
    </tr>
    <tr>
      <th>Document Complete</th>
      <td>-</td>
      <td><strong style="color: #97cd76;">1.853s</strong></td>
      <td>3.119s</td>
    </tr>
    <tr>
      <th><a href="https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index">Speed Index</a></th>
      <td>-</td>
      <td>2043</td>
      <td><strong style="color: #97cd76;">1339</strong></td>
    </tr>
    <tr>
      <th>Fully Loaded</th>
      <td>-</td>
      <td><strong style="color: #97cd76;">2.365s</strong></td>
      <td>3.179s</td>
    </tr>
    <tr>
      <th colspan="4" style="font-size: 20px; text-align: center;">Repeat view</th>
    </tr>
    <tr>
      <th>Document Complete</th>
      <td>-</td>
      <td>0.936s</td>
      <td><strong style="color: #97cd76;">0.436s</strong></td>
    </tr>
    <tr>
      <th>Speed Index</th>
      <td>-</td>
      <td>1038</td>
      <td><strong style="color: #97cd76;">700</strong></td>
    </tr>
    <tr>
      <th>Fully Loaded</th>
      <td>-</td>
      <td>0.936s</td>
      <td><strong style="color: #97cd76;">0.436s</strong></td>
    </tr>
  </tbody>
</table>

## Conclusion

I'm not sure if AMP is designed to optimize simple pages like mine but it's worth a try. The main gain was essentially decreasing the page size.

If you're trying to optimize your website for **mobile** users:

* focus on **page weight**: nothing beats a page that only weighs a couple of hundreds of KB
* avoid **animations**: ever tried [pull-to-refresh](http://i.imgur.com/Oq0MjFs.png) on twitter? Slowest interaction I've ever seen in a mobile browser.
* **lazy load** your images: it's so easy to set up, and the initial load above the fold will be greatly improved

Obviously, most websites are not as simple as a static blog with only a few articles and only updated once in a while. Different platforms that serve different purposes require different strategies.

But even a mobile browser only expects HTML, CSS, and JS. And considering the screen size, a phone can only render a small part of a page at once. And if you don't focus on that initial rendering, the user might wonder why he had to wait 10 seconds to only see a tiny logo, a huge navbar that covers half of the page, and three lines of text.

So ask yourself if loading 1 MB images (like I did) or a JavaScript framework client-side (like others do) is worth infuriating your visitors.
