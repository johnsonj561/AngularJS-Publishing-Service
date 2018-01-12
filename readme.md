### AngularJS Publishing Service

Angular JS $broadcast/$emit events are powerful, but can at times be overkill.

Here is a [brief explanation] of pros/cons between Publish/Subscribe pattern and AngularJS $broadcast/$emit/$on.

With that being said - I've put together a Publishing Service for AngularJS framework.

Include publishing-service.js in your application and register the service 'PublishingService' to start using it.

Subscribing:
```javascript
const mySubscription = PublishingService.subscribe(channel, callbackFunction);
```

Notifying:
```javascript
PublishingService.notify(channel, data);
```

Unsubscribe - note, failure to unsubscribe can and will cause memory leaks.
```javascript
mySubscription.unsubscribe();
```

[JS Fiddle]

[brief explanation]: https://stackoverflow.com/questions/21638563/angularjs-pubsub-vs-broadcast
[JS Fiddle]: https://jsfiddle.net/johnsonj561/d1o8mvq6/
