'use strict';
angular.module('union.services.publishing.service', [])
  .service('PublishingService', [function() {

    const subscriptions = {};
    let UNIQUE_ID = 0;

    /**
     * Subscribe
     * Stores subscriber's callback in subscriptions object
     * Returns an object with unsubscribe function
     */
    function subscribe(key, cb) {
      if(!key || typeof cb !== 'function') {
        return;
      }
      const subscriberID = UNIQUE_ID++;
      subscriptions[key] = subscriptions[key] || [];
      subscriptions[key].push({ subscriberID, cb });
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
        return;
      }
      const idx = _.findIndex(subscriptions[key], subscriber => subscriber.subscriberID === subscriberID);
      if(idx > -1) {
        subscriptions[key].splice(idx, 1);
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

