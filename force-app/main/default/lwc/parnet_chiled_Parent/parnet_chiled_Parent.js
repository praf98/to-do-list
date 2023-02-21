import { LightningElement } from 'lwc';

export default class Parnet_chiled_Parent extends LightningElement 
{
    startcounter=0;
    handlestartchnage(event)
    {
       this.startcounter=parseInt(event.target.value);
    } 
    addcounterhandler(event)
    {
        //const updatecounter=this.template.querySelector('c-parwntchildchild');
        //updatecounter.maximizecounter;
        this.template.querySelector('c-parwntchildchild').maximizecounter();
    }
}