import { LightningElement } from 'lwc';
import methodName from '@salesforce/apex/SearchContact.methodName';
import { NavigationMixin } from 'lightning/navigation';
import pubshub from 'c/pubsub';
const actions = [
    { label: 'View', name: 'view' }
    
 ];

const col=[
          {label:'FirstName',fieldName:'FirstName',type:'text'},
          {label:'LastName',fieldName:'LastName',type:'text'},
          {label:'Phone',fieldName:'FirstName',type:'phone'},
          {label:'Email',fieldName:'FirstName',type:'email'},
          {
            type: 'action',
            typeAttributes: {
                rowActions: actions,
                menuAlignment: 'right'
            }
        }
];
export default class Searchlist_usingimpreative extends NavigationMixin (LightningElement)
{
    colmm=col;
    mydata;
    myname;
 // limit;
  limiteee;
    limitme(event)
    {
        this.limit=event.target.value;
    }

    connectedCallback()
    {
        this.register();
    }
    register()
    {
    pubshub.register('eventnotify',this.handleme.bind(this)); 
    }

    handleme(messageFromevt)
    {    
        
       this.limiteee=(messageFromevt ? JSON.stringify(messageFromevt,null,'\t'): 'No message payload')
       console.log('Event Value'+this.limiteee)
       methodName({limi:this.limiteee})
    .then(result=>{
        this.mydata=result;
        this.myname=JSON.stringify(result);
        //console.log('Mydata.dat'+this.mydata)
    })
    .catch(error=>{
        console.log('Mydata.dat'+JSON.stringify(error))
    })
    
   
    }
    rowaction(event) 
    { 
        console.log('action');
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
    


   /* connectedCallback()    //connectedCallback used when the page is load called apex
    {
        console.log('Event Value'+this.limiteee)

    methodName({limi:this.limiteee})
    .then(result=>{
        this.mydata=result;
        console.log('Mydata.dat'+this.mydata)
    })
    .catch(error=>{
        console.log('Mydata.dat'+JSON.stringify(error))
    })
    }-*/
}