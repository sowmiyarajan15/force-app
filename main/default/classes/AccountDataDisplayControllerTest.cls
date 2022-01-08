@isTest
public class AccountDataDisplayControllerTest {
    static testMethod void myTest() {
    	Account acc = new Account(name='Test Account',industry='Financial Services');
        insert acc;
        AccountDataDisplayController accDataDisplay = new AccountDataDisplayController(); 
        AccountDataDisplayController.loadData();
       
     }

}