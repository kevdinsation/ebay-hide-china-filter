// ==UserScript==
// @name         eBay - Exclude China Listings
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Removes eBay listings from China & Hong Kong dynamically
// @author       You
// @match        *://www.ebay.com/sch/*
// @match        *://www.ebay.ca/sch/*
// @match        *://www.ebay.co.uk/sch/*
// @match        *://www.ebay.*/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/YOUR-GITHUB-USERNAME/ebay-country-filter/main/ebay-filter.user.js
// @downloadURL  https://raw.githubusercontent.com/YOUR-GITHUB-USERNAME/ebay-country-filter/main/ebay-filter.user.js
// ==/UserScript==

(function() {
    'use strict';

    function removeChinaListings() {
        console.log("🔍 Checking for China listings...");

        let listings = document.querySelectorAll('.s-item, .lvresult, .srp-results .s-item');

        listings.forEach(item => {
            let locationElements = item.querySelectorAll('.s-item__itemLocation, .lvshipping, .s-item__details, .s-item__subtitle, .ITALIC');

            locationElements.forEach(locationElement => {
                if (locationElement) {
                    let locationText = locationElement.innerText.trim().toLowerCase();

                    let forbiddenCountries = /(china|hong kong|shenzhen|guangdong|beijing|shanghai|macau|prc|taiwan)/;

                    if (forbiddenCountries.test(locationText)) {
                        console.log("🚫 Removing listing from:", locationText);
                        item.remove();
                    }
                }
            });
        });
    }

    setTimeout(removeChinaListings, 3000);
    let observer = new MutationObserver(removeChinaListings);
    observer.observe(document.body, { childList: true, subtree: true });
    setInterval(removeChinaListings, 3000);
})();
