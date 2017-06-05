---
layout: post
title: Twitter OAuth 'See your password'
introduction: Sometimes repeating what's obvious can make the user question your website's security.
category: UX
---

I love OAuth. I love it because I tend to register with many different usernames, many different passwords (and variations of them), many different emails (with GMail's dot trick), so I end up spending more time logging in than actually signing up.

To efficiently use OAuth, you need a service to which you're constantly logged in. Twitter is one of them. And because it's widely adopted among users, it's widely adopted among developers setting up an authentification system for their web app.

OAuth not only provides access to your account, but *different* levels of access. And although OAuth seems more secure and rapid than an old-school sign up, I still read *what* the application I'm granting access to can do with my Twitter account.

What often strikes me when I authenticate via Twitter is what the third-party application *can't* do:

![Twitter OAuth 'See your Twitter password'](/images/twitter-see-your-password.png)

I read these bullet points as:

* things this application (bitly) can do
* things this application can't do *but could have asked permission to*

So, is this '*See your Twitter password*' a global confirmation that no application could *ever* see your Twitter password, or is it only this application's authorization setting? The latter would feel terribly unsecure.