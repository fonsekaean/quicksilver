<?php

/**
 * Class SiteConfigExtension
 *
 * @property string Phone
 * @property string Email
 * @property string Address
 * @property string PostalAddress
 * @property string Facebook
 * @property string LinkedIn
 * @property string Twitter
 * @property string MailChimpAPI
 * @property string MailChimpListID
 * @property string MailChimpSuccessMessage
 * @property string TwitterHandle
 */
class SiteConfigExtension extends DataExtension
{
    private static $db = array(
        'Phone' => 'Varchar(255)',
        'Email' => 'Varchar(255)',
        'ContactFormEmail' => 'Varchar(255)',
        'Address' => 'Text',
        'PostalAddress' => 'Text',
        'Facebook' => 'Varchar(255)',
        'LinkedIn' => 'Varchar(255)',
        'Pinterest' => 'Varchar(255)',
        'Instagram' => 'Varchar(255)',
        'TwitterHandle' => 'Varchar(255)',
        'MailChimpAPI' => 'Varchar(255)',
        'MailChimpListID' => 'Varchar(255)',
        'MailChimpSuccessMessage' => 'Text'
    );

    /**
     * @var array
     */
    public static $defaults = array(
        'MailChimpSuccessMessage' => 'Your subscription has been received, you will be sent a confirmation email shortly.'
    );

    /**
     * @param FieldList $fields
     */
    public function updateCMSFields(FieldList $fields)
    {
        /** =========================================
         * @var TextareaField $address
         * @var TextareaField $postalAddress
         * @var TextField $mailChimpAPI
         * @var TextareaField $mailChimpSuccessMessage
        ===========================================*/

        if (!$fields->fieldByName('Root.Settings')) {
            $fields->addFieldToTab('Root', TabSet::create('Settings'));
        }

        /** -----------------------------------------
         * Details
         * ----------------------------------------*/

        $address = TextareaField::create('Address', 'Address');
        $address->setRows(8);
        $postalAddress = TextareaField::create('PostalAddress', 'Postal Address');
        $postalAddress->setRows(8);

        $fields->findOrMakeTab('Root.Settings.Details');
        $fields->addFieldsToTab('Root.Settings.Details', array(
            HeaderField::create('', 'Company Details'),
            Textfield::create('Phone', 'Phone Number'),
            Textfield::create('Email', 'Public Email Address'),
            $address,
            $postalAddress,
            TextField::create('Facebook', 'Facebook'),
            TextField::create('LinkedIn', 'LinkedIn'),
            TextField::create('Pinterest', 'Pinterest'),
            TextField::create('TwitterHandle', 'Twitter Handle')
        ));


        /** -----------------------------------------
         * Subscription
         * ----------------------------------------*/

        $mailChimpAPI = TextField::create('MailChimpAPI', 'API Key');
        $mailChimpSuccessMessage = TextareaField::create('MailChimpSuccessMessage', 'Success Message (optional)');

        $mailChimpAPI->setRightTitle('<a href="https://us9.admin.mailchimp.com/account/api-key-popup/" target="_blank"><i>How do I get my MailChimp API Key?</i></a>');
        $mailChimpSuccessMessage->setRows(2)
            ->setRightTitle('Message displayed when a user has successfully subscribed to a list.');

        $fields->findOrMakeTab('Root.Settings.Subscription', 'Subscription');

        $fields->addFieldsToTab('Root.Settings.Subscription', array(
            HeaderField::create('', 'Newsletter Subscription'),
            LiteralField::create('',
                '<p>The API key, and list ID are necessary for the Newsletter Subscription form to function.</p>'
            ),
            $mailChimpAPI,
            TextField::create('MailChimpListID', 'List ID'),
            $mailChimpSuccessMessage
        ));

    }

    /**
     * @return bool|mixed
     */
    public function getFormattedPhone()
    {
        if ($phone = (string)SiteConfig::current_site_config()->Phone) {
            return preg_replace('/\s+/', '', $phone);
        }
        return false;
    }
}
