import { LightningElement } from 'lwc';

export default class Lwc_cl08_ex3_evnt_prg_child extends LightningElement 
{
  incme(event)
    {
      // create event + dispatch event  + data + ****propgation****
      this.dispatchEvent(new CustomEvent('evntconstin',{detail:'Contrast', bubbles:true,  composed:true}));
    }
    decme(event)
    {
      this.dispatchEvent(new CustomEvent('evntconstdec',{detail:'Contrast', bubbles:true,  composed:true}));
    }
}