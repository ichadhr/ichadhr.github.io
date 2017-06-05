---
layout: post
title: Strategy guide for the game Twenty
introduction: Like 2048, but different
category: Thoughts
---

<figure>
  <a href="http://twenty.frenchguys.net/"><img alt="Twenty game logo" src="/images/twenty-puzzle-game.png"></a>
</figure>

[Twenty](http://twenty.frenchguys.net/) is a puzzle game with numbers.

The goal of the game is to reach the tile "20". You progress my merging similar value tiles. The merge increments the tile's value by 1. Reaching the tile "20" will make it disappear.

The high score consists of the number of "20" tiles you've managed to reach.

## Twenty and 2048

The game is reminiscent of the famous [2048](http://gabrielecirulli.github.io/2048/) considering you progress in the game my merging same-value tiles.

But there are key differences:

* In Twenty, merging tiles increments the value by 1 ; in 2048, the new value is doubled.
* In Twenty, tile colors don't follow a pattern ; in 2048, colors follow a specific gradient according to their value.
* Twenty is time-based. 2048 is not.
* In Twenty, new tiles can have any value (provided it already appeared once). In 2048, new tiles can only be of value 2 or 4.

## Time-based

Every 10 second, 7 new tiles appear at the bottom. Their order and value is random.

If no other merge is possible, the new line will appear instantly.

## Difficulty factor

For a game to remain interesting, it needs to provide a similar _experience_ but different _challenge_ every time.

Instead of simply speeding up the timer gradually, the difficulty comes from random **connections** that appear between two tiles. It means that they can only move as one, which drastically reduces their movability. You need to merge one of the connected tiles to remove all its adjacent connections.

* After reaching tile "10", only two tiles can be connected.  
* After reaching tile "15", up to three tiles can be connected.  
* After reaching tile "20", up to four tiles can be connected.

## Basic strategy

Because Twenty is a time-based game, the obivous aim is to merge tiles _as fast as possible_. Which means performing swift movements with your finger across the screen.

(By the way, I _highly_ recommended playing on your phone).

Any move that doesn't result in a possible merge is wasted time. Make each move count.

The key aspect of the game's strategy is that **not all merges are equal**. In other words, the quickest merge is not always the best option.

### Build towers

The main problem you'll face is not being able to **access** tile, rather than having no merge available left.

Keep all tiles accessible by keeping some **columns empty**, and avoid making lines (which is the opposite of Tetris basically.)

![Twenty towers](/images/twenty-towers.png)

### Focus on the lower numbers

Ask yourself: how many "1" tiles does it take to get a "n" tile?

Let's imagine the game only spawns "1" tiles. You'll need 4 of them to get a "3". You'll need 128 of them to get a "8".

Obviously, other tiles than "1" appear, and you keep all the ones you've already merged. But you'll free space quicker by merging lower values.

### Keep the tiles ordered

Each tile value should be lower than the one it's sitting on.

In the best case scenario, you can make towers of adjacent values:

![Ordered tiles](/images/twenty-ordered-tiles.png)

My merging the "10" on top, it will trigger a chain reaction and get rid of five tiles in a row.

### Reorder when merging

If a merge possible with a number located at the bottom of a column:

* if it has a higher value than the one on top: merge into
* if lower value: drag it out

### Housekeeping

If at least one possible merge is left (which means the timer hasn't reset), it can be useful to take some time to reorder the tiles and place lower numbers on top.

It also allows to keep one "free" tile in case a better merge is possible _after_ the timer runs out.

(Quick tip: when the timer is about to run out, hold a tile in the "air" to prevent it from connecting with another one.)

### Make merge sequences

Try to merge the tile you've just "created". For example, if merging two "7" to create a "8", look for another "8". Merge them and look for a "9".

Doing so means you have at least one "n" tile, and you only need to find a second one.

### Break the connections

If it wasn't for the existence of connected tiles, the game would be very easy: because merging tiles removes one tile from the screen, merging tiles would be a virtuous cycle where keeping an empty (and thus playable) game area allows to easily merge tiles, which empties the area, etc.

So, if multiple merges possible: focus on targetting **connected** tiles. You'll allow them to be moved freely, and prevent blocking the ones below.

![Merging conflict](/images/twenty-merge.png)

### Use gravity

If two tiles of same value are only separated vertically by another tile, move the middle tile to let the top one merge with the bottom one.

If you're lucky and the middle tile was of value "n+1", you can merge it back with the newly created tile.

![Gravity](/images/twenty-gravity.png)

## Prioritize

The difficulty increases exponentially: if during one round you only manage to perform fewer than 5 merges, you'll suffer the consequences for following rounds as well. Keeping your board "tidy" in the early rounds (before the "10" tile) is crucial to obtaining a high score.

Because time is a constraint, it is difficult to focus on applying all these ideas on each move.

Although keeping tiles ordered is essential, it's very hard to maintain over time. That's why focusing on **breaking the connections** is a great strategy.

In later rounds, because the board can be completely blocked by connected tiles, the problem doesn't come from the _existence_ of merges or the _speed_ required to perform them, but simply from the **ability** to perform them.

Sometimes, moving tiles to break 1 connection instead of merging 6 non-connected tiles can be considered a better move in the long run. It also helps focusing on one aspect of the game because connections are easy to spot.