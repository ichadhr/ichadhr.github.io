---
layout: post
title: What Django could learn from WordPress
category: Thoughts
published: false
---

As a designer who only knows a little about programming, WordPress has been my software of choice when building dynamic websites. Although being a blog engine, when WP introduced its Custom Post (and Custom Taxonomy) capabilities, it became a very *decent* CMS. I say "decent" because most programmers would frown upon the term "CMS" when discussing WP. But when it comes to building lightweight websites with a simple administration, it has really proved flexible and easy to setup, especially for a designer, thanks to WP's themes engine.

Eager to learn new stuff, I've decided to dig into two of the most popular frameworks, Django and Rails.

Django's website comes with a 2-parts tutorial, but although being a nice introduction, what really helped me understand how Django operates was the *excellent* [Django Book](http://www.djangobook.com/en/2.0/index.html) which explains in details what almost *each* line of code does (a truly helpful feature for someone with little programming background).

I found Rails easier to understand though (I'm not talking about its scaffold feature). And I wasn't bothered by its numerous naming and structure conventions. What it only lacked was a default administration system, and that is the reason why I've come up to compare Django and WordPress.

## Administration: look and feel

Here's a wild guess: one of the keys of WP's success is in its administration **interface**. I've tried many blogging and content-managing systems, and I consider WP's admin as the most polished I've encountered, *by far*. The layout is clear and visually well-balanced, provides multiple levels of editing, looks gorgeous, and most of all is *easy* to use.

I recently built a website for a client whom I can not consider tech-savvy. But he managed to add, edit, organize and structure his pages with ease, without my intervention. I only had to hide the dashboard and Posts list (as they weren't used) and my client could handle the website on his own. It's a relief not having to deal with back-and-forth communication concerning UX issues.
