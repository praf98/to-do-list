import { LightningElement,track } from 'lwc';

import myMethod from '@salesforce/apex/getRfpsRecords.questionList';
import createRfpRecord from '@salesforce/apex/getRfpsRecords.createRfpRecord';
import getAnswer from '@salesforce/apex/getqestionAnswer.getAnswer';
import Createquestion from '@salesforce/apex/forjuctionanswer.Createquestion';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import pubshub from 'c/pubsub';

const col=[
  {label:"Artical Number", fieldName:'Name'},
  { label: 'Title', fieldName: 'Title__c', type:'button', typeAttributes: {  label: { fieldName: 'Title__c' },name:'urlredirect',variant:'base'  }}
];

export default class Questionlistcomponets extends LightningElement 
{   columns=col;
   @track message;
   isvisible=true;
    data;
    @track checkedBoxname;
    answerdata;
    flag=true;
    demo='"Nodata"';
    @track checkedBoxesIds = [];  //selected check box id
    @track newData=[];    
    selectQdata=[];      
    @track answerID=[];    //remove the all value from array
    QuestioniDi;
     QID=[];


     get selectedIds() 
      {
        return this.checkedBoxesIds.join(',');
      }
    Selecctedvalue(event)
    {
           this.QID.push(event.target.value);
           console.log(this.QID);
    }
    selectAllCheckedOffActivities(event) 
    {  
      this.isvisible=false;
      var id= JSON.parse(JSON.stringify(this.message));
      //console.log('the only one record Var Id '+ id.replace(/['"]+/g, ''))
        this.checkedBoxesIds = [...this.template.querySelectorAll('lightning-input')].filter(element => element.checked).map(element => element.dataset.id);
       console.log('The checkbox id'+JSON.stringify(this.checkedBoxesIds));
    
       this.checkedBoxname= [...this.template.querySelectorAll('lightning-input')].filter(element => element.checked).map(element =>({ name: element.name, id: element.dataset.id }));
         console.log('this.checkedBoxname'+this.checkedBoxname);
      

        createRfpRecord({stringlist:this.checkedBoxesIds,recordi3:this.message.replace(/['"]+/g, '')})  // creating Rfp record using imperative method 
        .then(result=>{ 
                  this.data=result;
                  const evt = new ShowToastEvent({
                  title:"Saved",
                  message:"Record created Successfully !",
                  variant:"success",
              });
              this.dispatchEvent(evt);
        })
        .catch(error=>
        {
          const evt = new ShowToastEvent({
            title:'Account Creation Failed',
            message:'Account Creation Failed'+error,
            variant: 'error',
            });
        this.dispatchEvent(evt);
        })
     }
    newdatahelper()
    {
     console.log('The length of checkbox iD id'+this.checkedBoxesIds.length);
    }
                   //      onbutton click

    savehandler(event)
    {
      this.QuestioniDi=event.target.name; 
      this.answerID = [...this.template.querySelectorAll('lightning-input')].filter(element => element.checked).map(element => element.dataset.id);
      
      Createquestion({stringlist:this.answerID,recordiss:this.QuestioniDi})
      .then(result=>{
        const evt = new ShowToastEvent({
          title:"Saved",
          message:"Record created Successfully !",
          variant:"success",
      });
      this.dispatchEvent(evt);
      })
      .catch(error=>{
        const evt = new ShowToastEvent({
          title:'Account Creation Failed',
          message:'Account Creation Failed'+error,
          variant: 'error',
          });
      this.dispatchEvent(evt);
      })
    
    }

//Get the  value that pass from the Rfp another components 

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
    
          this.isvisible=true;
              
       this.message=messageFromevt ? JSON.stringify(messageFromevt,null,'\t'): 'No message payload'
      // console.log( 'the message you get'+ this.message)
                          // retrive the rpf data ;
        myMethod({})
        .then(result=>
        {
                 this.data=result;   
                 console.log(this.data)  
        })
        .catch(error=>
        {

        })
        getAnswer({})
        .then(result=>
        {
                 this.answerdata=result;   
                 console.log(this.answerdata)  
        })
        .catch(error=>
        {

        })
      
       
    }
   
 
  
   /* connectedCallback()
    {
        myMethod({})
        .then(result=>{
                 this.data=result;
        })
        .catch(error=>
        {

        })
    }*/
}