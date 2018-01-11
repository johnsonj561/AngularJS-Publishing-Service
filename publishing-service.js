'use strict';
angular.module('app.services.publishing', [])
  .service('PublishingService', [function() {

    console.log("publishing service init");

    const subscriptions = {};
    let UNIQUE_ID = 0;

    /**
     * Subscribe
     * Stores subscriber's callback in subscriptions object
     * Returns an object with unsubscribe function
     */
    function subscribe(key, cb) {
      if(!key || typeof cb !== 'function') {
        return console.log('key and callback are required');
      }
      const subscriberID = UNIQUE_ID++;
      subscriptions[key] = subscriptions[key] || [];
      subscriptions[key].push({ subscriberID, cb });
      console.log('subscription created for ', key);
      return {
        unsubscribe: function() {
          unsubscribe({ subscriberID, key })
        }
      }
    }

    /**
     * Unsubscribe
     * Remove subscriber marked by key and subscriberID
     */
    function unsubscribe({ subscriberID, key }) {
      if(!subscriptions[key]) {
        return console.log(`Subscriber key ${key} not found`);
      }
      const idx = _.findIndex(subscriptions[key], subscriber => subscriber.subscriberID === subscriberID);
      if(idx > -1) {
        subscriptions[key].splice(idx, 1);
        console.log('removing subscriber', subscriptions);
      }
      if(!subscriptions[key].length) {
        delete subscriptions[key];
      }
    }

    /**
     * Publish
     * Published event marked by key if key is defined
     * Else publishes events to all subscribers
     */
    function publish(key) {
      if(subscriptions[key]) {
        subscriptions[key].forEach(subscriber => subscriber.cb());
      }
    }


    return {
      subscribe,
      publish
    }

  }]);

