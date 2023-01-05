import { LightningElement,wire } from 'lwc';
import bringcon from '@salesforce/apex/LWC_CL06_SerchContcats.bringcon';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import First_Name_field from '@salesforce/schema/Contact.FirstName';
import Last_Name_field from '@salesforce/schema/Contact.LastName';
import ID_field from '@salesforce/schema/Contact.Id';

 const Col=[
    {label:'FirstName',fieldName:'FirstName',editable:true},
    {label:'LastName',fieldName:'LastName',editable:true}

 ];

export default class LWC_CL07UpdateACCount extends LightningElement 
{
    
 col=Col;
 inputttext;
 draftValues=[];
 inputext(event)
 {
    this.inputttext=event.target.value;
 }
   @wire(bringcon,{searckey:'$inputttext'})rup;
  
   handleSave(event)
   {  
    const fields={};
      //step 1 capture the values 
      fields[ID_field.fieldApiName]=event.detail.draftValues[0].Id;
      fields[First_Name_field.fieldApiName]=event.detail.draftValues[0].FirstName;
      fields[Last_Name_field.fieldApiName]=event.detail.draftValues[0].LastName;

      //   step 2-----> create RecordSet
      const recordInput={fields};
      // step 3 ------- use in impretion 
      updateRecord(recordInput).then(response=>{
        alert('Record Update succesfully');
        this.draftValues=[];
        return refreshApex(this.rup);
      }).catch(error=>{
        alert('Error Occured'+error.body.message);
      })

   }

}