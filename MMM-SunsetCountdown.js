
Module.register("MMM-SunsetCountdown", {
  // Default module config.
  defaults: {
    event: "Sunset in:",
    postevent: "See you tomorrow",
    fetchInterval: 60*1000, //in ms 60000 = 1 minute
    userlat: "0",
    userlon: "0",
  },

  getSRSS: function(that) {
    that.sendSocketNotification('GET_SRSS', that.url);
    setTimeout(that.getSRSS, that.config.fetchInterval, that)
  },


  getStyles: function() {
    return ["MMM-SunsetCountdown.css"]
  },


  start: function() {
    Log.log('Starting module: ', this.name);
    this.loaded = false;
    this.result = null;
    this.srss = '';
    this.url = "https://api.sunrise-sunset.org/json?lat="+this.config.userlat+"&lng="+this.config.userlon+"&formatted=0";
    this.getSRSS(this);

  },

  socketNotificationReceived(notification, payload){
    console.log(notification);
    if (notification === 'GOT_SRSS' && payload.url == this.url) {
      this.loaded = true;
      this.srss = payload.srss;
      this.result = payload.result;
      this.updateDom()

    }
  },

  // Update function
  getDom: function() {
    const wrapper = document.createElement("div");
    this.setupHTMLStructure(wrapper);
    if (this.srss === null) return wrapper;
    return wrapper;
  },

  setupHTMLStructure(wrapper){

    var timeWrapper = document.createElement("div");
    var textWrapper = document.createElement("div");

    textWrapper.className = "align-left week dimmed medium";
    timeWrapper.className = "time bright xlarge light";

    textWrapper.innerHTML=this.config.event;

    var today = new Date(Date.now());
    var utcsunset = moment(this.srss).local().toDate();
    console.log("UTCSunset: ",this.srss,utcsunset);

    timeWrapper.innerHTML = moment(utcsunset).fromNow() + " at " + moment(utcsunset).format("h:mm");
    wrapper.appendChild(textWrapper);
    wrapper.appendChild(timeWrapper);
    return wrapper;
  }

});
