import React, { useEffect, useState } from 'react';

export default function TestPage() {
  const onClickedTestWasm = () => {
    console.log('onClickedLock::invoke');
    callWasmInvoke();
  };

  useEffect(() => {
    const initWasm = async () => {
      if (!window.Go) {
        console.error('Go object not found. Make sure wasm_exec.js is loaded.');
        return;
      }
      try {
        const go = new window.Go(); // window.Go 객체를 사용하여 Go 인스턴스를 생성합니다.
        const response = await fetch('test.wasm');
        const buffer = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(buffer, go.importObject);
        go.run(instance);
        console.log('useEffect::load-success::instance', instance);        
      } catch (err) {
        console.error('Wasm loading error:', err);
      }
    };

    initWasm();
  }, []);
  
  const callWasmInvoke = () => {
    console.log("window:", window)
    if (window.merges) {
        // Convert JavaScript arrays to TypedArrays since WebAssembly can only interact with TypedArray or ArrayBuffer
        const srcArray = new Int32Array([1, 2, 3]);
        const trgArray = new Int32Array([4, 5, 6]);

        // Call the function directly from the global scope
        const result = window.merges(srcArray, trgArray);
        console.log('merge Arrays:', result);

        const resultJson = window.mergesJson(trgArray, srcArray);
        console.log('merge Arrays json:', resultJson);

        const eTest = window.errorTest();
        console.log('error test  json:', eTest);
    } else {
        console.error('merges function not found in global scope');
    }
  };

  return (
    <div>
      <button onClick={onClickedTestWasm} className="testButton">
        wasm test
      </button>
    </div>
  );
}
