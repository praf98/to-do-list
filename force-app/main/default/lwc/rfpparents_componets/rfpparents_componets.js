import { LightningElement,wire } from 'lwc';
import Getdata from '@salesforce/apex/Rfp_Question_answer.Getdata';
import Getdataquestion from '@salesforce/apex/Rfp_Question_answer.Getdataquestion';
export default class Rfpparents_componets extends LightningElement 
{  
     
   enppp
    data
    QuestionData;
    output;
    QuestionId
    processing=true;
    handleToggleSection(event)
    {
       this.QuestionId=event.detail.openSections;
       console.log('the id get from '+this.QuestionId)
      
       Getdataquestion({recordID1:this.QuestionId}).
       then(result=>
        { 
            console.log('Imperative data'+JSON.stringify(result)) 
                this.QuestionData=result;
               this.processing=false;
       })
       .catch(error=>
        {
            
        })
    }


    
evnt(event)
    {
         this.enppp=event.detail;
         console.log(this.enppp) 
    }
    @wire (Getdata ,{recordID:'$enppp'}) func({error,data})
    {
          if(data)
          {
               this.data=data; 
               console.log(this.data)
          }
          else if (error)
          {
            
          }
    }
    
}
