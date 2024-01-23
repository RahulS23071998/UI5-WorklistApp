/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"sap/ui/Device",
	"./pages/Worklist",
	"./pages/Browser",
	"./pages/Object",
	"./pages/App"
], function (opaTest, Device) {
	"use strict";

	var iDelay = 100;

	QUnit.module("Navigation");

	opaTest("Should see the objects list", function (Given, When, Then) {
		Given.iStartMyApp();

		Then.onTheWorklistPage.iShouldSeeTheTable();
	});

	opaTest("Should react on hash change", function (Given, When, Then) {
		When.onTheWorklistPage.iRememberTheItemAtPosition(2);
		When.onTheBrowser.iChangeTheHashToTheRememberedItem();

		Then.onTheObjectPage.iShouldSeeTheRememberedObject();
	});

	opaTest("Should go back to the TablePage", function (Given, When, Then) {
		When.onTheBrowser.iPressOnTheBackwardsButton();
		Then.onTheWorklistPage.iShouldSeeTheTable();
	});

	opaTest("Object Page shows the correct object Details", function (Given, When, Then) {
		When.onTheWorklistPage.iRememberTheItemAtPosition(1).
			and.iPressATableItemAtPosition(1);
		Then.onTheObjectPage.iShouldSeeTheRememberedObject();
	});

	opaTest("Should be on the table page again when browser back is pressed", function (Given, When, Then) { 
		When.onTheBrowser.iPressOnTheBackwardsButton();

		Then.onTheWorklistPage.iShouldSeeTheTable();
	});

	opaTest("Should be on the object page again when browser forwards is pressed", function (Given, When, Then) {

		When.onTheBrowser.iPressOnTheForwardsButton();
		Then.onTheObjectPage.iShouldSeeTheRememberedObject();
		Then.iTeardownMyApp();
	});

	opaTest("Start the App and simulate metadata error: MessageBox should be shown", function (Given, When, Then) {
		Given.iStartMyApp({
			delay: iDelay,
			metadataError: true
		});
		Then.onTheAppPage.iShouldSeeTheMessageBox();

		When.onTheAppPage.iCloseTheMessageBox();
		Then.iTeardownMyApp();
	});

	opaTest("Start the App and simulate bad request error: MessageBox should be shown", function (Given, When, Then) {
		Given.iStartMyApp({
			delay: iDelay,
			errorType: "serverError"
		});

		Then.onTheAppPage.iShouldSeeTheMessageBox();

		When.onTheAppPage.iCloseTheMessageBox();
		Then.iTeardownMyApp();
	});

});