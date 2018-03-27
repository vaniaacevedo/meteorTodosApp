import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';

ServiceConfiguration.configurations.remove({
    service: "facebook"
});

ServiceConfiguration.configurations.insert({
    service: "facebook",
    appId: '151865125493755',
    secret: 'e60e9bd9ae7f191e585c8b2bf93b3948'
});

Meteor.startup(() => {
  // code to run on server at startup
});
