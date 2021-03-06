/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

jQuery.sap.declare("sap.ui.unified.CalendarLegendRenderer");

/**
 * @class Legend renderer.
 * @static
 */
sap.ui.unified.CalendarLegendRenderer = {};

/**
 * Renders the HTML for the given control, using the provided
 * {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager}
 *            oRm the RenderManager that can be used for writing to the render
 *            output buffer
 * @param {sap.ui.core.Legend}
 *            oLeg an object representation of the legend that should be
 *            rendered
 */
sap.ui.unified.CalendarLegendRenderer.render = function(oRm, oLeg) {

	var rb = sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");
	var aClasses = [ "Today", "Selected", "NormalDay", "NonWorkingDay" ];
	var aStandardItems = [ "TODAY", "SELECTED", "NORMAL_DAY", "NON_WORKING_DAY" ];
	var aCustomItems = oLeg.getItems();

	oRm.write("<div");
	oRm.writeControlData(oLeg);
	oRm.addClass("sapUiUnifiedLegend");
	oRm.writeClasses();
	var sColumnWidth = oLeg.getColumnWidth();
	oRm.writeAttribute("style", "column-width:"+sColumnWidth+";-moz-column-width:"+sColumnWidth+";-webkit-column-width:"+sColumnWidth+";");
	oRm.writeStyles();
	oRm.write(">");

	// rendering standard days and colors
	for (var i = 0; i < aStandardItems.length; i++) {
		this.renderLegendItem(oRm, "sapUiUnifiedLegend" + aClasses[i], rb.getText("LEGEND_" + aStandardItems[i]));

	}
	// rendering special day and colors
	if (aCustomItems && aCustomItems.length > 0)
		for (var i = 0; i < aCustomItems.length; i++) {
			var type = i+1;
			this.renderLegendItem(oRm, "sapUiCalLegDayType" + ((type < 10) ? "0" + type : type), aCustomItems[i].getText());
		}
	oRm.write("</div>");

};

/**
 * Renders one item of the legend {@link sap.ui.core.RenderManager}.
 *
 * @param {sap.ui.core.RenderManager}
 *            oRm the RenderManager that can be used for writing to the render
 *            output buffer
 * @param sClass
 *            name of the css class used for this item
 * @param sText
 *            description of the item
 */
sap.ui.unified.CalendarLegendRenderer.renderLegendItem = function(oRm, sClass, sText) {

	// new LegendItem
	oRm.write("<div");
	oRm.addClass("sapUiUnifiedLegendItem");
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write(">");
	// draw the square background
	oRm.write("<div");
	oRm.addClass("sapUiUnifiedLegendSquare");
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write(">");
	// draw the square color
	oRm.write("<div");
	oRm.addClass("sapUiUnifiedLegendSquareColor")
	oRm.addClass(sClass);
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write("></div></div>"); // close color, background
	// write description
	oRm.write("<div");
	oRm.addClass("sapUiUnifiedLegendDescription");
	oRm.writeClasses();
	oRm.writeStyles();
	oRm.write(">");
	oRm.writeEscaped(sText);
	oRm.write("</div></div>"); // close description, LegendItem

}
