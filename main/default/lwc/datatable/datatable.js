import { LightningElement, track, api, wire } from "lwc";

export default class datatable extends LightningElement {
    
    /*
     *  Pagination related methods
     */    
    @api keyData;
    @api columns = [];
    @api showRowNumberColumn;
    @api isLoading;
    @api defaultSortDirection;
    @api sortedDirection;
    @api sortedBy;    

    @track recordsFiltered = [];
    @track recordsToDisplay = [];
    @track pageNumber = 1;
    @track pageSize = 5;
    @track selectedRecords = [];

    get pagesizeOptions(){
        return [
            { label: '5', value: 5 },
            { label: '10', value: 10 },
            { label: '15', value: 15 },
            { label: '20', value: 20 },
            { label: '50', value: 50 }
        ];
    }
    get fromRecords(){
        if(this.totalRecords == 0)
            return 0;
        return ((this.pageNumber-1)*this.pageSize)+1;
    }
    get toRecords(){
        if((this.pageNumber*this.pageSize) > this.totalRecords)
            return this.totalRecords;
        return this.pageNumber*this.pageSize;
    }
    get totalRecords(){
        return this.recordsFiltered.length;
    }
    get showPrevious(){
        if(this.recordsFiltered.length <= this.pageSize)     
            return false;
        return this.pageNumber == 1 ? false : true;
    }
    get showNext(){
        if(this.recordsFiltered.length <= this.pageSize)     
            return false;
        return this.pageNumber == Math.ceil(this.recordsFiltered.length/this.pageSize) ? false : true;
    }
    @api
    get records(){

    }
    set records(value){
        this.pageNumber = 1;
        this.recordsFromDatabase = value;
        this.recordsFiltered = value;
        this.recordsToDisplay = this.applyPagination(this.pageNumber, this.pageSize, this.recordsFiltered);
    }
    handleRowAction(event){

    }
   
    handlePageSizeChange(event){
        this.pageSize = event.target.value;
        this.pageNumber = 1;
        this.recordsToDisplay = this.applyPagination(this.pageNumber, this.pageSize, this.recordsFiltered);
    }
    first(event){
        this.pageNumber = 1;
        this.recordsToDisplay = this.applyPagination(this.pageNumber, this.pageSize, this.recordsFiltered);
    }
    previous(event){
        this.pageNumber--;
        this.recordsToDisplay = this.applyPagination(this.pageNumber, this.pageSize, this.recordsFiltered);
    }
    next(event){
        this.pageNumber++;
        this.recordsToDisplay = this.applyPagination(this.pageNumber, this.pageSize, this.recordsFiltered);
        console.log('next..!', this.recordsToDisplay);
    }
    last(event){
        this.pageNumber = Math.ceil(this.recordsFromDatabase.length/this.pageSize);        
        this.recordsToDisplay = this.applyPagination(this.pageNumber, this.pageSize, this.recordsFiltered);
    }
    applyPagination(pageNumber, pageSize, records){    
        console.log('records..!', JSON.parse(JSON.stringify(records))); 
        
        var tempList = [];        
        for (var i = (pageNumber-1) * pageSize; i < (pageNumber * pageSize); i++) {
            //console.log('i..!', i);
            if(i == records.length)	break;     
            //records[i].index = i+1;
            //records[i].isChecked = this.selectedRecords.includes(records[i].Id) ? true : false;
            tempList.push(records[i]);
        }        
        //console.log('tempList..!', tempList);
        return tempList;
    }

    
    handleSort(event) {
        const { fieldName: sortedBy, sortDirection } = event.detail;
        this.sortedDirection = sortDirection;
        this.sortedBy = sortedBy;
        this.pageNumber = 1;
        this.recordsFromDatabase = this.sortData(this.sortedBy, sortDirection);
        this.recordsFiltered = this.sortData(this.sortedBy, sortDirection);
        this.recordsToDisplay = this.applyPagination(this.pageNumber, this.pageSize, this.recordsFiltered);
    }

    sortData(fieldname, direction) {
        let parseData;
        parseData = JSON.parse(JSON.stringify(this.recordsFromDatabase));
        
        // Return the value stored in the field
        let keyValue = (a) => {
            return a[fieldname];
        };
        // cheking reverse direction
        let isReverse = direction === 'asc' ? 1: -1;
        // sorting data
        parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; // handling null values
            y = keyValue(y) ? keyValue(y) : '';
            // sorting values based on direction
            return isReverse * ((x > y) - (y > x));
        });

        return parseData;
    }

}