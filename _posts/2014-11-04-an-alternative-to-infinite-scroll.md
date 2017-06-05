---
layout: post
title: An alternative to infinite scroll
introduction: 2 buttons and some CSS animation
category : UX
recommended: true
---

<figure>
  <a href="http://jgthms.com/lavalamp.js/lavalamp.html">
    <img alt="Infinite scroll alternative" src="/images/infinite-scroll-alternative.gif">
  </a>
  <figcaption><a href="https://github.com/jgthms/lavalamp.js">Lavalamp.js</a> demo</figcaption>
</figure>

## To infinity but not beyond

Whoever initially implemented infinite scrolling was probably well-intentioned. The fundamental idea is clever: **accelerating** the process of finding what you're looking for by **eliminating** any hurdle. No need to load a whole new page, nor to take any *action* at all. The browsing experience is **seamless**.

But also **endless**. The flood of results can be overwhelming. The page scrolling can drastically slow down. Retrieving your previous position can be challenging. Bookmarking is almost impossible. Keeping a sense of space (and time?) is troublesome. There's too much, too quick.

<figure>
  <a href="https://xkcd.com/1309/">
    <img src="http://imgs.xkcd.com/comics/infinite_scrolling.png" alt="xkcd: Infinite Scrolling">
  </a>
</figure>

Although some of these issues can be circumvented through technical and layout tweaks, the underlying question remains to know if infinite scroll is necessary *at all*. [Etsy dropped infinite scroll](http://danwin.com/2013/01/infinite-scroll-fail-etsy/) after making the wrong assumption that users wanted both more results per page and faster results. Probably the **incessant flow** of results prevented the user from taking any **decision** at all, and led him to forget what he was looking for, or why he started browsing the page in the first place.

## A mobile paradigm

The infinite scroll UX paradigm has found its way in *many* interfaces, especially on **mobile**. It's probably due to users (including me) being lazy: swiping (for scrolling) is more convenient than tapping. It's a more natural, less demanding gesture.

It does makes sense for **feeds** (Twitter, Facebook) because they only require one page, and are meant to be consumed in one direction primarily. It's less convenient for **search results** though, where there's a sub-page to be accessed, and where the uncertainty to end and probablity to alter your navigation are both higher.

What about a regular **pagination**? *Next* and *Previous* buttons are mandatory, but displaying pages on a mobile device is less of a requirement, or should at least not be interactive.

## Simplifying the flow

Some of infinite scrolling's assumptions are correct, but need to be reduced and/or altered to fit a mobile device's needs:

* **speed up** the browsing experience by remaining on the same page
* unburden the DOM from **past** results
* maintain the possibility to navigate to the **previous** page
* provide the user with a sense of **completion** by displaying a milestone (the *Load next* button)
* keep the user focused by requiring his **action** to navigate
* design a **seamless** experience

Demo: [http://jgthms.com/lavalamp.js/lavalamp.html](http://jgthms.com/lavalamp.js/lavalamp.html)

When tapping the "Next" button, an animated element covers up the viewport, remains fixed on top (while the new content is loaded and the page scrolls back up), before it shrinks to match the "Previous" button and then disappear.

Source: [https://github.com/jgthms/lavalamp.js](https://github.com/jgthms/lavalamp.js)
