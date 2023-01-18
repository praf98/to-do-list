import { LightningElement ,wire,api} from 'lwc';

import DemoClass1 from '@salesforce/apex/DemoClass.DemoClass1';
import DemoClass2 from '@salesforce/apex/DemoClass.DemoClass2';
const actions = [

    { label: 'Select', name: 'view' }

 ];
const  col= [
{label:'Name',fieldName:'Name',type:'text'},

{type: 'action',typeAttributes: {rowActions: actions,menuAlignment: 'right'} }


];
export default class lwcomponents extends LightningElement 
{

     mydata;
     newId;
    coll=col;
    @wire(DemoClass1) mydata
   
 nav(event){

        const actionName = event.detail.action.name;
        const row = event.detail.row;
        this.recordId = row.Id;
        switch (actionName) 
        {
            case 'view':
              //  var newId=this. this.recordId
               // console.log( 'this   nnneeewww  iid'+this.newId);
               console.log( 'New Row ID'+this.recordId);
               this.dispatchEvent(new CustomEvent('evnt',{detail:this.recordId}) );
      
             
      break;

            }
        }
      /* deleteRow(currentrrow)
        {
            const selectrow=currentrrow;
            console.log( 'New Row ID'+this.selectrow.id);
           // this.dispatchEvent(new CustomeEvent('evnt',{detail:{nm:this.selectrow}}));
        }*/
    }