'use strict';
angular.module('app.publishing.service', [])
  .service('PublishingService', [function() {

    const subscriptions = {};
    let UNIQUE_ID = 0;

    /**
     * Subscribe
     * Registers a subscriber to notifications on channel
     */
    function subscribe(channel, cb) {
      if(!channel || typeof cb !== 'function') {
        return;
      }
      const subscriberID = UNIQUE_ID++;
      const subscription = new Subscription(subscriberID, channel, cb);
      subscriptions[channel] = subscriptions[channel] || [];
      subscriptions[channel].push(subscription);
      return subscription;
    }

    /**
     * Notify
     * Fire all callbacks associated with channel
     */
    function notify(channel, data) {
      if(subscriptions[channel]) {
        subscriptions[channel].forEach(subscriber => subscriber.callback(data));
      }
    }

    /**
     * Subscription Constructor
     */
    function Subscription(subscriberID, channel, callback) {
      this.subscriberId = subscriberID;
      this.channel = channel;
      this.callback = callback;
    }

    /**
     * Subscription Unsubscribe
     * Removes this subscriber from channel
     */
    Subscription.prototype.unsubscribe = function() {
      const subscribers = subscriptions[this.channel];
      if(!subscribers) {
        return;
      }
      const idx = _.findIndex(subscribers, subscriber => subscriber.subscriberID === this.subscriberID);
      if(idx > -1) {
        subscribers.splice(idx, 1);
      }
      if(!subscribers.length) {
        delete subscriptions[this.channel];
      }
    }


    return {
      subscribe,
      notify
    }


  }]);
