# kdtree

A code kata for the agnostechvalley user group.
https://www.meetup.com/agnostechvalley/events/237797340/

I chose a kdtree from http://rosettacode.org/wiki/K-d_tree

I'd like to do this in elixir, but in order to get it done by wednessday I decided to coble together something using an ancient binary search tree that I wrote in actionscript in 2000
https://github.com/Cortrah/kdtree/blob/master/src/archive/flash/flash_things.htm

And use it to augment an implementation by ubilabs that used a binary heap instead of a binary search tree as the data structure.

This is the readme for the ubilabs version
https://github.com/ubilabs/kd-tree-javascript

Their examples are particularly great for getting the sense of what a kdtree is, I love the color picker example.

Another good description of the use of a kdtree applied specifically to 3d rendering via binary space partitioning
https://www.youtube.com/watch?v=yTRzfKh4Tg0

some elixir related bintree links

https://github.com/jtarchie/kdtree-erlang/blob/master/kdtree.erl

https://medium.com/@sashaafm/developing-an-algorithm-and-data-structures-collection-in-elixir-part-ii-binary-search-tree-8c18e2294dee#.bn3pn3fea


Also two great books that really get into this stuff

https://www.elsevier.com/books/foundations-of-multidimensional-and-metric-data-structures/samet/978-0-12-369446-1

https://books.google.com/books/about/Purely_Functional_Data_Structures.html?id=SxPzSTcTalAC&source=kp_cover

## Build Info

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

