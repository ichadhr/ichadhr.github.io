---
layout: post
title: The 2-options toggle button
introduction: Is it on? Or does it turn it on?
category: UI
recommended: true
---

I'm always confused by these kinds of switch buttons:

![2-options toggle button](/images/toggle-button.png)

It takes me a couple of seconds to figure out if the button is displaying the **current state** ('On') or the **possible action** (*switching to* 'On'). In this case, it's meant to show the current state.

The use of such a toggle button requires:

* having 2 options only
* the 2 options to be mutually exclusive

The best known implementation of this button is actually the Play/Pause button:

![Play/Pause button](/images/play-pause-button.png)

It actually works in the exact opposite way: the button displays the **possible action**. Because we're so well acquainted with this play/pause action, we're always aware of its implied current state.

As a matter of fact, it makes sense because Play/Pause are **actions**, not states. The triangle and two-bars icons are read as 'Play' and 'Pause', not 'Playing' and 'Pausing'.

That's why the On/Off toggle switches display the current state: they are *meant* to be read as 'It's currently On' and 'It's currently Off', not 'Switch to On' and 'Switch to Off'.

But it's still unclear and not obvious. If you're designing a web app, just use checkboxes. Or even better: Yes/No radio buttons.


