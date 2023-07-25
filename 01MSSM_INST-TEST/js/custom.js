(function () {
    "use strict";
    "use strict";
	
	

    var app = angular.module('viewCustom', ['angularLoad']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/
// Begin BrowZine - Primo Integration...
  window.browzine = {
    api: "https://public-api.thirdiron.com/public/v1/libraries/470",
    apiKey: "e53edc40-7508-486d-957f-9dc09a5ad45f",
 
    journalCoverImagesEnabled: true,
 
    journalBrowZineWebLinkTextEnabled: true,
    journalBrowZineWebLinkText: "View Journal Contents",
 
    articleBrowZineWebLinkTextEnabled: true,
    articleBrowZineWebLinkText: "View Issue Contents",
 
    articlePDFDownloadLinkEnabled: true,
    articlePDFDownloadLinkText: "Download PDF",
 
    articleLinkEnabled: true,
    articleLinkText: "Read Article",
 
    printRecordsIntegrationEnabled: true,
 
    unpaywallEmailAddressKey: "libraryadmin@mssm.edu",
 
    articlePDFDownloadViaUnpaywallEnabled: true,
    articlePDFDownloadViaUnpaywallText: "Download PDF (via Unpaywall)",
 
    articleLinkViaUnpaywallEnabled: true,
    articleLinkViaUnpaywallText: "Read Article (via Unpaywall)",
 
    articleAcceptedManuscriptPDFViaUnpaywallEnabled: true,
    articleAcceptedManuscriptPDFViaUnpaywallText: "Download PDF (Accepted Manuscript via Unpaywall)",
 
    articleAcceptedManuscriptArticleLinkViaUnpaywallEnabled: true,
    articleAcceptedManuscriptArticleLinkViaUnpaywallText: "Read Article (Accepted Manuscript via Unpaywall)",
  };
 
  browzine.script = document.createElement("script");
  browzine.script.src = "https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js";
  document.head.appendChild(browzine.script);
 
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope) {
    window.browzine.primo.searchResult($scope);
  });
 
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController'
  });
// ... End BrowZine - Primo Integration

	/*----------------------------------below is code for libchat slideout--------------------------------*/
		// Adds the chat button
                (function() {
                                var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = 'true';
                                lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'askalibrarian.mssm.edu/load_chat.php?hash=434c97c8c451ce804a10a98e9edc8863';
                                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
                })();
	
 
/*------------------------------------libchat slide code ends here----------------------------------------*/	
	
	/* ====== Expand physical items in full display by default ===== */
angular
.module('expand-items', [])
.component('prmLocationItemAfter', {
  bindings: { parentCtrl: '<' },
  controller: function ($timeout) {
    var ctrl = this;
    this.$onInit = function () {
      {
        $timeout(showDetails, 2000);
        function showDetails() {
          ctrl.parentCtrl.loc.isExpandAll = true;
          ctrl.parentCtrl.currLoc.items.forEach((item) => {
			  item.isExpanded = true;
          });
		}
	  }
	};
  }
});
  
/* ====== end expand-items ====== */
		

})(); 