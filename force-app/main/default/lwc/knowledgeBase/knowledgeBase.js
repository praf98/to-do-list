import { api, LightningElement, wire } from 'lwc';
import getMethod from '@salesforce/apex/knowledgeBase.getMethod';
import { NavigationMixin } from 'lightning/navigation';

const actions = [
    { label: 'View', name: 'view' }
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
            this.kB = data;
        }else if(error){
            console.error(error);
        }
    }

    nav(event){
        const actionName = event.detail.action.name;

        const row = event.detail.row;

        this.recordId = row.Id;

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
            }
    }
}