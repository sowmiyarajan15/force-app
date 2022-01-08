import { LightningElement, track } from 'lwc';
import loadData from '@salesforce/apex/AccountDataDisplayController.loadData';

export default class financialServices extends LightningElement {
    
    get accountColumns()
    {
        return [
            //{ label: 'Name', type: 'url', fieldName: 'AccURL',sortable: true ,typeAttributes: {label: {fieldName: 'Name'},target: "_top"}},
            { label: 'Name',  fieldName: 'Name',sortable: true},
            { label: 'Industry', fieldName: 'Industry',sortable: true },
            { label: 'Phone', fieldName: 'Phone',sortable: true },
            { label: 'Website', fieldName: 'Website',sortable: true },
            { label: 'AnnualRevenue', fieldName: 'AnnualRevenue',sortable: true },
            { label: 'AccountOwner', fieldName: 'OwnerName',sortable: true },
        ]
    }
   
    @track data = {};
    @track isDataAvaialble = false;
    @track sortDirection = 'asc';
    @track sortBy;
    connectedCallback()
    {
        loadData().then(result => {
            console.log('result..!', result);
            this.data = result;
            this.sortBy='Name';
            if(this.data.accounts.length > 0)
            {
                this.isDataAvaialble=true;
            }
            for (var i = 0; i < this.data.accounts.length; i++) {  
                if(this.data.accounts[i].id != undefined) 
                    this.data.accounts[i].AccURL = "/" +this.data.accounts[i].id;
                 if(this.data.accounts[i].Owner.name != undefined)  
                    this.data.accounts[i].OwnerName=data.accounts[i].owner.name;
            }
        }).catch(error => {
            console.log('error..!', error);
        });
    }
}