---
layout: post
title: Designing with CSS animations
introduction: I wasn't using the jt.ms domain I bought last year and thought it would be a good opportunity to play with CSS 3 animations.
category: Code
---

![JT.ms](/images/jtms.jpg)

For almost a year now, I've had this 4-letter domain: [jt.ms](http://jt.ms)

I've only recently started using it as quick URL shortener so that, if anyone asked me (in real life) the address of my blog or my SoundCloud profile, I'd tell them "jt.ms/blog" or "jt.ms/music", rather than a slightly longer URL. But I also wanted this domain to act as a tiny portal to some of my websites and as a simple profile for my musical aspirations.

So I decided to quickly design one, and use the opportunity to have fun with some new CSS features.

## CSS background cover

I remember when I had to settle for jQuery to fill a webpage's background with a full-size image. Luckily enough, CSS 3 implementation has come a long way and the `background-size` property is nowadays [pretty well supported](http://caniuse.com/#feat=background-img-opts).

I just had to figure what image to put. And that's what actually triggered the whole redesign process. I had an instant vision of what picture to take: an overview of my desktop setup. I guess it's a designer's thing to showcase his working desktop (the same way a developer would sometimes list his Vim/Emac plugins or discuss his favorite coding practices...). Anyway, I felt it was an appealing way to convey what I do as an aspiring music producer.

So I semi-randomly placed my gear, opened Ableton Live and launched a fake recording session to light up the whole thing. I took a few pictures, and the last one looked good enough. I launched Photoshop and applied a script I had saved some time ago and it turned out [pretty well](http://jt.ms/jt.jpg).

The `background-size` property is incredibly easy to implement:

{% highlight css %}
html {
  background: #0c031e url(jt.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
{% endhighlight %}

The browser will take care of the redimensioning and make sure that the whole background is always covered by the image, while maintaining its aspect ratio, especially if it doesn't match the browser's window one.

## CSS animations on hover effects

I only had 4 links to insert on my page:

* my personal blog: [jthom.as](http://jthom.as)
* my SoundCloud profile: [soundcloud.com/jgthms](https://soundcloud.com/jgthms)
* this blog about design: [jgthms.com](http://jgthms.com)
* a JavaScript-generated mailto contact link

The 3 websites' main color turned out surprisingly complementary.

<figure>
  <img alt="JT.ms links" src="/images/jtms-links.jpg">
</figure>

I quickly settled for simple circles. For the hover event, I recalled [Svbtle's Kudos button](http://svbtle.com/) and its animation when submitting a vote. I discovered a [GitHub repo](https://github.com/masukomi/kudos) that implemented this functionality. I took only some part of the client-side code, especially the [CSS transitions](https://github.com/masukomi/kudos/blob/master/kudos.css). The jQuery code came down to a adding/removing a class.

CSS animations are great, but [you can't trigger them on a :hover event](http://stackoverflow.com/questions/10090582/can-i-use-hover-to-trigger-a-css3-animation-or-transition-which-keeps-running). So you need to use jQuery to add/remove a CSS class on the element you want to trigger a different animation on, and define this new animation within a new CSS block that refers to that new CSS class.

Ok, let's use an example. Here's the HTML code of my links:

{% highlight html %}
<a>
  <strong>music</strong>
  <em></em>
  <span></span>
</a>
{% endhighlight %}

* The `<a>` is the container
* The `<strong>` holds the text (and doesn't move)
* The `<em>` is the bordered circle that shrinks down on hover
* The `<span>` is the full colored disc that expands on hover

Only the `<em>` and the `<span>` are actually animated.

### The bordered circle

Here's the code for the `<em>` taken from the [GitHub repo](https://github.com/masukomi/kudos/blob/master/kudos.css) I mentioned above (and for the sake of readibility, I removed all vendor-prefixed CSS properties, but you should use them in production):

{% highlight css %}
a em {
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 50%;
  height: 94px;
  left: 50%;
  margin-left: -48px;
  margin-top: -48px;
  position: absolute;
  top: 50%;
  width: 94px;

  transform: scale(1);
  transition-duration: 500ms;
  transition-property: transform, background-color;
  transition-timing-function: ease-out;
}
{% endhighlight %}

Ok so the first 9 lines are purely for styling and positioning (I especially like the `border-radius: 50%`, a nice find).

The `transform` property defines the **initial** state of the `<em>` element.

The `transition` prefixed properties define **how** we're going from the initial state to the final state (which I'll write later):

* `duration`: how long does it take to go from the initial state to the final state (and vice-versa)
* `property`: what CSS properties will be animated. The default value is `all`. I don't think defining only the ones you want is for performance reasons, but rather to prevent animating properties that don't *animate* well, or that you don't want to animate (font-size, margins, positions...).
* `timing-function`: the easing of the animation. The default is linear, but the ease-out is more interesting. Here's a [easing cheat sheet](http://easings.net/) to visualize how the different functions look (though in CSS, only a subset of them are available).

### The full colored disc

The `<span>` element is hidden at first, and expands when hovering the link.

{% highlight css %}
a span {
  background: #D4C4C2;
  border-radius: 50%;
  height: 96px;
  left: 50%;
  margin-left: -48px;
  margin-top: -48px;
  position: absolute;
  top: 50%;
  width: 96px;

  transform: scale(0);
  transition-property: transform, background-color;
  transition-duration: 500ms;
  transition-timing-function: ease-out;
}
{% endhighlight %}

The code is almost the same (I deliberately posted both CSS blocks in their entirety for the sake of this article, but feel free to refactor your CSS in production, as I did myself). There are 2 differences:

* the styling (a disc instead of a thin circle)
* the initial state (the `scale` is set to 0 instead of 1)

### No hover event for animations

As I said earlier, you can't trigger animations on a hover event. So you need to modify the DOM to trigger a new CSS block in which you'll set the final state of the animation. The easiest way is to add a CSS class to the hovered element. In jQuery, it's as easy as:

{% highlight javascript %}
$('a').hover(
  function() {
    $(this).addClass('active');
  },
  function() {
    $(this).removeClass('active');
  }
);
{% endhighlight %}

Nothing complicated. We now need to write the new CSS block related to this new selector we've been given.

{% highlight css %}
.active em{
  transform: scale(0);
}

.active span{
  transform: scale(1.125);
}
{% endhighlight %}

And that's it! The thing circle (`<em>`) will disappear, and the colored disc (`<span>`) will expand to 112.5% its size. You can set that value to whatever you want, but making it bigger than the circle is a nice effect.

## Positioning elements on the background cover

Ok, my page was actually finished, but looked quite empty, and rightfully so, because that's how I meant it. But I wanted to add *something else*: **tooltips across the image**. Shouldn't be too difficult, right?

The thing is, my image is not an `<img>` tag with well-defined dimensions, but rather a background-image that's resized according to the window's dimensions, but *not exactly*. What I mean is that, in order for the image to **completely** cover the background *while* maintaining the image's ratio, it needs to follow the window's resizing according to a **function**. What function is that? Well, I found the answer on StackOverflow: ['What's the math behind CSS's background-size:cover'](http://stackoverflow.com/questions/10285134/whats-the-math-behind-csss-background-sizecover).

How it works: you calculate the window's ratio and compare it to the image's ratio (mine is 3/2). According to the result, the height *or* the width of the image is set to the window's, and the other value (width *or* height) is calculated to keep the image's ratio.

So I set up a `<div>` that has the exact dimensions of, and is exactly positioned as the background-image. I resized my window a few times to understand how the browser actually redimensionned the background-image and figured out how it worked.

Here's the function I quicky wrote:

{% highlight javascript %}
var a = $('div');

Position = function() {
  windowHeight = $(window).height();
  windowWidth = $(window).width();
  windowRatio = windowWidth / windowHeight;
  if (windowRatio > 1.5) {
    a.css('top', (windowHeight / 2) - ((windowWidth / 1.5) / 2));
    a.css('left', 0);
    a.css('height', windowWidth / 1.5);
    a.css('width', windowWidth);
  } else {
    a.css('top', 0);
    a.css('left', (windowWidth / 2) - ((windowHeight * 1.5) / 2));
    a.css('height', windowHeight);
    a.css('width', windowHeight * 1.5);
  }
}
{% endhighlight %}

Depending on the window's ratio, the `<div>` is resized and positioned to exactly cover the background-image. Of course, most of the time, the window's ratio is not equal to the image's one, so the `<div>` will be either wider or taller than the window, and that's what we want.

### Positioning the tooltips

Because the background-image (and thus the `<div>` as well) keep their aspect ratio no matter what, I just had to position all my tooltips using **percent values** and [*voilà*](http://jt.ms/)! I styled them like the other links (because they're links as well) and made the text fade in on hover. It's funny to see these tooltips disappear beyond the viewport when resizing the window because it's not common for an HTML element to *not* appear in the viewport.

## CSS keyframes

I also added some introduction animations using keyframes. For example, here's how the 3 main links "introduce" themselves:

{% highlight css %}
a {
  animation-duration: 1000ms;
  animation-fill-mode: both;
  animation-name: one;
  animation-timing-function: ease-out;
}
{% endhighlight %}

Looks exactly like the `transition` prefixed properties, with 2 new important properties: fill-mode and name.

### animation-name explained

This property lets you define the **name** of the keyframe function that will be called. You need to write this function separately. Here's the one I use for my main links:

{% highlight css %}
@keyframes one {
  0% { opacity: 0; transform: translateY(-24px);}
  100% { opacity: 0.29; transform: translateY(0);}
}
{% endhighlight %}

So my 3 circles go from hidden (opacity: 0) to semi-visible (opacity: 0.29), and also move up 24px. 0% is the initial state, and 100% the final one. You can add more keyframes if you want.

But what happens *before* and *after* the animation?

### animation-fill-mode explained

To understand this property, you need to understand how a keyframe animation works. There are *3 states* in an animation: before, during, and after. The "during" state is the easiest to understand because that's the animation. That's what the keyframe function is for.

So what style is applied before and after the animation? Well the **default** style is applied. And here, my links have a default opacity of 0.29. But let's set that to 1 for demonstration purposes.

So the **full** animation goes like:

* **before**: opacity = 1
* **animation start**: opacity = 0
* **animation end**: opacity = 0.29
* **after**: opacity = 1

It's not a problem if the animation starts **directly**. But I actually set up a delay on the 2nd and 3rd of my main links. So they start visible, then disappear, then fade in slowly.

That's where the value of `animation-fill-mode` comes in:

* `none` (default): the before and after states have the default style applied (1 here)
* `forwards`: the after state has the animation end value (0.29 here)
* `backwards`: the before states has the animation start value (0)
* `both`: it's forwards and backwards combined

So if you put "both" (and that's what I recommend), it means that the styles you'll define in the keyframes will be applied before the animation starts *and* after it ends.

So the **corrected** animation goes like:

* **before**: opacity = 0
* **animation start**: opacity = 0
* **animation end**: opacity = 0.29
* **after**: opacity = 0.29

This way, you're sure that the animation will run smoothly, no matter what delay you've put *before*, and no matter what default style would have been applied *after*.

### animation-delay

Here's the delay property I was talking about:

{% highlight css %}
#life { animation-delay: 0;}
#music { animation-delay: 500ms;}
#design { animation-delay: 1000ms;}
{% endhighlight %}

So the first link starts its animation right as the page is loaded (so there's technically no "before" state). The following links start theirs half a second after the previous one.

## Wrap-up

CSS animations are really easy to implement and rather well supported across the different browsers. For this single page, it makes sense to make use of them because:

* it's a single page
* there isn't much content
* it's more a showcase than an actual website
* it's rather unobtrusive because there's almost no interaction possible

So be aware to use these CSS animations sparingly.