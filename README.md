# Music Events Near You
Searches and displays music events and festivales based on the current
location. Written in JavaScript and Node.js.

![Screenshot](http://i.imgur.com/g73gDMt.png)

Click [here](http://events.steiner.website) to see it in action.

# Building

After cloning, cd into the directory and run the follwing:

```bash
npm install
bower install
```

Main build script is `Makefile`, to run it type `make`. By default it displays
the help:

```
> make 'help'
available make targets:
    configure     installs npm and bower dependencies. you should have npm/nodejs installed
    all           runs 'clean', 'test' and builds the project to dist/ folder
    clean         removes dist/ folder and it's contents
    mocha         runs server-side tests
    test          generates unit test list and runs them
    test-server   generates a list of unit tests and runs the server for running them
    jshint        validates javascript files folders: test/static/ test/server/ src/server/ src/static/js/
    help          prints this text
    run           run development version
    run-dist      run built version
    docs          generates jsdoc to docs/ folder

to run a target, type 'make <target>'.

note: only the main targets are described here, use others with caution
> make 'help' done 
```

## Configuration
A file `settings.json` must be present in root of the project folder. The basic
structure is described below. Double-slash comments in new lines are allowed.

```javascript
{
    "title": "Music Events Near You",
    "description": "Find upcoming music events near your location, with tour dates and tickets for concerts and festivals",
    "context": "/",
    "logLevel": "trace",
    "client": {
        "logEnabled": true,
        "urlPrefix": "/"
    },
    "googleAnalytics": {
        "id": ""
    },
    "lastfm": {
        "apiUrl": "https://ws.audioscrobbler.com/2.0/",
        "apiKey": ""
    }
}
```
