
port := 3000

# username=come password=tocode
auth := Basic Y29tZTp0b2NvZGU=
#-H 'Authorization: $(auth)'

start:
  @docker-compose -f $(project)/docker-compose.yml up

stop:
  @docker-compose -f $(project)/docker-compose.yml down

create-todo:
  @curl \
    --silent \
    -X POST \
    http://localhost:$(port)/todos \
    -H 'Content-Type: application/json' \
    -d '{"text":"$(text)","done":false}' \
    | jq .

do-todo:
  @curl \
    --silent \
    -X PUT \
    http://localhost:$(port)/todos/$(id) \
    -H 'Content-Type: application/json' \
    -d '{"done":true}' \
    | jq .

list:
  @curl \
    --silent \
    http://localhost:$(port)/todos \
    | jq .
