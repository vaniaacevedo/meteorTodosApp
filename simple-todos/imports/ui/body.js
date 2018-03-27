import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

import './body.html';
import './task.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks(){
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')){
      //if hide completed is checked, filter Tasks
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1} });
    }
    //otherwise return all of the tasks
      return Tasks.find({},{ sort: { createdAt: -1 } });
  },
    incompleteCount(){
      return Tasks.find({ checked:{ $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event) {
    //prevent default brower form submit
    event.preventDefault();

    //get value from form element
    const target= event.target;
    const text= target.text.value;

    //insert a task into the collection
    Meteor.call('tasks.insert', text);

    //clear form
    target.text.value= '';
  },
  'change .hide-completed input'(event, instance){
    instance.state.set('hideCompleted', event.target.checked);
  },
});
