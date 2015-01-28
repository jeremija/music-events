#COLOR_OUTPUT=true
RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
RUN_PORT=8082
TEST_PORT=8081
TEST_SERVER=http-server -p $(TEST_PORT)
JSDOC=node node_modules/.bin/jsdoc
JSHINT=node node_modules/.bin/jshint
LESSC=node node_modules/.bin/lessc
SOURCE=test/static/ test/server/ src/server/ src/static/js/
DIST=dist
DOCS=docs
MOCHA_PHANTOM_JS=node node_modules/.bin/mocha-phantomjs
MOCHA=node node_modules/.bin/mocha

TEST_URL=test/static/test.html

ifneq ($(no_color), true)
	MOCHA_PHANTOM_JS_COMMAND=$(MOCHA_PHANTOM_JS) --reporter progress
	MOCHA_COMMAND=$(MOCHA) --reporter progress

	YELLOW='\e[93m'
	GREEN='\e[32m'
	# disables color output
	NC='\e[39m'

	__START__=@echo -e $(YELLOW)\> make \'$@\'$(NC)
	___OK___=@echo -e $(GREEN)\> make \'$@\' done $(NC)
endif

ifeq ($(no_color), true)
	MOCHA_PHANTOM_JS_COMMAND=$(MOCHA_PHANTOM_JS) --reporter dot --no-color
	MOCHA_COMMAND=$(MOCHA) --reporter dot --no-color

	YELLOW=''
	GREEN=''
	NC=''
	__START__ =@echo make \'$@\'
	___OK___=@echo make \'$@\' done
endif

.PHONY: help
help:
	$(__START__)

	@echo "available make targets:"
	@echo "    configure     installs npm and bower dependencies. you should have npm/nodejs installed"
	@echo "    all           runs 'clean', 'test' and builds the project to $(DIST)/ folder"
	@echo "    clean         removes $(DIST)/ folder and it's contents"
	@echo "    mocha         runs server-side tests"
	@echo "    test          generates unit test list and runs them"
	@echo "    test-server   generates a list of unit tests and runs the server for running them"
	@echo "    jshint        validates javascript files folders: $(SOURCE)"
	@echo "    help          prints this text"
	@echo "    run           run development version"
	@echo "    run-dist      run built version"
	@echo "    docs          generates jsdoc to $(DOCS)/ folder"
	@echo ""
	@echo "to run a target, type 'make <target>'".
	@echo ""
	@echo "note: only the main targets are described here, use others with caution"

	$(___OK___)

.PHONY: configure
configure:
	# installing nodejs dependencies
	# if this fails, make sure you have npm (and nodejs) installed
	@npm install
	# installing bower dependencies
	@bower install

.PHONY: all
all: test less no-check-all

.PHONY: no-check-all
no-check-all: clean
	$(__START__)
	$(__HELP__)

	# creating required subfolders

	@mkdir $(DIST)
	@mkdir $(DIST)/static

	# optimizing and copying css
	@$(RJS) -o optimizeCss=standard \
		cssIn=src/static/css/style.css out=$(DIST)/static/css/style.css

	# copying fonts
	@mkdir --parents $(DIST)/static/bower/bootstrap/
	@cp -r src/static/bower/bootstrap/fonts $(DIST)/static/bower/bootstrap/
	@cp -r src/static/fonts $(DIST)/static/

	# copying server content
	@cp -r src/server $(DIST)/server
	# writing build stamp file
	@echo `git describe --tags` > $(DIST)/server/build
	# copying page templates
	@cp -r src/templates $(DIST)/templates

	@mkdir $(DIST)/static/js

	# running requirejs optimizer for javascript
	@$(RJS) -o \
		name="app" \
		baseUrl="src/static/js" \
		paths.requireLib="../bower/requirejs/require" \
		include="requireLib" \
		optimize=uglify \
		mainConfigFile="./src/static/js/require/config.js" \
		out="$(DIST)/static/js/app.js" \
		insertRequire="app" \
		preserveLicenseComments=false

	$(___OK___)

.PHONY: clean
clean:
	$(__START__)

	@rm -rf $(DOCS)
	@rm -rf $(DIST)

	$(___OK___)

.PHONY: test
test: jshint mocha test-gen mocha-phantomjs

.PHONY: mocha
mocha:
	$(__START__)
	# running node server unit tests

	@$(MOCHA_COMMAND) test/server/index.js

	$(__END__)

.PHONY: mocha-phantomjs
mocha-phantomjs:
	$(__START__)
	# running unit tests: $(TEST_URL) grep=$(grep)

	@$(MOCHA_PHANTOM_JS_COMMAND) $(TEST_URL)?grep=$(grep)

	$(___OK___)

.PHONY: test-gen
test-gen:
	$(__START__)
	# generating a list of unit tests

	@node test/static/find-tests.js

	$(___OK___)

.PHONY: test-server
test-server: test-gen test-server-start

.PHONY: test-server-start
test-server-start:
	$(__START__)
	# starting unit testing server"
	# visit http://localhost:$(TEST_PORT)/$(TEST_URL) to run tests

	@$(TEST_SERVER)

.PHONY: jshint
jshint:
	$(__START__)
	# will scan for javascript files in folders: $(SOURCE)

	@$(JSHINT) $(SOURCE)

	$(___OK___)

.PHONY: run
run:
	$(__START__)

	#visit http://localhost:$(RUN_PORT)/ after the server starts

	@PORT=$(RUN_PORT) node src/server/

	$(___OK___)

.PHONY: run-dist
run-dist:
	$(__START__)

	#visit http://localhost:$(RUN_PORT)/ after the server starts

	@PORT=$(RUN_PORT) node dist/server/

	$(___OK___)

.PHONY: docs
docs:
	$(__START__)

	rm -rf $(DOCS)
	$(JSDOC) -d $(DOCS) -r src/static/js
		# -c jsdoc.json
		# -t node_modules/ink-docstrap/template \

	$(___OK___)

.PHONY: less
less:
	$(__START__)

	$(LESSC) --relative-urls src/static/less/index.less src/static/css/style.css

	$(___OK___)
