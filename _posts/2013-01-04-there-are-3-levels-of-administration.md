---
layout: post
title: There are 3 levels of administration
introduction: An administration system is as easy to use as its development is difficult.
category: Thoughts
recommended: true
---

For every web application, there is an administration to design. Its complexity and ease of use depends on who is meant to interact with it.

## The creator's administration

If you're a developer running your own blog, chances are you have thought about creating your own little engine to publish articles. It may not be easy or convenient way to use, but as *you* are the engine's creator, you've established a system that suits *you* and nobody else. James Hague's [6838 bytes Perl script](http://prog21.dadgum.com/77.html) is probably not suitable for anything else than his website, but it's not an issue because that's the script's sole purpose. I myself have developed a static website generator in PHP. The code is terrible but it does exactly what I intend to, and any issue I'd encounter with it would be my own fault.

## The insider's administration

There's a learning curve with those kinds of admin. It can either be an admin developed by someone you know, or one that is not exactly user friendly.

For example, let's imagine I own a clothes store and ask you to develop my shopping website. The admin can be anything you want, as long as I know how to use it. The key here is that I'm in contact with you, so even if the admin isn't obvious to interact with, you can teach me. Plus, you can adjust some design elements for my convenience. Anyone else trying to use my admin would feel slightly lost, but that's not a problem because the admin was meant for me and I was taught how to use it.

[Jekyll](https://github.com/mojombo/jekyll)'s administraion can also be considered an insider's one. It's not used by non-developers because it requires some computer knowledge. You either need to know Ruby if you host your blog on your own server, or know Git if you're using the GitHub pages. Designing your own layout isn't easy either. But if you take some time to go through the docs and learn how to achieve what you want, you'll end up with a system that suits you well.

## The public administration

It's everybody else's admin, for the non tech-savvy users.

The best example is [WordPress.com](http://wordpress.com) which hosts around 60 million sites. Most of its users are probably non-technical people who chose to subscribe to WordPress.com because it offered an easy and free way to host their blog, and they wouldn't know how to do it otherwise.

For a long time, WordPress.com provided the same admin as WordPress.org, but they've updated it for the general public.

![WordPress.com easy admin](/images/wordpress-easy-admin.png)

It's the most difficult administration to design, because it is used by millions of people who have to figure it out on their own. The publishing experience needs to be seamless, and you have to take into account your users' unexpected behaviour and the common mistakes they can make.

The real key is to test profusely and receive feedback from common users. But in the end, you'll still have to cut short and take some design decisions on your own.