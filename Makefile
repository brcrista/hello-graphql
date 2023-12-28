.PHONY: all
all: bootstrap-cli bootstrap-server bootstrap-shared bootstrap-web-ui bundle

.PHONY: clean
clean:
	rm -rf static

.PHONY: bootstrap-%
bootstrap-%:
	cd src/$* && npm install

.PHONY: bundle
bundle:
	cd src/web-ui && npx webpack
