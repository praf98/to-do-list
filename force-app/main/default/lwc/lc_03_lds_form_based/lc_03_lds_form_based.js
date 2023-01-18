 import { LightningElement,api } from 'lwc';

export default class Lc_03_lds_form_based extends LightningElement 
{
   @api recordId;
   Restme(event)
   {
          const inputFields=this.template.querySelectorAll('lightning-input-field');
          inputFields.foreach(field=>{field.reset();});
   }
}