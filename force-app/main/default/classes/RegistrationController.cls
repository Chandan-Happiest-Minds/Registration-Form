public with sharing class RegistrationController {

    @AuraEnabled
    public static Id saveRegistration(String firstName, String lastName, String email, String country, String phone) {
        Registration_Form__c registration = new Registration_Form__c();
        registration.First_Name__c = firstName;
        registration.Last_Name__c = lastName;
        registration.Email__c = email;
        registration.Country__c = country;
        registration.Phone__c = phone;
        insert registration;
        return registration.Id;
    }

    @AuraEnabled
    public static void updateRegistration(Id registrationId, String firstName, String lastName, String email, String country, String phone) {
        Registration_Form__c registration = new Registration_Form__c();
        registration.Id = registrationId;
        registration.First_Name__c = firstName;
        registration.Last_Name__c = lastName;
        registration.Email__c = email;
        registration.Country__c = country;
        registration.Phone__c = phone;
        update registration;
    }

    @AuraEnabled
    public static void deleteRegistrations(Id registrationId) {
    delete new Registration_Form__c(Id = registrationId);
    }
}