import { LightningElement ,api} from 'lwc';

export default class Parwntchildchild extends LightningElement 
{
    @api counter=0;

    @api maximizecounter()
    {
        this.counter +=100;
    }
}