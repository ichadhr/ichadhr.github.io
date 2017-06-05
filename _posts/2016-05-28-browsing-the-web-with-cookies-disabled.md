---
layout: post
title: Browsing the Web with cookies disabled
introduction: Why block JavaScript when you can block cookies?
category : Thoughts
---

For more than a month now, I've been on a cookie diet: I've **disabled all browser cookies**.

<figure>
  <img alt="Blocking cookies in Chrome" src="/images/cookie-blocking.png"><br>
  <figcaption>No cookies for me anymore</figcaption>
</figure>

## Can't login

The main issue is logging into any website, as Web authentication requires a cookie to be stored on the client's computer.

<figure>
  <img alt="Can't login to Twitter" src="/images/cookie-no-twitter-login.png"><br>
  <figcaption>It's like an infinite login loop</figcaption>
</figure>

## Can't interact

Some basic interactions, like adding items to a cart, are not possible anymore.

<figure>
  <img alt="Can't shop" src="/images/cookie-amazon-cant-shop.png"><br>
  <figcaption>I saved a lot of money</figcaption>
</figure>

## Can't even browse sometimes

Some website don't even load, because a script tries but fails to access localStorage.

<figure>
  <img alt="Can't listen to music" src="/images/cookie-soundcloud.png"><br>
  <figcaption>MuteCloud, amirite?</figcaption>
</figure>

<figure>
  <img alt="Can't watch a video" src="/images/cookie-vimeo.png"><br>
  <figcaption>The layout looks nice even with no content</figcaption>
</figure>

<figure>
  <img alt="Can't watch a vine" src="/images/cookie-vine.png"><br>
  <figcaption>I waited more than 6 seconds, which defeats the whole purpose of watching the vine</figcaption>
</figure>

I liked the **Forbes** one in particular.

> This browser has no localStorage, we cannot prefetch.

<figure>
  <img alt="Can't read Forbes" src="/images/cookie-no-localstorage.png"><br>
  <figcaption>I like how relevant the quote was</figcaption>
</figure>

## Can GMail without Google

Weirdly enough, by allowing the pattern `[*.]google.com`, I can log in to GMail **without** being automaticlly logged in to Google, YouTube, and Blogger.

## Is blocking cookies a good idea?

Honestly, it's a **pain** to maintain.
By using a whitelist strategy, every time I encounter a login form, I need to manually add the domain pattern to the list of approved websites.
And when a website doesn't load at all, I just don't bother.

Do I feel less tracked and more secure? Of course!
/s

<iframe width="640" height="360" src="https://www.youtube.com/embed/ZwzY1o_hB5Y" frameborder="0" allowfullscreen></iframe>