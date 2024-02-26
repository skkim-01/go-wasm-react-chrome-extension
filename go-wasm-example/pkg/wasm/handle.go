package wasm

import (
	"syscall/js"

	"github.com/skkim-01/jsonmapper_v2"
)

func FromJSIntArray(v js.Value) []int {
	goslice := make([]int, v.Length())
	for i := 0; i < v.Length(); i++ {
		goslice[i] = v.Index(i).Int()
	}
	return goslice
}

func Success(msg ...interface{}) interface{} {
	j, _ := jsonmapper_v2.NewJsonMapObject(make(map[string]interface{}))
	j.Add("error_code", 0)

	var k string = ""
	var v interface{} = nil

	for i := range msg {
		if i%2 == 0 { // key
			k = msg[i].(string)
		} else { // value
			v = msg[i]
			j.Add(k, v)
			k = ""
			v = nil
		}
	}
	return js.ValueOf(string(j.Print()))
}

// Error: make result: error json object
func Error(code int, msg interface{}) interface{} {
	j, _ := jsonmapper_v2.NewJsonMapObject(make(map[string]interface{}))
	j.Add("error_code", code)
	j.Add("payload", msg)
	return js.ValueOf(string(j.Print()))
}
