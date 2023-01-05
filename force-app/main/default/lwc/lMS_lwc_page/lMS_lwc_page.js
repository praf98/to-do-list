
import { LightningElement,track } from 'lwc';
import {publish,subscribe,unsubscribe,createMessageContext,releaseMessageContext} from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/PrafulmsgChannel__c';
export default class EmpWebComponent extends LightningElement
{
    @track receiveMessage='';
    @track name='';
    @track phone='';
    @track city='';
    subscription = null;
    context = createMessageContext();

    constructor(){
        super();
    }
    handleName(event)
    {
        this.name = event.target.value;
    }
    handlePhone(event)
    {
        this.phone = event.target.value;
    }
    handleCity(event)
    {
        this.city = event.target.value;
    }

    submit()
       {
        const message = { Name : this.name,
                          Phone : this.phone,
                          City : this.city,
                        sourcesystem : "LWC"
        };
     publish(this.context, SAMPLEMC, message);   
    }

    subscribe()
    {
       if(this.subscription) {
           return;
       }
     this.subscription = subscribe(this.context, SAMPLEMC, (message) => {
     this.displayMessage(message);
       });
    } 

    displayMessage(message)
       {
           this.receiveMessage = message ? JSON.stringify(message, null,'\t') : 'no message payload';
       }
    
    unsubscribe()
    {
    unsubscribe(this.subscription);
    this.subscription = null;   
   }

   disconnectedCallback()
   {
    releaseMessageContext(this.context); 
   }

}