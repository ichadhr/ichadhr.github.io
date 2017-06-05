---
layout: post
title: Chrome's black scrollbar bug
introduction: A hardware-related issue.
category: UI
---

Have you ever encountered a black scrollbar like the one below?

![Chrome black scrollbar](/images/chrome-black-scrollbar.png)

If so, you might wonder *where* it comes from. For the last couple of months, I've been experiencing this issue on a regular basis, without actually understanding *why* it occured, so it was difficult to find a workaround.

In my case, it only happened in Chrome on my Macbook Air. Although refreshing the page fixed the problem, I wanted to find out what triggered it in the first place.

And then it occured to me.

I've been using a Logitech mouse since February. At times, when working with a colleague, I would unplug my mouse, grab my laptop, and sit at his desk. That's when the black scrollbar would appear.

<figure>
  <img alt="Scrollbar with mouse or trackpad" src="/images/scrollbar-with-mouse-or-trackpad.gif"><br>
  <figcaption>The viewport will be 15px less wide with the mouse plugged in</figcaption>
</figure>

* When using a **mouse**, Chrome renders a fixed scrollbar that's 15 pixels wide.
* When using the **trackpad**, Chrome uses an "overlay" scrollbar, that doesn't take up any space, and only displays the scroll handle when interacting with it.

Unplugging the mouse while visiting a page in Chrome would remove the fixed scrollbar and replace it with a black rectangle.