
port := 8080

url := http://localhost:$(port)/todos
auth := ''

start:
	@npm run mongo:start

stop:
	@npm run mongo:stop

ping:
	@curl \
		--silent \
		http://localhost:$(port)/ \
		| jq .

create:
	@curl \
		--silent \
		-X POST $(url) \
		-H 'Content-Type: application/json' \
		-H 'Authorization: $(auth)' \
		-d '{"text":"$(text)","done":false}' \
		| jq .

create-invalid:
	@curl \
		--silent \
		-X POST $(url) \
		-H 'Content-Type: application/json' \
		-H 'Authorization: $(auth)' \
		-d '{}' \
		| jq .

do:
	@curl \
		--silent \
		-X PUT $(url)/$(id) \
		-H 'Content-Type: application/json' \
		-H 'Authorization: $(auth)' \
		-d '{"done":true}' \
		| jq .

list:
	@curl \
		--silent $(url) \
		-H 'Authorization: $(auth)' \
		| jq .
