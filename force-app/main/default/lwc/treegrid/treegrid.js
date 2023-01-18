   import { LightningElement, track} from 'lwc';
   import getContactDetails from '@salesforce/apex/getchield.getContactDetails';



export default class Treegrid extends LightningElement {
    @track gridcolumns=[
        {type:'text',fieldName:'Name',label:'Name'},
        {type:'text',fieldName:'FirstName',label:'first Name'},
        {type:'text',fieldName:'LastName',label:'Last Name '}
    ];
    @track griddata;
    connectedCallback()
    {
            //imperative method
            getContactDetails()
            .then(result=>{
                  // console.log("Result"+JSON.stringify(result));

                  var tempContact=JSON.parse(JSON.stringify(result));
                //  console.log("*****************tempContact****************"+JSON.stringify(result));

                  for(var i=0; i<tempContact.length; i++)
                  {
                    var newcontact=tempContact[i]['Contacts']; //javascript object notetion
                  
                     //  console.log("*****************newcontact****************"+JSON.stringify(newcontact));
                           if(newcontact)
                           {
                            tempContact[i]._children=newcontact;   //passing that value to the JS
                          //  console.log("*****************tempContact[i]._children****************"+JSON.stringify(tempContact[i]._children));
                            delete tempContact[i].Contacts ;
                           }
                           this.griddata=tempContact;
                           console.log("***************** this.griddata****************"+JSON.stringify( this.griddata));

                    }

               })
            .catch(error=>{})
    }
    
 }