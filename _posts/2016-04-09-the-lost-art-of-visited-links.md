---
layout: post
title: The lost art of visited links
introduction: The colour of another dimension
category: UX
recommended: true
---

There is a high chance that you've visited [this page](https://www.google.com), [this other page](https://www.youtube.com), and probably [this one](https://news.ycombinator.com) as well. Probably not [this one](https://en.wikipedia.org/wiki/Driebruggen) nor [this one](https://developer.mozilla.org/en/docs/Web/CSS/:visited), but I know for sure that you've been on [this one](/the-lost-art-of-visited-links.html).

To be fair, I can only _guess_. Whereas _you_ can tell for sure, even without clicking or hovering any of these links, which ones you've already visited, because my website changes the colour of **visited** links.

## A journey through time

Browsing the Web is mainly **two-dimensional**: you either _scroll_ (y-index) or _click_ (z-index).

The colour of links provides a third dimension: **time**.

* purple links are from the **past**
* blue links are potential candidates for the **present** or **future**

Depending on what you're looking for, the sight of visited links can trigger two different reactions:

* _"Ah yes, that's the website I was looking for! I've already been there."_
* _"I've already tried this webpage, let's try the next."_

## A list of links as a checklist

**Link aggregators** like [Reddit](https://www.reddit.com) or [Hacker News](https://news.ycombinator.com) are one of the few websites to still distinguish visited links from "new" ones.

<figure>
  <img alt="Hacker News homepage" src="/images/hacker-news-homepage.png">
  <figcaption>"Ah, lots of new content!"</figcaption>
</figure>

Google **search results** are usually processed the same way. Let's say you're learning JavaScript and want to know how to check if an Array is empty.

<figure>
  <img alt="Google search results for checking if an Array in JavaScript is empty" src="/images/google-visited-links.png">
  <figcaption>The first two results weren't convincing, so let's check the third one now</figcaption>
</figure>

Purple links are processed as **completed tasks** because:

* you probably don't want to see the same page **twice** in a row
* you want to **resume** your checklist where you left if off

The colour distinction provides information about the state of the list.

## Purple links? Eww!

But why are visited links so rare? Because designers (like me) are both **lazy** and **picky**.

When finalising a mockup (approved by either your ego or your client), you want the coded webpage to actually _match_ that mockup. You wouldn't want the user's browsing history to **affect** your perfectly balanced design now, would you?

If you're professional enough, you would design the button's and input's different states (default, hover, clicked, focused, disabled). But defining the **visited** state will never cross your mind.

This is one of the first CSS rules any designer writes:

{% highlight css %}
a {
  color: $anythingButBlue;
}
{% endhighlight %}

This affects **all** links, in any state: hover, active, focus, and visited. It's like a colour reset. You set it and forget it. You could use the `:link` pseudo-class but nobody knows about it. Plus, you'd forget to set `:visited` anyway.

A webpage is a **living document**: you design for different viewports, different environments, different interface states, different user interactions.

**Ignoring the colour of visited links is like caring about browser consistency: believing that every user experience should be strictly identical.**

## Privacy issue

A few years ago, someone ran an experiment: a website displaying links to the 1000 most visited websites. The website could potentially **"steal"** your browsing history by computing the **colour** of each link.

But browsers life Firefox [prevent that kind of behaviour](https://developer.mozilla.org/en/docs/Web/CSS/:visited) now:

> Though the color can be changed, the method getComputedStyle will **lie** and always give back the value of the non-visited color.

_(Emphasis mine)_

As a result, styling visited links is very limited:

<figure>
  <img alt="Visited links privacy" src="/images/visited-links-privacy.png">
  <figcaption>You can only affect a visited link's colour</figcaption>
</figure>

## Not all links are equal

Most links do _not_ require a visited colour:

* **navigation** links (homepage, account, settings) that are **repeatedly** visited
* **interface** links that alter the state of the page

<figure>
  <img alt="Hacker News nav" src="/images/hacker-news-nav.png">
  <figcaption>These links should stay black</figcaption>
</figure>

How do you decide which links should have a visited colour?

* **external links** because it provides the user information about a link you're mentioning (which is why link aggregators _do_ style visited links)
* **links to articles** (or any page whose content remains _identical_ over time)

To explain, let's say you're browsing [The Guardian](http://www.theguardian.com/uk). The homepage is **dynamic** its content gets updated every few minutes. As a user, you don't need to know you've visited the homepage because:

* you probably **already** have
* you probably **will** again

What you would like to know however, is which articles you've already read because an article's content is **very unlikely** to have changed next time you visit it.

So knowing before clicking on article if you've already seen it will define your **action** depending on your **intent**:

<table>
  <tbody>
    <tr>
      <th></th>
      <th style="color: blue;">Not visited yet</th>
      <th style="color: purple;">Already visited</th>
    </tr>
    <tr>
      <th>I want to see it</th>
      <td>
        <em>"New content!"</em>
        <br>
        <strong style="color: green;">Click!</strong>
      </td>
      <td>
        <em>"That's the article I was looking for!"</em>
        <br>
        <strong style="color: green;">Click!</strong>
      </td>
    </tr>
    <tr>
      <th>I don't want to see it</th>
      <td>
        <em>"That doesn't look interesting"</em>
        <br>
        <strong style="color: red;">Don't click!</strong>
      </td>
      <td>
        <em>"I've seen that already, it's not interesting"</em>
        <br>
        <strong style="color: red;">Don't click!</strong>
      </td>
    </tr>
  </tbody>
</table>

Next time you design a website, think about `:visited`!  
The Web and its users will appreciate it.
