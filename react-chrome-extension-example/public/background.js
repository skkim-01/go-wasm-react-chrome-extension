// background.js

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  // console.log('Default background color set to %cgreen', `color: ${color}`);
});

// // close event
// chrome.runtime.onConnect.addListener(function (externalPort) {
//   externalPort.onDisconnect.addListener(function () {
//      let background_object = this.props.getBackgroundObject();
//      background_object.event.removeListener('onSend');
//      //window.localStorage.setItem("tmp", `${new Date().toDateString()} + ${new Data().toTimeString()}`)
//      console.log("txt")
//      LSHandler.storeContext({
//       route: this.state.routeName,
//       args: this.state.routeArgs
//     })
//   })
// })
