# go-wasm-react-chrome-extension

### Create wasm code
https://github.com/skkim-01/go-wasm-react-chrome-extension/blob/main/go-wasm-example/cmd/wasm-iface/gen.go

### Build
```shell
$Env:GOOS="js"; $Env:GOARCH="wasm"; go build -o test.wasm ./cmd/wasm-iface/gen.go
```

### Create react chrome extension
- skip

### Adjust manifest
- Avoid CSR: `public/manifest.json`
```json
{
  "manifest_version": 3,
  "content_security_policy": {
    "extension_pages": "worker-src 'self'; script-src 'self' 'wasm-unsafe-eval'"
  },
}
```

### Copy wasm files to `react-app/public`
- `test.wasm`: built
- `wasm_exec.js`: %GOROOT%/misc/wasm/wasm_exec.js (for me)

### Update `react-app/public/index.html`
- note `wasm_exec.js`
```html
<html>
  <head>
    ...
    <script src="%PUBLIC_URL%/wasm_exec.js"></script>
    ...
  </head>
</html>
```

### WASM Call
- https://github.com/skkim-01/go-wasm-react-chrome-extension/blob/main/react-chrome-extension-example/src/testpage.js

### build chrome extension
```
npm run build
```

### Add extension
- skip

### Test wasm
![image](https://github.com/skkim-01/go-wasm-react-chrome-extension/assets/46100421/5cf89173-f06e-473b-abf0-322c7598f7a5)
