import { LightningElement,wire } from 'lwc';
import getqestionAnswer from '@salesforce/apex/getqestionAnswer.getQuestion';
import getAnswer from '@salesforce/apex/getqestionAnswer.getAnswer';

 const col=[
    {label:"Artical Number", fieldName:'Name'},
    { label: 'Title', fieldName: 'Title__c', type:'button', typeAttributes: {  label: { fieldName: 'Title__c' },name:'urlredirect',variant:'base'  }}
];


export default class Questionanswer extends LightningElement 
{  columns=col;  // add value in columns 
     data;       // pass the value from apex class (Question Data)
    error;
    dataAns;     // Pass the apex value data from apex class(Answer Data )
    noofrecord=3;
    value=20;
  // No of display record
    get options() {
        return [
            { label: '3', value: 3 },
            { label: '5', value: 5 },
            { label: '20', value: 20 },
            { label: '50', value: 50 }
        ];
    }
    handlerowAction(event)
    {
       const actionName=event.detail.action.name;
       const row=event.detail.row;
       alert('actionName'+actionName);
       alert('selectedRow Values'+JSON.stringify(row));
       console.log('selectedRow Values'+JSON.stringify(row));

       
    }
    handleChange(event)
    {
         this.noofrecord=event.target.value;
    }
   //get the Question  record from apex class

  @wire(getqestionAnswer,{Queslimt:'$noofrecord'})myfunc({error,data})
   {
       if(data)
       {
           this.data=data
       }
       else if(error)
       {
           this.error=error
       }
   }
   @wire(getAnswer)myfunc2({error,data})
   {
       if(data)
       {
           this.dataAns=data;
          
       }
       else if(error)
       {
           this.error=error
       }
     }
                                      
                  //get the Answer  record from apex class
                      
               
}