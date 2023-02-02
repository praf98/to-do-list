import { LightningElement, wire } from 'lwc';
import myMethod from '@salesforce/apex/getRfpsRecords.myMethod';
import pubshub from 'c/pubsub';
import { NavigationMixin } from 'lightning/navigation';

export default class RFP_Lwc_component extends NavigationMixin (LightningElement) 
{   data;
    
     @wire(myMethod)func({error,data})
     {
        if(data)
        {    console.log(data)
            this.data=data;
            
        }
        else if(error)
        {

        }
     }

     ontoggleSelection(event)
     {
        let message =event.detail.openSections;
        console.log('button  input'+ message)
   pubshub.fire('eventnotify',message);
     }
    /* selectme(event)
     {  let message =event.target.value;
         console.log('button  input'+ message)
    pubshub.fire('eventnotify',message);
     } */

     Createhandler(event)
     {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'RFP__c',
                actionName: 'new'
            }
        });
     }
}