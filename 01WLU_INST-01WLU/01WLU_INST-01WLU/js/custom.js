(function(){
"use strict";
'use strict';

var app = angular.module('viewCustom', ['angularLoad', 'reportProblem', 'getBookPlate', 'getFloorLocation', 'bulibUnpaywall']);
// var app = angular.module('viewCustom', ['angularLoad', 'reportProblem', 'getBookPlate']);

var myEl = angular.element(document.querySelectorAll('md-list-item'));
myEl.addClass('item-expanded');

/****************************************************************************************************/
/* In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition */
/* var app = angular.module('centralCustom', ['angularLoad']); */
/****************************************************************************************************/

angular.module('reportProblem', []);

angular.module('reportProblem').component('wluReportProblem', {
  bindings: {
    messageText: '@',
    buttonText: '@',
    reportUrl: '@'
  },
  template: '\n    <div ng-if="$ctrl.show" class="bar filter-bar layout-align-center-center layout-row bold" layout="row" layout-align="center center" style="color: #000;">\n      <span class="margin-right-small">{{$ctrl.messageText}}</span>\n      <a ng-href="{{$ctrl.targetUrl}}" target="_blank">\n        <button class="button-with-icon zero-margin md-button md-button-raised md-primoExplore-theme" type="button" aria-label="Report a Problem" style="color: #2B4F69; border: 1px outset;\n        background: rgba(255, 255, 255, .75); font-weight: bold;">\n          <prm-icon icon-type="svg" svg-icon-set="action" icon-definition="ic_report_problem_24px"></prm-icon>\n          <span style="text-transform: none;">{{$ctrl.buttonText}}</span>\n        </button>\n      </a>\n    </div>\n  ',
  controller: ['$location', '$httpParamSerializer', function ($location, $httpParamSerializer) {
    this.messageText = this.messageText || 'See something that doesn\'t look right?';
    this.buttonText = this.buttonText || 'Report a Problem';
    this.showLocations = ['/fulldisplay', '/openurl'];
    this.$onInit = function () {
      this.targetUrl = this.reportUrl + "fullpath= '" + $location.absUrl() + "'&" + $httpParamSerializer($location.search());
      this.show = this.showLocations.includes($location.path());
    };
  }]
});

app.component('prmActionListAfter', { template: '<wlu-report-problem report-url="https://library.wlu.edu/primo-problem-report?" message-text="Having trouble with online access or finding a print copy?" button-text="Report a problem" />' });

/* ----------------------------------------------------------------------------------------- */

angular.module('getBookPlate', []);

app.controller('BookPlateController', [function () {
  var vm = this;
  vm.getFund = getFund;
  vm.getPlateImage = getPlateImage;

  var bookplates = {
    'Basse Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/BasseLge.jpg',
    'Bendheim Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/BendheimLge.jpg',
    'Berry Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/BerryLge.jpg',
    'Bestor Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/BesterLge.jpg',
    'Boatwright Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/BoatwrightLge.jpg',
    'Bond Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/BondLge.jpg',
    'Bricken Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/Bricken.jpg',
    'FOL-Buice': 'https://library.wlu.edu/wp-content/uploads/2014/07/BuiceLge.jpg',
    'Class of 1941 Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/Class41New.jpg',
    'Cole Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/ColeLge.jpg',
    'Crenshaw Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/crenshawlrg.jpg',
    'Alice Dean Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/DeanLge.jpg',
    'Gift of J. Freeman': 'https://library.wlu.edu/wp-content/uploads/2016/04/NewFreemanPlateLGE.jpg',
    'Graybeal Gowen Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/GraybealLge.jpg',
    'Higginbotham Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/HigginbothamLge.jpg',
    'Hight Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/HightLge.jpg',
    'Gift of M. Hilliard': 'https://library.wlu.edu/wp-content/uploads/2015/02/Hilliard-plate.jpg',
    'Gift of Mary W. Hilliard': 'https://library.wlu.edu/wp-content/uploads/2015/02/Hilliard-plate.jpg',
    'Johnston Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/JohnstonLge.jpg',
    'Keller Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/KellerLge.jpg',
    'Leyburn Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/LeyburnLge.jpg',
    'May Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/MayGiftPlate.jpg',
    'Maytham Fund': 'https://library.wlu.edu/wp-content/uploads/2016/12/Maytham.jpg',
    'McCrum Palmer Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/McCrumLge.jpg',
    'Miles Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/MilesLge.jpg',
    'Mollere-Oliver Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/MollereLge.jpg',
    'Gift of R. Mudd': 'https://library.wlu.edu/wp-content/uploads/2014/07/MuddLge.jpg',
    'Gift of Roger Mudd': 'https://library.wlu.edu/wp-content/uploads/2014/07/MuddLge.jpg',
    'Perry Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/PerryLge.jpg',
    'Pickens Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/PickensLge.jpg',
    'Pollack Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/PollackLge.jpg',
    'Rockwell Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/RockwellLge.jpg',
    'Root Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/RootLge.jpg',
    'Ross Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/RossLge.jpg',
    'Stewart Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/StewartLge.jpg',
    'Jock Stewart Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/StewartLge.jpg',
    'Telford Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/TelfordFundLge.jpg',
    'Weinstein Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/WeinsteinLge.jpg',
    'Williams Fund': 'https://library.wlu.edu/wp-content/uploads/2014/07/WilliamsLge.jpg',
    'Wortham Fund': 'https://library.wlu.edu/wp-content/uploads/2016/12/Wortham.jpg'
  };

  function getFund() {
    var fund = vm.parentCtrl.currLoc.items[0].fullItemValues[0];
    return fund.substring(12);
  }

  function getPlateImage(fund) {
    return bookplates[fund];
  }
}]);

angular.module('getBookPlate').component('wluBookPlate', {
  bindings: { parentCtrl: '<' },
  template: '\n    <figure layout="row" layout-align="center center">\n      <img src="{{$ctrl.getPlateImage($ctrl.getFund())}}" alt="Item generously provided by the {{$ctrl.getFund()}}">\n    </figure>\n  ',
  controller: 'BookPlateController'
});

app.component('prmLocationItemAfter', {
  bindings: { parentCtrl: '<' },
  template: '<wlu-book-plate parent-ctrl="$ctrl.parentCtrl" ng-if="$ctrl.parentCtrl.currLoc.items[0].fullItemValues[0].startsWith(\'NOTE\')" />'
});

/* ----------------------------------------------------------------------------------------- */

angular.module('getFloorLocation', []);

app.controller('FloorLocationController', [function () {
  var vm = this;
  vm.getLib = getLib;
  vm.getItemLocation = getItemLocation;
  vm.getShow = getShow;

  function getLib() {
    return vm.parentCtrl.getLibraryName(vm.parentCtrl.currLoc.location);
  }

  function getShow() {
    return ['Leyburn Library', 'Telford Science Library'].includes(this.getLib());
  }

  function getItemLocation() {
    var cn = vm.parentCtrl.currLoc.location.callNumber;
    var coll = vm.parentCtrl.currLoc.location.collectionTranslation;
    var lib = vm.parentCtrl.getLibraryName(vm.parentCtrl.currLoc.location);
    var cnMatch = cn.match('([A-Z]+)[0-9]');
    var cnPrefix = cnMatch ? cnMatch[1] : '';
    var floor = '';

    if (lib === 'Telford Science Library') {
      if (coll === 'Folio') {
        floor = 'LEVEL 4';
      } else if (['Current Periodicals', 'Reserves'].includes(coll)) {
        floor = 'LEVEL 3';
      } else if (['Stacks', 'Reference'].includes(coll)) {
        if (cnPrefix < 'QB') {
          floor = 'LEVEL 3';
        } else {
          floor = 'LEVEL 4';
        }
      }
    } else if (lib === 'Leyburn Library') {
      if (coll === 'Reference') {
        floor = 'the MAIN LEVEL';
      } else if (['Folio', 'Government Documents', 'VHS'].includes(coll)) {
        floor = 'LEVEL 4 (COMPACT SHELVING)';
      } else if (['Popular Reading Collection', 'Music CDs', 'DVD', 'Microforms and Microfiche', 'FLIP Open Reserves', 'FLIP Books (Student Use)'].includes(coll)) {
        floor = 'the MAIN LEVEL';
      } else if (['Circulation Desk - Audiovisual Materials', 'Permanent Reserve', 'Reserves'].includes(coll)) {
        floor = 'the MAIN LEVEL (ASK at the INFORMATION DESK)';
      } else if (coll.startsWith('Special Collections') || ['Archives', 'Leyburn Library Special Collections - Boatwright Room'].includes(coll)) {
        floor = 'LEVEL 1 in SPECIAL COLLECTIONS AND ARCHIVES';
      } else if (coll.startsWith('UNAVAILABLE DURING CONSTRUCTION')) {
        floor = 'LEVEL 1: Due to construction, staff must pull on weekdays (login above to request via ILL form). Item IS accessible after 6:00pm and on weekends.';
      } else if (coll === 'Stacks') {
        if (cnPrefix) {
          if (cnPrefix < 'BR') {
            floor = 'LEVEL 1';
          } else if (cnPrefix < 'G') {
            floor = 'LEVEL 2';
          } else if (cnPrefix < 'PR') {
            floor = 'LEVEL 3';
          } else {
            floor = 'LEVEL 4';
          }
        } else if (cn === 'PERIODICALS') {
          floor = 'LEVEL 4';
        } else if (cn === 'CURRENT PERIODICALS') {
          floor = 'the MAIN LEVEL';
        }
      }
    } // otherwise ignore if Law Library

    return floor;
  }
}]);

angular.module('getFloorLocation').component('wluFloorLocation', {
  bindings: { parentCtrl: '<' },
  template: '\n      <div layout="row" layout-align="center center" class="wlu-floor-location" ng-if="$ctrl.getShow()">\n          <p>This item is located in <b>{{$ctrl.getLib()}}</b> on <b>{{$ctrl.getItemLocation()}}</b></p>\n      </div>\n  ',
  controller: 'FloorLocationController'
});

app.component('prmLocationItemsAfter', {
  bindings: { parentCtrl: '<' },
  template: '<wlu-floor-location parent-ctrl="$ctrl.parentCtrl" />'
});

/* ----------------------------------------------------------------------------------------- */

// UNPAYWALL
app.constant('unpaywallConfig', { email: 'library@wlu.edu' });

angular.module('bulibUnpaywall', []).controller('unpaywallController', ['$http', '$injector', function ($http, $injector) {
  var self = this; // 'this' changes scope inside of the $http.get(). 'self' is easier to track/trace

  var LOG_CONFIG_DISCOVERY = false;

  var logEventToGoogleAnalytics = function logEventToGoogleAnalytics(category, action, label) {
    if (window.ga) {
      window.ga('send', 'event', category, action, label);
    }
  };

  // obtain custom configuration information from 'unpaywallConfig' or primo-studio constant
  var unpaywallConfig = {};
  if ($injector.modules && LOG_CONFIG_DISCOVERY) {
    console.log($injector.modules);
  }
  if ($injector.has('unpaywallConfig')) {
    if (LOG_CONFIG_DISCOVERY) {
      console.log("'unpaywallConfig' found: ");
    }
    unpaywallConfig = $injector.get('unpaywallConfig');
  }
  if ($injector.has('primoExploreUnpaywallStudioConfig')) {
    if (LOG_CONFIG_DISCOVERY) {
      console.log("'primoExploreUnpaywallStudioConfig' found: ");
    }
    unpaywallConfig = $injector.get('primoExploreUnpaywallStudioConfig');
  }
  if (LOG_CONFIG_DISCOVERY) {
    console.log(unpaywallConfig);
  }

  // provide 'unpaywall' organization with default value including some context that it's from us (for rate-limiting)
  self.email = unpaywallConfig.email || 'primo-explore-unpaywall@npmjs.com';

  // provide additional customization options (with defaults)
  self.logToConsole = Object.keys(unpaywallConfig).includes('logToConsole') ? unpaywallConfig.logToConsole : true;
  self.publishEvents = Object.keys(unpaywallConfig).includes('publishEvents') ? unpaywallConfig.publishEvents : false;
  self.showVersionLabel = Object.keys(unpaywallConfig).includes('showVersionLabel') ? unpaywallConfig.showVersionLabel : false;
  self.showDebugTable = Object.keys(unpaywallConfig).includes('showDebugTable') ? unpaywallConfig.showDebugTable : false;
  self.showOnResultsPage = Object.keys(unpaywallConfig).includes('showOnResultsPage') ? unpaywallConfig.showOnResultsPage : true;
  self.overrideOACheck = Object.keys(unpaywallConfig).includes('overrideOACheck') ? unpaywallConfig.overrideOACheck : false;
  self.logEvent = unpaywallConfig.logEvent || logEventToGoogleAnalytics;

  // customize UI/UX
  self.labelText = Object.keys(unpaywallConfig).includes('labelText') ? unpaywallConfig.labelText : null;
  self.imageUrl = Object.keys(unpaywallConfig).includes('imageUrl') ? unpaywallConfig.imageUrl : null;
  self.imageStyle = Object.keys(unpaywallConfig).includes('imageStyle') ? unpaywallConfig.imageStyle : 'height: 24px; vertical-align: bottom; padding-right: 5px;';

  // conditionally log to the console
  self.logMessageToConsole = function (message) {
    if (self.logToConsole) {
      console.log('bulib-unpaywall) ' + message);
    }
  };

  // conditionally call customized 'logEvent'
  self.logEventToAnalytics = function (category, action, label) {
    self.logMessageToConsole("triggering '" + category + '.' + action + "' event [publish=" + self.publishEvents + '].');
    if (self.publishEvents) {
      self.logEvent(category, action, label);
    }
  };

  // ng-click response that logs data to google analytics
  self.trackLinkClick = function (doi) {
    self.logMessageToConsole('unpaywall link used for doi: ' + doi);
    self.logEventToAnalytics('unpaywall', 'usage', self.listOrFullViewLabel);
  };

  self.$postLink = function () {
    self.parentCtrl = self.prmSearchResultAvailabilityLine;
    var item = self.parentCtrl.result; // item data is stored in 'prmSearchResultAvailability' (its parent)

    // obtain contextual info on whether you're on the result list of the full item view
    var onFullView = this.parentCtrl.isFullView || this.parentCtrl.isOverlayFullView;
    self.listOrFullViewLabel = onFullView ? 'full' : 'list';
    self.show = onFullView || self.showOnResultsPage;

    try {
      // obtain doi and open access information from the item PNX (metadata)
      var addata = item.pnx.addata;
      if (addata) {
        this.doi = addata.hasOwnProperty('doi') ? addata.doi[0] : null; // default to first doi (list)
        this.is_oa = addata.hasOwnProperty('oa'); // true if property is present at all (regardless of value)
      }

      // if there's a doi and it's not already open access, ask the oadoi.org for an OA link
      if (this.doi && (!this.is_oa || self.overrideOACheck) && self.show) {
        self.logEventToAnalytics('unpaywall', 'api-call', self.listOrFullViewLabel);

        // make the actual call to unpaywall API
        var apiUrl = 'https://api.oadoi.org/v2/' + self.doi + '?email=' + self.email;
        self.logMessageToConsole("-> making 'api-call' to " + apiUrl);
        $http.get(encodeURI(apiUrl)).then(function (successResponse) {
          // if there is a "best open access location", save it so it can be used in the template above
          var best_oa_location = successResponse.data.best_oa_location;
          if (!best_oa_location) {
            return; // can't get what we want from unpaywall. returning with nothing
          }

          // get the "best" content link from this "best_oa_location"
          self.best_oa_link = best_oa_location.url || '';
          self.logMessageToConsole("successfully acquired a 'best_oa_location' for doi '" + self.doi + "' at url: " + self.best_oa_link);
          self.logEventToAnalytics('unpaywall', 'api-success', self.listOrFullViewLabel);

          // optionally display whether the link is to a published, submitted, or accepted version
          var best_oa_version = best_oa_location.version.toLowerCase() || '';
          if (best_oa_version.includes('publish')) {
            self.best_oa_version = ''; // users should assume it's the 'published' version without it being clarified in the UI
          } else {
            self.best_oa_version = best_oa_version.includes('submit') ? 'Submitted' : 'Accepted';
          }
        }, function (errorResponse) {
          self.logMessageToConsole('[error status: ' + errorResponse.status + '] error calling unpaywall API: ' + errorResponse.statusText);
        });
      }
    } catch (e) {
      self.logMessageToConsole('error caught in unpaywallController: ' + e.message);
    }
  };
}]).component('bulibUnpaywall', {
  require: {
    prmSearchResultAvailabilityLine: '^prmSearchResultAvailabilityLine'
  },
  template: '\n    <unpaywall ng-if="$ctrl.show">\n      <div layout="flex" ng-if="$ctrl.best_oa_link" class="layout-row" style="margin-top: 5px;">\n        <a ng-click="$ctrl.trackLinkClick($ctrl.doi)" target="_blank" href="{{$ctrl.best_oa_link}}"\n          style="margin-left: 3px; margin-top: 3px;" rel="noreferrer">\n          \n          <img ng-if="$ctrl.imageUrl" src="{{$ctrl.imageUrl}}" alt="unpaywall logo" style="{{$ctrl.imageStyle}}">\n          <prm-icon ng-hide="$ctrl.imageUrl" icon-type="svg" svg-icon-set="action" icon-definition="ic_lock_open_24px" style="color: #f68212;"></prm-icon>\n          \n          <span ng-if="$ctrl.labelText">{{$ctrl.labelText}}</span>\n          <span ng-hide="$ctrl.labelText"><strong>Open Access</strong> available via unpaywall</span>\n          \n          <span ng-if="$ctrl.showVersionLabel && $ctrl.best_oa_version">&nbsp({{$ctrl.best_oa_version}} version)</span>\n          <prm-icon external-link icon-type="svg" svg-icon-set="primo-ui" icon-definition="open-in-new"></prm-icon>\n        </a>\n      </div>\n      <div ng-if="$ctrl.showDebugTable" class="layout-row">\n        <table>\n          <tr><td><strong>doi</strong></td><td>{{$ctrl.doi}}</td></tr>\n          <tr><td><strong>is_OA</strong></td><td>{{$ctrl.is_oa}}</td>\n          <tr><td><strong>best_oa_link</strong></td><td>{{$ctrl.best_oa_link}}</td></tr>\n          <tr><td><strong>best_oa_version</strong></td><td>{{$ctrl.best_oa_version}}</td></tr>\n        </table>\n      </div>\n    </unpaywall>',
  controller: 'unpaywallController'
});

/* ----------------------------------------------------------------------------------------- */
// Begin BrowZine - Primo Integration...
window.browzine = {
  api: 'https://public-api.thirdiron.com/public/v1/libraries/2116',
  apiKey: '6a7e4653-ed41-497d-ba84-b908e29ddb37',

  journalCoverImagesEnabled: true,

  journalBrowZineWebLinkTextEnabled: true,
  journalBrowZineWebLinkText: 'View Journal Contents',

  articleBrowZineWebLinkTextEnabled: true,
  articleBrowZineWebLinkText: 'View Issue Contents',

  articlePDFDownloadLinkEnabled: true,
  articlePDFDownloadLinkText: 'Download PDF',

  articleLinkEnabled: true,
  articleLinkText: 'Read Article',

  printRecordsIntegrationEnabled: true
};

browzine.script = document.createElement('script');
browzine.script.src = 'https://s3.amazonaws.com/browzine-adapters/primo/browzine-primo-adapter.js';
document.head.appendChild(browzine.script);

app.controller('prmSearchResultAvailabilityLineAfterController', function ($scope) {
  window.browzine.primo.searchResult($scope);
});

app.component('prmSearchResultAvailabilityLineAfter', {
  bindings: { parentCtrl: '<' },
  controller: 'prmSearchResultAvailabilityLineAfterController',
  template: '<style>bulib-unpaywall{float: right;} bulib-unpaywall:after{clear:both;}</style><bulib-unpaywall></bulib-unpaywall>'
});
// ... End BrowZine - Primo Integration

/* ----------------------------------------------------------------------------------------- */
// LibChat Widget Integration
/* ----------------------------------------------------------------------------------------- */

var css = '.lcs_slide_out-r { top: 30% !important; height: unset !important; } .lcs_slide_out header a { box-shadow: #bbb 2px 2px 5px 4px; height: 75px; width: 75px; border-bottom-right-radius: .75em; outline: none;} .lcs_slide_out header a:hover { box-shadow: #999 5px 5px 5px 4px; } .lcs_slide_out header a img { width: 100%; height: 100%; border-bottom-right-radius: .75em; } .lcs_load { padding: .5em !important; } .wlu-floor-location { background: #3d6e94; color: #fff; font-size: 1.25rem; padding: 1.5rem 1rem 1rem; }';

var libChatWidgetCSS = document.createElement('style');
libChatWidgetCSS.type = 'text/css';
libChatWidgetCSS.rel = 'stylesheet';
libChatWidgetCSS.appendChild(document.createTextNode(css));
document.querySelector('head').appendChild(libChatWidgetCSS);

var libChatWidget = document.createElement('script');
libChatWidget.type = 'text/javascript';
libChatWidget.async = 'true';
libChatWidget.src = 'https://v2.libanswers.com/load_chat.php?hash=f8fb169530414652ec6e36c84539a439';
var firstScriptTag = document.querySelector('script');
firstScriptTag.parentNode.insertBefore(libChatWidget, firstScriptTag);
})();