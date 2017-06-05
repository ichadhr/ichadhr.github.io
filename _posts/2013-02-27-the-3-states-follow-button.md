---
layout: post
title: The 3-states follow button
introduction: Make use of the hover state to hide the action and display the current state.
category: UI
---

After having discussed the [2-options toggle button](/the-2-options-toggle-button.html), I started thinking about another multiple options button: the follow button.

One of the most famous ones is the Twitter one:

<figure>
  <img alt="Twitter follow button states" src="/images/twitter-follow-button.png"><br>
  <figcaption>From left to right: not following, following, following:hover</figcaption>
</figure>


What's interesting is that, by default, when you're *not* following the person, the button shows the **possible action**: 'Follow'. But becoming a follower will subsequently cause the *same* button to hold the **current state** ('Following'), and only unveil the new possible action ('Unfollow') if you hover it.

GitHub makes use of a similar button to watch repositories:

<figure>
  <img alt="GitHub follow watch states" src="/images/github-watch-button.png"><br>
  <figcaption>From left to right: not watching, watching, watching:hover</figcaption>
</figure>

The implementation is different because the button *always* displays the possible action, never the current state. It's both:

* less obvious: you need to understand that seeing 'Unwatch' means you *are* watching the repo.
* less visually communicative and appealing: the same grey layout is used for both watched and unwatched states, defining no distinction between the two.

I think Twitter's execution, by mixing both action *and* state, is more intelligible.