---
layout: post
title: Send a login token via email after failed attempts
introduction: A temporary alternative to a forgotten password situation.
category: UX
---

Yesterday, I signed up for Covoiturage.fr, a carpool website. I had to provide my name, email, phone number, but no password, which was weird. After completeting the quick process, I was sent a verification email which also included an auto-generated password. I didn't use it because clicking the "*Validate your email*" button automatically logged me in for that one time, and I was able to send a private message like I wished to.

A few hours later, I got a notification email telling me I had received a message. I clicked on "*View the message*" and was sent to the website, which prompted me to login, considering my temporary session had expired. I tried using a usual password but it obviously failed, since I hadn't provided one and had forgotten about the auto-generated one.

Almost instantly, I received this email:

![Carpool access token](/images/carpool-access-token.png)

It gave me the ability to instantly connect to the website by using this single-use access token. I was both pleased and surprised to receive such an email: I just wanted to see the reply to my private message and didn't want to bother finding and copy-pasting the auto-generated password, logging in to the website, and changing my password to an easier one.

There are some issues with the whole process:

* I couldn't define my own password at sign up
* I was sent a login token after my first failed login attempt
* It can encourage using this login method rather than the usual one

But despite these 3 small quirks, the login token made sense in this situation:

* A carpool website is not a site you daily visit, but rather use on a punctual basis. So you'll probably end up forgetting your password anyway.
* Time is important: there are a limited number of seats and you need to react quickly. The login token made me gain valuable time.
* Carpool users are probably mainly non tech-saavy, and are thus not good at managing passwords and/or coming up with a strong one. A login token might add a layer of security.

I ended up providing my own password but I understand why this login feature was implemented in the first place. If you're developing a web app, you should consider providing an email access token after several failed login attempts. But, like anything, it should make sense *in your context* and shouldn' be implemented in *every* case.
