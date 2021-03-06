(function(){

	// see if this is the plugin or being injected
	var host = location.host === 'www.pathofexile.com' ? 'https://raw.github.com/njs50/poe_ext/master/poe_ext/' : '';

	var thisDoc = '<!DOCTYPE html>' +
'<html lang="en">' +
'' +
'	<head>' +
'' +
'		<title>PoE Helper</title>' +
'' +
'		<meta charset="utf-8">' +
'		<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'' +
'		<!-- css scraped from the live PoE site -->' +
'		<link href="http://njs50.github.com/poe_ext/assets/css/poe.css" rel="stylesheet">' +
'		<link href="http://njs50.github.com/poe_ext/assets/css/bootstrap.min.css" rel="stylesheet">' +
'' +
'		<!-- poe_ext css (incl bootstrap overrides) -->' +
'		<link href="http://njs50.github.com/poe_ext/assets/css/poe_ext.css" rel="stylesheet">' +
'' +
'		<!-- bootstrap css -->' +
'		<link href="http://njs50.github.com/poe_ext/assets/css/bootstrap-responsive.min.css" rel="stylesheet">' +
'' +
'' +
'		<script src="/assets/js/date.js"></script>' +
'		<script src="/assets/js/json2.js"></script>' +
'		<script src="/assets/js/jquery-1.7.2.js"></script>' +
'		<script src="/assets/js/jquery.stupidtable.js"></script>' +
'		<script src="/assets/js/jquery.blockUI.js"></script>' +
'		<script src="/assets/js/jquery.tableExport.js"></script>' +
'		<script src="/assets/js/track.js"></script>' +
'' +
'	</head>' +
'' +
'	<body>' +
'' +
'	    <div class="navbar navbar-fixed-top">' +
'	      <div class="navbar-inner">' +
'	        <div class="container">' +
'' +
'	          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">' +
'	            <span class="icon-bar"></span>' +
'	            <span class="icon-bar"></span>' +
'	            <span class="icon-bar"></span>' +
'	          </a>' +
'' +
'	          <a class="brand" href="#">PoE Helper</a>' +
'	          <span class="pull-right navbar-text" id="version"></span>' +
'' +
'	          <div class="nav-collapse">' +
'' +
'' +
'	            <ul class="nav">' +
'' +
'				  <li class="dropdown" id="menuLeague">' +
'				    <a class="dropdown-toggle" data-toggle="dropdown" href="#menuLeague">' +
'				      League' +
'				      <b class="caret"></b>' +
'				    </a>' +
'' +
'				    <ul class="dropdown-menu" id="leagueSelector">' +
'		              <li><a>Loading...</a></li>' +
'				    </ul>' +
'				  </li>' +
'' +
'' +
'' +
'' +
'' +
'				  <li class="dropdown" id="menuRefresh">' +
'				    <a class="dropdown-toggle" data-toggle="dropdown" href="#menuRefresh">' +
'				      Refresh' +
'				      <b class="caret"></b>' +
'				    </a>' +
'				    <ul class="dropdown-menu" >' +
'		              <li><a id="refresh">Full</a></li>' +
'		              <li><a id="partRefresh">Partial</a></li>' +
'				    </ul>' +
'				  </li>' +
'' +
'' +
'' +
'				  <li class="dropdown" id="menu2">' +
'				    <a class="dropdown-toggle" data-toggle="dropdown" href="#menu2">' +
'				      Crafting' +
'				      <b class="caret"></b>' +
'				    </a>' +
'				    <ul class="dropdown-menu"  id="craftingTabs">' +
'		              <li class="crafting-page"><a>No League Selected</a></li>' +
'				    </ul>' +
'				  </li>' +
'' +
'' +
'				  <li class="dropdown" id="menu3">' +
'				    <a class="dropdown-toggle" data-toggle="dropdown" href="#menu3">' +
'				      Inventory' +
'				      <b class="caret"></b>' +
'				    </a>' +
'				    <ul class="dropdown-menu" id="rares_menu">' +
'						<li><a id="openRareList">View</a></li>' +
'						<li class="divider"></li>' +
'						<li><a id="openDisplaySelection" data-toggle="modal" href="#inventoryDisplay">Configure Display</a></li>' +
'						<li><a id="openColSelection" data-toggle="modal" href="#inventoryCols">Configure Columns</a></li>' +
'						<li><a id="openItemSelection" data-toggle="modal" href="#inventoryItems">Configure Items</a></li>' +
'						<li class="divider"></li>' +
'						<li><a id="copyItemCSV">Copy as CSV</a></li>' +
'						<li><a id="saveAllItems" download="poe_ext.poe">Export to File</a></li>' +
'				    </ul>' +
'				  </li>' +
'' +
'				  <li class="dropdown" id="menu1">' +
'				    <a class="dropdown-toggle" data-toggle="dropdown" href="#menu1">' +
'				      Clipboard' +
'				      <b class="caret"></b>' +
'				    </a>' +
'				    <ul class="dropdown-menu">' +
'		              <li><a id="copyToClipboard">Copy Rares</a></li>' +
'		              <li><a id="copyFromClipboard">Compare Rares</a></li>' +
'				    </ul>' +
'				  </li>' +
'' +
'	              <li><a href="http://www.pathofexile.com/forum/view-thread/42272" target="_blank">Feedback</a></li>' +
'	            </ul>' +
'	          </div><!--/.nav-collapse -->' +
'' +
'	        </div>' +
'' +
'' +
'' +
'	      </div>' +
'	    </div>' +
'' +
'	    <div class="container" id="bodycontainer">' +
'' +
'	    	<div id="err"></div>' +
'' +
'			<div id="crafting-content">' +
'' +
'			</div>' +
'' +
'			<p><p>' +
'' +
'			<div id="output"></div>' +
'' +
'			<p>' +
'' +
'			<div id="rareList"></div>' +
'' +
'			<div class="modal hide" id="clipboardMatch">' +
'			  <div class="modal-header">' +
'			    <h3>Clipboard Match</h3>' +
'			  </div>' +
'			  <div class="modal-body">' +
'			  </div>' +
'			  <div class="modal-footer">' +
'			    <a href="#" class="btn" data-dismiss="modal">Close</a>' +
'			  </div>' +
'			</div>' +
'' +
'			<div class="modal hide" id="inventoryDisplay">' +
'			  <div class="modal-header">' +
'			    <h3>Configure Display</h3>' +
'			  </div>' +
'			  <div class="modal-header">' +
'			    	<h3>Location</h3>' +
'					<ul id="inventoryLocation" class="unstyled">' +
'						<label class="checkbox"><input type="checkbox" class="checkboxBoss" data-target="#hideLocationTable" id="showInventoryLocationTable">Show Location Table</input></label>' +
'					</ul>' +
'			  </div>' +
'			  <div class="modal-footer">' +
'			    <a href="#" class="btn" data-dismiss="modal">Close</a>' +
'			    <a href="#" class="btn btn-primary" data-dismiss="modal" id="applyDisplaySelection">Apply</a>' +
'			  </div>' +
'			</div>' +
'' +
'			<div class="modal hide" id="inventoryCols">' +
'			  <div class="modal-header">' +
'			    <h3>Select Columns</h3>' +
'			  </div>' +
'			  <div class="modal-body">' +
'			    	<h3>Properties</h3>' +
'			    	<ul id="viewProps" class="unstyled"></ul>' +
'			    	<div class="clearfix"></div>' +
'			    	<h3>Mods</h3>' +
'			    	<ul id="viewMods" class="unstyled"></ul>' +
'			    	<div class="clearfix"></div>' +
'			    	<h3>Calculated</h3>' +
'			    	<ul id="viewCalculated" class="unstyled"></ul>' +
'			    	<div class="clearfix"></div>' +
'			    	<h3>Requirements</h3>' +
'			    	<ul id="viewReqs" class="unstyled"></ul>' +
'			    	<div class="clearfix"></div>' +
'			  </div>' +
'			  <div class="modal-footer">' +
'			    <a href="#" class="btn pull-left" id="resetCols">Clear Selection</a>' +
'			    <a href="#" class="btn" data-dismiss="modal">Close</a>' +
'			    <a href="#" class="btn btn-primary" data-dismiss="modal" id="applyColSelection">Apply</a>' +
'			  </div>' +
'			</div>' +
'' +
'			<div class="modal hide" id="inventoryItems">' +
'			  <div class="modal-header">' +
'			    <h3>Select Items</h3>' +
'			  </div>' +
'			  <div class="modal-body">' +
'' +
'			  		<div class="accordion" id="">' +
'' +
'' +
'						<div class="accordion-group">' +
'' +
'				  			<div class="accordion-heading">' +
'				  				<a class="accordion-toggle" data-toggle="collapse" href="#collapseTypes">' +
'				  					Types' +
'				  				</a>' +
'				  			</div>' +
'' +
'							<div id="collapseTypes" class="accordion-body collapse">' +
'								<div class="accordion-inner">' +
'									<label class="checkbox">' +
'										<input type="checkbox" class="checkboxBoss checkbox" data-target="#viewCategories" checked id="toggleCategories">' +
'										Select All / None' +
'									</label>' +
'									<ul id="viewCategories" class="unstyled"></ul>' +
'									<div class="clearfix"></div>' +
'								</div>' +
'						    </div>' +
'' +
'						</div>' +
'' +
'						<div class="accordion-group">' +
'' +
'				  			<div class="accordion-heading">' +
'				  				<a class="accordion-toggle" data-toggle="collapse" href="#collapseRarity">' +
'				  					Rarity' +
'				  				</a>' +
'				  			</div>' +
'' +
'							<div id="collapseRarity" class="accordion-body collapse">' +
'								<div class="accordion-inner">' +
'									<label class="checkbox">' +
'										<input type="checkbox" class="toggleCheckboxes checkbox" checked data-toggling="viewRarity" id="toggleRarity">' +
'										Select All / None' +
'									</label>' +
'									<ul id="viewRarity" class="unstyled"></ul>' +
'									<div class="clearfix"></div>' +
'								</div>' +
'						    </div>' +
'' +
'						</div>' +
'' +
'			  		</div>' +
'' +
'' +
'' +
'			  </div>' +
'			  <div class="modal-footer">' +
'			    <a href="#" class="btn" data-dismiss="modal">Close</a>' +
'			    <a href="#" class="btn btn-primary" data-dismiss="modal" id="applyItemSelection">Apply</a>' +
'			  </div>' +
'			</div>' +
'' +
'			<div class="modal hide" id="refreshSelection">' +
'			  <div class="modal-header">' +
'			    <h3>Partial Refresh</h3>' +
'			  </div>' +
'			  <div class="modal-body">' +
'			    	<h4>Characters</h3>' +
'			    	<ul id="refreshChars" class="unstyled"></ul>' +
'			    	<div class="clearfix"></div>' +
'			    	<h3>Tabs</h3>' +
'			    	<ul id="refreshTabs" class="unstyled"></ul>' +
'			  </div>' +
'			  <div class="modal-footer">' +
'			    <a href="#" class="btn" data-dismiss="modal">Close</a>' +
'			    <a href="#" class="btn btn-primary" data-dismiss="modal" id="applyPartialRefresh">Apply</a>' +
'			  </div>' +
'			</div>' +
'' +
'			<div class="modal hide" id="craftingFilters">' +
'			  <div class="modal-header">' +
'			    <h3>Configure Crafting</h3>' +
'			  </div>' +
'			  <div class="modal-body">' +
'			    	<h3>Ignore Character Inventory</h3>' +
'			    	<ul id="craftingIgnoreChars" class="unstyled"></ul>' +
'			    	<div class="clearfix"></div>' +
'			    	<h3>Ignore Stash</h3>' +
'			    	<ul id="craftingIgnoreTabs" class="unstyled"></ul>' +
'			  </div>' +
'			  <div class="modal-footer">' +
'			  	<ul id="craftingLocation" class="unstyled pull-left">' +
'			  		<li>' +
'					  	<input type="checkbox" class="checkboxBoss pull-left" data-target="#hideLocationTable" id="showCraftingLocationTable"/>' +
'						<label class="checkbox" for="showCraftingLocationTable">Show Location Table</label>' +
'					</li>' +
'				</ul>' +
'			    <a href="#" class="btn" data-dismiss="modal">Close</a>' +
'			    <a href="#" class="btn btn-primary" data-dismiss="modal" id="applyIgnoreLocations">Apply</a>' +
'			  </div>' +
'			</div>' +
'' +
'			<canvas id="tmpCanvas" width="100" height="100" style="visibility:hidden;"></canvas>' +
'' +
'			<p style="height:400px;">&nbsp;</p>' +
'' +
'	    </div> <!-- /container -->' +
'' +
'		<script src="/assets/bootstrap/js/bootstrap.js"></script>' +
'		<script src="/sprintf-0.7-beta1.js"></script>' +
'		<script src="/simpleinherit.js"></script>' +
'		<script src="/util.js"></script>' +
'		<script src="/itemdata.js"></script>' +
'		<script src="/currencydata.js"></script>' +
'' +
'		<script src="/assets/js/cache.js"></script>' +
'		<script src="/assets/js/loader.js"></script>' +
'' +
'		<script src="/myscript.js"></script>' +
'		<script src="/matcher.js"></script>' +
'		<script src="/main.js"></script>' +
'		<script src="/assets/js/clipboard.js"></script>' +
'		<script src="/assets/js/file.js"></script>' +
'' +
'' +
'	</body>' +
'</html>';


	thisDoc = thisDoc.replace(/(href|src)="\//ig,'$1="' + host);

	var w = window.open();
	w.document.write(thisDoc);
	w.document.close();


		// $('head').html(thisHead);
		// $(thisHead).filter('script').each(function(idx,item){
		// 	var script = document.createElement( 'script' );
		// 	script.type = 'text/javascript';
		// 	script.src = $(item).attr('src');
		// 	script.async = false;
		// 	var s = document.getElementsByTagName('link')[0]; s.parentNode.insertBefore(script, s);
		// });




})();