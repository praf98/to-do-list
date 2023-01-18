import { LightningElement,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import DemoClass2 from '@salesforce/apex/DemoClass.DemoClass2';
import DemoClass3 from '@salesforce/apex/DemoClass.DemoClass3';
export default class ParentsCOMPONENTS extends LightningElement 
{
    enppp;
    data;
    value;
    rptext;
   
 recordd;
    evnt(event)
    {
         this.enppp=event.detail;
        
    }
    handleToggleSection(event)
    {
          this.recordd= event.detail.openSections;
         
    }
    @wire(DemoClass2,{recordId:'$enppp'}) myfuc({error,data})
    {
        if(data)
        {
             this.data=data;
            
        }
        else if(error)
        {

        }

    }
    get options() {
        return [
            { label: 'Compliant', value: 'Compliant' },
            { label: 'Partially Compliant', value: 'Partially' },
            { label: 'Non-Compliant', value: 'Compliant' },
        ];
    }
    handleChange(event)
    {
            this.value = event.detail.value;
            console.log('the selected value '+ this.value);
    }
    reponsetext(event)
    {
       this.rptext=event.target.value;
       this.rptext=this.rptext.replace(/<\/?[^>]+(>|$)/g, "");
    }
    saverep(evnt)
    {
       // DemoClass3({recordId3:})
       // .then(result=>{})
       // .catch(error=>{})
      // console.log('all three log'+this.recordd+'piclist value is :'+this.value + 'the response value you get'+this.rptext )
       DemoClass3({recordId3:this.recordd,Compliance_value:this.value,ResponseValue:this.rptext})
       .then(result=>{
        const evt = new ShowToastEvent({
            title:"Saved",
            message:"The Response has been Set",
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

}