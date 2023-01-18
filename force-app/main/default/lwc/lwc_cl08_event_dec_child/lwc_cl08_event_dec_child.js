import { LightningElement } from 'lwc';

export default class Lwc_cl08_event_dec_child extends LightningElement
 {
    incme(event)
    {
     // step 1  ----> create event
     const inc=new CustomEvent('evnincvol',{detail:'Volume'});
     //step 2 --->dispatch event
     this.dispatchEvent(inc);
     
    }
    Deccme(event)
    {
       // step1 + step 2 combined
       this.dispatchEvent(new CustomEvent('evdecvol',{detail:'Volume'}));  
    }
 }