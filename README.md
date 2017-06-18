# Pokemon cheatsheet

This is a web application that allows access to pokemon information with the use of REST API provided by [PokeAPI](https://pokeapi.co/).
It has been a challenge given by the [IG](https://www.ig.com) for the purpose of recruitment.

## Installation

I have provided a `package.json`, which will help you setup the required environment.

Make sure you have `npm` installed and use it to install `gulp` globally:

```
npm install -g gulp
```

Now you are ready to install all dependencies:

```
npm install
```

I have setup few commands ready to use:

- `gulp copy` - Copy fonts from bootstrap package.
- `gulp sass` - Complies our `sass` into `css`.
- `gulp test` - Run the unit tests.
- `gulp uglify` - Compress our js application.

## Testing

There are three small unit test included for the sake of demonstration. To run them execute:

```
gulp test
```
