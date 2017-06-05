---
layout: post
title: A better Android "Complete action using"
introduction: Separating one-time and permanent
category: UX
---

When opening a specific type of **link**, Android prompts you to choose between several apps. It's the mobile equivalent of the desktop _"Open With..."_.

For example, when tapping on a Airbnb link, this modal appears:

![Android "Complete action with"](/images/android-complete-action-using-default.png)

The key part of this modal is the bottom part, where 2 options appear:

* **Always**: subsequent taps on similar types of links will always open the selected app.  
The modal won't appear again.
* **Just once**: the link will only open in the selected app this time.  
The modal will reappear next time a similar link is opened.

The **problem** with this approach is that _any_ action requires **2 taps**: selecting _which_ app to use and _how_ subsequent taps will behave.

As a result, choosing the **permanent** behavior is _as easy as_ choosing a **one-time** behavior. If a user chose _"Always"_ by mistake, he'd have to dig deep into the phone settings to _undo_ his error, which will also clear the app's behavior regarding _other_ types of links.

### A less error-prone approach

To simplify the opening of a link **and** to prevent any permanent decision, the modal should look like this:

![Better Android "Complete action with"](/images/android-complete-action-using-better.png)

How it works:

* No app is selected by default.
* Tapping on an app will open the link in that app.
* Choosing that app as the permanent choice requires 2 taps.

The **one-time** action is quicker as it requires only a **single** tap.

Although defining the **permanent** action requires to tap at the bottom and _then_ in the list, opting for a less straightforward approach is **deliberate**, as it prevents easy mistakes.

If a user wishes to choose an app as the default one, he'd have to _actively_ decide to do so.