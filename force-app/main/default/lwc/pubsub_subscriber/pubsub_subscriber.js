import { LightningElement } from 'lwc';
import pubshub from 'c/pubsub';
export default class Pubsub_subscriber extends LightningElement
 {
    message;
    connectedCallback()
    {
        this.register();
    }
    register()
    {
    pubshub.register('eventnotify',this.handleme.bind(this)); 
    }
    handleme(messageFromevt)
    {
       this.message=messageFromevt ? JSON.stringify(messageFromevt,null,'\t'): 'No message payload'
    }
 }