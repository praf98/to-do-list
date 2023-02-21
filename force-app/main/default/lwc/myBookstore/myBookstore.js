import { LightningElement ,track} from 'lwc';

export default class myBookstore extends LightningElement 
{
    @track srotation=0;
	@track mrotation = 0;
	@track hrotation = 0;
    

	connectedCallback() {
		// Use an arrow function to capture "this" context
		setInterval(() => {
			const d = new Date();
			const htime = d.getHours();
			const mtime = d.getMinutes();
			const stime = d.getSeconds();
			this.hrotation = 30 * htime + mtime / 2;
        
			this.mrotation = 6 * mtime;
			this.srotation = 6 * stime;
            
            const second = this.template.querySelector('.second');
		    const minute = this.template.querySelector('.minute');
			const hour = this.template.querySelector('.hour');
			second.style.transform = `rotate(${this.srotation}deg)`;
			minute.style.transform = `rotate(${this.mrotation}deg)`;
		   hour.style.transform = `rotate(${this.hrotation}deg)`;
            
		}, 1000);
        console.log('Print Seconds'+this.srotation);
	}
        
	// Use the "renderedCallback" lifecycle hook to set the clock hand rotations
	renderedCallback() {
		const second = this.template.querySelector('.second');
		const minute = this.template.querySelector('.minute');
		const hour = this.template.querySelector('.hour');

		second.style.transform = `rotate(${this.srotation}deg)`;
		minute.style.transform = `rotate(${this.mrotation}deg)`;
		hour.style.transform = `rotate(${this.hrotation}deg)`;
	}

}  
 
  
   
