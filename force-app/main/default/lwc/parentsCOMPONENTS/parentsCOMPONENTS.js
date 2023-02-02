import { LightningElement,wire,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import DemoClass2 from '@salesforce/apex/DemoClass.DemoClass2';
import DemoClass3 from '@salesforce/apex/DemoClass.DemoClass3';
import pubshub from 'c/pubsub';
export default class ParentsCOMPONENTS extends LightningElement 
{
    enppp;
    data;
    value;
    tempvalue=false;
    rptext;
   
    sendvaluetoresponse;
    output=[];
    processing=true;
 recordd='';
 connectedCallback()
 {  
    //console.log(this.data.id)
    this.register()
 } 
 
 
 register()
 {
      pubshub.register('eventname',this.handleme.bind(this));
 }
 handleme(messageFromevt)
 { 
   
    
   var pp=this.output;

   console.log('the pp' + pp)

   for(var i=0; i<pp.length; i++)
   {
         console.log('name--------.>'+this.sendvaluetoresponse)
          if(this.recordd===pp[i])
          {    console.log(pp)
            this.getfromKnoeldge=messageFromevt ? JSON.stringify(messageFromevt,null,'\t'):'no payload is available'
          this.getfromKnoeldge='you get the value'; 
         
          }
          
   }

 }

 

    evnt(event)
    {
         this.enppp=event.detail;
       
    }
    handleToggleSection(event)
    {   
          this.recordd= event.detail.openSections;
        console.log( 'Value     :------>'+this.recordd);
        
             
    }
    @wire(DemoClass2,{recordId:'$enppp'}) myfuc({error,data})
    {
        if(data)
        {     
             this.data=data;
             
             var tempContact=JSON.parse(JSON.stringify(this.data));
            // console.log('tempContact  --->'+tempContact)

             for(var i=0; i<tempContact.length; i++)
             {
                var newcontact=tempContact[i]['Id'];
                //    console.log('newcontact   -'+newcontact)
                        this.output.push(newcontact)
                       // console.log('1 output   -'+this.output)    
            
             }  
             
             
             this.processing=false;
            
        }
        else if(error)
        {

        }

    }
    get options() {
        return [
            { label: 'Compliant', value: 'Compliant' },
            { label: 'Partially Compliant', value: 'Partially' },
            { label: 'Non-Compliant', value: 'Non-Compliant' }
        ];
    }
    handleChange(event)
    {
            this.value = event.detail.value;
           // console.log('the selected value '+ this.value);
    }
    reponsetext(event)
    {
       
       this.rptext=event.target.value;
       this.sendvaluetoresponse=event.target.value.name;
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