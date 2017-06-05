---
layout: post
title: Why and how I divided my articles by season
introduction: A visual and time-based hierarchy.
category: UI
---

I just wrote an article about why I chose [SVG and CSS rem](/svg-and-css-rem-for-responsiveness.html) in this blog's latest redesign, an article in which I mentioned having divided my articles by **season**.

## Visual hierarchy and relevant information

With any kind of interface, I like being able to visually scan the overall layout, like having a **macro** overview of the content that's being displayed. That's the main reason why I write **single-line** CSS rules: it helps visualize the *selectors* hierarchy rather than the *properties* of a single selector.

Anyway, I started by grouping my articles by **year**. But considering I've only been writing on this blog for 2 years, and that each year averages 15 posts, the **information density** was not high enough to quickly scan both the frequency of my writing and a particular article's time period.

I could have divided my articles furthermore by **month**. But in that case, the information became both:

* irrelevant: there is no big difference in October and November for example
* too precise: I would have needed to include "empty" months, those during which I didn't write anything

The natural compromise was to use **seasons** instead, which, combined with the yearly-based division, could convey a better overview of an article's time period.

The added benefit was the opportunity to include **colors** in the interface, which strengthened the ability to visually scan the chronology. (I actually used 4 of Sketch's default colors, to which I applied a 48% opacity).

## Playing with Liquid templates

Because this blog is hosted on [GitHub Pages](http://pages.github.com/), I could not tweak Jekyll's source code. But it was not necessary, because the [Liquid templating language](http://liquidmarkup.org/) was enough to generate the relevant HTML code.

When looping through the articles, I have access to all the data I need, especially the **date**. It was just a matter of conditional tags that allowed me to extract, for each article, both the year and the season. This [Stack Overflow answer](http://stackoverflow.com/questions/19086284/jekyll-liquid-templating-how-to-group-blog-posts-by-year) helped a lot.

The [resulting code](https://github.com/jgthms/jgthms.github.io/blob/master/articles.html) is quite ugly. But it doesn't matter because *it works*. I have no concern about my code's performance because, after all, Jekyll is a *static* site generator. It just has to run once in a while, as long as the generated HTML is correct.

By the way, I used months and not particular ranges (like 21st of December - 21st of March) to decide which season an article belonged to. Winter overlapping 2 consecutive years would have been difficult to handle. Plus, this season division is just a visual aid.

### Affix.js for scrolling purposes

I wanted, for each set of article currently displayed, to show the associated year-season information *constantly*. I used Bootstrap's excellent [Affix.js](http://getbootstrap.com/javascript/#affix) plugin in order to **fix** the relevant time period at the top of the viewport, until it reached the next time period.

I realized afterwards that I didn't write during 2 seasons in 2012. Never noticed that before. So I guess this interface reached its objective, at least for me as a reader.