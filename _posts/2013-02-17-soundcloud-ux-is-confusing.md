---
layout: post
title: SoundCloud's UX is confusing
introduction: SoundCloud is great for discovering and sharing music. Less for actually listening to it.
category: UX
---

**Update**: it looks like SoundCloud finally delivered.

I'm going to copy/paste what I've said about SoundCloud in a [previous comment](http://news.ycombinator.com/item?id=4871076):  
I love SoundCloud.

I remember how it was difficult for people like me to upload their music on the web in order to share it. The only viable option was the MySpace music section (which required a different MySpace account). Even renowned artists used it. But the music player was just a single feature among the whole MySpace package, and the resulting experience for both the uploader and the viewer was unconvincing.

SoundCloud filled a need: upload your music easily, and doing just that. The uploading experience is fluid. The player is great, easy to share, with a nice sound quality.


But their UI is confusing. Here's a simple question: what is this?

![SoundCloud UI](/images/soundcloud-ui.png)

Hard to tell isn't it? It's actually the waveform of the track currently playing in SoundCloud. And although waveforms are prominent in SoundCloud's interface, this tiny version makes little sense until it starts to fill itself up and you notice a progress in time. But it's still hard to understand it's clickable and brings you back to the currently playing track.

## Lost in context

Ever since SoundCloud launched its latest version, it acts like some kind of **radio**: tracks will play endlessly. The choice of tracks though, is defined by *where* you launched the first track from. It can be the home stream, a set, the dedicated track page... You need to remember where you began because the **context** will define your **playlist**.

I usually navigate through 4 contexts:

* the Home (it's the main Stream which aggregates tracks from people you follow)
* a Profile (a user's page)
* a Set (a user-defined collection of tracks)
* the Dedicated page (which also lists related tracks)

Depending on the context in which you're launching your first track, your playlist will be different. What isn't obvious though, is what happens after you've listened to the *last* track. Because SoundCloud wants you to listen endlessly to their tracks, it will continue to play *something* even after having reached the last track of a set for example. But that *something* is hard to guess. I've told them about it: when I send people a set of mine to listen to, I don't want them to hear anything *but* that set. But after having reached the end of my set, SoundCloud will play a track I've liked, or a related track, or something else, which might confuse people into thinking it's part of my set and thus a track I've made as well (although it's not).

What I'm trying to explain might sound confusing, but that's because it *is* confusing. Even I, with some knowledge of how the site works, don't know for sure what my current playlist looks like, and why this particular track is currently playing.

Because you can navigate through the website without interrupting the track currently playing (thanks to the HTML5 History API), you can end up on a page where you see your track playing but in a different **context**. For example, you can start a track on the homepage, navigate through a set containing that track, and still see it playing. It's totally normal: it's the *same* track, but in a different context. But this can misguide you into thinking the next track will be the one right below in the set, whereas it will actually be the following one in the homepage where you launched your first track.

The only way to know in which context your track is playing is to click the waveform icon in the top right corner. But it won't necessarily tell you what's coming up next.

## 'There's a track playing??'

The main problem with SoundCloud comes down to this fact: **people don't know that a track is currently playing in their browser**.

I've had a couple of friends complain about not figuring out how to stop the music coming from their browser because they didn't understand that tracks kept playing endlessly in SoundCloud. I had actually sent them a link to a track of mine, and they rightfully thought that pushing the Play button would only play the track once, and *only* this track. So they switched back to another tab and were confused as to hear *something* coming out of their speaker after a few minutes, without knowing where it came from. It's reminiscent of Flash-powered websites which auto-start music upon visiting their page. Clearly: it's a bad thing.

I understand it's hard to ask SoundCloud to stop them from playing tracks indefinitely (although it shouldn't be the expected behavior of a Set or a Dedicated track page). But they should at least notify the visitor about it.

When navigating back to your SoundCloud tab, unless you clearly see a "Pause" button displayed prominently, it's impossible to know that the sound is coming from this tab. The tiny waveform in the header is clearly not helping, and finding the "Pause" button among the other numerous orange buttons of the page can be tricky (and requires that you're currently on a page where the track is displayed!).

Yes, there's a "Play" icon in the title bar, but being not interactive and not obvious either, it's quite helpless.

<figure>
  <a href="https://soundcloud.com/jgthms/see-you-at-the-lights"><img alt="SoundCloud Title UI" src="/images/soundcloud-title-ui.png"></a>
</figure>

## Lack of controls

Because SoundCloud acts like a radio (or a media player), it should display the regular controls you'd expect from such a setup: Play/Pause, Forward, Backward, list of tracks.

The Play/Pause is visually only available by navigating to a page where you can *see* the track playing. Of course, the little waveform in the header is the quickest way to reach such a page, but as I said, it's not an obvious control. You can also use the spacebar, but playing/pausing a track is not a spacebar's expected behavior in the context of a browser.

Forward/Backward controls are the ones I miss the most.  
The Backward button can be useful to navigate back to a track you want to play again, or to know which one you've just listened to. There is currently no way to know this.  
If you're listening to a track, the only way to skip it is to manually choose another one. Sometimes, I just want to hear the following track but it requires navigating back to the context and launching the next track. It's not much of a trouble, but could be easily avoided by displaying a forward button in the header. As a matter of fact, a playlist exists *somewhere* in memory. Why not displaying it and/or making it interactive by implementing Forward/Backward buttons?

SoundCloud acts like a media player but doesn't provide the interface that should come with it, and this gap leaves me, and probably many visitors, confused.
