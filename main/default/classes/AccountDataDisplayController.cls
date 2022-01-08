public with Sharing class AccountDataDisplayController  {
    
    @AuraEnabled
    public static InitResponse loadData()
    {
        InitResponse ir = new InitResponse();
        ir.accounts = [SELECT Id, Name,OwnerId,Owner.name,
                       Phone, Website,AnnualRevenue,
                       Industry FROM Account where 
                       Industry='Financial Services'];
        return ir;
    }
    public class InitResponse
    {
        @AuraEnabled public list<Account> accounts;
    }

}