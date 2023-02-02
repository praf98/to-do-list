import { api, LightningElement, wire } from 'lwc';
import getMethod from '@salesforce/apex/knowledgeBase.getMethod';
import { NavigationMixin } from 'lightning/navigation';
import pubshub from 'c/pubsub';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Select', name: 'Select' }
 ];

const col =[
    {label:'Title', fieldName:'Title__c', type:'text'},
    {label:'Article Number',fieldName:'Name', type:'text'},
    {type: 'action',typeAttributes: {rowActions: actions,menuAlignment: 'right'}
    }  
];

export default class KnowledgeBase extends NavigationMixin (LightningElement){

    kBcol=col;
    kbinput;
    kB;
    record;
    

    @api recordId;  

    searchME(event){
        this.kbinput = event.target.value;
    }

    @wire (getMethod,{text:'$kbinput'})
    kBB({data, error}){
        if(data){
            
            /*var tempContact=JSON.parse(JSON.stringify(data));
            for(var i=0; i<tempContact.length; i++)
            {
                var newcontact=tempContact[i]['Id'];
            console.log(newcontact);
            //console.log('the list of Id '+JSON.parse(data));
           
            }*/
            this.kB = data;

            
            
     }else if(error){
            console.error(error);
        }
    }

    nav(event){
        const actionName = event.detail.action.name;

        const row = event.detail.row;
        
        this.recordId = row.Id;
         //  console.log('the row id you get  :'+ row.Title__c);
        switch (actionName) {

            case 'view':

                this[NavigationMixin.Navigate]({

                    type: 'standard__recordPage',

                    attributes: {

                        recordId: row.Id,

                        actionName: 'view'

                    }

                });

                break;
                case 'Select':
                  // console.log(row.Procedure_Steps__c);
                    pubshub.fire('eventname' ,row.Procedure_Steps__c);  
     
                break;
            }
    }
}