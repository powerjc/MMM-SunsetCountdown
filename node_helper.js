var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({

  start: function() {
    console.log('MMM-SunsetCountdown helper, started...');
    this.srss = '';
    this.result = null;
  },

  getSRSS: function(payload) {
    var that = this;
    this.url = payload;
    request({url: this.url, method: 'GET'}, function(error, response, body) {
      var result = JSON.parse(body);
//      console.log("Helper Request(p): ",error, response && response.StatusCode, result );

      if (!error ) { //&& response.StatusCode == 200) {
//        console.log("Helper Request(g): ", response && response.StatusCode, result );

        that.srss = result.results.sunset;
        that.result = result;
      } else {
//        console.log("Helper Request(e): ",error, response && response.StatusCode, result);
        that.srss = 'Error getting data';
      }
      that.sendSocketNotification('GOT_SRSS', {'url': that.url, 'srss': that.srss,'result': that.result});
    });
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_SRSS') {
      this.getSRSS(payload)
    }
  }
});
