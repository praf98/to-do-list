import { LightningElement } from 'lwc';
import pubshub from 'c/pubsub';
export default class Pubshub_publisher extends LightningElement
{
   name;
   phone;
   msg;
    Nme(event)
    {
       this.name=event.target.value;
    }
    phe(event)
    {
        this.phone=event.target.value;
    }
    msge(event)
    {
        this.msg=event.target.value;
    }
    subme(event)
    {
         
       let message ={
                        "Sender Name" :this.name,
                        "Sender Phone":this.phone,
                        "Message"     : this.msg
                    };
                    pubshub.fire('eventnotify',message);
    }
}