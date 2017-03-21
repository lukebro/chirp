# chirp [![Build Status](https://api.travis-ci.org/lukebro/chirp.svg)](https://travis-ci.org/lukebro/chirp)

> CLI app helper

## Install
```console
$ npm install --save chirp
```

## Usage
```console
$ ./chirp loudly TWEET
```

```javascript
const chirp = require('chirp');

new chirp({
    commands: {
        loudly: {
            _(sound) {
                console.log('bird: ' + sound);
            },
            help: 'Chirp loudly.',
            args: ['sound'],
        },

        softly() {
            console.log('...');
        }
    }
});
```
## API
> TODO

## Inspiration

Inspired by [meow](https://github.com/sindresorhus/meow).  I wanted a CLI app helper that was just as fast and easy to use as meow, but for building larger CLI apps.  Other CLI helpers for larger applications exist but nothing with the same ambiance as meow.

## License

MIT © [Lukasz Brodowski](http://lukebro.com)
