import { LightningElement,track} from 'lwc';
// import server side apex class method 
import getContactList from '@salesforce/apex/customSearchSobjectLWC.getContactList';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
 
export default class customSearch extends LightningElement {
    
    @track contactsRecord;
    searchValue = '';
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }
 
    handleSearchKeyword() {
        
        if (this.searchValue !== '') {
            getContactList({
                    searchKey: this.searchValue
                })
                .then(result => {
 
                    this.contactsRecord = result;
                })
                .catch(error => {
                   
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);

                    this.contactsRecord = null;
                });
        } else {

            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}