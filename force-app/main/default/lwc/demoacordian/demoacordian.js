import { LightningElement,wire } from 'lwc';
import myMethod from '@salesforce/apex/demoaccordain.myMethod';
export default class Demoacordian extends LightningElement 
{
    data;
    value='the data is pass';
  
    array=[];
    ontoggleaction(event)
    {
        console.log('the data from Array ' + this.array)
        var ID =event.detail.openSections ;
        var tempContact=JSON.parse(JSON.stringify(this.array));
        

         for(var i=0; i<tempContact.length; i++)
         {

            var newcontact=tempContact[i]['Id'];
            if(ID===newcontact)
            {
                array.splice([i], 0, 'Raghuuuuuuuu')
            }            
        
         } 

         console.log('the data from new   Array--------------> ' + JSON.stringify(this.array))

        
    }




    @wire (myMethod)func({error,data})
    {
        if(data)
        {
            this.data=data  
            this.array.push(this.data)
            console.log('the data from wire ' + JSON.stringify(this.data))




            
        }
        else if(error)
        {

        }
    }
    
}  