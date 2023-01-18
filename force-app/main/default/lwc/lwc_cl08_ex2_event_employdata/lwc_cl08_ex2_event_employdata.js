import { LightningElement } from 'lwc';

export default class Lwc_cl08_ex2_event_employdata extends LightningElement 
{
    enm;
    eph;
    esl;
    empname(event)
    {
      this.enm=event.target.value;
    }
    empph(event)
    {
        this.eph=event.target.value;

    }
    empsal(event)
    {
        this.esl=event.target.value;

    }
    subme()
    {
       this.dispatchEvent(new CustomEvent('enpevt',{detail:{nm:this.enm, ph:this.eph, sl:this.esl}}));
    }
}