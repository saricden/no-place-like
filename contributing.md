# Guidline to Contributing

We'd love for you to contribute any ideas for the project you may have. This can take the form of becoming a collaborator and opening an issue, or this could also take the form of forking the repository and opening a pull request.

## How to Setup

First, clone the repository to your machine using the `git clone` command:

`git clone git@github.com:saricden/no-place-like.git`

Note you can also use the `https` address in the `clone` command, but `ssh` is recommended.

Navigate into your newly cloned directory:

`cd no-place-like`

From the project directory, install dependencies (developer & production) by running the following:

`npm install`

That will take a minute, as it's installing the whole dependency tree.

You're basically good to go now, and should be able to run:

`npm run start`

To (also inside the project directory) start up a local dev server via [Webpack.](https://webpack.js.org).

Then the tab should open up in your browser, and navigate to:

`http://localhost:8080/`

Where you will see the game running. If you edit any of the files in the `/src` directory, they will automagically be transpiled, and moved to `/dist` where they will then be served from. This will also trigger a page refresh so y'all don't have to.

## Code formatting

This section will tell you how we like our code to look.

### Indenting

Please use spaces. 2 of them.

### Semicolons

Use them plz.

### ES6

Please use ES6 JavaScript syntax when available.

### Fat Arrow Functions

Please always wrap arguments with braces to make it clear it's a function. This would look like:

```
const fn = (a, b) => {

}
```

In the case that there's no agruments, just add an empty pair of braces like: `()`.


## Git Practices

These be our Git rituals.

### Branching & Merging

If you would like to contribute code to the project, please fork the repository to your own GitHub account, then create a branch applying the naming convention `[yourname]-[issue-number]-subject` for example: `kirk-43-hp-broken`.

When you are ready to merge your code back into the master branch (typically when the feature is finished or the bug is fixed, etc.) please open a pull request to do so.

The pull request _should_ be reviewed by another developer before being merged into the master branch. It should, but sometimes it's just me so I've just been merging them (on the livestreams, etc.).

### Commit Messages

When you commit code, please add a message using the `-m` flag. An example of this could look like: 

`git commit -m "#99: Fixes the 99th thing."`

Also, please prepend your message with the issue number and a colon like above. This will ensure GitHub's feature tracking picks up the commits and associates them to the appropriate issues.