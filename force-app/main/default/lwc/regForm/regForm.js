import { LightningElement } from 'lwc';

export default class RegistrationForm extends LightningElement {
    firstName = ''
    lastName = ''
    email = ''
    country = ''
    otherCountry = ''
    phone = ''
    phoneCode = ''
    showOtherCountry = false
    registrations = []

    firstNameError = ''
    lastNameError = ''
    emailError = ''
    countryError = ''
    phoneError = ''


    handleFirstNameChange(event) {
        this.firstName = event.target.value
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value
    }

    handleEmailChange(event) {
        this.email = event.target.value
    }

    handleCountryChange(event) {
        this.country = event.target.value
        if (this.country === 'Other') {
            this.showOtherCountry = true
        } else {
            this.showOtherCountry = false
        }
    }

    handleOtherCountryChange(event) {
        this.otherCountry = event.target.value
    }

    handlePhoneChange(event) {
        this.phone = event.target.value
    }

    getPhoneCode(country) {
        switch (country) {
            case 'India':
                return '+ 91'
            case 'Australia':
                return '+ 61'
            case 'New Zealand':
                return '+ 64'
            case 'England':
                return '+ 44'

        }
    }

    handleSubmit() {
 
        event.preventDefault()

        if (this.firstName.length == 0) {
            this.firstNameError = 'Please enter a first name';
            registrations = false
        }
        else{
            this.firstNameError = ''
        }

        if (this.lastName.length == 0) {
            this.lastNameError = 'Please enter a last name';
            registrations = false
        }
        else{
            this.lastNameError = ''
        }

        if (this.email.length == 0) {
            this.emailError = 'Please enter an email';
            registrations = false
        }
        else{
            this.emailError = ''
        }

        if (!this.country) {
            this.countryError = 'Please select a country';
            registrations = false
        }
        else{
            this.countryError = ''
        }


        if (this.phone.length == 0) {
            this.phoneError = 'Please enter a phone number';
            phoneError = false
        }
        else{
            this.phoneError = ''
        }
        

        this.phoneCode = this.getPhoneCode(this.country)
        let registration = {
            id: new Date().getTime().toString(),
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            country: this.country === 'Other' ? this.otherCountry : this.country,
            phone: this.phone,
            phoneCode: this.phoneCode
        };
        this.registrations.push(registration)
        this.clearForm()
    }

    clearForm() {
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.country = ''
        this.otherCountry = ''
        this.phone = ''
        this.phoneCode = ''
        this.showOtherCountry = false
    }

    handleEditClick(event) {
        let registrationId = event.target.dataset.id
        let registration = this.registrations.find(registration => registration.id === registrationId)
        this.firstName = registration.firstName
        this.lastName = registration.lastName
        this.email = registration.email
        this.country = registration.country
        this.phone = registration.phone.slice(2)
        if (this.country === 'Other') {
            this.showOtherCountry = true
            this.otherCountry = registration.country
        } else {
            this.showOtherCountry = false
        }
        this.deleteRegistration(registrationId)
    }

    deleteRegistration(registrationId) {
        this.registrations = this.registrations.filter(registration => registration.id !== registrationId)
    }
}