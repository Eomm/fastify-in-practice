
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

post:
	@curl \
		--silent \
		-X POST $(url) \
		-H 'Content-Type: application/json' \
		-H 'Authorization: $(auth)' \
		-d '{"text":"$(text)","done":false}' \
		| jq .

put:
	@curl \
		--silent \
		-X PUT $(url)/$(id) \
		-H 'Content-Type: application/json' \
		-H 'Authorization: $(auth)' \
		-d '{"done":true}' \
		| jq .

get:
	@curl \
		--silent $(url) \
		-H 'Authorization: $(auth)' \
		| jq .

delete:
	@curl \
		--silent \
		-X DELETE $(url)/$(id) \
		-H 'Authorization: $(auth)' \
		| jq .
