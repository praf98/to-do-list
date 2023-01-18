import { LightningElement } from 'lwc';
import pubshub from 'c/pubsub';
export default class Serchpublish_event_list extends LightningElement 
{
    limit;
    limitme(event)
    {
        this.limit=event.target.value;
    }
    searchme(event)
    {
          var message=parseInt(this.limit);
          console.log('Chiled Value'+this.message)
          pubshub.fire('eventnotify',message);
    }
}