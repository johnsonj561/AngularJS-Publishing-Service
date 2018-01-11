### AngularJS Publishing Service

Angular JS $broadcast/$emit events are powerful, but can at times be overkill. 

Here is a [brief explanation] of pros/cons between Publish/Subscribe pattern and AngularJS $broadcast

With that being said - I've put together a Publishing Service for AngularJS framework.

Subscribing is as simple as:
```javascript
const mySubscription = PublishingService.subscribe('event:key', callbackFunction);
```

Most important - must unsubscribe when finished to prevent memory and perf issues. To unsubscribe:
```javascript
mySubscription.unsubscribe();
```

[brief explanation]: https://stackoverflow.com/questions/21638563/angularjs-pubsub-vs-broadcast
