import { LightningElement } from 'lwc';

export default class Lwc_cl08_ex3_evnt_prg_parent extends LightningElement
 {
    control='Waiting for button to press';
    val=0;
    constructor()
    {
        super();
        this.template.addEventListener('evntconstin',this.handleinc.bind(this))
        this.template.addEventListener('evntconstdec',this.handledec.bind(this))

    }
    handleinc(event)
    {
        this.control=event.detail;
      if(this.val>=0 && this.val<=100)
      {
         this.val=this.val+1;
      }
    }
    handledec(event)
    {
        this.control=event.detail;
        if(this.val>=0 && this.val<100) 
        {
           this.val=this.val-1;
        }
    }
 }