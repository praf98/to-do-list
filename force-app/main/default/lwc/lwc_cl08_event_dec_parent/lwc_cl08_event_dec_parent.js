import { LightningElement } from 'lwc';

export default class Lwc_cl08_event_dec_parent extends LightningElement 
{
    vol=0;
    lbl="Waiting For to press on remote";
    callincvol(event)
    {
        this.lbl=event.detail;
      if(this.vol>=0 && this.vol<=100)
      {
        this.vol=this.vol+1;
      }
    } 
    clldecvol(event)
    { 
        if(this.vol>=0 && this.vol<=100)
      {
        this.vol=this.vol-1;
      }

    }
}