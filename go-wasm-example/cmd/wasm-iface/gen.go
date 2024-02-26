package main

import (
	"syscall/js"

	"github.com/skkim-01/go-wasm-react-chrome-extension/go-wasm-example/pkg/wasm"
)

func Merges(this js.Value, args []js.Value) interface{} {
	src := make([]int, args[0].Length())
	trg := make([]int, args[1].Length())

	for i := 0; i < args[0].Length(); i++ {
		src[i] = args[0].Index(i).Int()
	}
	for i := 0; i < args[1].Length(); i++ {
		trg[i] = args[1].Index(i).Int()
	}

	result := append(src, trg...)

	// Create a new JavaScript array to hold the result
	jsResult := js.Global().Get("Array").New(len(result))
	for i, v := range result {
		// Set each value in the JavaScript array
		jsResult.SetIndex(i, js.ValueOf(v))
	}

	return jsResult
}

func MergesJson(this js.Value, args []js.Value) interface{} {
	src := wasm.FromJSIntArray(args[0])
	trg := wasm.FromJSIntArray(args[1])

	result := append(src, trg...)

	return wasm.Success("payload", result)
}

func ErrorTest(this js.Value, args []js.Value) interface{} {
	return wasm.Error(100, "Error: Test")
}

func registerCallbacks() {
	js.Global().Set("merges", js.FuncOf(Merges))
	js.Global().Set("mergesJson", js.FuncOf(MergesJson))
	js.Global().Set("errorTest", js.FuncOf(ErrorTest))
}

func main() {
	c := make(chan struct{}, 0)
	registerCallbacks()
	<-c
}
