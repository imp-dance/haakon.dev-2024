---
title: Python from a Typescript developer's perspective
date: 2026-05-11
summary: >
  What's Python like from the perspective of a Typescript developer?
img: /images/py-v-js.jpeg
draft: false
---

## I'm learning Python!

Even though I haven't written much about it here, I do actually have a tiny bit of backend experience. When I first started out doing web development, I was full stack. So I figured, why not try to upskill a bit - learn a new language that's not too dissimilar to what I already know and dive a bit more into backend development.

> I'm learning Python through a combination of [boot.dev](https://boot.dev) and talks with backenders I know and respect!

This gives me an interesting perspective - learning Python as a Javascript developer. The first thing to notice is just how much is the same, but then there are some core differences that stick out to me in particular.

![Image of Javascript vs Python](/images/py-v-js.jpeg)

### Array methods

`Array.filter`, `Array.map`, etc. are methods I use constantly when writing Javascript. But in Python, these are a bit different.

```
[].filter(func) --> becomes --> filter(func, list)
```

I call these "array methods" because in Javascript, that's what they are. In Python, though, they are separate functions that take the list in as an argument. They all follow the same pattern though (`method(func, list)`), for example:

```python
list(map(lambda x: x + 1, [1, 2, 3])) # -> [2, 3, 4]
```

> If you don't wrap the returned value with `list()` - _map_ will return
> a map object instead. You have to explicitly convert it to a list again

#### List comprehension

There's also this thing called _list comprehension_. It's a way to build a new list out of an iterable, using an expression:

```python
nums = [1, 2, 3, 4]

double = lambda x: x * 2

doubled_list = [double(x) for x in nums]
```

There are different ways to do this syntax. In the case of doubling, you could even just describe that directly (omitting `lambda x:`): `[x * 2 for x in nums]`.

#### Slicing

This was a really fun one. In Python, you can slice up a list into a new one, using the following syntax:

```py
new_list = list[start:end:step]
```

The syntax is very simple, but **powerful**. Take a look at this:

```py
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

even_nums = nums[1::2]
odd_nums = nums[0::2]

subsection = nums[4:7:1] # [5, 6, 7]
```

In the first two examples above, we _omit_ the **end** part of the syntax, basically telling Python to go all the way to the end of the list. We step by `2`, meaning that instead of jumping from index 0->1, we do 0->2->4, etc.

In the subsection example, you can see that the `end` part is actually _exclusive_. That means we slice from (and including) index `4`, to (and excluding) index `7`, leaving the indicies: `4, 5, 6`.

### The walrus operator

If you are familiar with the intricacies of Javascript, you'll be aware that doing stuff like _assigning a value_ will also _return a value_. To prove this, just open up your console:

```js
let a = 1; // declaration, "returns": undefined
a = 2;
// "assignment expression", returns: 2
a += 1;
// "assignment expression", returns: 3
```

So JS is a bit lenient in this way. Python, in contrast, does not return values unless _specifically asked for_ (using a _walrus operator_):

```py
a = 1
a += 2 # still doesn't return anything
a -= 1 # nothing!

b := 5 # This, however, returns: 5
c = (b := 6) # now b and c are both: 6
```

This might not be super useful for daily work, but it was a peculiarity that I took notice to.

### There's no "_this_"

Kind of. In Javascript, `this` is a pretty magic variable that will point to different objects depending on the context it's used. For example, in a class, `this` typically refers to the current instance that the method is being called from. In Python, this is all a lot more explicit:

```python
class Animal:
    def __init__(self, name): # class constructor
        self.name = name

    def shout(self):
        print(f"{self.name}!!!")

my_animal = Animal("Molly")
my_animal.shout() # Molly!!!
```

---

## What's next?

I'm currently cruising through the [backend path](https://www.boot.dev/paths/backend) of [boot.dev](https://boot.dev). I'm guessing I'll skip a few steps and projects, but I'm really excited to take a look at Linux, data structures and algorithms, memory management and learning go. Once I get there, I'm sure I'll write up some more articles.
