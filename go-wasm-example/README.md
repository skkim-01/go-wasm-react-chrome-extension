### build-windows
```bash
$Env:GOOS="js"; $Env:GOARCH="wasm"; go build -o gen.wasm ./cmd/wasm-iface/gen.go
```